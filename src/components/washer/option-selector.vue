<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
    required: true,
  },
  keyField: {
    type: String,
    required: true,
  },
});

const selectedItem = defineModel();
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <div
      v-for="item in items"
      :key="item[keyField]"
      :class="{ 'border-primary bg-primary/5': selectedItem && selectedItem[keyField] === item[keyField] }"
      class="b-2 b-rd-lg b-solid b-white text-center aspect-[7/6] flex flex-col justify-center items-center gap-4xl cursor-pointer"
      @click="selectedItem = item"
    >
      <slot v-bind:item="item" />
    </div>
  </div>
</template>

<style scoped>
.grid > div {
  transition: all 0.2s ease;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
</style> 