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
const onPurchase = (card) => {
  if (!card || confirmLoading.value) return;
  selectedCard.value = card;

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

// Tocar un pack ejecuta la compra directamente (sin paso intermedio).
const selectCard = (card) => {
  onPurchase(card);
};
</script>
<template>
  <div class="py-4 gap-4 flex flex-col pb-safe-80">
    <template v-if="isFetching">
      <van-skeleton :row="3" />
      <van-skeleton :row="3" class="mt-4" />
    </template>
    
    <template v-else-if="hasCards">
      <p class="vip-hint">{{ t('routes.membership.tapToBuy') }}</p>
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

  <!-- Overlay de carga mientras se inicia el checkout del pack -->
  <van-overlay :show="confirmLoading" class="flex-center">
    <van-loading size="28px" vertical color="#fff">{{ t('common.loading') }}</van-loading>
  </van-overlay>

  <van-dialog v-model:show="showLoginDialog" :title="t('routes.membership.tips.title')"
    :message="t('routes.membership.tips.specialUserOnly')" show-cancel-button
    :cancel-button-text="t('routes.membership.dialog.cancel')"
    :confirm-button-text="t('routes.membership.dialog.apply')" @confirm="goToApply" />
</template>

<style scoped>
.vip-hint {
  text-align: center;
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0 0 4px;
}
</style>
