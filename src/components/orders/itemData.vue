<template>
  <div @click="openOptions(item)" class="h-fit flex flex-col w-full cursor-pointer hover:bg-[var(--color-background)]">
    <div class="h-14 border-b border-[var(--color-commun-border)] flex gap-2.5 overflow-hidden">
      <div class="flex shrink-0 overflow-hidden px-3 items-center h-full" :style="{ flex: `${divsWidths[0]} 0 0%` }">
        <span class="truncate">{{ item.company }}</span>
      </div>
      <div class="flex shrink-0 overflow-hidden px-3 items-center h-full" :style="{ flex: `${divsWidths[1]} 0 0%` }">
        <span class="truncate">{{ item.user }}</span>
      </div>
      <div class="flex shrink-0 overflow-hidden px-3 items-center h-full" :style="{ flex: `${divsWidths[2]} 0 0%` }">
        <span class="truncate font-semibold">{{

          numberFormat(item.commandesLines.reduce((sum, commandLine) => sum +
            commandLine.prixtotal, 0))
        }} DA</span>
      </div>
      <div class="flex shrink-0 overflow-hidden px-3 items-center h-full" :style="{ flex: `${divsWidths[3]} 0 0%` }">
        <span :class="item.etat === 'Brouillon' ? 'bg-slate-500' :
          item.etat === 'Reception' ? 'bg-amber-500' : 'bg-red-500'" class="truncate tag text-white text-tag">{{
            item.etat }}</span>
      </div>
      <div class="flex flex-col shrink-0 overflow-hidden px-3 justify-center h-full"
        :style="{ flex: `${divsWidths[4]} 0 0%` }">
        <span class="truncate">{{ format(item.created, 'dd-MM-yyyy') }}</span><span class="truncate">{{
          format(item.created, 'HH:mm') }}</span>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/products';
import { useWidgetStore } from '@/stores/widget';
import { format } from 'date-fns';
import { ref } from 'vue';
const props = defineProps(['item', 'divsWidths', 'color', 'type', 'packing'])

const useWidget = useWidgetStore()
const useProduct = useProductStore()

const openOptions = (item) => {
  useProduct.focusedProduct = item
  useWidget.openTypeOptions = true
}

</script>

<style lang="scss" scoped></style>
