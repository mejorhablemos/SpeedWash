<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
  isLink: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <van-cell-group inset>
    <van-cell class="bg-#E0F4FD!" :title="title" :value="value" :is-link="isLink">
      <template #title v-if="$slots.title">
        <slot name="title" />
      </template>
    </van-cell>
    <slot />
  </van-cell-group>
</template>

<style scoped></style>
