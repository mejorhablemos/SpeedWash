<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const show = defineModel("show");
const selectedCard = defineModel("selectedCard");

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  washPlans: {
    type: Array,
    default: () => []
  },
  mark: {
    type: Number,
  }
});

const loading = ref(false);
const finished = ref(false);

const onLoad = () => {
  setTimeout(() => {
    loading.value = false;
    finished.value = true;
  }, 1000);
};

const selectCard = (card) => {
  // 如果点击已选中的卡片,则取消选择
  selectedCard.value = selectedCard.value?.cardId === card.cardId ? null : card;
  show.value = false;
};

const cancelSelect = () => {
  selectedCard.value = null;
  show.value = false;
};

const getMarkName = mark => props.washPlans.find(item => item.mark === mark)?.name;

</script>

<template>
  <van-popup
    v-model:show="show"
    round
    position="bottom"
    :style="{ height: '70%' }"
  >
    <div class="flex flex-col h-full bg-background">
      <div class="p-4 text-center text-3xl font-bold border-b">
        {{ t("components.vipCardSelector.title") }}
      </div>
      <div class="flex-1 overflow-hidden">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          :finished-text="t('components.vipCardSelector.noMore')"
          @load="onLoad"
          class="h-full overflow-auto"
        >
          <div class="p-4 space-y-4">
            <coupon-card
              v-for="card in props.list"
              :key="card.cardId"
              :card-info="card"
              :active="selectedCard?.cardId === card.cardId"
              :disabled="card.mark !== mark"
              :mark-name="getMarkName(card.mark)"
              @click="selectCard(card)"
            />
          </div>
        </van-list>
      </div>
      <div class="p-4 border-t">
        <van-button block round type="primary" size="large" @click="cancelSelect">
          {{ t('components.vipCardSelector.notUse') }}
        </van-button>
      </div>
    </div>
  </van-popup>
</template>
