<script setup>
import { whatsappUrl, EMERGENCY_CONTACTS } from "@/constants/contact";

const { t } = useI18n();
const route = useRoute();

// 获取路由参数中的订单ID
const orderId = route.params.id;

// 订单详情数据
// const orderTime = ref('');
// const cardName = ref('');
// const orderNumber = ref('');
// const paymentTime = ref('');
// const amount = ref(0);
// const orderStatus = ref('');

const { data, error } = orderApi.washOrderInfo(orderId);

if (unref(error)) {
  showToast(error.value);
  // return;
  // TODO:  订单获取失败
}

// 订单创建时间
const orderTime = useDateFormat(() => new Date(data.value?.createTimestamp), "YYYY-MM-DD HH:mm:ss", {
  locales: "zh_Hans_SG",
})

// 获取订单状态
const getOrderStatus = (showState) => {
  const statusMap = {
    1: "pending", // 待付款
    2: "expired", // 支付超时
    3: "timeout", // 洗车启动超时
    4: "processing", // 进行中
    5: "completed", // 已完成
  };
  return statusMap[showState] || "unknown";
};

const washStatus = computed(() => {
  return t(`routes.order.detail.wash_status.${data.value?.washStatus}`);
});

// Lavado activo → mostramos botón de emergencia. `washStatus`: 1 no iniciado,
// 2 lavando, 3 completado, 4 timeout de arranque.
// Incluimos 2, 3 y 4 porque:
//   - 2 lavando: auto adentro con ciclo mecánico en curso.
//   - 3 completado: el ciclo terminó pero la cortina puede fallar en abrir
//     → auto (y usuario) siguen adentro. Es el escenario más peligroso.
//   - 4 timeout de arranque: pagó pero la máquina no arrancó; el auto puede
//     haber entrado igual y algo salió mal.
const isWashActive = computed(() => [2, 3, 4].includes(data.value?.washStatus));

const showEmergency = ref(false);
const emergencyActions = EMERGENCY_CONTACTS.map((c) => ({
  name: `${c.name} — ${c.display}`,
  phone: c.phone,
}));
const onEmergencySelect = (action) => {
  window.location.href = `tel:${action.phone}`;
  showEmergency.value = false;
};

// Etiqueta clara del pago: si el pack cubrió todo (final = 0 y hay cardName),
// lo decimos como tal en vez de mostrar "Pago con saldo $0" — lo mismo que
// hacía confuso al usuario. `payFrom`: 0 no pagado, 1 saldo, 2 Mercado Pago.
const paymentMethodLabel = computed(() => {
  const d = data.value;
  if (!d) return "";
  const coveredByPack = d.finalPrice === 0 && d.cardName;
  if (coveredByPack) return t("routes.order.detail.payment_methods.pack", { cardName: d.cardName });
  if (d.payFrom === 1) return t("routes.order.detail.payment_methods.balance");
  if (d.payFrom === 2) return t("routes.order.detail.payment_methods.mercadoPago");
  return t("routes.order.detail.payment_methods.unpaid");
});

// Cuando el pack cubre todo, mostrar el detalle en texto en vez de "$0" —
// que es lo confuso. Este flag lo usa el template.
const coveredByPack = computed(
  () => data.value?.finalPrice === 0 && !!data.value?.cardName
);

// Formatea $AR sin decimales (los precios vienen en centavos del backend).
const formatPrice = (cents) =>
  "$" + Math.round((Number(cents) || 0) / 100).toLocaleString("es-AR");

// Reembolsos y consultas se resuelven manual por WhatsApp con el encargado
// (el panel de reembolsos del backend no lo mira nadie hoy — modelo manual
// hasta apertura). Mensaje pre-armado con el contexto del pedido para que el
// encargado no tenga que abrir el panel para consultas simples.
const onContactWhatsApp = () => {
  const d = data.value || {};
  const orderNo = d.orderNo || orderId;
  const dateStr = unref(orderTime) || "";
  const store = d.storeName || "-";
  const machine = d.iotName || "-";
  const mode = d.markName || "-";
  const payment = paymentMethodLabel.value || "-";
  // Monto: si fue cubierto por pack, mostramos el precio original tachado en
  // el texto no se puede, así que aclaramos entre paréntesis.
  const amount = coveredByPack.value
    ? `${formatPrice(d.originalPrice)} (cubierto por ${d.cardName})`
    : formatPrice(d.finalPrice);

  const msg = t("routes.order.detail.whatsapp_message", {
    orderNo,
    date: dateStr,
    store,
    machine,
    mode,
    payment,
    amount,
  });
  window.location.href = whatsappUrl(msg);
};

