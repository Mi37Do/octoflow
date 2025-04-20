<template>
  <div class="w-full h-full flex flex-col">
    <top-app-bar>
      <template #links>
        <nav class="p-1 card w-fit h-fit rounded-xl grid grid-cols-3 gap-1">
          <router-link :to="{ name: 'administration-config-specialities-view' }" class="btn w-32 justify-center">{{
            t('translation.specialities') }}</router-link>

          <router-link :to="{ name: 'administration-config-departements-view' }" class="btn w-32 justify-center">{{
            t('translation.departements') }}</router-link>

          <router-link :to="{ name: 'administration-config-roles-view' }" class="btn w-32 justify-center">{{
            t('translation.roles') }}</router-link>
        </nav>
      </template>
    </top-app-bar>

    <div class="w-full flex-1 overflow-hidden">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import topAppBar from '@/components/navigation/topAppBar.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

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
