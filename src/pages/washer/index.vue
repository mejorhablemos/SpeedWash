<script setup>
import { PAYMENT_FROM, PAYMENT_METHOD, IOT_STATUS } from "@/constants";
import { EMERGENCY_CONTACTS } from "@/constants/contact";

// Feature flag — pasar a true cuando RR.PP. confirme % de descuento
// por pago en efectivo y la operatoria en sucursal. Default off al lanzamiento.
const SHOW_CASH_OFFER = false;

const { t, tm } = useI18n();
const route = useRoute();
const router = useRouter();
const id = route.params.id;

const { success } = usePaymentResult();

// 加载状态
const isLoading = ref(true);
const error = ref(null);

// 洗车机详情数据
const { data: washerData, error: washerError, isFetching } = washApi.iotInfo(id);

// 洗车方案
const washPlans = computed(() => washerData.value?.schemeList || []);

// VIP卡列表
const vipCards = computed(() => washerData.value?.vipCardList || []);

// La máquina solo se puede iniciar si está disponible
const canWash = computed(
  () => washerData.value?.iotStatus === IOT_STATUS.AVAILABLE
);

// Ventajas según el tipo de máquina (heurística por nombre)
const isTouchless = computed(() =>
  /sin\s*contacto|touchless/i.test(washerData.value?.name || "")
);
const machineBenefits = computed(() => {
  const key = isTouchless.value ? "touchless" : "rodillos";
  const list = tm(`routes.washer.benefits.${key}`);
  return Array.isArray(list) ? list : [];
});

// El vendor nombra el plan con cera como "Lavado Premium"; en la marca
// SpeedWash se muestra como "Lavado SpeedWash con Cera". Override de display.
const displayPlanName = (name = "") => {
  if (/premium/i.test(name)) return t("routes.washer.planName.premium");
  return name;
};

// Parte el nombre del plan en 2 líneas: "Lavado Plus" -> ["Lavado", "Plus"]
const splitPlanName = (name = "") => {
  const display = displayPlanName(name);
  const idx = display.indexOf(" ");
  if (idx === -1) return { first: display, rest: "" };
  return { first: display.slice(0, idx), rest: display.slice(idx + 1) };
};

// 其他状态
const selectedPlan = ref(null);
const selectedCard = ref(null);
const showVipCards = ref(false);

// Emergencia: action-sheet con los contactos que atienden llamadas físicas
// (encargado + socios). Solo aparece en esta pantalla porque es donde el usuario
// está físicamente en la máquina — si se queda encerrado o algo se rompe,
// necesita marcar rápido a alguien humano.
const showEmergency = ref(false);
const emergencyActions = EMERGENCY_CONTACTS.map((c) => ({
  name: `${c.name} — ${c.display}`,
  phone: c.phone,
}));
const onEmergencySelect = (action) => {
  window.location.href = `tel:${action.phone}`;
  showEmergency.value = false;
};

// 订单金额
const orderAmount = ref(0);

// Tarjeta VIP (pack) aplicable al plan elegido: una tarjeta solo vale para su
// mismo `mark`. Nada se consume hasta apretar "Iniciar lavado".
const applicableCard = computed(
  () => vipCards.value.find((c) => c.mark === selectedPlan.value?.mark) || null
);

const formatPrice = (cents) =>
  "$" + Math.round((Number(cents) || 0) / 100).toLocaleString("es-AR");

// 监听错误
watch(washerError, (err) => {
  if (unref(err)) {
    showToast(unref(err));
  }
});

// 监听加载状态
watch(isFetching, (loading) => {
  isLoading.value = loading;
});

// 计算订单金额
const calculatePrice = async () => {
  if (!selectedPlan.value?.mark) {
    orderAmount.value = 0;
    return;
  }

  const { data, error } = await washApi.calPrice({
    iotId: id,
    mark: selectedPlan.value?.mark,
    vipCardId: selectedCard.value?.cardId,
  });

  if (unref(error)) {
    showToast(t("routes.errors.networkError"));
    return 0;
  }

  orderAmount.value = data.value.price;
};

