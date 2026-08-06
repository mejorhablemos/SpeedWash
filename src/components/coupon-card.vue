<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  title: {
    type: String,
    required: false
  },
  cardInfo: {
    type: Object,
    default: () => ({
      cardId: 0,
      cardName: "",
      remainWashCount: 0,
      expiryDate: "",
      cardFrom: 0
    }),
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  hoverable: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  markName: {
    type: String,
    default: ''
  }
})

// 有效期信息：validRule=1 到期日 / validRule=2 时间段 / validRule=3 星期
const expiryInfo = computed(() => {
  const rule = props.cardInfo.validRule;
  if (rule === 2) {
    return {
      label: t('components.couponCard.validTime'),
      value: `${props.cardInfo.validStartTime} - ${props.cardInfo.validEndTime}`,
    };
  }
  if (rule === 3) {
    const weekDayMap = {
      1: t('components.couponCard.weekdays.mon'),
      2: t('components.couponCard.weekdays.tue'),
      3: t('components.couponCard.weekdays.wed'),
      4: t('components.couponCard.weekdays.thu'),
      5: t('components.couponCard.weekdays.fri'),
      6: t('components.couponCard.weekdays.sat'),
      7: t('components.couponCard.weekdays.sun'),
    };
    const days = props.cardInfo.validWeekDays || [];
    return {
      label: t('components.couponCard.validWeekdays'),
      value: days.map((d) => weekDayMap[d]).filter(Boolean).join(', '),
    };
  }
  // 默认：到期日 (validRule === 1 或未指定)
  return {
    label: t('components.couponCard.expiryDate'),
    value: props.cardInfo.expiryDate,
  };
});
</script>

<template>
  <div class="h-full py-xl bg-surface flex items-center shadow-[0px_8px_24px_-16px_rgba(0,0,0,0.8)] cursor-pointer"
    :class="{ '!selected-card': active, 'hover:bg-primary/10': hoverable, '!normal-card': !disabled, '!disable-card': disabled }">
    <!-- 左侧VIP文字 -->
    <div class="flex flex-col gap-lg items-center justify-center px-6 border-r border-white/20">
      <span class="font-800 text-[28px] leading-[28px] text-primary">
        {{ title || t('components.couponCard.defaultTitle') }}
      </span>

      <van-tag type="primary" size="medium">
        {{ t('components.couponCard.availableTimes', { count: cardInfo.remainWashCount }) }}
      </van-tag>
    </div>
    <van-divider class="!h-99 b-color-#9FB0CB" :hairline="false" vertical dashed />
    <!-- 右侧内容 -->
    <div class="flex-1 p-4">
      <div class="flex items-center">
        <div class="flex flex-col gap-lg w-full">
          <div class="flex gap-lg justify-between">
            <div class="text-text-primary text-3xl">{{ cardInfo.cardName }}</div>
            <div class="text-text-secondary text-2xl">{{ markName }}</div>
          </div>
          <div class="text-text-secondary text-2xl mt-1">
            {{ expiryInfo.label }}: {{ expiryInfo.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-800 {
  font-weight: 800;
  font-style: normal;
  text-transform: none;
  text-align: left;
}
</style>
