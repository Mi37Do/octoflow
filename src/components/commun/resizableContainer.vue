<template>
  <div ref="panel" class="flex w-full h-full">
    <template v-for="(column, index) in props.columns" :key="index">
      <!-- Resizable Div -->
      <div class="flex shrink-0 overflow-hidden px-3 items-center h-full" :style="{ flex: `${divWidths[index]} 0 0%` }"
        ref="divElements">
        <span class="truncate uppercase text-[var(--btn-float)] font-semibold">{{
          t(`translation.${column.designation}`)
          }}</span>
      </div>

      <!-- Resize Handle (except after last div) -->
      <div v-if="index < props.columns.length - 1"
        class="w-2 transition-all hover:bg-[var(--color-commun-border)] cursor-col-resize flex justify-center"
        @mousedown="(e) => startResize(e, index)">
        <div class="w-px h-full bg-[var(--color-commun-border)]"></div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps(['columns'])
const panel = ref(null);
const divElements = ref([]);
const divWidths = ref([]);
const pixelWidths = ref([]);

let isResizing = false;
let activeHandleIndex = 0;
let startX = 0;
let startWidths = [];
const { t } = useI18n()

const emits = defineEmits(['divsWidths'])

// Initialize widths based on columns size values
onMounted(() => {
  // Extract sizes from columns and normalize them
  const sizes = props.columns.map(col => col.size || 1);
  const totalSize = sizes.reduce((sum, size) => sum + size, 0);

  // Convert sizes to flex values (maintaining the same ratios)
  divWidths.value = sizes.map(size => size / totalSize * sizes.length);

  // Wait for the DOM to update
  nextTick(() => {
    updatePixelWidths();

    // Add resize observer for container changes
    const resizeObserver = new ResizeObserver(() => {
      updatePixelWidths();
    });

    if (panel.value) {
      resizeObserver.observe(panel.value);
    }
  });
});

// Watch for changes in divWidths to update pixel widths
watch(divWidths, () => {
  updatePixelWidths();
}, { deep: true });

const updatePixelWidths = () => {
  if (!panel.value || divElements.value.length === 0) return;

  const totalFlex = divWidths.value.reduce((sum, width) => sum + width, 0);
  const panelWidth = panel.value.offsetWidth;

  pixelWidths.value = divWidths.value.map((flexWidth, index) => {
    return (flexWidth / totalFlex) * panelWidth;
  });

  emits('divsWidths', divWidths.value)
};

const startResize = (e, handleIndex) => {
  isResizing = true;
  activeHandleIndex = handleIndex;
  startX = e.clientX;
  startWidths = [...divWidths.value];

  document.addEventListener('mousemove', handleResize);
  document.addEventListener('mouseup', stopResize);
  e.preventDefault();
};

const handleResize = (e) => {
  if (!isResizing) return;

  const panelWidth = panel.value.offsetWidth;
  const deltaX = e.clientX - startX;
  const totalFlex = startWidths[activeHandleIndex] + startWidths[activeHandleIndex + 1];

  // Calculate new widths for the two adjacent divs
  const newLeftWidth = startWidths[activeHandleIndex] + (deltaX / panelWidth) * totalFlex;
  const newRightWidth = startWidths[activeHandleIndex + 1] - (deltaX / panelWidth) * totalFlex;

  // Apply minimum width constraint (e.g., 0.1)
  if (newLeftWidth > 0.1 && newRightWidth > 0.1) {
    const newWidths = [...divWidths.value];
    newWidths[activeHandleIndex] = newLeftWidth;
    newWidths[activeHandleIndex + 1] = newRightWidth;
    divWidths.value = newWidths;
  }
};

const stopResize = () => {
  isResizing = false;
  document.removeEventListener('mousemove', handleResize);
  document.removeEventListener('mouseup', stopResize);
  updatePixelWidths();
};
</script>

<style lang="scss" scoped></style>
