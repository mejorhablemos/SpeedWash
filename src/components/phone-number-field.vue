<script setup>
import { COUNTRIES, getCountryByCode } from "@/constants/countries";

const { t } = useI18n();

const model = defineModel();
const areaCode = defineModel("areaCode", {
  type: String,
  default: "54",
});

const props = defineProps({
  readonly: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: "",
  },
  rules: {
    type: Array,
    required: true,
  },
});

// País actual (derivado del areaCode). AR por default.
const currentCountry = computed(() => getCountryByCode(areaCode.value));

// Opciones del picker, etiquetadas con la traducción del país.
const areaCodeColumns = computed(() =>
  COUNTRIES.map((c) => ({
    text: t(`components.phoneNumberField.country.${c.i18nKey}`),
    iso: c.iso,
    value: c.code,
  }))
);

const showAreaPicker = ref(false);

const onAreaCodeConfirm = ({ selectedOptions }) => {
  const newCode = selectedOptions[0].value;
  areaCode.value = newCode;
  showAreaPicker.value = false;

  // Si el número ya cargado excede el nuevo maxLength, lo truncamos.
  const next = getCountryByCode(newCode);
  if (model.value && model.value.length > next.maxLength) {
    model.value = model.value.slice(0, next.maxLength);
  }
};

const onAreaCodeClick = () => {
  if (props.readonly) {
    return;
  }
  showAreaPicker.value = true;
};

// Sanitiza input: solo dígitos, trunca a maxLength del país.
// Lo hacemos en el modelo (no en el DOM) para que el v-model siempre
// refleje el valor visible.
const onInput = (value) => {
  const digits = String(value || "").replace(/\D/g, "");
  const limited = digits.slice(0, currentCountry.value.maxLength);
  model.value = limited;
};
</script>

<template>
  <van-field
    :model-value="model"
    @update:model-value="onInput"
    type="tel"
    inputmode="numeric"
    :maxlength="currentCountry.maxLength"
    :placeholder="t('components.phoneNumberField.placeholder')"
    :center="false"
    :readonly="readonly"
    :rules="rules"
    :name="name"
  >
    <template #label>
      <van-space
        class="text-primary cursor-pointer"
        align="center"
        :size="2"
        @click="onAreaCodeClick"
      >
        <span class="font-display text-22 font-bold tracking-wide">
          {{ currentCountry.iso }}
        </span>
        <van-icon name="arrow-down" v-if="!readonly" />
        <span> +{{ areaCode }} </span>
      </van-space>
    </template>
  </van-field>

  <!-- 区号选择器 -->
  <van-popup v-model:show="showAreaPicker" position="bottom" round>
    <van-picker
      :columns="areaCodeColumns"
      @confirm="onAreaCodeConfirm"
      @cancel="showAreaPicker = false"
      :title="t('components.phoneNumberField.selectAreaCode')"
      show-toolbar
    >
      <template #option="option">
        <van-space align="center" :size="10">
          <span class="font-display text-22 font-bold tracking-wide text-primary">
            {{ option.iso }}
          </span>
          <span>{{ option.text }}</span>
          <span class="text-text-secondary">+{{ option.value }}</span>
        </van-space>
      </template>
    </van-picker>
  </van-popup>
</template>

<style scoped>
:deep(.van-field__label) {
  width: auto;
}
</style>
