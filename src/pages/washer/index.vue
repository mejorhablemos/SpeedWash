<script setup>
import { PAYMENT_FROM, PAYMENT_METHOD, IOT_STATUS } from "@/constants";
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

// Parte el nombre del plan en 2 líneas: "Lavado Plus" -> ["Lavado", "Plus"]
const splitPlanName = (name = "") => {
  const idx = name.indexOf(" ");
  if (idx === -1) return { first: name, rest: "" };
  return { first: name.slice(0, idx), rest: name.slice(idx + 1) };
};

// Descripción de qué incluye cada plan (por nombre)
const planDesc = (name = "") => {
  if (/premium/i.test(name)) return t("routes.washer.planDesc.premium");
  if (/plus/i.test(name)) return t("routes.washer.planDesc.plus");
  return "";
};

// 其他状态
const selectedPlan = ref(null);
const selectedCard = ref(null);
const showVipCards = ref(false);

// 订单金额
const orderAmount = ref(0);

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
      },
    });

    return;
  }
  const { data: balanceData, error: balanceError } = await washApi.balancePay(oid)
  if (unref(balanceError)) {
    showToast(unref(balanceError));
    return;
  }
  success({ oid, from: PAYMENT_FROM.WASHER, method: PAYMENT_METHOD.BALANCE });
};

// 监听方案选择
watch(
  [selectedCard, washPlans],
  () => {
    calculatePrice();
  },
  { immediate: true, deep: true }
);

watch(
    selectedPlan, newValue => {
      if (!!newValue) {
        unref(selectedCard) ? selectedCard.value = null : calculatePrice()
      }
    },
    { immediate: true, deep: true }
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
          :class="{ 'plan-card--selected': selectedPlan?.mark === item.mark }"
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
          <div class="plan-card__desc" v-if="planDesc(item.name)">
            {{ planDesc(item.name) }}
          </div>
        </div>
      </div>
    </div>

    <!-- VIP卡 -->
    <group-card
      :title="t('routes.washer.vipCard.title')"
      :value="t('routes.washer.vipCard.count', { count: vipCards.length })"
      @click="showVipCards = true"
    >
      <template #title>
        <div class="flex items-center gap-2">
          <van-icon name="vip-card-o" :size="24" class="text-primary" />
          {{ t("routes.washer.vipCard.title") }}
        </div>
      </template>

      <coupon-card v-if="selectedCard" :card-info="selectedCard" />
      <!-- <div v-else class="text-gray-400 text-center py-4 text-2xl">
        {{ t("routes.washer.vipCard.empty") }}
      </div> -->
    </group-card>

    <!-- Oferta de pago en efectivo (destacada) -->
    <div class="px-4 py-3">
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

.plan-card__desc {
  margin-top: auto;
  padding-top: 6px;
  font-size: 12px;
  line-height: 1.35;
  color: var(--text-secondary);
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
