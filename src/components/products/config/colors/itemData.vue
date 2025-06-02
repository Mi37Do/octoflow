<template>
  <div @click="openOptions(item)" class="h-fit flex flex-col w-full cursor-pointer hover:bg-[var(--color-background)]">
    <div class="h-14 border-b border-[var(--color-commun-border)] flex gap-2.5 overflow-hidden">
      <div class="flex shrink-0 overflow-hidden px-3 items-center h-full" :style="{ flex: `${divsWidths[0]} 0 0%` }">
        <span class="truncate">{{ item.designation }}</span>
      </div>
      <div class="flex shrink-0 overflow-hidden px-3 items-center h-full" :style="{ flex: `${divsWidths[1]} 0 0%` }">
        <span class="truncate">{{ item.code }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/products';
import { useWidgetStore } from '@/stores/widget';
import { ref } from 'vue';
const props = defineProps(['item', 'divsWidths'])

const useWidget = useWidgetStore()
const useProduct = useProductStore()

const openOptions = (item) => {
  useProduct.focusedColor = item
  useWidget.openTypeOptions = true
}

</script>

<style lang="scss" scoped></style>
