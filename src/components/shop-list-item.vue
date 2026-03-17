<script setup>
import { compile } from "vue";

const { t } = useI18n();
const props = defineProps({
  shop: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["view"]);

// 获取商铺图片
const shopImage = computed(() => {
  return (
    props.shop.image ||
    new URL("/src/assets/icon_store.png", import.meta.url).href
  );
});

const lazyLoad = computed(() => !!props.shop.image);

// 获取状态文本
const statusText = computed(() => 
  t(`components.shopListItem.status.${props.shop.status}`)
);

const handleView = () => {
  emit("view", props.shop.storeId);
};
</script>

<template>
  <van-cell hover class="shop-list-item">
    <template #title>
      <div class="flex items-start gap-4 h-155">
        <!-- 商铺图片 -->
        <van-image
          :src="shopImage"
          class="w-232 rounded bg-gray-100"
          :lazy-load="lazyLoad"
          loading="skeleton"
          :alt="shop.name"
          error-icon="photo-fail"
        />

        <!-- 商铺信息 -->
        <div class="flex-1 flex flex-col justify-between h-full">
          <!-- 商铺名称 -->
          <div class="font-bold truncate mt-10">{{ shop.storeName }}</div>

          <!-- 商铺地址 -->
          <div class="text-gray-500 text-sm line-clamp-1">
            {{ shop.address }}
          </div>

          <!-- 营业状态 -->
          <div
            :class="[
              'px-2 py-1 rounded text-sm inline-block w-fit',
              props.shop.status === 'open'
                ? 'bg-green-100/80 text-green-600'
                : 'bg-red-100/80 text-red-600',
            ]"
          >
            {{ statusText }}
          </div>
        </div>
      </div>
    </template>

    <!-- 查看按钮 -->
    <template #right-icon>
      <div class="flex flex-col justify-end">
        <van-button 
          class="!pl-37 !pr-37" 
          type="primary" 
          round 
          size="small" 
          block 
          @click="handleView"
        >
          {{ t('components.shopListItem.view') }}
        </van-button>
      </div>
    </template>
  </van-cell>
</template>

<style scoped>
.test {
  height: calc(155.85 * var(--vw));
}

.shop-list-item {
  --van-cell-vertical-padding: 20px;
}

/* :deep(.van-button--small) {
  padding: 0 20px;
} */

</style>
