<template>
    <div class="w-full h-full flex flex-col gap-3">
        <top-app-bar />

        <div class="w-full flex-1 flex flex-col gap-3 pb-3 px-3">
            <div class="w-full h-10 ">
                <div class="flex gap-2">
                    <button class="btn btn-float">
                        <ListFilter class="w-4" />
                        filters
                    </button>
                    <button class="btn btn-primary">
                        <Plus class="w-4" /> add order
                    </button>
                </div>

            </div>

            <div class="w-full flex-1 bg-glass-effect flex flex-col overflow-hidden">
                <div class="w-full h-16 px-3 pt-3">
                    <div class="w-full h-full bg-[var(--color-background)] rounded-lg px-3 py-2">
                        <resizable-container />
                    </div>
                </div>
                <div class="w-full flex-1 bg-red--00"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import resizableContainer from '@/components/commun/resizableContainer.vue';
import topAppBar from '@/components/navigation/topAppBar.vue';
import { ListFilter, Plus } from 'lucide-vue-next';
</script>

<style lang="scss" scoped></style>