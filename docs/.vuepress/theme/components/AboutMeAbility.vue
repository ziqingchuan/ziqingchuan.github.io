<template>
  <div class="about-me-card-bg vp-blog-post-item about-me-contribution">
    <div style="margin-left: 20px">
      <p class="about-me-card-title-normal">个人能力评估</p>
    </div>
    <div ref="radarChart" class="chart-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const radarChart = ref(null);

onMounted(() => {
  const myChart = echarts.init(radarChart.value);

  const option = {
    color: ['#FF6B6B'], // 主色调
    radar: {
      shape: 'polygon', // 多边形雷达图
      splitNumber: 4, // 同心圆分割段数
      radius: '65%', // 雷达图大小
      axisName: {
        color: '#999', // 指标文字颜色
        fontSize: 12,
        fontWeight: 'bold'
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(200, 200, 200, 0.5)' // 坐标轴线颜色
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(200, 200, 200, 0.3)' // 分割线颜色
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(255, 255, 255, 0.1)', 'rgba(200, 200, 200, 0.1)'] // 背景交替色
        }
      },
      indicator: [
        { name: '内驱力', max: 110 },
        { name: '专注力', max: 110 },
        { name: '学习能力', max: 110 },
        { name: '沟通能力', max: 110 },
        { name: '执行力', max: 110 },
        { name: '理解能力', max: 110 },
        { name: '团队合作能力', max: 110 },
        { name: '抗压能力', max: 110 }
      ]
    },
    series: [
      {
        name: '能力评估',
        type: 'radar',
        symbol: 'circle', // 数据点形状
        symbolSize: 8, // 数据点大小
        lineStyle: {
          width: 3,
          color: '#FF6B6B' // 线条颜色
        },
        areaStyle: {
          color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.8, [
            {
              offset: 0,
              color: 'rgba(255, 107, 107, 0.8)' // 渐变起始色
            },
            {
              offset: 1,
              color: 'rgba(255, 107, 107, 0.2)' // 渐变结束色
            }
          ])
        },
        data: [
          {
            value: [85, 95, 88, 80, 90, 84, 92, 75],
            name: '当前能力',
            label: {
              show: true,
              formatter: '{c}',
              color: '#999'
            }
          }
        ]
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
.about-me-contribution {
  height: 420px;
  padding: 20px 0;
  overflow: inherit;
}
.chart-container {
  height: 100%;
}
</style>