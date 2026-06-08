<script setup>
import { indexApi } from "@/api";
import { getImageUrl } from "@/utils";
import logoUrl from "@/assets/speedwash-logo.png";

const { t } = useI18n();
const router = useRouter();

// Banner
const { data: banners } = indexApi.banner();

// Shops
const { data: shops } = indexApi.storeList();

// Ongoing order check
const { data: orderData } = indexApi.checkWashingOrder();
const hasOngoingOrder = computed(() => !!unref(orderData)?.orderId);
const ongoingOrderId = computed(() => unref(orderData)?.orderId);

const viewOrder = () => {
  if (ongoingOrderId.value) {
    router.push(`/order/${ongoingOrderId.value}`);
  }
};

function viewShop(id) {
  router.push({ name: "StoreDetail", params: { id } });
}
</script>

<template>
  <div class="home-container">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <img :src="logoUrl" alt="SpeedWash" class="hero-logo" />
        <p class="hero-subtitle"><strong>Lavado automático premium.</strong></p>
      </div>
    </div>

    <!-- Scan Button - CTA Principal -->
    <div class="px-4 relative z-10" style="margin-top: 10px">
      <div class="scan-cta" @click="router.push('/scan')">
        <div class="scan-cta__icon">
          <van-icon name="scan" size="32" color="#fff" />
        </div>
        <div class="scan-cta__text">
          <span class="scan-cta__title">{{ t("routes.home.scanButton.title") }}</span>
          <span class="scan-cta__subtitle">{{ t("routes.home.scanButton.subtitle") }}</span>
        </div>
        <van-icon name="arrow" color="rgba(255,255,255,0.7)" size="20" />
      </div>
    </div>

    <!-- Banner Carousel -->
    <div class="px-4 mt-4" v-if="banners?.length">
      <van-swipe class="banner-swipe" :autoplay="3000" indicator-color="#00BBFC" :show-indicators="banners?.length > 1">
        <van-swipe-item v-for="banner in banners" :key="banner.name">
          <van-image :src="getImageUrl(banner.picUrl)" class="w-full banner-img" fit="cover" :alt="banner.name" radius="12" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- Packs de lavado -->
    <div class="service-cards-section px-4">
      <div class="pack-card" @click="router.push('/vip')">
        <div class="pack-card__glow"></div>
        <div class="pack-card__head">
          <div class="pack-card__icon">
            <van-icon name="award-o" size="24" color="#fff" />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="pack-card__title">{{ t("routes.home.vip.title") }}</h3>
            <p class="pack-card__desc">{{ t("routes.home.vip.subtitle") }}</p>
          </div>
        </div>

        <div class="pack-card__feature">
          <van-icon name="scan" size="16" />
          <span>{{ t("routes.home.vip.plate") }}</span>
        </div>

        <div class="pack-card__action">
          {{ t("routes.home.vip.buy") }}
          <van-icon name="arrow" size="13" />
        </div>
      </div>
    </div>

    <!-- Stores Section -->
    <div class="px-4 pb-safe-100" style="margin-top: 50px">
      <h2 class="stores-title">{{ t("routes.home.stores.title") }}</h2>

      <!-- Store from API -->
      <div v-if="shops?.length" class="flex flex-col gap-3">
        <shop-list-item
          v-for="shop in shops"
          :key="shop.storeId"
          :shop="{ ...shop, status: shop.opening ? 'open' : 'closed' }"
          @view="viewShop"
        />
      </div>

      <!-- Fallback: SpeedWash Funes -->
      <div v-else class="store-card">
        <div class="store-card__left">
          <div class="store-card__top">
            <h3 class="store-card__name">SpeedWash Funes</h3>
            <div class="store-card__status">Abierto</div>
          </div>
          <div class="store-card__address">
            <van-icon name="location-o" size="14" color="#ACACB6" />
            <span>Médicos de Funes 1682, Barrio Calmo</span>
          </div>
          <div class="store-card__address">
            <van-icon name="map-marked" size="14" color="#ACACB6" />
            <span>Funes, Santa Fe</span>
          </div>
        </div>
        <a href="https://maps.app.goo.gl/3eQ92L7UJkHcgfNJ8" target="_blank" rel="noopener" class="store-card__link" @click.stop>
          Cómo llegar
          <van-icon name="arrow" size="14" />
        </a>
      </div>
    </div>

    <!-- Ongoing Order Notification -->
    <div
      v-if="hasOngoingOrder"
      class="order-notification"
    >
      <div class="order-notification__pulse"></div>
      <van-icon name="info-o" size="18" color="#FF8C00" />
      <span class="order-notification__text">{{ t("routes.home.orderNotification.message") }}</span>
      <van-button type="primary" round size="small" class="order-notification__btn" @click="viewOrder">
        {{ t("routes.home.orderNotification.view") }}
      </van-button>
    </div>
  </div>
