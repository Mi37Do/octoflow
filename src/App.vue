<script setup>
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useWidgetStore } from './stores/widget'

const useWidget = useWidgetStore()

onMounted(() => {
  useWidget.checkScreenSize(); // Check initial screen size
  window.addEventListener('resize', useWidget.checkScreenSize)
})
</script>

<template>
  <div :dir="useWidget.userLanguage === 'en' ? 'ltr' : 'rtl'" class="w-full h-screen"
    :style="{ fontFamily: useWidget.userLanguage === 'en' ? 'inter' : 'cairo' }">
    <RouterView />
  </div>
</template>

<style>
@font-face {
  font-family: 'inter';
  src: url('@/assets/fonts/Inter.ttf');
}


@font-face {
  font-family: 'cairo';
  src: url('@/assets/fonts/Cairo.ttf');
}
</style>
