<template>
  <router-link :to="{ name: item.link }" :class="useWidget.openSide ? 'w-full' : 'btn-square'" class="btn">
    <component :is="item.icon" class="w-5 flex-none" />
    <div :class="useWidget.openSide ? 'flex-1' : 'w-0'"
      class="h-full flex items-center overflow-hidden transition-all duration-200">
      <span class="flex-none">{{ t(`translation.${item.name}`) }}</span>
    </div>
  </router-link>
</template>

<script setup>
import { useWidgetStore } from '@/stores/widget';
import { useI18n } from 'vue-i18n';

const props = defineProps(['item'])
const useWidget = useWidgetStore()
const { t } = useI18n()
</script>

<style lang="scss" scoped></style>
