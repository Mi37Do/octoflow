<template>
  <div class="w-full h-full flex flex-col">
    <top-app-bar />
    <div class="w-full flex-1 overflow-hidden">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import topAppBar from '@/components/navigation/topAppBar.vue';
</script>

<style lang="scss" scoped></style>
