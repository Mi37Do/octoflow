<template>
    <div class="w-full h-full flex flex-col">
        <top-app-bar>
            <template #links>
                <nav class="p-1 card w-fit h-fit rounded-xl grid grid-cols-3 gap-1">
                    <router-link :to="{ name: 'products-config-types-view' }" class="btn w-28 justify-center">{{
                        t('translation.types') }}</router-link>
                    <router-link :to="{ name: 'products-config-colors-view' }" class="btn w-28 justify-center">{{
                        t('translation.colors') }}</router-link>
                    <router-link :to="{ name: 'products-config-conditioning-view' }" class="btn w-28 justify-center">{{
                        t('translation.packing') }}</router-link>
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