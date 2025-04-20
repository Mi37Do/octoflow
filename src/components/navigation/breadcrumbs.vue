<template>
    <div class="flex gap-1.5 cursor-default">
        <div v-for="(routeName, index) in route.meta.module" :key="routeName"
            class="flex gap-1.5 items-center text-[var(--btn-float)] ">
            <ChevronRightIcon v-if="index > 0" :class="useWidget.userLanguage === 'ar' ? 'rotate-180' : ''"
                class="w-3" />
            <span class="capitalize">{{ routeName }}</span>
        </div>
    </div>
</template>

<script setup>
import { useWidgetStore } from '@/stores/widget';
import { ChevronRightIcon } from 'lucide-vue-next';
import { useRoute } from 'vue-router';

const useWidget = useWidgetStore()

const route = useRoute()
</script>

<style lang="scss" scoped></style>