<script setup>
const {t} = useI18n();

const show = defineModel("show");
const licenseNo = ref("");

const emit = defineEmits(["success"]);

const bind = () => {
  emit("success", unref(licenseNo).toUpperCase().replace(/\s+/g, ''));
  show.value = false;
}

const reset = () => {
  licenseNo.value = "";
  bind();
}

</script>
<template>
  <van-popup
      v-model:show="show"
      round
      position="bottom"
      :style="{ height: '50%' }"
  >
    <div class="bg-background flex flex-col h-full">
      <van-form class="my-24" autocomplete="off">
        <van-cell-group inset>
          <van-field name="licenseNo" v-model="licenseNo" :placeholder="t('routes.voucher.licensePlate.placeholder')"/>
        </van-cell-group>

        <div class="flex my-12 justify-center items-between gap-6xl">
          <van-button round type="success" class="w-72px" @click="reset">
            {{ t("common.reset") }}
          </van-button>

          <van-button round type="primary" class="w-72px" @click="bind">
            {{ t("common.confirm") }}
          </van-button>
        </div>
      </van-form>
    </div>
  </van-popup>
</template>
