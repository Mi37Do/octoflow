<template>
  <div class="grow overflow-hidden">
    <div class="w-full h-full bg-glass-effect flex">
      <div v-if="hasTableConfig" class="w-fit h-full py-3 pl-3">
        <slot name="table_config"></slot>
      </div>
      <div class="flex-1 h-full  overflow-hidden flex flex-col">
        <div class="w-full h-16 px-3 pt-3">
          <div class="w-full h-full bg-[var(--color-background)] rounded-lg  py-2">
            <resizable-container :columns="columns" @divsWidths="(values) => {
              divsWidths = values
              emits('divsWidths', divsWidths)
            }" />
          </div>
        </div>
        <div class="w-full flex-1 overflow-hidden pl-3 pb-3 relative">
          <div ref="contentRef" class="w-full h-full overflow-y-auto scrollbar-overlay">
            <div class="w-full h-fit flex flex-col">
              <slot name="table_content" />
            </div>
          </div>
        </div>
        <div v-if="footer" class="w-full h-fit px-3 pb-3 flex items-center justify-between">
          <slot name="table_footer_right"></slot>
          <slot name="table_footer_left"></slot>
        </div>
      </div>

    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import resizableContainer from './resizableContainer.vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
const props = defineProps(['columns', 'footer', 'hasTableConfig'])
const divsWidths = ref([])
const emits = defineEmits(['divsWidths'])

const currentPage = ref(1)
const allPages = ref(14)
</script>

<style lang="scss" scoped>
/* This will make the scrollbar overlay the content */
.scrollbar-overlay {
  scrollbar-gutter: stable;
}

/* Optional: Custom scrollbar styling */
.scrollbar-overlay::-webkit-scrollbar {
  width: 12px;
}

.scrollbar-overlay::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-overlay::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 6px;
  border: 3px solid transparent;
  background-clip: content-box;
}
</style>
