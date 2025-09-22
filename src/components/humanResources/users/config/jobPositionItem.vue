<template>
  <div @click="openOptions(item)" class="h-fit flex flex-col w-full cursor-pointer hover:bg-[var(--color-background)]">
    <div class="h-14 border-b border-[var(--color-commun-border)] flex gap-2.5 overflow-hidden">
      <div class="flex shrink-0 overflow-hidden px-3 items-center h-full" :style="{ flex: `${divsWidths[0]} 0 0%` }">

        <span class="truncate font-medium">{{ item.designation || 'N/A'
        }}</span>
      </div>

      <div class="flex shrink-0 px-3 items-center h-full overflow-hidden" :style="{ flex: `${divsWidths[1]} 0 0%` }">
        <span class="truncate capitalize">{{ item.department }}</span>
      </div>


      <div class="flex shrink-0 px-3 items-center h-full overflow-hidden" :style="{ flex: `${divsWidths[2]} 0 0%` }">
        <span class="truncate capitalize">{{ item.currentEmployees }}</span>
      </div>
      <div class="flex shrink-0 px-3 items-center h-full overflow-hidden" :style="{ flex: `${divsWidths[3]} 0 0%` }">
        <span class="truncate capitalize">{{ item.expectedNewEmployees }}</span>
      </div>

      <div class="flex shrink-0 px-3 items-center h-full overflow-hidden" :style="{ flex: `${divsWidths[4]} 0 0%` }">
        <span class="truncate capitalize">{{ item.totalForecastedEmployees }}</span>
      </div>

      <div class="flex shrink-0 px-3 items-center h-full overflow-hidden" :style="{ flex: `${divsWidths[5]} 0 0%` }">
        <span class="truncate capitalize">{{ item.hiredEmployees }}</span>
      </div>
      <div class="flex shrink-0 px-3 items-center h-full overflow-hidden" :style="{ flex: `${divsWidths[6]} 0 0%` }">
        <span class="truncate capitalize">{{ item.status }}</span>
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
  useAdministration.focusedUser = item
  useWidget.openClientOptions = true
}

</script>

<style lang="scss" scoped></style>
