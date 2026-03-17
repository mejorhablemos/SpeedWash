<script setup>
const props = defineProps({
  machine: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const handleGoWash = () => {
  router.push(`/washer/${props.machine.iotId}`);
};
</script>

<template>
  <van-cell-group inset :border="false">
    <van-cell
      :title="machine.name"
      :label="machine.address"
    >
      <template #right-icon>
        <van-icon name="copy" color="#3eaf7c" />
      </template>
    </van-cell>

    <div class="flex justify-center items-center py-10px">
      <van-button type="primary" round size="small" @click="handleGoWash">
        {{ $t('components.machineItem.actions.goWash') }}
      </van-button>
    </div>

    <van-cell center v-if="false">
      <template #title>
        <price-tag :price="machine.lowestPrice" />
      </template>
      <template #value>
        <van-button type="primary" round size="small" @click="handleGoWash">
          {{ $t('components.machineItem.actions.goWash') }}
        </van-button>
      </template>
    </van-cell>
  </van-cell-group>
</template>