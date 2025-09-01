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

function getVirtualData(startDate, endDate) {
  const start = +echarts.time.parse(startDate);
  const end = +echarts.time.parse(endDate);
  const dayTime = 3600 * 24 * 1000;
  const data = [];

  for (let time = start; time <= end; time += dayTime) {
    data.push([
      echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
      Math.floor(Math.random() * 10000) // 随机生成0-10000的数值
    ]);
  }
  return data;
}
const startDate = '2025-04-27';
const endDate = '2025-09-06';

onMounted(() => {
  const myChart = echarts.init(lineChart.value);

  const option = {
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: function(params) {
        return `
        <div style="padding: 2px 6px;">
          <p>日期：${params.value[0]}</p>
          <p>提交次数：${params.value[1]}</p>
        </div>
      `;
      },
      backgroundColor: 'rgba(255, 255, 255, 0.9)', // 提示框背景
      borderColor: '#ddd', // 提示框边框
      borderWidth: 1,
      textStyle: {
        color: '#333' // 提示框文字颜色
      }
    },

    grid: {
      show: false,
      borderWidth: 0
    },

    visualMap: {
      show: false,
      type: 'continuous',
      min: 0,
      max: 10000,
      left: 'right',
      top: 'center',
      inRange: {
        color: ['#e0f7fa', '#4dd0e1', '#0097a7', '#006064']
      },
      textStyle: {
        color: '#333'
      }
    },

    calendar: {
      range: [startDate, endDate],
      left: 80,
      top: 80,
      right: 80,
      bottom: 80,
      itemStyle: {
        borderWidth: 0.5,
        borderColor: '#e0e0e0'
      },
      yearLabel: {
        show: false
      },
      monthLabel: {
        show: true,
        fontSize: 10,
        color: '#888'
      },
      dayLabel: {
        show: true,
        fontSize: 10,
        color: '#888'
      },
    },

    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: getVirtualData(startDate, endDate),
      itemStyle: {
        borderRadius: 2
      },
      emphasis: {
        itemStyle: {
          borderColor: '#333',
          borderWidth: 1
        },
      }
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
