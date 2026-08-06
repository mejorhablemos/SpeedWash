<script setup>
import { REFERENCE_WASH_PRICE_CENTS } from "@/constants";

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});

const { t } = useI18n();

const emit = defineEmits(["click"]);

// Precio del pack formateado (centavos -> pesos AR)
const priceFormatted = computed(() => {
  if (!props.card?.price) return "0";
  return Math.round(props.card.price / 100).toLocaleString("es-AR");
});

// Precio efectivo por lavado (price / cantidad de lavados)
const perWashPrice = computed(() => {
  const count = props.card?.maxWashCount;
  if (!count || !props.card?.price) return null;
  return Math.round(props.card.price / count / 100).toLocaleString("es-AR");
});

// Precio de lista de referencia según el modo de lavado del pack
const referenceCents = computed(
  () => REFERENCE_WASH_PRICE_CENTS[props.card?.mark]
);

// Ahorro % respecto del precio de lista
const savingsPercent = computed(() => {
  const count = props.card?.maxWashCount;
  if (!count || !referenceCents.value || !props.card?.price) return null;
  const perWash = props.card.price / count;
  const pct = Math.round((1 - perWash / referenceCents.value) * 100);
  return pct > 0 ? pct : null;
});

// Banda de precio especial (primeras N tarjetas)
const specialPrice = computed(() => {
  if (!props.card?.discountStock) return null;
  return Math.round(props.card.discountPrice / 100).toLocaleString("es-AR");
});

// 有效期信息：validRule=1 天数 / validRule=2 时间段 / validRule=3 星期
const expiryInfo = computed(() => {
  const rule = props.card?.validRule;
  if (rule === 2) {
    return {
      label: t("components.membershipCard.validTime"),
      value: `${props.card.validStartTime} - ${props.card.validEndTime}`,
    };
  }
  if (rule === 3) {
    const weekDayMap = {
      1: t("components.couponCard.weekdays.mon"),
      2: t("components.couponCard.weekdays.tue"),
      3: t("components.couponCard.weekdays.wed"),
      4: t("components.couponCard.weekdays.thu"),
      5: t("components.couponCard.weekdays.fri"),
      6: t("components.couponCard.weekdays.sat"),
      7: t("components.couponCard.weekdays.sun"),
    };
    const days = props.card.validWeekDays || [];
    return {
      label: t("components.membershipCard.validWeekdays"),
      value: days.map((d) => weekDayMap[d]).filter(Boolean).join(", "),
    };
  }
  // 默认：天数 (validRule === 1 或未指定)
  return {
    label: t("components.membershipCard.validDays"),
    value: props.card.expiryDays,
  };
});

// 有效期是否为长文本（非天数）— 长文本时跨整行展示
const expiryIsWide = computed(() => props.card?.validRule === 2 || props.card?.validRule === 3);
</script>

<template>
  <div class="vip-card" :class="{
    'vip-card--selected': selected,
    'vip-card--special': card?.isOnlyMembership,
  }" @click="emit('click', card)">
    <div class="vip-card__glow"></div>

    <!-- Encabezado: nombre + precio -->
    <div class="vip-card__header">
      <div class="min-w-0">
        <div class="vip-card__name">{{ card.cardName }}</div>
        <div class="vip-card__mode">
          <van-icon name="diamond-o" class="vip-card__mode-icon" />
          {{ t(`washMode.${card.mark}`) }}
        </div>
      </div>
      <div class="vip-card__price">
        <span class="vip-card__price-cur">$</span>{{ priceFormatted }}
      </div>
    </div>

    <!-- Estadísticas -->
    <div class="vip-card__stats" :class="{ 'vip-card__stats--wide-expiry': expiryIsWide }">
      <div class="vip-stat vip-stat--wash">
        <div class="vip-stat__value">{{ card.maxWashCount }}</div>
        <div class="vip-stat__label">{{ t("components.membershipCard.washes") }}</div>
      </div>
      <div class="vip-stat vip-stat--expiry" :class="{ 'vip-stat--wide': expiryIsWide }">
        <div class="vip-stat__value" :class="{ 'vip-stat__value--compact': expiryIsWide }">{{ expiryInfo.value }}</div>
        <div class="vip-stat__label">{{ expiryInfo.label }}</div>
      </div>
      <div class="vip-stat vip-stat--price">
        <div class="vip-stat__value vip-stat__value--accent">
          <span class="vip-stat__cur">$</span>{{ perWashPrice }}
        </div>
        <div class="vip-stat__label">{{ t("components.membershipCard.perWash") }}</div>
      </div>
    </div>

    <!-- Ahorro -->
    <div class="vip-card__save" v-if="savingsPercent">
      <van-icon name="bag-o" />
      <span>Ahorrás <strong>{{ savingsPercent }}%</strong> en cada lavado</span>
    </div>

    <!-- Precio especial promocional -->
    <div class="vip-card__special-band" v-if="card.discountStock">
      <span>{{ t("components.membershipCard.specialPrice", { count: card.discountCount, price: specialPrice }) }}</span>
      <span class="vip-card__special-stock">{{ t("components.membershipCard.specialStock", {
        count: card.discountStock
      }) }}</span>
    </div>
  </div>
