<template>
  <div class="flex gap-1 items-center">
    <button :disabled="currentPage <= 1" @click="() => {
      if (currentPage > 1) currentPage--
    }" class="btn-sm btn-square btn-float">
      <ChevronLeft />
    </button>


    <!--
        <div class="px-3 flex gap-1 btn-sm btn-float">
            <span>{{ currentPage }}</span><span class="font-medium">/</span><span class="font-medium">{{
                maxPages }}</span>
        </div>-->

    <div class="px-2 text-xs font-semibold flex gap-2 items-center">
      <input type="number" class="w-6 h-6 bg-transparent border-0 focus:border-0 focus:ring-0 text-center"
        v-model="currentPage">
      <span> / {{ maxPages }}</span>
    </div>

    <button :disabled="currentPage === maxPages" @click="() => {
      if (currentPage < maxPages) currentPage++
    }" class="btn-sm btn-square btn-float">
      <ChevronRight />
    </button>
  </div>
</template>

<script setup>
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { ref } from 'vue';

const props = defineProps(['maxPages'])
const currentPage = ref(1)

</script>

<style lang="scss" scoped></style>
