<template>
  <barcode-scanner @success="onScanSuccess" @error="onScanError" />
</template>

<script setup>
const router = useRouter();
const { t } = useI18n();

// 扫描成功处理
const onScanSuccess = ({ text }) => {

  console.log('text', text)

  try {
    const url = new URL(text);
    // 检查地址后跳转
    if (url.origin === import.meta.env.VITE_USER_SCAN_URL) {
      router.replace(url.pathname);
      return
    }

  } catch (e) {
    console.log('e', e)
  }

  showToast(t("routes.scan.scanFailed"));

  // // 跳转到结果页
  // router.replace({
  //   path: '/scan-result',
  //   query: { result: text }
  // })
};

// 扫描失败处理
const onScanError = (error) => {
  console.error("Scan error:", error);
  showToast(t("routes.scan.scanFailed"));
};
</script>
