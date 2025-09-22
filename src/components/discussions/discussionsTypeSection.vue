<template>
  <div class="w-full">
    <div class="mx-auto w-full max-w-md rounded-2xl">
      <Disclosure v-slot="{ open = true }">
        <DisclosureButton
          class="h-10 bg-[var(--color-background)] rounded-lg px-1.5 py-2 flex items-center gap-1.5 w-full justify-between">
          <span class="pixa-title-2 flex-1 text-left">{{ item }}</span>
          <ChevronDown :class="open ? 'rotate-180 transform' : ''" class="h-5 w-5 " />
        </DisclosureButton>
        <DisclosurePanel class="pb-2 pt-4 ">
          <discussion-item v-for="discussion in list" :key="discussion.id" :item="discussion" />
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronDown } from 'lucide-vue-next';
import discussionItem from './discussionItem.vue';

const props = defineProps(['item', 'list'])
</script>
