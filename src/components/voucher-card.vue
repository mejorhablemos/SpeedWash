<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  cardInfo: {
    type: Object,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  selectable: {
    type: Boolean,
    default: false
  }
});

// 获取卡片来源文本
const getCardFromText = (cardFrom) => {
  const fromMap = {
    1: t('components.voucherCard.from.newUser'),
    2: t('components.voucherCard.from.inviteReward'), 
    3: t('components.voucherCard.from.admin'),
    4: t('components.voucherCard.from.purchase')
  };
  return fromMap[cardFrom] || '';
};

const tagText = computed(() => getCardFromText(props.cardInfo.cardFrom));

const canUse = computed(() => props.cardInfo.state === 1);

const slots = useSlots();
</script>

<template>
  <div class="voucher-card" :class="{ '!selected-card': active, 'filter-grayscale-100': !canUse, 'hover:bg-primary/5': hoverable }">
    <!-- 左侧VIP文字 -->
    <div
      class="flex flex-col gap-lg items-center justify-center px-6 border-r border-white/20"
    >
      <span class="font-800 text-[28px] leading-[28px] text-primary">
        {{ title || t("components.couponCard.defaultTitle") }}
      </span>

      <van-tag type="primary" size="medium">
        {{
          t("components.couponCard.availableTimes", {
            count: cardInfo.remainWashCount,
          })
        }}
      </van-tag>
    </div>
    <van-divider
      class="!h-99 b-color-#9FB0CB"
      :hairline="false"
      vertical
      dashed
    />
    <!-- 右侧内容 -->
    <div class="flex-1 p-4 flex justify-between items-center">
      <div class="flex items-center">
        <div class="flex flex-col gap-lg">
          <div class="text-black text-3xl">{{ cardInfo.cardName }}</div>
          <div class="text-[#999999] text-2xl mt-1">{{ cardInfo.licenseNo }}</div>
          <div class="text-[#999999] text-2xl mt-1">
            {{ t("components.couponCard.expiryDate") }}:
            {{ cardInfo.expiryDate }}
          </div>
        </div>
      </div>

      <div class="action-btn" v-if="slots.action">
        <slot name="action" />
      </div>
    </div>

    <div class="tag pos-absolute top--1px right--1px">
      <van-tag type="primary" size="medium" class="rounded-xl">{{
        tagText
      }}</van-tag>
    </div>
  </div>
</template>

<style scoped>
.voucher-card {
  @apply h-full py-xl bg-white flex items-center shadow-[0px_2px_12px_0px_rgba(153,153,153,0.1)] cursor-pointer normal-card pos-relative rounded-xl overflow-clip;
}

.voucher-card.disabled {
  @apply bg-gray-200;
}

.font-800 {
  font-weight: 800;
  font-style: normal;
  text-transform: none;
  text-align: left;
}
</style>
