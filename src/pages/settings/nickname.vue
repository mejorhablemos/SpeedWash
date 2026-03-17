<script setup>
import { myPageApi } from "@/api";
import { useI18n } from "vue-i18n";
import { showToast } from 'vant';

const { t } = useI18n();
const router = useRouter();

// 获取用户信息
const { data, error, isFetching } = myPageApi.myInfo();

// 昵称输入
const nickname = ref("");

// 监听用户信息变化,设置初始昵称
watch(data, (info) => {
  if (info?.nickName) {
    nickname.value = info.nickName;
  }
});

// 提交修改
const onSubmit = async () => {
  try {
    await myPageApi.setMyInfo({ 
      nickName: nickname.value 
    });
    
    showToast(t('common.submitSuccess'));
    router.back();
  } catch (err) {
    showToast(t('common.submitFailed'));
  }
};
</script>

<template>
  <!-- 页面状态 -->
  <page-status 
    :is-loading="isFetching" 
    :error="error"
  />

  <!-- 页面内容 -->
  <template v-if="!isLoading && !error">
    <van-cell-group inset class="!mt-16px">
      <van-field 
        v-model="nickname" 
        :label="t('routes.settings.nickname.label')" 
        :placeholder="t('routes.settings.nickname.placeholder')" 
      />
    </van-cell-group>

    <van-action-bar>
      <van-action-bar-button 
        type="primary" 
        @click="onSubmit"
      >
        {{ t('routes.settings.nickname.submit') }}
      </van-action-bar-button>
    </van-action-bar>
  </template>
</template>

<style scoped></style>
