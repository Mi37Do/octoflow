<template>
  <div class="w-full h-screen overflow-hidden relative flex flex-col items-center
  justify-center">

    <topAppBar class="z-10"></topAppBar>

    <div class="w-full max-w-screen-lg flex-1 flex flex-col gap-6 items-center justify-center overflow-hidden z-10">

      <div class="flex gap-3 pixa-title">
        <span>404</span> <span class="w-px h-6 bg-[var(--color-commun-border)]"></span> <span>coming soon</span>
      </div>

      <router-link :to="{ name: 'overview' }"
        class="uppercase underline  underline-offset-4 hover:text-[var(--vt-primary-1)]">go back to
        overview</router-link>

    </div>

    <div class="h-12 w-full flex items-center justify-center">
      <span class="text-xs h-12 border-t border-[var(--color-commun-border)] flex items-center">All rights
        reserved,
        developped
        by
        xpertify-solutions</span>
    </div>

    <div class="w-full h-full absolute flex items-center justify-center">
      <div class="w-full h-full flex items-center justify-center opacity-5">
        <img v-if="useWidget.themeState === 'dark'" src="@/assets/logos/square_logo_white.svg" class="w-[60vw] h-[60vw]"
          alt="">
        <img v-else src="@/assets/logos/square_logo.svg" class="w-[60vw] h-[60vw]" alt="">
      </div>
    </div>

    <div
      class="w-[800px] h-[800px] absolute rounded-full bg-gradient-to-b from-transparent to-[var(--vt-primary-1)] blur-3xl -bottom-[400px] opacity-15">
    </div>

  </div>
</template>

<script setup>
import topAppBar from '@/components/navigation/topAppBar.vue';
import { useI18n } from 'vue-i18n';
import { useWidgetStore } from '@/stores/widget';

const { t } = useI18n()
const useWidget = useWidgetStore()

</script>

<style lang="scss" scoped>
.icon-large {
  width: 52px;
  height: 52px;
}
</style>