// 创建订单
const createOrder = async () => {
  // Bloquear si la máquina no está disponible (mantenimiento / en uso)
  const status = washerData.value?.iotStatus;
  if (status === IOT_STATUS.MAINTENANCE) {
    showToast(t("routes.washer.unavailable.maintenance"));
    return;
  }
  if (status === IOT_STATUS.IN_USE) {
    showToast(t("routes.washer.unavailable.inUse"));
    return;
  }

  // Guard anti-doble-pago: hay un pack válido para este lavado pero el usuario
  // no lo seleccionó → preguntamos antes de mandarlo a pagar con plata.
  if (!selectedCard.value && applicableCard.value) {
    try {
      await showDialog({
        title: t("routes.washer.usePackDialog.title"),
        message: t("routes.washer.usePackDialog.message", {
          price: formatPrice(orderAmount.value),
        }),
        showCancelButton: true,
        confirmButtonText: t("routes.washer.usePackDialog.usePack"),
        cancelButtonText: t("routes.washer.usePackDialog.payAnyway"),
      });
      // Confirmó usar el pack → lo aplicamos y seguimos: la orden sale $0.
      selectedCard.value = applicableCard.value;
    } catch {
      // Canceló → paga con plata, seguimos sin tarjeta.
    }
  }

  const { data, error } = await washApi.newOrder({
    iotId: id,
    mark: selectedPlan.value?.mark,
    vipCardId: selectedCard.value?.cardId,
  });

  if (unref(error)) {
    showToast(unref(error) || t("routes.errors.networkError"));
    return;
  }

  // 跳转支付页面
  const { price, balance, timeout, orderId: oid } = data.value;

  // TODO: 优化, 统一到支付页面处理
  if (price > 0) {
    router.push({
      path: "/order/payment",
      query: {
        oid,
        price,
        balance,
        timeout,
        // Sin este `from`, la pantalla de resultado no reconoce la orden de
        // lavado y el "Redirigiendo" queda colgado sin destino.
        from: PAYMENT_FROM.WASH_ORDER,
      },
    });

    return;
  }
  const { data: balanceData, error: balanceError } = await washApi.balancePay(oid)
  if (unref(balanceError)) {
    showToast(unref(balanceError));
    return;
  }
  // from: WASH_ORDER (antes PAYMENT_FROM.WASHER, que no existía → undefined y
  // dejaba la pantalla de resultado sin acción de redirección).
  success({ oid, from: PAYMENT_FROM.WASH_ORDER, method: PAYMENT_METHOD.BALANCE });
};

// 监听方案选择
watch(
  [selectedCard, washPlans],
  () => {
    calculatePrice();
  },
  { immediate: true, deep: true }
);

// Al elegir/cambiar de plan, auto-vinculamos el pack: si hay una tarjeta VIP
// válida para ese plan la usamos (total $0); si no, limpiamos la anterior (una
// tarjeta no sirve para otro plan). Nada se consume hasta "Iniciar lavado".
watch(
  selectedPlan,
  (plan) => {
    if (!plan) return;
    const match = vipCards.value.find((c) => c.mark === plan.mark) || null;
    if ((selectedCard.value?.cardId ?? null) !== (match?.cardId ?? null)) {
      selectedCard.value = match; // dispara recalc vía el watcher de selectedCard
    } else {
      calculatePrice();
    }
  },
  { immediate: true, deep: true }
);