</template>

<style scoped>
/* Hero Section */
.hero-section {
  position: relative;
  padding: 36px 24px 42px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(120% 90% at 50% -10%, rgba(0, 187, 252, 0.18) 0%, transparent 55%),
    linear-gradient(160deg, #0B0B0D 0%, #000000 100%);
  z-index: 0;
}

.hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(0, 187, 252, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 187, 252, 0.05) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(120% 80% at 50% 0%, #000 30%, transparent 75%);
  -webkit-mask-image: radial-gradient(120% 80% at 50% 0%, #000 30%, transparent 75%);
}

.hero-bg::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 187, 252, 0.7) 50%, transparent);
}

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.hero-logo {
  width: 85%;
  max-width: 340px;
  height: auto;
  object-fit: contain;
  margin: 0 0 6px;
}

.hero-subtitle {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  line-height: 1.5;
  letter-spacing: 0.5px;
}

/* Scan CTA Button */
.scan-cta {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  background: linear-gradient(135deg, #FF8C00 0%, #FFAB40 100%);
  border-radius: 16px;
  cursor: pointer;
  box-shadow: 0 8px 28px rgba(255, 140, 0, 0.4);
  transition: transform 0.2s, box-shadow 0.2s;
}

.scan-cta:active {
  transform: scale(0.98);
  box-shadow: 0 4px 12px rgba(255, 140, 0, 0.28);
}

.scan-cta__icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.scan-cta__text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.scan-cta__title {
  font-size: 17px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.3px;
}

.scan-cta__subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.85);
}

/* Banner */
.banner-swipe {
  border-radius: 12px;
  overflow: hidden;
  height: 140px;
}

.banner-img {
  height: 140px !important;
}

.banner-img :deep(.van-image__img) {
  height: 140px !important;
  object-fit: cover;
}

/* Packs de lavado */
.service-cards-section {
  margin-top: 30px !important;
}

.pack-card {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(130% 120% at 100% 0%, rgba(255, 140, 0, 0.14) 0%, transparent 55%),
    var(--surface-color);
  border: 1px solid rgba(255, 140, 0, 0.4);
  border-radius: 18px;
  padding: 16px 16px 14px;
  cursor: pointer;
  box-shadow: 0 12px 30px -18px rgba(255, 140, 0, 0.5);
  transition: transform 0.2s;
}

.pack-card:active {
  transform: scale(0.98);
}

.pack-card__glow {
  position: absolute;
  top: -50px;
  right: -40px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 140, 0, 0.2) 0%, transparent 70%);
  pointer-events: none;
}

.pack-card__head {
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;
}

.pack-card__icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #FF8C00 0%, #FFAB40 100%);
  box-shadow: 0 8px 18px -6px rgba(255, 140, 0, 0.7);
}

.pack-card__title {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text-primary);
  margin: 0;
}

.pack-card__desc {
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.4;
  margin: 2px 0 0;
}

.pack-card__feature {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(0, 187, 252, 0.08);
  border: 1px solid rgba(0, 187, 252, 0.22);
  font-size: 12.5px;
  font-weight: 500;
  color: var(--primary-light);
  line-height: 1.35;
}

.pack-card__feature .van-icon {
  flex-shrink: 0;
}

.pack-card__action {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  font-size: 13px;
  font-weight: 700;
  color: #FF8C00;
  margin-top: 12px;
}

/* Stores Section */
.stores-title {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text-primary);
  margin: 0 0 12px;
}

.stores-list {
  border-radius: 12px;
  overflow: hidden;
}

/* Store Card */
.store-card {
  background: var(--surface-color);
  border-radius: 14px;
  padding: 16px 18px;
  box-shadow: 0 8px 24px -16px rgba(0, 0, 0, 0.8);
  border: 1px solid var(--line-color);
}

.store-card__top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.store-card__name {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.store-card__status {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 20px;
  background: rgba(46, 204, 113, 0.14);
  color: #34d399;
}

.store-card__address {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 3px;
}

.store-card__link {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 600;
  color: #00BBFC;
  text-decoration: none;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--line-color);
}

/* Order Notification */
.order-notification {
  position: fixed;
  bottom: calc(var(--van-tabbar-height) + env(safe-area-inset-bottom) + 12px);
  left: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: var(--surface-2);
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 140, 0, 0.35);
  z-index: 50;
}

.order-notification__text {
  flex: 1;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
}

.order-notification__btn {
  flex-shrink: 0;
}
</style>
