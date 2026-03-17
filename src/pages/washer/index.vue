<script setup>
import { PAYMENT_FROM, PAYMENT_METHOD } from "@/constants";
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const id = route.params.id;

const { centsToSGD } = useCurrency();
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

// 充值优惠列表
const topUpList = computed(() => washerData.value?.rechargeList || []);

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
  <div class="bg-gray-50 pb-safe-bottom">
    <!-- 加载状态 -->
    <div v-if="isLoading" class="absolute inset-0 flex-center bg-white/80">
      <van-loading size="24px" vertical>{{ t("common.loading") }}</van-loading>
    </div>

    <!-- 错误提示 -->
    <van-empty
      v-if="error"
      :description="error"
      class="absolute inset-0 flex-center bg-white"
    >
      <template #image>
        <van-icon name="warning-o" size="48" class="text-gray-400" />
      </template>
    </van-empty>

    <!-- 设备信息 -->
    <div class="px-4 py-3">
      <div class="bg-white rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-black text-32 font-medium">
              {{ washerData?.name }}
            </h2>
            <p class="text-gray-400 text-26 mt-1">
              {{ t("routes.washer.store") }}: {{ washerData?.storeName }}
            </p>
          </div>
          <status-tag
            :status="washerData?.iotStatus"
            v-if="[0, 1, 2].includes(washerData?.iotStatus)"
          />
        </div>
        <div
          class="mt-3 bg-[#F5F7FA] p-3 rounded-lg h-72 text-gray-600 flex items-center text-28 font-medium"
        >
          <span>{{ washerData?.address }}</span>
        </div>
      </div>
    </div>

    <!-- 洗车方案 -->
    <div class="px-4 py-3">
      <div class="text-32 fw-bold text-black mb-30">
        {{ t("routes.washer.selectPlan") }}
      </div>
      <option-selector
        v-model="selectedPlan"
        :items="washPlans"
        key-field="mark"
      >
        <template #default="{ item }">
          <div class="text-black text-32">{{ item.name }}</div>
          <price-tag
            :price="item.price"
            currency-class="text-xl text-primary"
            integer-class="text-3xl font-bold text-primary"
            decimal-class="text-xl text-primary"
          />
        </template>
      </option-selector>
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

    <!-- 充值优惠 -->
    <van-cell-group inset class="mt-20!">
      <div class="flex justify-between items-center p-4">
        <van-tag type="danger">{{
          t("routes.washer.topUp.promotion")
        }}</van-tag>
        <div class="text-2xl text-primary">
          {{ t("routes.washer.topUp.balance") }}
          <price-tag :price="washerData?.balance" />
        </div>
      </div>

      <van-cell
        class="top-up-cell"
        center
        :value="t('routes.washer.topUp.title')"
        is-link
        url="/wallet/top-up"
      >
        <template #title>
          <van-space direction="vertical" fill v-if="topUpList.length">
            <template v-for="(item, index) in topUpList" :key="index">
              {{
                t("routes.washer.topUp.scheme", {
                  pay: centsToSGD(item.payAmount),
                  get: centsToSGD(item.rechargeAmount),
                })
              }}
            </template>
          </van-space>

          <van-empty :description="t('routes.washer.topUp.empty')" v-else />
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 底部结算栏 -->
    <van-action-bar>
      <van-space :size="4" align="baseline">
        <div class="ml-5px">{{ t("routes.washer.total") }}:</div>
        <price-tag
          :price="orderAmount"
          :thousands="true"
          currency-class="text-xl text-primary"
          integer-class="text-3xl font-bold text-primary"
          decimal-class="text-xl text-primary"
        />
      </van-space>

      <div class="flex-1"></div>
      <van-action-bar-button
        type="danger"
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
