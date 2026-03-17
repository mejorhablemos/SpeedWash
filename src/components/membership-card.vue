<script setup>
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

const { centsToSGD } = useCurrency();

const userMemberComputed = computed(() => {
  return props.card?.isOnlyMembership
    ? props.card?.canBuyMembership
    : t("components.membershipCard.allUserCanBuy");
});

// 特惠价格
const discountPriceComputed = computed(() => {
  return props.card?.discountStock
    ? t("components.membershipCard.specialPrice", {
        count: props.card?.discountCount,
        price: centsToSGD(props.card?.discountPrice),
      })
    : "";
});

const emit = defineEmits(["click"]);
</script>

<template>
  <van-cell-group
    inset
    :border="true"
    :class="{ 'border-primary b-solid': selected, 'border-background b-solid': !selected }"
    @click="emit('click', card)"
  >
    <div
      class="membership-card w-full h-full rounded-b-[var(--van-cell-group-inset-radius)] transition-all duration-300 hover:shadow-md pos-relative"
      :class="{
        'bg-gradient-to-r from-[#E0F4FD] to-[#B3E5FC]': !card?.isOnlyMembership,
        'bg-gradient-to-r from-[#FFF3E0] to-[#FFE0B2]': card?.isOnlyMembership,
      }"
    >
      <van-cell
        :title="card.cardName"
        title-class="text-3xl font-bold"
        value-class="!text-3xl !text-black"
      >
        <template #value>
          <price-tag :price="card.price" />
        </template>
      </van-cell>
      <van-cell
        :title="t('components.membershipCard.maxWashCount', { count: card.maxWashCount })"
        :value="t('components.membershipCard.validPeriod', { days: card.expiryDays })"
        :label="t(`washMode.${card.mark}`)"
      />
    </div>

    <van-cell
      v-if="card.discountStock"
      :title="discountPriceComputed"
      :value="t('components.membershipCard.specialStock', { count: card.discountStock })"
    />
  </van-cell-group>
</template>

<style scoped>
.membership-card :deep(.van-cell) {
  background: transparent;
}

.membership-card :deep(.van-cell:after) {
  border-color: lightgray;
}

:deep(.van-cell__title) {
  flex: 2;
}
</style>