onMounted(() => {
  // fetchOrderDetail();
});

</script>

<template>

  <div>
    <van-cell-group inset :border="false" class="!mt-20 !bg-gradient-to-b from-primary from-90% to-surface to-90%">
      <!-- 红色卡片区域 -->
      <div class="p-4 text-white">
        <div class="text-18px">
          {{ orderTime }}
        </div>
        <div class="text-20px font-bold mt-2">{{ data?.cardName }}</div>
      </div>

      <!-- 订单信息 -->
      <div class="bg-surface rounded-lg -mt-2 text-26 overflow-hidden">
        <van-cell :title="t('routes.order.detail.order_number')" :value="data?.orderNo" />
        <van-cell :title="t('routes.order.detail.store')" :value="data?.storeName" />
        <van-cell :title="t('routes.order.detail.device')" :value="data?.iotName" />
        <van-cell :title="t('routes.order.detail.washMode')" :value="data?.markName" />
        <van-cell :title="t('routes.order.detail.payment_method')" :value="paymentMethodLabel" />
        <van-cell :title="t('routes.order.detail.wash_status.title')" :value="washStatus" />

        <div class="flex justify-between">
          <van-cell :title="t('routes.order.detail.order_amount')">
            <template #label>
              <price-tag :price="data?.originalPrice" class="price-tag" />
            </template>
          </van-cell>
          <van-cell :title="t('routes.order.detail.payment_amount')">
            <template #label>
              <!-- Cuando el pack cubre todo, "$0" es confuso. Mostramos
                   "Cubierto por pack" en lugar del monto. -->
              <div v-if="coveredByPack" class="covered-by-pack">
                {{ t('routes.order.detail.covered_by_pack') }}
              </div>
              <price-tag v-else :price="data?.finalPrice" class="price-tag" />
            </template>
          </van-cell>
        </div>
      </div>
    </van-cell-group>

  </div>

  <!-- Botón de emergencia — visible mientras el lavado está "activo"
       (washStatus 2/3/4). Cubre desde que arranca el ciclo hasta que la
       cortina se abre y el auto sale, incluyendo el caso "cortina no abre"
       (washStatus=3) y timeout de arranque (washStatus=4). -->
  <div v-if="isWashActive" class="px-4 pt-2 pb-1">
    <button type="button" class="emergency-btn" @click="showEmergency = true">
      <van-icon name="phone-o" class="emergency-btn__icon" />
      <span class="emergency-btn__text">{{ t("routes.washer.emergency.button") }}</span>
    </button>
  </div>

  <!-- Único CTA de contacto: WhatsApp al bot de atención con el nº de pedido.
       Reembolsos, consultas y quejas se manejan por acá (manual, sin panel). -->
  <van-action-bar>
    <van-action-bar-button
      color="#25D366"
      icon="chat-o"
      :text="t('routes.order.detail.whatsapp_contact')"
      @click="onContactWhatsApp"
    />
  </van-action-bar>

  <!-- Action-sheet de emergencia (llamadas humanas). Reutiliza los mismos
       contactos que la pantalla de lavado (src/constants/contact.js). -->
  <van-action-sheet
    v-model:show="showEmergency"
    :actions="emergencyActions"
    :description="t('routes.washer.emergency.description')"
    :cancel-text="t('routes.washer.emergency.cancel')"
    close-on-click-action
    @select="onEmergencySelect"
  />
</template>

<style scoped>
:deep(.van-cell__title) {
  color: #999;
}

:deep(.van-cell__value) {
  color: #333;
}

.price-tag {
  @apply text-44 font-bold text-dark;
}

.covered-by-pack {
  font-size: 15px;
  font-weight: 700;
  color: var(--brand-success);
  line-height: 1.2;
  padding-top: 4px;
}

/* Botón de emergencia — mismo estilo que en la pantalla del washer
   (src/pages/washer/index.vue). Rojo intenso, imposible de no ver. */
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
</style>
