<script setup>
const router = useRouter()
const route = useRoute()
const { t } = useI18n()

// tabbar 相关
const active = ref(0)

// 是否显示 tabbar
const showTabbar = computed(() => route.meta.showTabbar)

// 是否显示回到首页按钮
const showHomeButton = computed(() => !route.meta.hideBackToHome)

// 计算页面标题
const pageTitle = computed(() => {
  return route.meta.titleKey ? t(route.meta.titleKey) : ''
})

// 容器样式
const containerClass = computed(() => ({
  'layout-container min-h-screen flex flex-col': true,
  'bg-gradient-to-b from-[#00B4E6] from-0% via-[#E8F4FD] via-35% to-[#F0F4F8] to-100%': route.meta.gradientBg,
  'bg-background': !route.meta.gradientBg
}))

// 导航栏主题变量
const themeVars = computed(() => ({
  navBarHeight: '46px',
  navBarArrowSize: '20px',
  navBarIconColor: '#fff',
  navBarTextColor: '#fff',
  navBarTitleTextColor: '#fff',
  navBarBackground: route.meta.gradientBg ? 'transparent' : 'linear-gradient(135deg, #00B4E6 0%, #0090B8 100%)'
}))

function onClickLeft() {
  router.back()
}

function goHome() {
  router.replace("/");
}

</script>

<template>
  <van-config-provider :theme-vars="themeVars">
    <div :class="containerClass">
      <!-- 导航栏 -->
      <van-nav-bar v-if="!route.meta.hideNavBar" left-arrow @click-left="onClickLeft" fixed :z-index="99" placeholder
        safe-area-inset-top :border="false" :class="{ 'border-b border-gray-100': !route.meta.gradientBg }">
        <template #title>
          <slot name="nav-title">{{ pageTitle }}</slot>
        </template>
        <template #right>
          <!-- <slot name="nav-right" /> -->
          <van-icon v-if="showHomeButton" name="wap-home-o" size="24" @click="goHome" />
          <!-- <van-button type="primary" size="small" icon="wap-home-o" :icon-size="44" @click="goHome"
            v-if="showHomeButton"></van-button> -->

        </template>
      </van-nav-bar>

      <!-- 页面内容 - 使用 CSS 变量处理底部间距 -->
      <div class="default-content flex-1 "
        :class="{ 'pb-[calc(var(--van-tabbar-height)_+_env(safe-area-inset-bottom))]': showTabbar }">
        <router-view />
        <!-- <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <div :key="$route.fullPath">
              <component :is="Component" />
            </div>
          </transition>
        </router-view> -->
      </div>

      <!-- 底部标签栏 -->
      <van-tabbar v-if="showTabbar" v-model="active" route safe-area-inset-bottom class="tabbar-premium">
        <van-tabbar-item replace to="/home" icon="home-o">
          {{ t('tabbar.home') }}
        </van-tabbar-item>
        <van-tabbar-item icon="scan" to="/scan" class="tabbar-scan">
          {{ t('tabbar.scan') }}
        </van-tabbar-item>
        <van-tabbar-item replace to="/mine" icon="user-o">
          {{ t('tabbar.mine') }}
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </van-config-provider>
</template>

<style scoped>
/* 路由切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

:deep(.tabbar-premium) {
  background: #1A2B3C;
  box-shadow: none;
  border-top: none !important;
  --van-tabbar-height: 56px;
  --van-tabbar-border-color: transparent;
}

:deep(.tabbar-premium::after) {
  display: none !important;
}

:deep(.tabbar-premium .van-tabbar-item) {
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.2px;
  background: transparent;
}

:deep(.tabbar-premium .van-tabbar-item .van-tabbar-item__icon) {
  color: rgba(255, 255, 255, 0.45);
  font-size: 20px;
  margin-bottom: 3px;
}

:deep(.tabbar-premium .van-tabbar-item--active) {
  color: #00B4E6;
  font-weight: 600;
  background: transparent;
}

:deep(.tabbar-premium .van-tabbar-item--active .van-tabbar-item__icon) {
  color: #00B4E6;
}

:deep(.tabbar-premium .tabbar-scan) {
  color: #F7941D !important;
}

:deep(.tabbar-premium .tabbar-scan .van-tabbar-item__icon) {
  background: linear-gradient(135deg, #F7941D 0%, #FFAD4D 100%);
  color: #fff !important;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -20px;
  box-shadow: 0 4px 14px rgba(247, 148, 29, 0.45);
  font-size: 24px;
}

:deep(.tabbar-premium .tabbar-scan.van-tabbar-item--active) {
  color: #F7941D !important;
}

:deep(.tabbar-premium .tabbar-scan.van-tabbar-item--active .van-tabbar-item__icon) {
  background: linear-gradient(135deg, #F7941D 0%, #FFAD4D 100%);
  color: #fff !important;
}

:root {
  --van-tabbar-height: 56px;
}

.default-content {
  /* display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 100vw;
  grid-column: 1; */
}

</style>