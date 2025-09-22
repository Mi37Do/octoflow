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
        text: "Sankey with Levels",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove",
      },
      series: [
        {
          type: "sankey",
          layout: "none",
          emphasis: {
            focus: "adjacency",
          },
          data: [
            { name: "A" },
            { name: "B" },
            { name: "C" },
            { name: "D" },
            { name: "E" },
          ],
          links: [
            { source: "A", target: "B", value: 5 },
            { source: "A", target: "C", value: 3 },
            { source: "B", target: "D", value: 8 },
            { source: "C", target: "D", value: 2 },
            { source: "C", target: "E", value: 2 },
          ],
          levels: [
            {
              depth: 0, // ✅ Level 0 (first column)
              itemStyle: {
                color: "#5470C6",
                borderWidth: 1,
                borderColor: "#fff",
              },
              lineStyle: {
                color: "source",
                opacity: 0.6,
              },
            },
            {
              depth: 1, // ✅ Level 1
              itemStyle: {
                color: "#91CC75",
                borderWidth: 1,
                borderColor: "#fff",
              },
              lineStyle: {
                color: "source",
                opacity: 0.5,
              },
            },
            {
              depth: 2, // ✅ Level 2
              itemStyle: {
                color: "#FAC858",
                borderWidth: 1,
                borderColor: "#fff",
              },
              lineStyle: {
                color: "source",
                opacity: 0.4,
              },
            },
          ],
          lineStyle: {
            curveness: 0.5,
          },
        },
      ],
    };

    chartInstance.setOption(option);

    // Resize handling
    window.addEventListener("resize", () => {
      chartInstance.resize();
    });
  }
});
</script>

<template>
  <div ref="chartRef" style="width: 100%; height: 500px;"></div>
</template>
