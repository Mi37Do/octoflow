<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <router-view></router-view>
  </div>
</template>

<script setup>
import topAppBar from '@/components/navigation/topAppBar.vue';
import { useWidgetStore } from '@/stores/widget';
import { onMounted } from 'vue';

const useWidget = useWidgetStore()

onMounted(() => {
  useWidget.currentModule = 'administration'
})
</script>

<style lang="scss" scoped></style>