// Preselección al cargar los planes:
//  - Si hay un pack (VIP) válido para algún plan de esta máquina, elegimos ese
//    plan → el pack se auto-usa (total $0), que es lo que quiere el founder.
//  - Si no, "Lavado con Cera" (premium) por defecto, o el de mayor precio.
watch(
  washPlans,
  (plans) => {
    if (!plans.length || selectedPlan.value) return;
    const planWithPack = vipCards.value.length
      ? plans.find((p) => vipCards.value.some((c) => c.mark === p.mark))
      : null;
    selectedPlan.value =
      planWithPack ||
      plans.find((p) => /premium/i.test(p.name)) ||
      [...plans].sort((a, b) => b.price - a.price)[0];
  },
  { immediate: true }
);
</script>

<template>
  <div class="bg-ink min-h-screen pb-safe-bottom">
    <!-- 加载状态 -->
    <div v-if="isLoading" class="absolute inset-0 flex-center bg-ink/80">
      <van-loading size="24px" vertical>{{ t("common.loading") }}</van-loading>
    </div>

    <!-- 错误提示 -->
    <van-empty
      v-if="error"
      :description="error"
      class="absolute inset-0 flex-center bg-ink"
    >
      <template #image>
        <van-icon name="warning-o" size="48" class="text-text-dim" />
      </template>
    </van-empty>

    <!-- 设备信息 -->
    <div class="px-4 py-3">
      <div class="card p-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-text-primary text-32 font-bold font-display">
              {{ washerData?.name }}
            </h2>
            <p class="text-text-secondary text-26 mt-1">
              {{ t("routes.washer.store") }}: {{ washerData?.storeName }}
            </p>
          </div>
          <status-tag
            :status="washerData?.iotStatus"
            v-if="[0, 1, 2].includes(washerData?.iotStatus)"
          />
        </div>
        <div
          class="mt-3 bg-surface-2 p-3 rounded-lg h-72 text-text-secondary flex items-center text-28 font-medium"
        >
          <span>{{ washerData?.address }}</span>
        </div>
      </div>
    </div>

    <!-- Ventajas de esta máquina -->
    <div class="px-4 py-3" v-if="machineBenefits.length">
      <div class="benefits-card">
        <div class="benefits-card__title">
          {{ t("routes.washer.benefits.title") }}
        </div>
        <div class="benefits-list">
          <div
            v-for="(benefit, i) in machineBenefits"
            :key="i"
            class="benefit-row"
          >
            <span class="benefit-check">
              <van-icon name="success" />
            </span>
            <span class="benefit-text">{{ benefit }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 洗车方案 -->
    <div class="px-4 py-3">
      <div class="text-32 fw-bold text-text-primary font-display mb-30 text-center">
        {{ t("routes.washer.selectPlan") }}
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div
          v-for="item in washPlans"
          :key="item.mark"
          class="plan-card"
          :class="{
            'plan-card--selected': selectedPlan?.mark === item.mark,
            'plan-card--full': washPlans.length === 1,
          }"
          @click="selectedPlan = item"
        >
          <div class="plan-card__name">
            <span class="block">{{ splitPlanName(item.name).first }}</span>
            <span class="block" v-if="splitPlanName(item.name).rest">{{ splitPlanName(item.name).rest }}</span>
          </div>
          <price-tag
            :price="item.price"
            :thousands="true"
            :decimals="0"
            currency-class="text-lg text-primary"
            integer-class="text-3xl font-bold text-primary"
          />
        </div>
      </div>
    </div>

    <!-- Pack / Tarjeta VIP — prominente. El founder ya pagó su pack, así que
         usarlo es el camino por defecto (se auto-selecciona) y bien visible. -->
    <div class="px-4 py-3" v-if="selectedCard || applicableCard">
      <!-- Usando el pack (estado por defecto cuando hay uno válido) -->
      <div v-if="selectedCard" class="pack-row pack-row--using" @click="showVipCards = true">
        <div class="pack-row__icon pack-row__icon--using">
          <van-icon name="passed" size="22" />
        </div>
        <div class="pack-row__text">
          <div class="pack-row__title">{{ t("routes.washer.vipCard.usingPack") }}</div>
          <div class="pack-row__sub">
            {{ t("routes.washer.vipCard.usingPackSub", { count: selectedCard.remainWashCount }) }}
          </div>
        </div>
        <span class="pack-row__action">{{ t("routes.washer.vipCard.change") }}</span>
      </div>

      <!-- Pack disponible pero no seleccionado (si el usuario lo sacó) -->
      <div v-else class="pack-row pack-row--available" @click="showVipCards = true">
        <div class="pack-row__icon">
          <van-icon name="vip-card-o" size="22" />
        </div>
        <div class="pack-row__text">
          <div class="pack-row__title">{{ t("routes.washer.vipCard.usePack") }}</div>
          <div class="pack-row__sub">
            {{ t("routes.washer.vipCard.available", { count: applicableCard.remainWashCount }) }}
          </div>
        </div>
        <van-icon name="arrow" class="pack-row__arrow" />
      </div>
    </div>

    <!-- Oferta de pago en efectivo (destacada).
         Oculta hasta confirmar % de descuento y disponibilidad real.
         Flipear SHOW_CASH_OFFER a true cuando esté definido. -->
    <div v-if="SHOW_CASH_OFFER" class="px-4 py-3">
      <div class="cash-offer flex items-center gap-3 rounded-2xl px-5 py-4">
        <span class="cash-offer__peso shrink-0">$</span>
        <div class="flex-1">
          <div class="text-30 fw-bold text-white">
            {{ t("routes.washer.cashOffer.title") }}
          </div>
          <div class="text-24 text-white/90 mt-1">
            {{ t("routes.washer.cashOffer.subtitle") }}
          </div>
        </div>
      </div>
    </div>

    <!-- Botón de emergencia: solo visible en esta pantalla (usuario está
         físicamente en la máquina). Al tocar → action-sheet con contactos que
         atienden llamadas humanas (encargado + socios). -->
    <div class="px-4 pt-2 pb-3">
      <button type="button" class="emergency-btn" @click="showEmergency = true">
        <van-icon name="phone-o" class="emergency-btn__icon" />
        <span class="emergency-btn__text">{{ t("routes.washer.emergency.button") }}</span>
      </button>
    </div>

    <!-- 底部结算栏 -->
    <van-action-bar>
      <van-space :size="4" align="baseline">
        <div class="ml-5px">{{ t("routes.washer.total") }}:</div>
        <price-tag
          :price="orderAmount"
          :thousands="true"
          :decimals="0"
          currency-class="text-xl text-primary"
          integer-class="text-3xl font-bold text-primary"
        />
      </van-space>

      <div class="flex-1"></div>
      <van-action-bar-button
        type="danger"
        :disabled="!canWash"
        :text="t('routes.washer.submit')"
        @click="createOrder"
      />
    </van-action-bar>

    <!-- VIP卡选择弹窗 -->
    <vip-card-selector
      v-model:show="showVipCards"
      v-model:selectedCard="selectedCard"
      :list="vipCards"
      :wash-plans="washPlans"
      :mark="selectedPlan?.mark"
    />

    <!-- Action-sheet de emergencia (llamadas humanas) -->
    <van-action-sheet
      v-model:show="showEmergency"
      :actions="emergencyActions"
      :description="t('routes.washer.emergency.description')"
      :cancel-text="t('routes.washer.emergency.cancel')"
      close-on-click-action
      @select="onEmergencySelect"
    />
  </div>
