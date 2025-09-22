<template>
  <router-link :to="{ name: useWidget.currentModule + '-chat-view' }"
    class="w-full h-16 rounded-xl flex items-center gap-3 p-1.5 hover:bg-[var(--color-background)] cursor-pointer">

    <discussion-image :items="item.participants" />

    <div class="flex-1 h-full flex flex-col justify-center overflow-hidden">
      <div class="flex-1 w-full flex gap-1.5 items-center">
        <div class="flex-1 flex flex-col overflow-hidden">
          <span class="truncate pixa-title-2 flex-1">{{ item.name }}</span>
        </div>

        <span class="text-[0.7rem]">{{ formatMessageTime(item.lastMessageTime) }}</span>
      </div>
      <div class="flex-1 w-full flex gap-1.5 items-center">

        <span class="truncate flex-1">{{ item.lastMessage }}</span>
        <div
          :class="item.seen ? 'bg-gradient-to-br from-[var(--vt-primary-1)] to-[var(--vt-primary-2)] text-[var(--color-primary-text)]' : 'bg-[var(--color-commun-border)]'"
          class="w-4 h-4 flex items-center justify-center rounded">
          <CheckCheck :size="14" />
        </div>


      </div>
    </div>

  </router-link>
</template>

<script setup>
import { format, isSameDay } from 'date-fns';
import { CheckCheck } from 'lucide-vue-next';
import discussionImage from './discussionImage.vue';
import { useRoute } from 'vue-router';
import { useWidgetStore } from '@/stores/widget';

const props = defineProps(['item']);
const route = useRoute()
const useWidget = useWidgetStore()

const formatMessageTime = (dateString) => {
  const date = new Date(dateString);
  return isSameDay(date, new Date())
    ? format(date, "HH:mm")       // today → show time
    : format(date, "dd-MM-yyyy"); // older → show date
};

</script>

<style lang="scss" scoped></style>
