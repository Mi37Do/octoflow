<template>
  <div ref="chartRef" class="w-full h-full flex flex-col gap-3"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

const chartRef = ref(null);
let chartInstance = null;

onMounted(() => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value);

    const option = {
      title: {
        text: "Sales Over Time",
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Sales",
          type: "line",
          smooth: true,
          data: [120, 200, 150, 80, 70, 110, 130],
        },
      ],
    };

    chartInstance.setOption(option);

    // 🔥 Handle resize
    window.addEventListener("resize", () => {
      chartInstance.resize();
    });
  }
});
</script>

<style lang="scss" scoped></style>
