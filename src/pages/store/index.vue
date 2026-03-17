<script setup>
import { getImageUrl } from "@/utils";
import IconCall from "@/assets/store/icon_call.png";
import IconNav from "@/assets/store/icon_nav.png";
import IconVipBg from "@/assets/icon_vip__bg.png";
import IconTopUpBg from "@/assets/icon_top-up__bg.png";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const { coords, locatedAt, error, resume, pause } = useGeolocation();

// 获取店铺详情
const { data } = storeApi.detail(route.params.id);

const { distanceFormatted } = useLocation(computed(() => ({
  lat1: coords.value?.latitude,
  lon1: coords.value?.longitude,
  lat2: data.value?.lat,
  lon2: data.value?.lng,
})));

// 店铺图片
const storePicture = computed(() => {
  return getImageUrl(data.value?.mainPic);
});

// 处理导航
const handleNavigate = () => {
  // showToast("导航功能开发中");
  window.open(
    `https://www.google.com/maps/dir/?api=1&destination=${data.value.lat},${data.value.lng}`
  );
};

// 处理电话
const handleCall = () => {
  window.open(`tel:${data.value.telPhone}`);
};

// 处理扫码洗车
const handleScan = () => {
  router.push('/scan');
};

// 处理充值
const handleTopUp = () => {
  router.push("/wallet");
};

// 处理购买VIP卡
const handleBuyVip = () => {
  router.push("/vip");
};
</script>

<template>
  <div class="py-4 flex flex-col gap-lg bottom-tabbar-40 pb-100px">
    <!-- 店铺封面图 -->
    <van-cell-group inset :border="false" class="aspect-[692/402]">
      <van-image
        :src="storePicture"
        class="w-full h-full"
        fit="cover"
        :alt="t('routes.store.detail.coverImage')"
      >
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
    </van-cell-group>

    <!-- 店铺信息 -->
    <van-cell-group inset :border="false">
      <van-cell>
        <template #title>
          <div class="flex items-center gap-2">
            <span class="text-3xl font-medium">{{ data?.storeName }}</span>
            <van-tag type="success" round>{{
              t(`routes.store.status.${Number(data?.opening)}`)
            }}</van-tag>
          </div>
        </template>
      </van-cell>

      <van-cell :title="data?.address" :label="distanceFormatted" center>
        <template #value>
          <van-grid :border="false" class="justify-end">
            <van-grid-item
              :icon="IconNav"
              :text="t('routes.store.detail.navigation')"
              @click="handleNavigate"
            />
            <van-grid-item 
              :icon="IconCall" 
              :text="t('routes.store.detail.call')"
              @click="handleCall" 
            />
          </van-grid>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 功能按钮 -->
    <van-cell-group inset :border="false" class="!bg-transparent">
      <div class="w-full grid grid-cols-2 gap-3 h-120">
        <div class="pos-relative clickable flex-1" @click="handleTopUp">
          <van-image
            class="pos-absolute inset-0"
            :src="IconTopUpBg"
          />

          <div class="w-full h-full pos-absolute top-0 left-0 flex items-center justify-between px-6">
            <span class="fw-medium text-30">
              {{ t("routes.store.detail.topUp") }}
            </span>
          </div>
        </div>
        <div class="pos-relative clickable flex-1" @click="handleBuyVip">
          <van-image
            class="pos-absolute inset-0"
            :src="IconVipBg"
          />

          <div class="w-full h-full pos-absolute top-0 left-0 flex items-center justify-between px-6">
            <span class="fw-medium text-30">
              {{ t("routes.store.detail.buyVip") }}
            </span>
          </div>
        </div>
      </div>
    </van-cell-group>

    <!-- 洗车机列表 -->
    <template v-for="machine in data?.iotList" :key="machine.iotId">
      <machine-item :machine="machine" />
    </template>

    <!-- 店铺介绍 -->
    <van-cell-group v-if="data?.description" inset :border="false">
      <van-cell :title="t('routes.store.detail.introduction')" />
      <van-cell>
        <div class="text-2xl font-medium w-full text-left">
          {{ data?.description }}
        </div>
      </van-cell>
    </van-cell-group>

    <van-action-bar v-if="false">
      <van-action-bar-button
        type="primary"
        @click="handleScan"
      >
        {{ t("routes.store.detail.scanToWash") }}
      </van-action-bar-button>
    </van-action-bar>
  </div>
</template>

<style scoped>
:deep(.van-nav-bar) {
  background-color: transparent;
}

:deep(.van-nav-bar__content) {
  background-color: transparent;
}

:deep(.van-button--primary) {
  background-color: #ff6b6b;
  border-color: #ff6b6b;
}
</style>
