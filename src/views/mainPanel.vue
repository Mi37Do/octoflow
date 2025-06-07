<template>

  <main :class="['w-full', 'h-screen overflow-hidden', { 'dark': isDark }]">

    <sheet :open="false" :side="useWidget.userLanguage === 'ar' ? 'left' : 'right'"></sheet>

    <div :class="[
      useWidget.isMobile ? 'bg-red-600' : '']" class="w-full h-full flex">

      <side-bar />

      <div :class="scaleIt ? 'scale-[98%]' : 'scale-100'"
        class="flex-1 h-full transition-all duration-200 flex flex-col overflow-hidden">
        <router-view></router-view>
      </div>
    </div>

  </main>
</template>

<script setup>
import sheet from '@/components/commun/sheet.vue'
import topAppBar from '@/components/navigation/topAppBar.vue';
import { useWidgetStore } from "@/stores/widget";
import { ref, watchEffect } from 'vue';
import sideBar from '@/components/navigation/sideBar.vue';
import { useDark, useToggle } from '@vueuse/core'

const useWidget = useWidgetStore()
const isDark = useDark({
  selector: 'body',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
  storageKey: 'user-theme', // Sauvegarde le choix de l'utilisateur
})
const scaleIt = ref(false)

const toggleTheme = useToggle(isDark)

watchEffect(() => {
  if (useWidget.sheet) {
    scaleIt.value = true
  } else {
    scaleIt.value = false
  }
})

</script>

<style lang="scss">
.fade-enter-from,
.fade-leave-to {
  opacity: 0;

}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s ease-out;
}
</style>
