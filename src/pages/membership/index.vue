<script setup>
import { PAYMENT_FROM, PAYMENT_METHOD } from "@/constants";
// import { getMembershipCards } from '@/api/membership'

const { t } = useI18n();
const router = useRouter();
const showLoginDialog = ref(false);

const { loading: confirmLoading, create } = usePayment({
  from: PAYMENT_FROM.VIP_CARD,
})

// 获取会员卡数据
const { data, error, isFetching } = vipCardApi.canBuyList();

// 选中的卡片
const selectedCard = ref(null);
// 当前用户的会员身份
const identityList = computed(() => data.value?.membership || []);
const vipCards = computed(() => data.value?.canBuyList || []);

// 是否有可购买的会员卡
const hasCards = computed(() => vipCards.value?.length > 0)

// 立即购买
const onPurchase = () => {
  const card = selectedCard.value;
  if (!card) return;

  // 是否仅特殊用户
  if (card.isOnlyMembership) {
    // 可以购买的会员身份
    const membershipList = card.canBuyMembership.split(',')
    // 当前用户的会员身份
    const canBuy = membershipList.some(item => identityList.value.includes(item))

    if (!canBuy) {
      showDialog({
        message: t('routes.membership.dialog.noPermission', { 
          types: membershipList.join('、')
        }),
        theme: 'round-button',
        showCancelButton: true,
        cancelButtonText: t('routes.membership.dialog.cancel'),
        confirmButtonText: t('routes.membership.dialog.apply'),
        onConfirm: () => {
          router.push("/verify");
        }
      })
      return
    }
  }
  create({
    method: PAYMENT_METHOD.MERCADO_PAGO,
    request: () => vipCardApi.newVipCardOrder(card.cardId),
  })
};

// 去申请
const goToApply = () => {
  router.push("/verify");
};

// 选择卡片
const selectCard = (card) => {
  selectedCard.value = card;
};
</script>
<template>
  <div class="py-4 gap-4 flex flex-col pb-safe-80">
    <template v-if="isFetching">
      <van-skeleton :row="3" />
      <van-skeleton :row="3" class="mt-4" />
    </template>
    
    <template v-else-if="hasCards">
      <template v-for="card in vipCards" :key="card.cardId">
        <membership-card 
          :card="card" 
          :selected="selectedCard?.cardId === card.cardId" 
          @click="selectCard(card)" 
        />
      </template>
    </template>

    <template v-else>
      <div class="flex flex-col items-center justify-center py-32">
        <van-empty
          :description="t('routes.membership.empty')" 
        />
      </div>
    </template>
  </div>

  <van-action-bar>
    <van-action-bar-button :disabled="!selectedCard" type="primary" :loading="confirmLoading"
      :text="t('routes.membership.buy')" @click="onPurchase" />
  </van-action-bar>

  <van-dialog v-model:show="showLoginDialog" :title="t('routes.membership.tips.title')"
    :message="t('routes.membership.tips.specialUserOnly')" show-cancel-button
    :cancel-button-text="t('routes.membership.dialog.cancel')"
    :confirm-button-text="t('routes.membership.dialog.apply')" @confirm="goToApply" />
</template>

<style scoped></style>