</template>

<style scoped>
/* Tarjetas de plan de lavado */
.plan-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  min-height: 168px;
  padding: 20px 14px 16px;
  text-align: center;
  border-radius: 16px;
  background: var(--surface-color);
  border: 2px solid var(--line-color);
  cursor: pointer;
  transition: transform 0.2s, border-color 0.2s, background 0.2s, box-shadow 0.2s;
}

.plan-card:active {
  transform: scale(0.98);
}

.plan-card--selected {
  border-color: var(--primary-color);
  background: rgba(0, 187, 252, 0.08);
  box-shadow: 0 0 0 1px var(--primary-color), 0 14px 30px -18px rgba(0, 187, 252, 0.5);
}

.plan-card__name {
  font-family: var(--font-display);
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.12;
  color: var(--text-primary);
}

/* Plan único: ocupa todo el ancho, layout horizontal (nombre + precio) */
.plan-card--full {
  grid-column: 1 / -1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 0;
  padding: 18px 22px;
  text-align: left;
}

.plan-card--full .plan-card__name {
  font-size: 20px;
}

/* Bloque de pack / Tarjeta VIP prominente */
.pack-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 16px;
  cursor: pointer;
  transition: transform 0.2s;
}

.pack-row:active {
  transform: scale(0.99);
}

