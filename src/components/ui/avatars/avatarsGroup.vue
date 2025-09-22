<template>
  <div class="flex pb-1.5 pt-1.5 w-full items-center gap-1.5">
    <div class="flex -space-x-3 w-fit h-full">
      <div
        class="w-8 h-8 bg-[var(--color-bg-side)] rounded-full border-2 border-[var(--color-bg-side)] overflow-hidden">
        <img :src="participants[0].avatar" class="w-full h-full object-cover" alt="">
      </div>
      <div v-if="participants.length > 1"
        class="w-8 h-8 bg-[var(--color-bg-side)] rounded-full border-2 border-[var(--color-bg-side)] overflow-hidden">
        <img :src="participants[1].avatar" class="w-full h-full object-cover" alt="">
      </div>
      <div v-if="participants.length > 2"
        class="w-8 h-8 bg-[var(--color-bg-side)] rounded-full border-2 border-[var(--color-bg-side)] overflow-hidden">
        <img :src="participants[2].avatar" class="w-full h-full object-cover" alt="">
      </div>
      <div v-if="participants.length > 3" :class="extended ? 'w-fit  px-3' : 'w-8 text-xs'"
        class="h-8 flex items-center justify-center bg-[var(--color-background)] border-2 border-[var(--color-bg-side)] rounded-full pt-0.5 cursor-pointer">
        <span class="capitalize font-medium truncate">+{{ participants.length - 3 }}
          <span v-if="extended">{{
            t('translation.participants')
          }}</span>
        </span>
      </div>
    </div>


  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const props = defineProps(['participants', 'extended'])
const { t } = useI18n()

</script>

<style lang="scss" scoped></style>
