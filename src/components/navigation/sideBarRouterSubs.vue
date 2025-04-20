<template>
  <div v-auto-animate class="flex flex-col gap-1.5">
    <div @click="toggleSubMenu"
      :class="[useWidget.openSide ? 'w-full' : 'btn-square', isSelected ? 'selected_module' : '']"
      class="btn flex-none">
      <component :is="item.icon" class="w-5 flex-none" />
      <div :class="useWidget.openSide ? 'flex-1' : 'w-0'"
        class="h-full flex items-center overflow-hidden transition-all duration-200">
        <span class="flex-none">{{ t(`translation.${item.name}`) }}</span>
      </div>
    </div>

    <div v-if="isOpen" class="w-full h-fit flex flex-col">
      <div v-for="link in item.subs" :key="link" :class="useWidget.userLanguage === 'ar' ? 'pr-3' : 'pl-3'"
        class="w-full flex flex-col ">
        <span v-if="link.title" class="uppercase text-xs my-2">{{ link.title }}</span>

        <div v-for="sub in link.links" :key="sub" class="w-full flex items-center gap-3">
          <div class="w-4 h-9 flex justify-center ">
            <div class="w-px h-full bg-[var(--color-commun-border)] "></div>
          </div>
          <router-link :to="{ name: item.name + '-' + sub.name + `-view` }" class="btn-sm flex-1 uppercase">{{
            t(`translation.${sub.name}`) }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWidgetStore } from '@/stores/widget';
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const props = defineProps(['item']);
const useWidget = useWidgetStore();
const isOpen = ref(false);
const route = useRoute();
const { t } = useI18n();

// Track the currently selected module
const isSelected = ref(false);

onMounted(() => {
  // Check if the current route's module matches the item
  isSelected.value = route.meta.module.includes(props.item.name);

})
// Watch for changes in the current route
watch(() => route.meta.module, (newModule) => {
  // Check if the current route's module matches the item
  isSelected.value = newModule.includes(props.item.name);
  // If it matches, open the submenu; otherwise, close it
  isOpen.value = isSelected.value;
});

watch(() => useWidget.openSide, () => {
  if (useWidget.openSide) {
    return
  } else {
    isOpen.value = false
  }
})

// Toggle the submenu open/close state
const toggleSubMenu = () => {
  isOpen.value = !isOpen.value;
  // Close other submenus if this one is opened
  if (isOpen.value) {
    useWidget.openSide = true; // Ensure the sidebar is open
  }
};

</script>

<style lang="scss" scoped>
.selected_module {
  background-color: color-mix(in srgb, var(--vt-primary-2) 10%, transparent);
  color: var(--vt-primary-2);
  fill: var(--vt-primary-2);
}
</style>
