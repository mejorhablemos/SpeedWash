<script setup>
const router = useRouter();
const userStore = useUserStore();
const { t } = useI18n();

// 获取 redirectUrl
const { query } = useRoute();
const redirectUrl = computed(() => query.redirect || "/");

const {
  areaCode,
  formData,
  phoneNumber,
  formRef,
  phoneRules,
  passwordRules,
} = useAuth();

// 设置默认值
// formData.value.phone = "90093215";
// formData.value.password = "222222";

// 登录提交
const onSubmit = async () => {
  try {
    const { data, error } = await loginApi.pwdLogin({
      phoneNum: phoneNumber.value,
      pwd: formData.value.password,
    });

    if (unref(error)) {
      showToast(unref(error));
      return;
    }

    // 保存登录状态
    const { token, phoneNum, nickName } = unref(data);
    userStore.setUserInfo({
      token,
      phoneNum,
      nickName,
    });

    showToast(t("routes.login.success"));
    router.replace(redirectUrl.value);
  } catch (err) {
    console.error("登录失败:", err);
    showToast(t("routes.login.failed"));
  }
};

// 访客登录
const guestLogin = () => {
  userStore.guestLogin();
  showToast(t("routes.login.guestLoginSuccess"));
  router.replace(redirectUrl.value);
};
</script>

<template>
  <!-- 水波纹背景 -->
  <wave />

  <van-space direction="vertical" fill class="pt-20% z-10 relative">
    <div class="flex justify-center text-4xl text-white w-full h-100px font-bold">
      SpeedWash
    </div>

    <van-form @submit="onSubmit" ref="formRef">
      <!-- 表单区域 -->
      <van-cell-group inset>
        <!-- 手机号输入框 -->
        <phone-number-field v-model="formData.phone" name="phone" :rules="phoneRules" v-model:area-code="areaCode" />

        <!-- 密码输入框 -->
        <van-field v-model="formData.password" name="password" type="password"
          :placeholder="t('routes.login.passwordPlaceholder')" :rules="passwordRules" />
      </van-cell-group>

      <!-- 登录按钮 -->
      <van-cell-group inset class="!mt-20px">
        <van-button round block type="primary" class="text-16px bg-primary" native-type="submit">
          {{ t('routes.login.submit') }}
        </van-button>
      </van-cell-group>
    </van-form>

    <!-- 辅助链接 -->
    <div class="flex justify-center items-center gap-4 h-44px text-26 text-[#00B4E6]">
      <router-link to="/register">{{ t('routes.login.register') }}</router-link>
      <div class="w-2 h-28 bg-[#00B4E6]"></div>
      <router-link to="/forgot-password">{{ t('routes.login.forgotPassword') }}</router-link>
    </div>

    <!-- 访客登录 -->
    <div class="grid place-items-center">
      <van-button round type="primary" class="mt-40 bg-primary border-none" @click="guestLogin">
        {{ t('routes.login.guestLogin') }}
      </van-button>
    </div>
  </van-space>
</template>

<style scoped>
:deep(.van-field__label) {
  width: auto;
}
</style>
