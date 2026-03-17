<script setup>
import { inviteRewardApi } from '@/api'


const { data, error, isFetching, execute } = inviteRewardApi.inviteLogList()
  const onRefresh = () => {
    execute()
  }

  function progress(item) {
    return item.inviteStatus === 1 ? '已领取未使用' : '已领取已使用'
  }

</script>

<template>
  <van-pull-refresh class="h-screen" :model-value="isFetching" @refresh="onRefresh">

    <div class="flex justify-between px-16px py-4 lh-snug text-26 font-bold">
      <span>用户</span>
      <span>用户进度</span>
    </div>
    <div class="flex flex-col gap-4" v-if="data?.length > 0">
      <van-cell v-for="(item, index) in data" :key="index" :title="item.newUserPhoneNum" :value="progress(item)" :value-class="item.inviteStatus === 2 ? 'text-primary' : 'text-gray-500'" />
    </div>
    <van-empty v-else class="mt-16px" description="暂无数据" />
  </van-pull-refresh>
</template>

<style scoped>

</style>