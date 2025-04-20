<template>
  <div class="w-full transition-all duration-300 ease-in-out flex gap-1.5 items-center justify-between px-3 h-16">
    <div class="flex flex-1 items-center gap-3">
      <button @click="useWidget.openSide = !useWidget.openSide" class="btn-sm btn-square">
        <PanelLeft />
      </button>
      <breadcrumbs />
    </div>

    <slot name="links"></slot>

    <div class="flex gap-1.5 flex-1 justify-end">
      <language-switcher />
      <button @click="toggleTheme()" class="btn btn-square btn-float">
        <Sun v-if="isDark" class="w-5 h-5" />
        <Moon v-else />
      </button>
    </div>


  </div>
</template>

<script setup>
import { useWidgetStore } from '@/stores/widget';
import { LayoutPanelLeft, Moon, PanelLeft, Sun } from 'lucide-vue-next';
import { useDark, useToggle, useStorage } from '@vueuse/core'
import languageSwitcher from '../commun/languageSwitcher.vue';
import breadcrumbs from './breadcrumbs.vue';
import { onMounted, watch } from 'vue';

const useWidget = useWidgetStore()
const isDark = useDark({
  selector: 'body',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
  storageKey: 'user-theme', // Sauvegarde le choix de l'utilisateur
})
const toggleTheme = useToggle(isDark)

onMounted(() => {
  useWidget.themeState = isDark.value ? 'dark' : 'light'
})

watch(() => isDark.value, () => {

  useWidget.themeState = isDark.value ? 'dark' : 'light'


})
</script>

<style lang="scss" scoped></style>
