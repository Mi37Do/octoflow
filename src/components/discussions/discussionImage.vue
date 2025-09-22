<template>
  <div class="w-12 h-12  bg-[var(--color-commun-border)]  rounded-full overflow-hidden">
    <div :class="items.length > 3 ? 'grid-cols-2' : 'grid-cols-1'" class="w-full h-full grid gap-0.5">
      <div class="w-full h-full flex">
        <img :src="items[0].avatar" class="object-cover" alt="">
      </div>
      <div v-if="items.length > 2" class="w-full h-full grid grid-rows-2 gap-0.5">
        <div class="w-full h-full">
          <img :src="items[1].avatar" class="object-cover" alt="">
        </div>
        <div class="w-full h-full">
          <img :src="items[2].avatar" class="object-cover" alt="">
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
const props = defineProps(['items']);

</script>

<style lang="scss" scoped></style>
