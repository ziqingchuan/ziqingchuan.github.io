<template>
  <div class="about-me-card-bg vp-blog-post-item about-me-lang">
    <div style="margin-left: 20px">
      <p class="about-me-card-title-normal">编程语言</p>
    </div>
    <div ref="chartRef" class="chart-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref(null);

// 示例数据
const langData = [
  { name: 'JavaScript', value: 71.65 },
  { name: 'HTML', value: 14.70 },
  { name: 'TypeScript', value: 9.45 },
  { name: 'Css', value: 3.80 },
  { name: 'GLSL', value: 0.41 },
];
onMounted(() => {
  const myChart = echarts.init(chartRef.value);

  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center',
      textStyle: {
        fontSize: 12,
        color: '#999999'
      }
    },
    series: [
      {
        name: '编程语言',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: 'transparent',
          borderWidth: 5
        },
        label: {
          show: false,
          position: 'center'
        },
        labelLine: {
          show: false
        },
        data: langData
      }
    ]
  };



  myChart.setOption(option);

  // 响应式调整
  window.addEventListener('resize', () => {
    myChart.resize();
  });
});
</script>

<style scoped>

.about-me-lang{
  height: 316px;
  padding: 20px 0;
  overflow: inherit;
}
.chart-container {
  height: 100%;
}
</style>