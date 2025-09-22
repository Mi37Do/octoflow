<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

const chartRef = ref(null);
let chartInstance = null;

onMounted(() => {
  if (!chartRef.value) return;
  chartInstance = echarts.init(chartRef.value);

  // ✅ Generate demo data
  let xAxisData = [];
  let data1 = [];
  let data2 = [];
  let data3 = [];
  let data4 = [];
  for (let i = 0; i < 10; i++) {
    xAxisData.push("Class" + i);
    data1.push(+(Math.random() * 2).toFixed(2));
    data2.push(+(Math.random() * 5).toFixed(2));
    data3.push(+(Math.random() + 0.3).toFixed(2));
    data4.push(+Math.random().toFixed(2));
  }


  const option = {
    legend: {
      data: ["bar", "bar2", "bar3", "bar4"],
      left: "10%",
    },
    brush: {
      //   toolbox: ["rect", "polygon", "lineX", "lineY", "keep", "clear"],
      xAxisIndex: 0,
    },
    toolbox: {
      feature: {
        magicType: { type: ["stack"] },
        dataView: {},
      },
    },
    tooltip: {},
    xAxis: {
      data: xAxisData,
      name: "X Axis",
      axisLine: { onZero: true },
      splitLine: { show: false },
      splitArea: { show: false },
    },
    yAxis: {},
    grid: {
      bottom: 100,
    },
    series: [
      {
        name: "bar",
        type: "bar",
        stack: "one",
        data: data1,
        color: '#fcd34d'
      },
      {
        name: "bar2",
        type: "bar",
        stack: "one",
        data: data2,
        color: '#6ee7b7'
      },
      {
        name: "bar3",
        type: "bar",
        stack: "two",
        data: data3,
        color: '#93c5fd'
      },
      {
        name: "bar4",
        type: "bar",
        stack: "two",
        data: data4,
        color: '#a5b4fc'
      },
    ],
  };

  chartInstance.setOption(option);

  // ✅ Handle brush selection
  chartInstance.on("brushSelected", (params) => {
    const brushed = [];
    const brushComponent = params.batch[0];
    for (let sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
      const rawIndices = brushComponent.selected[sIdx].dataIndex;
      brushed.push("[Series " + sIdx + "] " + rawIndices.join(", "));
    }

    chartInstance.setOption({
      title: {
        backgroundColor: "#333",
        text: "SELECTED DATA INDICES: \n" + brushed.join("\n"),
        bottom: 0,
        right: "10%",
        width: 100,
        textStyle: {
          fontSize: 12,
          color: "#fff",
        },
      },
    });
  });

  // ✅ Resize handling
  window.addEventListener("resize", () => {
    chartInstance.resize();
  });
});
</script>

<template>
  <div ref="chartRef" class="w-full h-full"></div>
</template>
