<script setup>
import { vipCardApi } from "@/api";

const router = useRouter();
const { t } = useI18n()

const activeTab = ref(1);
const tabs = [
  { title: t('routes.voucher.usable'), value: 1 },
  { title: t('routes.voucher.used'), value: 2 },
  { title: t('routes.voucher.expired'), value: 3 }
]

const loading = ref(false);
const { data, error, isFetching, execute } = vipCardApi.myCardList(() => ({
  canUseType: activeTab.value,
}));

if (unref(error)) {
  showToast(error.message);
}

const cards = computed(() => (data.value || []).map(card => ({
  ...card,
  state: activeTab.value
})));

const getUnusableText = (state) => {
  return tabs.find(tab => tab.value === state)?.title || '';
}

const useVoucher = (card) => {
  router.push('/scan')
}

const currentCard = ref(null);
const showBind = ref(false);

const inputLicenseNo = card => {
  currentCard.value = card;
  showBind.value = true;
}

const bindLicenseNo = async (licenseNo) => {
  const { error } = await vipCardApi.bindLicenseNo({
    cardId: unref(currentCard).cardId,
    licenseNo
  })
  if (unref(error)) {
    showFailToast(t("routes.voucher.licensePlate.fail"));
    return;
  }
  showSuccessToast(t("routes.voucher.licensePlate.success"));
  execute();
}
</script>

<template>
  <div class="voucher-page flex flex-col h-default">
    <van-tabs v-model:active="activeTab" sticky @change="execute" class="voucher-tabs">
      <van-tab v-for="tab in tabs" :title="tab.title" :key="tab.value" :name="tab.value" />
    </van-tabs>

    <van-pull-refresh :model-value="isFetching" @refresh="execute" class="flex-1">
      <!-- Empty state -->
      <div v-if="!loading && !cards.length" class="empty-state">
        <div class="empty-state__icon">
          <van-icon name="card" size="48" color="#C0C4C8" />
        </div>
        <p class="empty-state__text">{{ t('routes.voucher.empty') }}</p>
        <van-button
          round
          size="small"
          class="empty-state__btn"
          @click="router.push('/vip')"
        >
          Ver planes disponibles
        </van-button>
      </div>

      <!-- Card list -->
      <div v-else class="p-4 gap-4 flex flex-col">
        <template v-for="card in cards" :key="card.cardId">
          <voucher-card :card-info="card">
            <template #action>
              <div class="flex flex-col justify-between items-end gap-lg" v-if="card.state === 1">
                <van-button type="primary" size="mini" round @click="inputLicenseNo(card)">
                  {{ t('routes.voucher.licensePlate.bind') }}
                </van-button>
                <van-button type="primary" size="mini" round @click="() => useVoucher(card)">
                  {{ t('routes.voucher.useNow') }}
                </van-button>
              </div>
              <div v-else class="text-xl">
                {{ getUnusableText(card.state) }}
              </div>
            </template>
          </voucher-card>
        </template>
      </div>
    </van-pull-refresh>

    <bind-license-plate v-model:show="showBind" @success="bindLicenseNo"/>
  </div>
</template>

<style scoped>
.voucher-page {
  background: var(--background-color);
}

:deep(.voucher-tabs .van-tabs__nav) {
  background: #fff;
}

:deep(.voucher-tabs .van-tab--active) {
  color: #00B4E6;
  font-weight: 600;
}

:deep(.voucher-tabs .van-tabs__line) {
  background: #00B4E6;
  width: 24px;
  border-radius: 2px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 24px;
}

.empty-state__icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(192, 196, 200, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.empty-state__text {
  font-size: 14px;
  color: #6B7D8E;
  margin: 0 0 20px;
}

.empty-state__btn {
  background: linear-gradient(135deg, #00B4E6 0%, #0090B8 100%);
  color: #fff;
  border: none;
  padding: 0 24px;
  font-weight: 600;
}
</style>
