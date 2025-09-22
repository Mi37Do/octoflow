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
        text: "Nightingale Rose Chart",
      },
      color: ["#fca5a5", "#fdba74", "#86efac", "#67e8f9", "#a5b4fc", "#d8b4fe", "#fda4af"], // ✅ global colors
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",  // ✅ horizontal layout
        right: 10,             // ✅ stick to the right side
        top: 0,         // ✅ vertically centered
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: [20, 140], // inner and outer radius
          center: ["50%", "50%"],
          roseType: "area", // "area" or "radius"
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",   // ✅ border color
            borderWidth: 4         // ✅ border thickness
          },
          data: [
            { value: 40, name: "Monday" },
            { value: 33, name: "Tuesday" },
            { value: 28, name: "Wednesday" },
            { value: 22, name: "Thursday" },
            { value: 20, name: "Friday" },
            { value: 15, name: "Saturday" },
            { value: 10, name: "Sunday" },
          ],
        },
      ],
    };

    chartInstance.setOption(option);

    // Handle resize
    window.addEventListener("resize", () => {
      chartInstance.resize();
    });
  }
});
</script>

<template>
  <!-- Chart container -->
  <div ref="chartRef" class="w-full h-full flex flex-col gap-3"></div>
</template>