</template>

<style scoped>
.vip-card {
  position: relative;
  overflow: hidden;
  margin: 0 16px;
  padding: 18px;
  border-radius: 20px;
  background: var(--surface-color);
  border: 1px solid var(--line-color);
  box-shadow: 0 12px 30px -18px rgba(0, 0, 0, 0.85);
  cursor: pointer;
  transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
}

.vip-card:active {
  transform: scale(0.99);
}

.vip-card__glow {
  position: absolute;
  top: -60px;
  right: -50px;
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 187, 252, 0.18) 0%, transparent 70%);
  pointer-events: none;
}

.vip-card--special .vip-card__glow {
  background: radial-gradient(circle, rgba(255, 148, 22, 0.18) 0%, transparent 70%);
}

.vip-card--selected {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 1px var(--primary-color), 0 16px 36px -18px rgba(0, 187, 252, 0.55);
}

.vip-card--special.vip-card--selected {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 1px var(--accent-color), 0 16px 36px -18px rgba(255, 148, 22, 0.55);
}

/* Header */
.vip-card__header {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.vip-card__name {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text-primary);
  line-height: 1.15;
}

.vip-card__mode {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 7px;
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 500;
  color: var(--primary-light);
  background: rgba(0, 187, 252, 0.1);
  border: 1px solid rgba(0, 187, 252, 0.25);
}

.vip-card--special .vip-card__mode {
  color: var(--accent-light);
  background: rgba(255, 148, 22, 0.1);
  border-color: rgba(255, 148, 22, 0.28);
}

.vip-card__mode-icon {
  font-size: 12px;
}

.vip-card__price {
  flex-shrink: 0;
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  line-height: 1;
}

.vip-card__price-cur {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-right: 1px;
}

/* Stats */
.vip-card__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: "wash expiry price";
  gap: 8px;
  margin-top: 18px;
}

/* 有效期为长文本（时间段/星期）时：洗车次数 + 单次价格并排，有效期跨整行 */
.vip-card__stats--wide-expiry {
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "wash price"
    "expiry expiry";
}

.vip-stat--wash {
  grid-area: wash;
}

.vip-stat--expiry {
  grid-area: expiry;
}

.vip-stat--price {
  grid-area: price;
}

.vip-stat {
  text-align: center;
  padding: 12px 6px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--line-color);
}

.vip-stat--wide {
  text-align: left;
  padding: 10px 14px;
}

.vip-stat__value {
  font-family: var(--font-display);
  font-size: 19px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
}

/* 长文本有效期：缩小字号、允许换行 */
.vip-stat__value--compact {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
  word-break: break-word;
}

.vip-stat__value--accent {
  color: var(--primary-light);
}

.vip-stat__cur {
  font-size: 13px;
  font-weight: 600;
}

.vip-stat__label {
  font-size: 10.5px;
  color: var(--text-secondary);
  margin-top: 6px;
  line-height: 1.2;
}

/* Ahorro */
.vip-card__save {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  padding: 11px 14px;
  border-radius: 14px;
  font-size: 13px;
  color: #fff;
  background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-light) 100%);
  box-shadow: 0 8px 20px -10px rgba(255, 148, 22, 0.7);
}

.vip-card__save .van-icon {
  font-size: 16px;
}

.vip-card__save strong {
  font-weight: 800;
}

/* Precio especial */
.vip-card__special-band {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed var(--line-color);
  font-size: 12px;
  color: var(--text-secondary);
}

.vip-card__special-stock {
  flex-shrink: 0;
  color: var(--accent-light);
  font-weight: 600;
}
</style>
