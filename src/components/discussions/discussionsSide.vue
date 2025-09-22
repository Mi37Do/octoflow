<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <div class="w-full p-1.5">
      <div class="w-full h-10 bg-[var(--color-background)] rounded-lg px-1.5 py-2 flex items-center gap-1.5">
        <div class="flex-1 flex gap-3 pixa-title-2 mt-0.5 items-center">
          <span class="truncate">{{ 'discussions' }} </span>
          <span class="h-6 px-2 rounded flex items-center justify-center bg-[var(--color-commun-border)] font-bold">{{
            list.length
            }}</span>
        </div>
        <Plus size="16" />
      </div>
    </div>


    <div :class="[useWidget.userLanguage === 'ar' ? 'pr-3' : 'pl-3', 'h-full overflow-hidden pb-1.5']">
      <commun-scrollable>
        <template #scrollable-content>
          <div class="h-fit py-1.5 flex flex-col gap-1.5">

            <discussions-type-section v-for="type in types" :key="type" :item="type"
              :list="list.filter(dis => dis.type === type)" />

            <discussion-item v-for="discussion in list" :key="discussion.id" :item="discussion" />
          </div>
        </template>
      </commun-scrollable>
    </div>
  </div>
</template>

<script setup>
import { Plus } from 'lucide-vue-next';
import communScrollable from '../commun/communScrollable.vue';
import { useWidgetStore } from '@/stores/widget';
import discussionItem from './discussionItem.vue';
import discussionsTypeSection from './discussionsTypeSection.vue';

const props = defineProps(['list', 'types'])
const useWidget = useWidgetStore()

console.log(props.types);

</script>

<style lang="scss" scoped></style>
