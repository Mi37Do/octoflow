<template>
  <div class="w-full h-full flex flex-col">
    <top-app-bar>
    </top-app-bar>
    <div class="w-full flex-1 overflow-hidden">
    </div>
  </div>
</template>

<script setup>
import topAppBar from '@/components/navigation/topAppBar.vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const { t } = useI18n()
const route = useRoute()

</script>

<style lang="scss" scoped>
nav {
  a {
    color: var(--btn-float);
    fill: var(--btn-float);

    &.router-link-exact-active {
      background-color: var(--vt-primary-2);
      color: #fff;
      fill: #fff;
    }

    &.router-link-active {
      background-color: color-mix(in srgb, var(--vt-primary-2) 10%, transparent);
      color: var(--vt-primary-2);
      fill: var(--vt-primary-2);
    }
  }
}
</style>
