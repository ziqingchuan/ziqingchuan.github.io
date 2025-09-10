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
  { name: 'JavaScript', value: 41.32 },
  { name: 'TypeScript', value: 20.45 },
  { name: 'Vue', value: 19.33 },
  { name: 'HTML', value: 14.70 },
  { name: 'Css', value: 4.21 },
];
onMounted(() => {
  const myChart = echarts.init(chartRef.value);

  const option = {
    color: [
        'rgba(255,234,0,0.88)',
      '#2a71be',
      '#31a14b',
      '#d34826',
      '#653398'],
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 0,
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
        padAngle: 1,
        itemStyle: {
          borderRadius: 3,
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
