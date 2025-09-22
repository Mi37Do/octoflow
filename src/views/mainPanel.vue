<template>

  <main :class="['w-full', 'h-screen overflow-hidden', { 'dark': isDark }]">
    <router-view></router-view>
  </main>
</template>

<script setup>
import { useDark } from '@vueuse/core'

const isDark = useDark({
  selector: 'body',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
  storageKey: 'user-theme', // Sauvegarde le choix de l'utilisateur
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
