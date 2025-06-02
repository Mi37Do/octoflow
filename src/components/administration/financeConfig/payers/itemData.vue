<template>
  <div @click="openOptions(item)" class="h-fit flex flex-col w-full cursor-pointer hover:bg-[var(--color-background)]">
    <div class="h-14 border-b border-[var(--color-commun-border)] flex gap-2.5 overflow-hidden">
      <div class="flex shrink-0 overflow-hidden px-3 items-center h-full" :style="{ flex: `${divsWidths[0]} 0 0%` }">
        <span class="truncate">{{ item.designation }}</span>
      </div>
      <div class="flex flex-col shrink-0 overflow-hidden px-3 justify-center h-full"
        :style="{ flex: `${divsWidths[1]} 0 0%` }">
        <span class="truncate">{{ item.email }}</span>
        <span class="truncate text-xs text-slate-600">{{ item.telephone }}</span>
      </div>
      <div class="flex shrink-0 overflow-hidden px-3 items-center h-full" :style="{ flex: `${divsWidths[2]} 0 0%` }">
        <span class="truncate">{{ item.rc }}</span>
      </div>
      <div class="flex shrink-0 overflow-hidden px-3 items-center h-full" :style="{ flex: `${divsWidths[3]} 0 0%` }">
        <span :class="item.active ? 'bg-emerald-500' : 'bg-red-500'" class="truncate tag text-white text-tag">{{
          item.active ? t('translation.active') : t('translation.inactive') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAdministrationStore } from '@/stores/administration';
import { useWidgetStore } from '@/stores/widget';
import { format } from 'date-fns';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps(['item', 'divsWidths'])

const useWidget = useWidgetStore()
const useAdministration = useAdministrationStore()
const { t } = useI18n()

const openOptions = (item) => {
  useAdministration.focusedPayer = item
  useWidget.openTypeOptions = true
}

</script>

<style lang="scss" scoped></style>
