<script setup>
const router = useRouter();
const { t } = useI18n();

const userStore = useUserStore();

const { query } = useRoute();
const { inviteCode } = query;

const {
  areaCode,
  phoneNumber,
  formData,
  getVerifyCode,
  smsRequestId,
  isActive,
  agreement,
  formRef,
  phoneRules,
  verifyCodeRules,
  passwordRules,
  confirmPasswordRules,
  countdownButtonText,
} = useAuth(smsApi.regedit);

formData.value.inviteCode = inviteCode;

const { data, error } = loginApi.getSysVal("USER_SERVICE_CONTRACT")

const loading = ref(false); // 提交loading

// 提交表单
const onSubmit = async () => {
  if (loading.value) return;
  loading.value = true;

  try {
    const { data, error } = await loginApi.regedit({
      phoneNum: phoneNumber.value,
      smsCode: formData.value.verifyCode,
      pwd: formData.value.password,
      smsRequestId: smsRequestId.value,
      inviteKey: formData.value.inviteCode,
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

    showToast(t("routes.register.success"));

    if (formData.value.inviteCode) {
      router.replace('/invite/redeem');
    } else {
      router.replace('/');
    }
  } catch (err) {
    console.error("Register error:", err);
    showToast(t("routes.register.failed"));
  } finally {
    loading.value = false;
  }
};

// 显示用户协议
const showAgreement = () => {
  showDialog({
    title: t("routes.register.agreementTitle"),
    allowHtml: true,
    message: data.value.val,
    confirmButtonText: t("routes.register.agreementConfirm"),
  })
  .then(() => {
    agreement.value = true;
  });
};

// 跳转登录页
const goToLogin = () => {
  router.push("/login");
};
</script>
<template>
  <!-- Logo区域 -->
  <div class="py-10 text-center">
    <div
      class="w-150 aspect-ratio-1 mx-auto bg-white rounded-lg flex-center shadow-sm overflow-clip"
    >
      <img
        src="@/assets/logo_trans.png"
        alt="logo"
        class="w-full aspect-ratio-1"
      />
    </div>
  </div>

  <!-- 注册表单 -->
  <van-form @submit="onSubmit" ref="formRef">
    <van-cell-group inset>
      <!-- 手机号 -->
      <phone-number-field
        v-model="formData.phone"
        v-model:area-code="areaCode"
        name="phone"
        :rules="phoneRules"
        class="mb-3"
      />

      <!-- 验证码 -->
      <van-field
        v-model="formData.verifyCode"
        name="verifyCode"
        :placeholder="t('routes.register.codePlaceholder')"
        center
        :rules="verifyCodeRules"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            @click="getVerifyCode"
            :disabled="isActive"
            class="rounded-lg"
          >
            {{ countdownButtonText }}
          </van-button>
        </template>
      </van-field>

      <!-- 密码 -->
      <van-field
        v-model="formData.password"
        name="password"
        type="password"
        :placeholder="t('routes.register.passwordPlaceholder')"
        :rules="passwordRules"
      >
      </van-field>

      <!-- 确认密码 -->
      <van-field
        v-model="formData.confirmPassword"
        name="confirmPassword"
        type="password"
        :placeholder="t('routes.register.confirmPasswordPlaceholder')"
        :rules="confirmPasswordRules"
      >
      </van-field>

      <van-field
        v-model="formData.inviteCode"
        name="inviteKey"
        :placeholder="t('routes.register.inviteKeyPlaceholder')"
      >
      </van-field>
    </van-cell-group>
    <!-- 用户协议 -->
    <van-cell-group inset class="!my-10 !bg-transparent text-xl">
      <van-checkbox
        v-model="agreement"
        shape="round"
        checked-color="var(--primary-color)"
      >
        {{ t("routes.register.agreementPrefix") }}
        <span class="text-primary cursor-pointer" @click.stop="showAgreement">
          {{ t("routes.register.agreementText") }}
        </span>
      </van-checkbox>
    </van-cell-group>

    <!-- 注册按钮 -->
    <div class="mx-4 mt-6">
      <van-button
        round
        block
        type="primary"
        native-type="submit"
        :loading="loading"
        :disabled="!agreement"
        class="h-48px"
      >
        {{ t("routes.register.submit") }}
      </van-button>
    </div>
  </van-form>

  <!-- 登录入口 -->
  <div class="text-center mt-30px text-gray-600 text-xl">
    {{ t("routes.register.hasAccount") }}
    <span class="text-primary cursor-pointer" @click="goToLogin">
      {{ t("routes.register.login") }}
    </span>
  </div>
</template>
