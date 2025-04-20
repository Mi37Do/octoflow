<template>
  <div @click="openOptions(item)" class="h-fit flex flex-col w-full cursor-pointer hover:bg-[var(--color-background)]">
    <div class="h-14 border-b border-[var(--color-commun-border)] flex gap-2.5 overflow-hidden">
      <div class="flex shrink-0 overflow-hidden px-3 items-center h-full" :style="{ flex: `${divsWidths[0]} 0 0%` }">
        <span class="truncate">{{ item.id }}</span>
      </div>
      <div class="flex shrink-0 overflow-hidden px-3 items-center h-full" :style="{ flex: `${divsWidths[1]} 0 0%` }">
        <span class="truncate">{{ item.commande }}</span>
      </div>

      <div class="flex shrink-0 overflow-hidden px-3 items-center h-full" :style="{ flex: `${divsWidths[1]} 0 0%` }">
        <div :class="item.bl_file ? 'text-primary' : ''" class="flex gap-1.5 items-center">

          <FileSpreadsheet v-if="item.bl_file" class="w-4" />
          <File v-else class="w-4" />
          <span class="uppercase text-xs">{{ item.bl_file ? t('translation.download') + ' ' + t('translation.file') :
            t('translation.fileNotFound') }}</span>
        </div>
      </div>
      <div class="flex shrink-0 overflow-hidden px-3 items-center h-full" :style="{ flex: `${divsWidths[3]} 0 0%` }">
        <span class="truncate">{{ numberFormat(item.prixtotal) }} DA</span>
      </div>
      <div class="flex shrink-0 overflow-hidden px-3 items-center h-full" :style="{ flex: `${divsWidths[4]} 0 0%` }">
        <span class="truncate">{{ item.description }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAdministrationStore } from '@/stores/administration';
import { useWidgetStore } from '@/stores/widget';
import { format } from 'date-fns';
import { File, FileSpreadsheet } from 'lucide-vue-next';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const props = defineProps(['item', 'divsWidths', 'departement'])

const useWidget = useWidgetStore()
const { t } = useI18n()
const useAdministration = useAdministrationStore()

const openOptions = (item) => {
  useAdministration.focusedRole = item
  useWidget.openTypeOptions = true
}

</script>

<style lang="scss" scoped></style>
