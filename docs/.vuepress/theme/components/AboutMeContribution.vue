<template>
  <div class="about-me-card-bg vp-blog-post-item about-me-contribution">
    <div style="margin-left: 20px">
      <p class="about-me-card-title-normal">GitHub 贡献</p>
    </div>
    <div ref="lineChart" class="chart-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const lineChart = ref(null);

onMounted(() => {
  const myChart = echarts.init(lineChart.value);

  const option = {
    xAxis: {
      type: 'category',
      data: Array.from({length: 30}, (_, i) => (i + 1).toString()) // 生成1-30的数字作为横轴
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [4,12,0,0,12,27,20,3,3,5,14,0,0,0,0,7,26,4,15,19,21,0,0,22,5,12,1,4,0,3],
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 3,
          color: '#5470C6'
        },
        itemStyle: {
          color: '#5470C6'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(84, 112, 198, 0.5)' },
            { offset: 1, color: 'rgba(84, 112, 198, 0.1)' }
          ])
        }
      }
    ],
    tooltip: {
      trigger: 'axis',
      formatter: 'Day {b}: {c}'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    }
  };


  myChart.setOption(option);

  // 响应式调整
  window.addEventListener('resize', () => {
    myChart.resize();
  });
});
</script>

<style scoped>

.about-me-contribution{
  height: 420px;
  padding: 20px 0;
  overflow: inherit;
}
.chart-container {
  height: 100%;
}
</style>