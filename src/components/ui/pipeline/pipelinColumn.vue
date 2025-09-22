<template>
  <div class="w-96 h-full bg-glass-effect p-1.5" ref="columnRef" :data-pipeline-id="item.id" @mouseup="onDrop">
    <div class="h-full flex flex-col gap-1.5 rounded-lg overflow-hidden">
      <div class="w-full h-10">
        <div class="w-full h-full bg-[var(--color-background)] rounded-lg px-1.5 py-2 flex items-center gap-1.5">
          <div :style="{ background: item.color }" class="w-3 h-3 rounded"></div>
          <div class="flex-1 flex gap-3 pixa-title-2 mt-0.5 items-center">

            <span class="truncate">{{ item.name }} </span>
            <span class="h-6 px-2 rounded flex items-center justify-center bg-[var(--color-commun-border)] font-bold">{{
              length
            }}</span>
          </div>
          <Plus size="16" />
        </div>
      </div>

      <div :class="[useWidget.userLanguage === 'ar' ? 'pr-3' : 'pl-3', 'h-full overflow-hidden']">
        <commun-scrollable>
          <template #scrollable-content>
            <slot name="pipeline-content"></slot>
          </template>
        </commun-scrollable>
      </div>
    </div>
  </div>
</template>

<script setup>
import communScrollable from '@/components/commun/communScrollable.vue';
import { useWidgetStore } from '@/stores/widget';
import { Plus } from 'lucide-vue-next';
import { inject, ref } from 'vue';

const props = defineProps(['item', 'length']);
const useWidget = useWidgetStore();
const columnRef = ref(null);

const onDragStop = inject('onDragStop');
function onDrop() {
  onDragStop(props.item.id);
}
</script>
