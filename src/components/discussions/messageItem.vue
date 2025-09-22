<template>
  <div :class="item.isSender ? 'flex-row-reverse' : ''" class="w-full flex gap-1.5 items-end">
    <div
      class="w-10 h-10 bg-[var(--color-background)] rounded-full border border-[var(--color-background)] overflow-hidden">
      <img :src="item.sender?.avatar" class="object-cover" alt="">
    </div>

    <div
      :class="item.isSender ? ' bg-gradient-to-br from-[var(--vt-primary-1)] to-[var(--vt-primary-2)] text-[var(--color-primary-text)] fill-[var(--color-primary-text)] ' : 'bg-[var(--color-background)]'"
      class="max-w-96 w-full h-fit  rounded-xl p-2.5 flex flex-col gap-1.5">
      <span class="uppercase font-medium">{{ item.sender?.name }}</span>
      <span v-if="item.text">{{ item.text }}</span>

      <div v-if="item.images?.length > 0"
        v-viewer="{ button: true, title: false, movable: false, rotatable: false, scalable: false, keyboard: true }"
        :class="item.images.length === 2 ? 'grid-cols-2' : item.images.length === 3 ? 'grid-cols-3' : item.images.length > 3 ? 'grid-cols-2 grid-row-2' : 'grid-cols-1'"
        class="w-full grid gap-1.5 mt-1.5">

        <div ref="imageDiv" :style="{
          height: imageWidht + 'px'
        }" class="w-full">

          <img :src="item.images[0]" alt="" class="w-full h-full rounded-md object-cover">
        </div>

        <div v-if="item.images.length >= 2" ref="imageDiv" :style="{
          height: imageWidht + 'px'
        }" class="w-full">
          <img :src="item.images[1]" alt="" class="w-full h-full rounded-md object-cover">
        </div>
        <div v-if="item.images.length >= 3" ref="imageDiv" :style="{
          height: imageWidht + 'px'
        }" class="w-full">
          <img :src="item.images[2]" alt="" class="w-full h-full rounded-md object-cover">
        </div>
        <div v-if="item.images.length >= 4" ref="imageDiv" :style="{
          height: imageWidht + 'px'
        }" class="w-full bg-red-200 rounded-md">
        </div>

      </div>

      <commun-audio v-if="item.audio" src="@/assets/audio/cubana.mp3" />

    </div>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import communAudio from '../commun/communAudio.vue';

const props = defineProps(['item'])
const imageDiv = ref(null)
const imageWidht = ref(0)

onMounted(() => {
  if (imageDiv.value) {
    imageWidht.value = imageDiv.value.offsetWidth
  }
})
</script>

<style lang="scss" scoped></style>
