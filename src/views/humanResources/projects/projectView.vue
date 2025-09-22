<template>
  <div class="w-full h-full flex flex-col">
    <top-app-bar />

    <div class="w-full flex-1 overflow-hidden">
      <commun-loading v-if="loading" />

      <div v-else class="w-full h-full flex flex-col gap-3 px-3">
        <!-- header -->
        <div class="w-full h-10 flex items-center justify-between">
          <span class="pixa-title px-3">project #001</span>
          <div class="flex gap-2 items-center">
            <div class="grid grid-cols-2 gap-0.5 p-1 rounded-lg bg-[var(--color-commun-border)]">
              <button @click="isList = false" :class="!isList ? 'btn-nofloat' : ''" class="btn-sm btn-square">
                <Columns3 />
              </button>
              <button @click="isList = true" :class="isList ? 'btn-nofloat' : ''" class="btn-sm btn-square">
                <List />
              </button>
            </div>
            <router-link :to="{ name: 'humanResources-add-user-view' }" class="btn btn-primary">
              <Plus class="w-4" />{{ t('translation.add') }} {{ t('translation.pipline') }}
            </router-link>
          </div>
        </div>

        <!-- board -->
        <div v-if="useProject.tasks.length > 0" :class="isList ? 'pb-3' : 'pb-0'"
          class="w-full h-full flex overflow-hidden">

          <commun-table v-if="isList" :columns="columns" :footer="true" @divsWidths="(values) => {
            divsWidths = values
          }">

            <template #table_content>
              <TaskItem v-for="item in useProject.tasks" :key="item.id" :item="item" :divsWidths="divsWidths"
                :status="pipelines.find(i => i.id === item.pipelineId)" />
            </template>

            <template #table_footer_right>
              <table-elements :elements="useProject.tasks.length" />
            </template>

            <template #table_footer_left>
              <table-navigation :maxPages="14" />
            </template>

          </commun-table>

          <div v-else ref="boardRef" class="w-full h-full flex overflow-hidden relative" @mousemove="onDrag"
            @mouseup="onDragStop(null)">
            <div class="w-full h-full overflow-x-auto scrollbar-overlay">
              <div class="w-fit flex gap-3 h-full">
                <pipelin-column v-for="pipeline in pipelines" :key="pipeline.id" :item="pipeline"
                  :ref="el => (columnRefs[pipeline.id] = el?.$el)"
                  :length="useProject.tasks.filter(i => i.pipelineId === pipeline.id).length">
                  <template #pipeline-content>
                    <div class="h-fit flex flex-col gap-1.5">
                      <template v-for="(card, idx) in computedTasks(pipeline.id).value" :key="card.id || idx">
                        <TaskCardItem v-if="!card.isPlaceholder" :item="card" />

                        <!-- Placeholder -->
                        <div v-else :data-index="placeholder.index" :style="{ height: placeholder.height + 'px' }"
                          class="border-2 border-dashed border-[var(--color-commun-border)] rounded-xl flex items-center justify-center uppercase">
                          <span>drop here</span>
                        </div>
                      </template>

                    </div>
                  </template>
                </pipelin-column>
              </div>
            </div>

            <!-- Ghost card -->
            <div v-if="ghostCard.active" class="absolute pointer-events-none ghost-shake" :style="{
              top: ghostCard.pos.y + 'px',
              left: ghostCard.pos.x + 'px',
              width: ghostCard.width + 'px'
            }">
              <TaskCardItem :item="useProject.tasks.find(t => t.id === draggedCardId)" />
            </div>
          </div>

        </div>

        <!-- empty state -->
        <div v-else class="grow w-full flex flex-col items-center justify-center gap-8">
          <img src="@/assets/pics/noData.svg" class="w-52" />
          <span class="uppercase max-w-80 px-4 text-center">{{ t('translation.noData') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import topAppBar from '@/components/navigation/topAppBar.vue';
import { Columns3, List, Plus } from 'lucide-vue-next';
import communLoading from '@/components/commun/communLoading.vue';
import { onMounted, ref, reactive, provide, computed } from 'vue';
import { useWidgetStore } from '@/stores/widget';
import { useI18n } from 'vue-i18n';
import { faker } from '@faker-js/faker';
import pipelinColumn from '@/components/ui/pipeline/pipelinColumn.vue';
import { useProjectStore } from '@/stores/humanResources/projects';
import TaskCardItem from '@/components/humanResources/projects/taskCardItem.vue';
import communTable from '@/components/commun/communTable.vue';
import tableNavigation from '@/components/ui/table/tableNavigation.vue';
import tableElements from '@/components/ui/table/tableElements.vue';
import TaskItem from '@/components/humanResources/projects/taskItem.vue';

const isList = ref(false);
const useProject = useProjectStore();
const { t } = useI18n();
const loading = ref(true);
const useWidget = useWidgetStore();
const columnRefs = reactive({});
const divsWidths = ref([])
const boardRef = ref(null);
const columns = ref([])
const contactColumns = ref([{
  designation: 'task',
  size: 1,
  filter: true
}, {
  designation: 'participants',
  size: 1,
  filter: false
}, {
  designation: 'priority',
  size: 1,
  filter: false
}, {
  designation: 'status',
  size: 1,
  filter: false
}, {
  designation: 'created_at',
  size: 1,
  filter: false
},])
// pipelines
const pipelines = ref([
  { id: faker.string.uuid(), name: 'Backlog / to do', color: '#3b82f6' },
  { id: faker.string.uuid(), name: 'in progress', color: '#f59e0b' },
  { id: faker.string.uuid(), name: 'review', color: '#6366f1' },
  { id: faker.string.uuid(), name: 'blocked', color: '#ef4444' },
  { id: faker.string.uuid(), name: 'done', color: '#10b981' }
]);

// drag state
const draggedCardId = ref(null);
const ghostCard = reactive({
  pos: { x: 0, y: 0 },
  width: 0,
  height: 0,
  active: false,
  offset: { x: 0, y: 0 }
});

// placeholder
const placeholder = reactive({
  pipelineId: null,
  index: null,
  height: 0,
  active: false
});

function onDragStart(e, card) {
  e.preventDefault();
  draggedCardId.value = card.id;

  const rect = e.currentTarget.getBoundingClientRect();
  ghostCard.width = rect.width;
  ghostCard.height = rect.height;

  ghostCard.offset = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };

  ghostCard.pos = {
    x: e.clientX - ghostCard.offset.x,
    y: e.clientY - ghostCard.offset.y
  };

  // placeholder
  placeholder.height = rect.height;
  placeholder.pipelineId = card.pipelineId;
  placeholder.active = true;

  setTimeout(() => {
    ghostCard.active = true;
  }, 150)
}

function onDrag(e) {
  if (!draggedCardId.value) return;

  const boardRect = boardRef.value.getBoundingClientRect();

  for (const pipelineId in columnRefs) {
    const el = columnRefs[pipelineId];
    if (!el) continue;
    const rect = el.getBoundingClientRect();

    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      // Cursor is inside this column
      placeholder.pipelineId = pipelineId;
      placeholder.active = true;

      // Get all cards inside this column
      const cards = Array.from(el.querySelectorAll('.card-grab'));
      let newIndex = cards.length; // default to end

      for (let i = 0; i < cards.length; i++) {
        const cardRect = cards[i].getBoundingClientRect();
        // If cursor is above the middle of a card, insert placeholder here
        if (e.clientY < cardRect.top + cardRect.height / 2) {
          newIndex = i;
          break;
        }
      }

      placeholder.index = newIndex;
      break;
    }
  }

  ghostCard.pos = {
    x: e.clientX - boardRect.left - ghostCard.offset.x + boardRef.value.scrollLeft,
    y: e.clientY - boardRect.top - ghostCard.offset.y + boardRef.value.scrollTop
  };
}

function onDragStop(pipelineId) {
  if (!draggedCardId.value) return;

  if (pipelineId) useProject.updateTaskPipeline(draggedCardId.value, pipelineId);

  draggedCardId.value = null;
  ghostCard.active = false;
  placeholder.active = false;

}

// provide handlers to children
provide('onDragStart', onDragStart);
provide('onDragStop', onDragStop);

// load data
onMounted(async () => {
  try {
    useProject.generateTasks(10, pipelines.value);
    columns.value = contactColumns.value
    loading.value = false;
  } catch (error) {
    console.error(error);
    loading.value = true;
  }
});
const computedTasks = (pipelineId) => {
  return computed(() => {
    const tasks = useProject.tasks.filter(t => t.pipelineId === pipelineId);

    // Only insert placeholder if active and matches this pipeline
    if (placeholder.active && placeholder.pipelineId === pipelineId) {
      const tasksWithPlaceholder = [...tasks]; // shallow copy
      tasksWithPlaceholder.splice(placeholder.index, 0, { isPlaceholder: true, height: placeholder.height });
      return tasksWithPlaceholder;
    }

    return tasks;
  });
};

</script>

<style lang="scss" scoped>
.scrollbar-overlay {
  scrollbar-gutter: stable;
}

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
