<template>
  <div class="w-full h-full flex flex-col">
    <top-app-bar />

    <div class="w-full flex-1 p-3 overflow-auto hidden-scrollbar">

      <div class="h-fit  grid grid-cols-4 gap-3">
        <div class="w-full h-full min-h-96 bg-glass-effect p-3  col-span-2">
          <lineChart />
        </div>
        <div class="w-full h-full bg-glass-effect p-3 col-span-2">
          <NightingaleChart />
        </div>
        <div class="w-full h-full bg-glass-effect p-3 col-span-2">
          <LeftToRightTreeChart />
        </div>
        <div class="w-full h-full bg-glass-effect p-3 col-span-2">
          <SankeyLevelsChart />
        </div>
        <div class="w-full h-full  min-h-96 bg-glass-effect p-1.5 col-span-3">
          <ColumnChart />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import ColumnChart from '@/components/dashboard/columnChart.vue';
import LeftToRightTreeChart from '@/components/dashboard/leftToRightTreeChart.vue';
import lineChart from '@/components/dashboard/lineChart.vue';
import NightingaleChart from '@/components/dashboard/nightingaleChart.vue';
import SankeyLevelsChart from '@/components/dashboard/sankeyLevelsChart.vue';
import topAppBar from '@/components/navigation/topAppBar.vue';
</script>

<style lang="scss" scoped></style>
