<script setup>
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

const onClickService = () => {
  // 处理联系客服逻辑
  // 拨打客服电话
  window.location.href = `tel:${data.value?.telPhone}`;
};

onMounted(() => {
  // fetchOrderDetail();
});

</script>

<template>

  <div>
    <van-cell-group inset :border="false" class="!mt-20 !bg-gradient-to-b from-primary from-90% to-white to-90%">
      <!-- 红色卡片区域 -->
      <div class="p-4 text-white">
        <div class="text-18px">
          {{ orderTime }}
        </div>
        <div class="text-20px font-bold mt-2">{{ data?.cardName }}</div>
      </div>

      <!-- 订单信息 -->
      <div class="bg-white rounded-lg -mt-2 text-26 overflow-hidden">
        <van-cell :title="t('routes.order.detail.order_number')" :value="data?.orderNo" />
        <van-cell :title="t('routes.order.detail.store')" :value="data?.storeName" />
        <van-cell :title="t('routes.order.detail.device')" :value="data?.iotName" />
        <van-cell :title="t('routes.order.detail.washMode')" :value="data?.markName" />
        <van-cell :title="t('routes.order.detail.payment_method')" :value="t('routes.order.detail.balance_payment')" />
        <van-cell :title="t('routes.order.detail.wash_status.title')" :value="washStatus" />

        <div class="flex justify-between">
          <van-cell :title="t('routes.order.detail.order_amount')">
            <template #label>
              <price-tag :price="data?.originalPrice" class="price-tag" />
            </template>
          </van-cell>
          <van-cell :title="t('routes.order.detail.payment_amount')">
            <template #label>
              <price-tag :price="data?.finalPrice" class="price-tag" />
            </template>
          </van-cell>
        </div>
      </div>
    </van-cell-group>

  </div>

  <!-- 底部按钮 -->
  <van-action-bar>

    <van-action-bar-icon icon="phone-o" :text="t('routes.order.detail.contact_service')" />

    <!-- <van-action-bar-button
      type="danger"
      :text="t('routes.order.detail.contact_service')"
      @click="onClickService"
    /> -->

    <van-action-bar-button v-if="data?.isShowRefundBtn" type="danger" :text="t('routes.order.detail.refund')" @click="onClickService" />
  </van-action-bar>
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
</style>
