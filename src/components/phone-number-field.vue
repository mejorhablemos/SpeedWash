<script setup>
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

// 区号选项
const areaCodeColumns = computed(() => [
  { text: t("components.phoneNumberField.areaCode.argentina"), value: "54" },
  { text: t("components.phoneNumberField.areaCode.china"), value: "86" },
]);

// 区号选择器显示控制
const showAreaPicker = ref(false);

// 选择区号
const onAreaCodeConfirm = ({ selectedOptions }) => {
  areaCode.value = selectedOptions[0].value;
  showAreaPicker.value = false;
};

const flagIconMap = {
  // 阿根廷
  54: "AR",
  // 中国
  86: "🇨🇳"
};

function FlagIcon({ code }) {
  return h("span", {
    class: "text-24px",
    innerHTML: flagIconMap[`${code}`],
  });
}

const onAreaCodeClick = () => {
  if (props.readonly) {
    return;
  }
  showAreaPicker.value = true;
};
</script>

<template>
  <van-field v-model="model" type="tel" :placeholder="t('components.phoneNumberField.placeholder')" :center="false"
    :readonly="readonly" :rules="rules" :name="name">
    <template #label>
      <van-space class="text-primary cursor-pointer" align="center" :size="2" @click="onAreaCodeClick">
        <flag-icon :code="areaCode" />
        <van-icon name="arrow-down" v-if="!readonly" />
        <span> +{{ areaCode }} </span>
      </van-space>
    </template>
  </van-field>

  <!-- 区号选择器 -->
  <van-popup v-model:show="showAreaPicker" position="bottom" round>
    <van-picker :columns="areaCodeColumns" @confirm="onAreaCodeConfirm" @cancel="showAreaPicker = false"
      :title="t('components.phoneNumberField.selectAreaCode')" show-toolbar>
      <template #option="option">
        <van-space align="center" :size="10">
          <flag-icon :code="option.value" />
          <span>{{ option.text }}</span>
          <span>+{{ option.value }}</span>
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
