<script setup>
import IconInProgress from "@/assets/order/icon_in_progress.png";
import IconPendingPayment from "@/assets/order/icon_pending_payment.png";
import IconCompleted from "@/assets/order/icon_completed.png";

const { t } = useI18n();
const userInfo = ref(null);

// Fetch user info
const { data } = myPageApi.myInfo();
watchEffect(() => {
  if (data.value) userInfo.value = data.value;
});
</script>

<template>
  <div class="mine-page">
    <!-- Header con avatar -->
    <div class="mine-header">
      <div class="mine-header__bg"></div>
      <div class="mine-header__content">
        <div class="mine-avatar">
          <van-icon name="user-o" size="28" color="#00BBFC" />
        </div>
        <div class="mine-user-info">
          <router-link to="/settings/nickname" class="mine-user-name-row">
            <h2 class="mine-user-name">{{ userInfo?.nickName || 'Usuario' }}</h2>
            <van-icon name="edit" size="14" color="rgba(255,255,255,0.5)" />
          </router-link>
          <p class="mine-user-phone">{{ userInfo?.phoneNum || '' }}</p>
        </div>
        <router-link to="/settings" class="mine-settings-btn">
          <van-icon name="setting-o" size="22" color="rgba(255,255,255,0.7)" />
        </router-link>
      </div>
    </div>

    <!-- Saldo -->
    <div class="mine-section" style="margin-top: -20px; position: relative; z-index: 2;">
      <div class="balance-card" @click="$router.push('/wallet')">
        <div class="balance-card__left">
          <span class="balance-card__label">{{ t('routes.mine.wallet.balance') }}</span>
          <div class="balance-card__amount">
            <span class="balance-card__currency">$</span>
            <price-tag :price="userInfo?.balance" :show-currency="false" />
          </div>
        </div>
        <div class="balance-card__action">
          {{ t('routes.mine.wallet.viewAll') }}
          <van-icon name="arrow" size="14" />
        </div>
      </div>
    </div>

    <!-- Pedidos -->
    <div class="mine-section">
      <div class="section-header">
        <h3 class="section-title">{{ t('routes.mine.orders.title') }}</h3>
        <router-link to="/orders" class="section-link">
          {{ t('routes.mine.orders.viewAll') }}
          <van-icon name="arrow" size="12" />
        </router-link>
      </div>
      <div class="orders-grid">
        <router-link to="/orders?status=2" class="order-item">
          <div class="order-item__icon order-item__icon--progress">
            <van-icon name="clock-o" size="22" color="#00BBFC" />
          </div>
          <span class="order-item__text">{{ t('routes.mine.orders.status.inProgress') }}</span>
        </router-link>
        <router-link to="/orders?status=3" class="order-item">
          <div class="order-item__icon order-item__icon--pending">
            <van-icon name="balance-o" size="22" color="#FF8C00" />
          </div>
          <span class="order-item__text">{{ t('routes.mine.orders.status.pending') }}</span>
        </router-link>
        <router-link to="/orders?status=4" class="order-item">
          <div class="order-item__icon order-item__icon--completed">
            <van-icon name="passed" size="22" color="#2ecc71" />
          </div>
          <span class="order-item__text">{{ t('routes.mine.orders.status.completed') }}</span>
        </router-link>
      </div>
    </div>

    <!-- Servicios -->
    <div class="mine-section">
      <div class="section-header">
        <h3 class="section-title">{{ t('routes.mine.services.title') }}</h3>
      </div>
      <router-link to="/vouchers" class="service-item">
        <div class="service-item__icon">
          <van-icon name="vip-card-o" size="22" color="#FF8C00" />
        </div>
        <span class="service-item__text">{{ t('routes.mine.services.vipCard') }}</span>
        <van-icon name="arrow" size="14" color="#C0C4C8" />
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.mine-page {
  min-height: 100vh;
  background: var(--background-color);
}

/* Header */
.mine-header {
  position: relative;
  padding: 24px 20px 40px;
  overflow: hidden;
}

.mine-header__bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(120% 90% at 100% 0%, rgba(0, 187, 252, 0.16) 0%, transparent 55%),
    linear-gradient(160deg, #0B0B0D 0%, #000000 100%);
}

.mine-header__content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 14px;
}

.mine-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  border: 2px solid rgba(0, 187, 252, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.mine-user-info {
  flex: 1;
  min-width: 0;
}

.mine-user-name-row {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  margin-bottom: 2px;
}

.mine-user-name {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.mine-user-phone {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

.mine-settings-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

/* Sections */
.mine-section {
  padding: 0 16px;
  margin-bottom: 16px;
}

/* Balance Card */
.balance-card {
  background: var(--surface-color);
  border: 1px solid var(--line-color);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 12px 30px -18px rgba(0, 0, 0, 0.85);
  cursor: pointer;
  transition: transform 0.2s;
}

.balance-card:active {
  transform: scale(0.98);
}

.balance-card__label {
  font-size: 12px;
  color: var(--text-secondary);
  display: block;
  margin-bottom: 4px;
}

.balance-card__amount {
  display: flex;
  align-items: baseline;
  font-size: 32px;
  font-weight: 800;
  color: var(--text-primary);
}

.balance-card__currency {
  font-size: 18px;
  font-weight: 600;
  margin-right: 2px;
  color: var(--text-secondary);
}

.balance-card__action {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 500;
  color: #00BBFC;
}

/* Section Header */
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.section-link {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 13px;
  color: #00BBFC;
  text-decoration: none;
  font-weight: 500;
}

/* Orders Grid */
.orders-grid {
  background: var(--surface-color);
  border: 1px solid var(--line-color);
  border-radius: 16px;
  padding: 16px 8px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  box-shadow: 0 8px 24px -16px rgba(0, 0, 0, 0.8);
}

.order-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  padding: 8px 0;
  transition: transform 0.2s;
}

.order-item:active {
  transform: scale(0.95);
}

.order-item__icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.order-item__icon--progress { background: rgba(0, 187, 252, 0.14); }
.order-item__icon--pending { background: rgba(255, 140, 0, 0.14); }
.order-item__icon--completed { background: rgba(46, 204, 113, 0.14); }
.order-item__text {
  font-size: 12px;
  color: var(--text-primary);
  font-weight: 500;
}

/* Service Item */
.service-item {
  background: var(--surface-color);
  border: 1px solid var(--line-color);
  border-radius: 16px;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  box-shadow: 0 8px 24px -16px rgba(0, 0, 0, 0.8);
  transition: transform 0.2s;
}

.service-item:active {
  transform: scale(0.98);
}

.service-item__icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255, 140, 0, 0.14);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.service-item__text {
  flex: 1;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
}
</style>
