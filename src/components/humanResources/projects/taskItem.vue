<template>
  <div @click="openOptions(item)" class="h-fit flex flex-col w-full cursor-pointer hover:bg-[var(--color-background)]">
    <div class="h-14 border-b border-[var(--color-commun-border)] flex gap-2.5 overflow-hidden">
      <div class="flex shrink-0 overflow-hidden px-3 items-center h-full" :style="{ flex: `${divsWidths[0]} 0 0%` }">
        <span class="truncate">{{ item.title }}</span>
      </div>
      <div class="flex shrink-0 overflow-hidden px-3 items-center h-full" :style="{ flex: `${divsWidths[1]} 0 0%` }">
        <avatars-group :participants="item.participants" />
      </div>
      <div class="flex shrink-0 overflow-hidden px-3 items-center h-full" :style="{ flex: `${divsWidths[2]} 0 0%` }">
        <div
          :class="item.status === 'urgent' ? 'bg-red-500' : item.status === 'normal' ? 'bg-amber-500' : 'bg-slate-400'"
          class="tag text-tag text-white">
          <span>{{ item.status === 'urgent' ? '!' : '' }} {{ item.status }}</span>
        </div>
      </div>
      <div class="flex shrink-0 overflow-hidden px-3 items-center h-full" :style="{ flex: `${divsWidths[3]} 0 0%` }">
        <div :style="{
          backgroundColor: status ? status.color : 'transparent',
        }" class="tag text-tag text-white">
          <span>{{ status ? status.name : 'N/A' }}</span>
        </div>
      </div>
      <div class="flex shrink-0 overflow-hidden px-3 items-center h-full" :style="{ flex: `${divsWidths[4]} 0 0%` }">
        <!-- -->
        <span class="truncate">{{ format(item.startDate, 'dd-MM-yyyy') }}</span>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/products';
import { useWidgetStore } from '@/stores/widget';
import avatarsGroup from '@/components/ui/avatars/avatarsGroup.vue';
import { ref } from 'vue';
import { format } from 'date-fns';

const props = defineProps(['item', 'divsWidths', 'status'])

const useWidget = useWidgetStore()
const useProduct = useProductStore()

const openOptions = (item) => {
  useProduct.focusedProduct = item
  useWidget.openTypeOptions = true
}

</script>

<style lang="scss" scoped></style>
