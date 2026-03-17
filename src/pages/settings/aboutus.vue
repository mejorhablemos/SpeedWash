<script setup>
import { loginApi } from '@/api'

const { data, error, isFetching } = await loginApi.getSysVal('USER_ABOUT_US')
const content = computed(() => data?.value.val)

</script>

<template>
  <div class="bg-background">
    <!-- 内容区域 -->
    <div class="p-4">
      <van-skeleton title :row="10" :loading="isFetching">
        <!-- 使用 v-html 渲染富文本内容 -->
        <div class="prose max-w-none" v-html="content"></div>
      </van-skeleton>
    </div>
  </div>
</template>

<style scoped>
</style>