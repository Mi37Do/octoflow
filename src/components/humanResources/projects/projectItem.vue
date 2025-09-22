<template>
  <router-link :to="{ name: 'humanResources-projectsManagement-project-view' }"
    class="w-full h-fit card p-3 overflow-hidden flex flex-col gap-1.5">
    <div class="flex gap-1 5 w-full items-center">
      <span class="pixa-title-2 truncate flex-1">{{ item.name }}</span>
      <div :class="item.status === 'done' ? 'bg-emerald-500' :
        item.status === 'new' ? 'bg-[var(--vt-c-primary-1)]' :
          item.status === 'in progress' ? 'bg-amber-500' : 'bg-red-500'" class="truncate tag text-white text-tag ">
        {{ item.status }}</div>
    </div>


    <avatars-group :participants="item.participants" :extended="true" />

    <communProgressBar :value="item.progress" />

    <span class="w-full h-px bg-[var(--color-commun-border)] mt-3 mb-1.5"></span>

    <div class="w-full flex items-center gap-1.5">
      <div class="flex-1 flex gap-3 items-center">
        <CalendarX2 size="18" class="text-[var(--btn-float)]" />
        <span class="pt-1">{{ format(item.deadline, 'dd-MM-yyyy') }}</span>
      </div>
      <div class="flex items-center bg-[var(--color-background)] h-6 px-2 rounded-md gap-2">
        <ListTodo size="18"></ListTodo>
        <span class="mt-0.5 font-medium">12</span>
      </div>
      <button class="btn-sm btn-ghost">
        <MessagesSquare size="18" />
      </button>
    </div>

  </router-link>
</template>

<script setup>
import communProgressBar from '@/components/commun/communProgressBar.vue';
import { format } from 'date-fns';
import { CalendarX2, ListTodo, MessagesSquare } from 'lucide-vue-next';
import avatarsGroup from '@/components/ui/avatars/avatarsGroup.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps(['item'])
const { t } = useI18n()
</script>

<style lang="scss" scoped></style>