.pack-row--using {
  background: rgba(var(--brand-success-rgb), 0.1);
  border: 1px solid rgba(var(--brand-success-rgb), 0.4);
}

.pack-row--available {
  background: rgba(0, 187, 252, 0.08);
  border: 1px solid rgba(0, 187, 252, 0.4);
}

.pack-row__icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary-color) 100%);
}

.pack-row__icon--using {
  background: var(--brand-success);
}

.pack-row__text {
  flex: 1;
  min-width: 0;
}

.pack-row__title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
}

.pack-row__sub {
  font-size: 12.5px;
  color: var(--text-secondary);
  margin-top: 2px;
}

.pack-row__action {
  font-size: 13px;
  font-weight: 600;
  color: var(--primary-color);
  flex-shrink: 0;
}

.pack-row__arrow {
  color: var(--text-secondary);
  flex-shrink: 0;
}

.cash-offer {
  background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-light) 100%);
  box-shadow: 0 8px 20px -8px rgba(var(--accent-color-rgb), 0.6);
}

.cash-offer__peso {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 800;
  color: #fff;
  background: rgba(255, 255, 255, 0.18);
  border: 2px solid rgba(255, 255, 255, 0.55);
}

/* Tarjeta de ventajas (premium, cyan) */
.benefits-card {
  position: relative;
  overflow: hidden;
  padding: 18px 16px;
  border-radius: 18px;
  background:
    radial-gradient(120% 130% at 50% -20%, rgba(0, 187, 252, 0.12) 0%, transparent 60%),
    var(--surface-color);
  border: 1px solid var(--line-color);
  box-shadow: 0 12px 30px -18px rgba(0, 0, 0, 0.85);
}

.benefits-card__title {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 14px;
}

.benefits-list {
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.benefit-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;
}

.benefit-check {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #001016;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary-color) 100%);
  box-shadow: 0 4px 12px -4px rgba(0, 187, 252, 0.75);
}

.benefit-text {
  font-size: 13px;
  line-height: 1.35;
  color: var(--text-secondary);
}

/* Botón de emergencia — rojo intenso, grande y con contorno para que
   destaque contra el resto de la UI. Debe verse en un pantallazo. */
.emergency-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 20px;
  border-radius: 14px;
  border: 1.5px solid rgba(240, 68, 56, 0.55);
  background: rgba(240, 68, 56, 0.14);
  color: #ff6b60;
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: transform 0.15s, background 0.15s;
}

.emergency-btn:active {
  transform: scale(0.98);
  background: rgba(240, 68, 56, 0.22);
}

.emergency-btn__icon {
  font-size: 20px;
}

.emergency-btn__text {
  line-height: 1;
}

:deep(.van-empty__description) {
  padding: 0;
}

.top-up-cell :deep(.van-cell__title) {
  flex: auto;
}

.skew {
  position: relative;
  width: max-content;
  height: 54px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skew::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  background: orange;
  transform: skewX(-15deg);
}

.skew::before {
  content: "";
  position: absolute;
  top: 0;
  right: -20px;
  width: 100%;
  height: 54px;
  border-radius: 10px;
  background: orange;
}

.skew-content {
  z-index: 1;
  transform: translateX(10px);
}
</style>
