<template>
  <div @click="openOptions(item)" class="h-fit flex flex-col w-full cursor-pointer hover:bg-[var(--color-background)]">
    <div class="h-14 border-b border-[var(--color-commun-border)] flex gap-2.5 overflow-hidden">
      <div class="flex shrink-0 overflow-hidden px-3 items-center h-full" :style="{ flex: `${divsWidths[0]} 0 0%` }">
        <div class="flex flex-col w-full overflow-hidden">

          <span class="truncate font-medium">{{ item.first_name ? item.first_name + ' ' + item.last_name : 'N/A'
          }}</span>
          <span class="truncate text-xs">{{ item.username }}</span>
        </div>
      </div>
      <div class="flex shrink-0 overflow-hidden px-3 items-center h-full" :style="{ flex: `${divsWidths[1]} 0 0%` }">
        <div class="flex flex-col w-full overflow-hidden">
          <span class="truncate">{{ item.region }}</span>
          <span class="truncate text-xs">{{ city || 'N/A' }}</span>
        </div>


      </div>


      <div class="flex shrink-0 overflow-hidden px-3 items-center h-full" :style="{ flex: `${divsWidths[2]} 0 0%` }">
        <span :class="item.type === 'ROOT' ? 'bg-slate-500' :
          item.type === 'User' ? 'bg-amber-500' : item.type === 'Corporate' ? 'bg-indigo-400 dark:bg-indigo-600' : item.type === 'Suplyer' ? 'bg-purple-400 dark:bg-purple-600' :
            item.type === 'Distributeur' ? 'bg-sky-400 dark:bg-sky-600' :
              'bg-red-500'" class="truncate tag text-white text-tag">{{
                item.type }}</span>

      </div>
      <div class="flex shrink-0 overflow-hidden px-3 items-center h-full" :style="{ flex: `${divsWidths[3]} 0 0%` }">
        <div class="flex flex-col w-full overflow-hidden">
          <span class="truncate">{{ item.email }}</span>
          <span class="truncate text-xs">{{ item.telephone || 'N/A' }}</span>
        </div>


      </div>

      <div class="flex shrink-0 overflow-hidden px-3 items-center h-full" :style="{ flex: `${divsWidths[4]} 0 0%` }">

        <span :class="item.is_active ? 'bg-emerald-400  dark:bg-emerald-600' :
          'bg-red-500'" class="truncate tag text-white text-tag">{{
            item.is_active ? 'active' : 'inactive' }}</span>
      </div>
      <div class="flex flex-col shrink-0 overflow-hidden px-3 justify-center h-full"
        :style="{ flex: `${divsWidths[5]} 0 0%` }">



        <div class="w-full flex flex-col justify-center">

          <span class="truncate">{{ format(item.created, 'dd-MM-yyyy') }}</span><span class="truncate">{{
            format(item.created, 'HH:mm') }}</span>
        </div>

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
const props = defineProps(['item', 'divsWidths', 'city'])

const useWidget = useWidgetStore()
const useAdministration = useAdministrationStore()
const { t } = useI18n()

const openOptions = (item) => {
  useAdministration.focusedUser = item
  useWidget.openClientOptions = true
}

</script>

<style lang="scss" scoped></style>
