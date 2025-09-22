<template>
  <div class="w-full flex flex-col gap-1.5">
    <div class="flex items-center justify-between font-medium">
      <span class=" text-tag">{{ t('translation.progress') }}</span>
      <span>
        {{ value }} %</span>
    </div>
    <div class="w-full h-2 flex-none bg-[var(--color-background)] rounded-md overflow-hidden">
      <div :style="{ width: `${value}%` }"
        class="bg-gradient-to-br from-[var(--vt-primary-1)] to-[var(--vt-primary-2)] h-full">
      </div>
    </div>

  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const props = defineProps(['value'])
const { t } = useI18n()
</script>

<style lang="scss" scoped></style>
