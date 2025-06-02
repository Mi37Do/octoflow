<template>
  <div :class="selected ? 'border-[var(--vt-primary-1)]' : 'border-[--color-commun-border]'"
    class="w-full h-80  rounded-xl border  flex flex-col overflow-hidden cursor-pointer relative">

    <div class="w-10 h-10 absolute right-3">
      <slot name="selected_tag"></slot>
    </div>

    <div class="w-full h-52">
      <img
        src="https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        class="object-cover w-full h-full" alt="">
    </div>

    <div class="flex-1 flex flex-col gap-3 p-3">

      <div class="flex gap-3 items-start">

        <div class="flex flex-col flex-1 ">
          <span class="truncate uppercase font-semibold">{{ item.designation }}</span>
          <span class="truncate uppercase text-xs">{{ item.code }}</span>
        </div>
        <span class="truncate text-xs">
          (
          {{ packing ? packing.designation : 'N/A' }}
          )
        </span>
      </div>


      <div class="gap-3 items-start  grid grid-cols-2">
        <div class="w-full h-full flex flex-col text-xs">
          <span class="truncate uppercase">{{ type ? type.designation : 'N/A' }}</span>
          <span class="truncate uppercase ">{{ color ? color.designation : 'N/A' }}</span>
        </div>

        <div class="w-full h-full flex flex-col items-end text-sm">
          <span class="truncate uppercase font-semibold">{{ item.public_price ? numberFormat(item.public_price) : 'N/A'
          }} DA</span>
          <span class="truncate uppercase ">{{ item.price ? numberFormat(item.price) : 'N/A' }} DA</span>
        </div>
      </div>


    </div>

  </div>
</template>

<script setup>
const props = defineProps(['item', 'packing', 'type', 'color', 'selected'])
</script>

<style lang="scss" scoped></style>
