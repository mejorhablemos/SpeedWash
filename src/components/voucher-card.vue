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

// Texto de origen de la tarjeta
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
  <div class="voucher-card" :class="{ 'voucher-card--active': active, 'voucher-card--disabled': !canUse }">
    <!-- Lado izquierdo: VIP -->
    <div class="voucher-card__left">
      <span class="voucher-card__vip-text">
        {{ title || t("components.couponCard.defaultTitle") }}
      </span>
      <van-tag class="voucher-card__tag" size="medium">
        {{
          t("components.couponCard.availableTimes", {
            count: cardInfo.remainWashCount,
          })
        }}
      </van-tag>
    </div>

    <div class="voucher-card__divider"></div>

    <!-- Lado derecho: info -->
    <div class="voucher-card__right">
      <div class="voucher-card__info">
        <div class="voucher-card__name">{{ cardInfo.cardName }}</div>
        <div class="voucher-card__license">{{ cardInfo.licenseNo }}</div>
        <div class="voucher-card__expiry">
          {{ t("components.couponCard.expiryDate") }}:
          {{ cardInfo.expiryDate }}
        </div>
      </div>

      <div class="voucher-card__action" v-if="slots.action">
        <slot name="action" />
      </div>
    </div>

    <div class="voucher-card__origin" v-if="tagText">
      <van-tag type="primary" size="medium" round>{{ tagText }}</van-tag>
    </div>
  </div>
</template>

<style scoped>
.voucher-card {
  display: flex;
  align-items: center;
  background: var(--surface-color);
  border: 1px solid var(--line-color);
  border-radius: 16px;
  padding: 16px 0;
  box-shadow: 0 8px 24px -16px rgba(0, 0, 0, 0.8);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.voucher-card:active {
  transform: scale(0.98);
}

.voucher-card--active {
  border: 2px solid #00BBFC;
  box-shadow: 0 4px 18px rgba(0, 187, 252, 0.25);
}

.voucher-card--disabled {
  filter: grayscale(100%);
  opacity: 0.7;
}

.voucher-card__left {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  gap: 8px;
  min-width: 80px;
}

.voucher-card__vip-text {
  font-size: 22px;
  font-weight: 800;
  color: #00BBFC;
  line-height: 1;
}

.voucher-card__tag {
  background: linear-gradient(135deg, #00BBFC 0%, #0090CC 100%) !important;
  border: none !important;
  color: #fff !important;
  font-weight: 600;
  font-size: 11px;
}

.voucher-card__divider {
  width: 1px;
  height: 60px;
  border-left: 1px dashed var(--line-color);
  flex-shrink: 0;
}

.voucher-card__right {
  flex: 1;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.voucher-card__info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.voucher-card__name {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
}

.voucher-card__license {
  font-size: 12px;
  color: var(--text-secondary);
}

.voucher-card__expiry {
  font-size: 12px;
  color: var(--text-secondary);
}

.voucher-card__origin {
  position: absolute;
  top: 0;
  right: 0;
}

.voucher-card__origin :deep(.van-tag) {
  background: linear-gradient(135deg, #FF8C00 0%, #FFAB40 100%) !important;
  border: none !important;
  border-radius: 0 16px 0 12px !important;
  padding: 2px 10px;
  font-weight: 600;
}
</style>
