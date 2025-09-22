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
        text: "Organization Tree",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove",
      },
      series: [
        {
          type: "tree",
          data: [
            {
              name: "CEO",
              children: [
                {
                  name: "Finance",
                  children: [
                    { name: "Accounts" },
                    { name: "Audit" },
                  ],
                },
                {
                  name: "Production",
                  children: [
                    { name: "Factory A" },
                    { name: "Factory B" },
                  ],
                },
                {
                  name: "Marketing",
                  children: [
                    { name: "Digital" },
                    { name: "Sales" },
                  ],
                },
              ],
            },
          ],
          left: "5%",     // ✅ push tree from left
          right: "20%",   // ✅ add space on right
          top: "5%",
          bottom: "5%",
          orient: "LR",   // ✅ Left to Right layout
          symbol: "circle",
          symbolSize: 16,
          expandAndCollapse: true,
          label: {
            position: "right",   // ✅ labels on the right side of nodes
            verticalAlign: "middle",
            align: "left",
            fontSize: 14,
          },
          leaves: {
            label: {
              position: "right",
              align: "left",
            },
          },
          lineStyle: {
            color: "#cbd5e1",
            width: 2,
          },
          animationDurationUpdate: 750,
        },
      ],
    };

    chartInstance.setOption(option);

    // resize handler
    window.addEventListener("resize", () => {
      chartInstance.resize();
    });
  }
});
</script>

<template>
  <div ref="chartRef" class="w-full h-full"></div>
</template>
