<template>
  <div class="card p-3 h-fit flex flex-col gap-1.5 min-h-20 cursor-grab active:cursor-grabbing card-grab"
    @mousedown="(e) => onDragStart(e, item)">
    <div class="flex items-center gap-3">
      <span class="pixa-title-2 truncate flex-1">{{ item.title }}</span>
      <div :class="item.status === 'urgent' ? 'bg-red-500' : item.status === 'normal' ? 'bg-amber-500' : 'bg-slate-400'"
        class="tag text-tag text-white">
        <span>{{ item.status === 'urgent' ? '!' : '' }} {{ item.status }}</span>
      </div>
    </div>
    <p>{{ item.description }}</p>
    <avatars-group :participants="item.participants" :extended="true" />
    <div class="w-full flex items-center gap-1.5">
      <div class="flex-1 flex gap-3 items-center">
        <CalendarPlus size="18" class="text-[var(--btn-float)]" />
        <span class="pt-1">{{ format(item.startDate, 'dd-MM-yyyy') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import avatarsGroup from '@/components/ui/avatars/avatarsGroup.vue';
import { format } from 'date-fns';
import { CalendarPlus } from 'lucide-vue-next';
import { inject } from 'vue';

const props = defineProps(['item']);
const onDragStart = inject('onDragStart');
</script>

<style lang="scss" scoped>
.card-grab {
  user-select: none;
  /* Prevent text highlight */
  -webkit-user-drag: none;
  /* Prevent default drag ghost */
}
</style>
