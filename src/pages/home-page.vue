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
      <van-swipe class="banner-swipe" :autoplay="3000" indicator-color="#00B4E6" :show-indicators="banners?.length > 1">
        <van-swipe-item v-for="banner in banners" :key="banner.name">
          <van-image :src="getImageUrl(banner.picUrl)" class="w-full banner-img" fit="cover" :alt="banner.name" radius="12" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- Service Cards -->
    <div class="service-cards-section px-4 flex gap-3">
      <!-- VIP / Packs de lavado -->
      <div class="service-card service-card--vip" @click="router.push('/vip')">
        <div class="service-card__icon-wrap service-card__icon-wrap--vip">
          <van-icon name="award-o" size="24" color="#F7941D" />
        </div>
        <h3 class="service-card__title">{{ t("routes.home.vip.title") }}</h3>
        <p class="service-card__desc">{{ t("routes.home.vip.subtitle") }}</p>
        <div class="service-card__action">
          {{ t("routes.home.vip.buy") }}
          <van-icon name="arrow" size="12" />
        </div>
      </div>

      <!-- Cargar Saldo -->
      <div class="service-card service-card--topup" @click="router.push('/wallet/top-up')">
        <div class="service-card__icon-wrap service-card__icon-wrap--topup">
          <van-icon name="balance-o" size="24" color="#00B4E6" />
        </div>
        <h3 class="service-card__title">{{ t("routes.home.topUp.title") }}</h3>
        <p class="service-card__desc">{{ t("routes.home.topUp.subtitle") }}</p>
        <div class="service-card__action service-card__action--topup">
          {{ t("routes.home.topUp.button") }}
          <van-icon name="arrow" size="12" />
        </div>
      </div>
    </div>

    <!-- Stores Section -->
    <div class="px-4 pb-safe-100" style="margin-top: 50px">
      <h2 class="stores-title">{{ t("routes.home.stores.title") }}</h2>

      <!-- Store from API -->
      <van-cell-group v-if="shops?.length" class="stores-list">
        <shop-list-item
          v-for="shop in shops"
          :key="shop.storeId"
          :shop="{ ...shop, status: shop.opening ? 'open' : 'closed' }"
          @view="viewShop"
        />
      </van-cell-group>

      <!-- Fallback: SpeedWash Funes -->
      <div v-else class="store-card">
        <div class="store-card__left">
          <div class="store-card__top">
            <h3 class="store-card__name">SpeedWash Funes</h3>
            <div class="store-card__status">Abierto</div>
          </div>
          <div class="store-card__address">
            <van-icon name="location-o" size="14" color="#6B7D8E" />
            <span>Médicos de Funes 1682, Barrio Calmo</span>
          </div>
          <div class="store-card__address">
            <van-icon name="map-marked" size="14" color="#6B7D8E" />
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
      <van-icon name="info-o" size="18" color="#F7941D" />
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
  background: linear-gradient(160deg, #1A2B3C 0%, #2D3436 100%);
  z-index: 0;
}

.hero-bg::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 24px;
  background: var(--background-color);
  border-radius: 24px 24px 0 0;
}

.hero-bg::before {
  content: '';
  position: absolute;
  top: -30px;
  right: -20px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 180, 230, 0.12) 0%, transparent 70%);
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
  background: linear-gradient(135deg, #F7941D 0%, #FFAD4D 100%);
  border-radius: 16px;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(247, 148, 29, 0.35);
  transition: transform 0.2s, box-shadow 0.2s;
}

.scan-cta:active {
  transform: scale(0.98);
  box-shadow: 0 4px 12px rgba(247, 148, 29, 0.25);
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
}

.banner-img {
  height: 140px;
}

/* Service Cards Section */
.service-cards-section {
  margin-top: 30px !important;
}

/* Service Cards */
.service-card {
  flex: 1;
  background: #fff;
  border-radius: 16px;
  padding: 18px 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: transform 0.2s, box-shadow 0.2s;
}

.service-card:active {
  transform: scale(0.97);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);
}

.service-card__icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-card__icon-wrap--vip {
  background: linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%);
}

.service-card__icon-wrap--topup {
  background: linear-gradient(135deg, #E0F4FD 0%, #B3E5FC 100%);
}

.service-card__title {
  font-size: 15px;
  font-weight: 700;
  color: #1A2B3C;
  margin: 4px 0 0;
}

.service-card__desc {
  font-size: 11px;
  color: #6B7D8E;
  line-height: 1.4;
  margin: 0;
  min-height: 30px;
}

.service-card__action {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: #F7941D;
  margin-top: 4px;
}

.service-card__action--topup {
  color: #00B4E6;
}

/* Stores Section */
.stores-title {
  font-size: 17px;
  font-weight: 700;
  color: #1A2B3C;
  margin: 0 0 12px;
}

.stores-list {
  border-radius: 12px;
  overflow: hidden;
}

/* Store Card */
.store-card {
  background: #fff;
  border-radius: 14px;
  padding: 16px 18px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.store-card__top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.store-card__name {
  font-size: 16px;
  font-weight: 700;
  color: #1A2B3C;
  margin: 0;
}

.store-card__status {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 20px;
  background: rgba(46, 204, 113, 0.12);
  color: #2ecc71;
}

.store-card__address {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #6B7D8E;
  margin-bottom: 3px;
}

.store-card__link {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 600;
  color: #00B4E6;
  text-decoration: none;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #F0F4F8;
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
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(247, 148, 29, 0.15);
  z-index: 50;
}

.order-notification__text {
  flex: 1;
  font-size: 13px;
  font-weight: 500;
  color: #1A2B3C;
}

.order-notification__btn {
  flex-shrink: 0;
}
</style>
