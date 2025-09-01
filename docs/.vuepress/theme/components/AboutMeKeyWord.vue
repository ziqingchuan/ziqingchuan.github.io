<template>
  <div class="about-me-card-bg vp-blog-post-item about-me-contribution">
    <div style="margin-left: 20px">
      <p class="about-me-card-title-normal">博客关键词</p>
    </div>
    <div ref="wordCloudChart" class="chart-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
// 引入词云扩展
import 'echarts-wordcloud';

const wordCloudChart = ref(null);

onMounted(() => {
  const myChart = echarts.init(wordCloudChart.value);
  const wordData = [
    { name: 'LangChain', value: 1 },
    { name: 'AI', value: 2 },
    { name: 'Vue', value: 7 },
    { name: 'React', value: 1 },
    { name: '实习', value: 2 },
    { name: '总结', value: 2 },
    { name: '排序', value: 1 },
    { name: '复杂度分析', value: 1 },
    { name: 'Cookie', value: 1 },
    { name: 'Session', value: 1 },
    { name: '正则表达式', value: 1 },
    { name: '字符串', value: 4 },
    { name: '前端开发', value: 10 },
    { name: 'Vite', value: 1 },
    { name: 'Webpack', value: 1 },
    { name: 'TCP', value: 1 },
    { name: 'UDP', value: 1 },
    { name: '进程', value: 1 },
    { name: '线程', value: 1 },
    { name: '缓存', value: 1 },
    { name: 'HTTP', value: 4 },
    { name: '机器学习', value: 2 },
    { name: '模型训练', value: 1 },
    { name: 'JavaScript', value: 10 },
    { name: '事件', value: 3 },
    { name: 'html', value: 4 },
    { name: '数据类型', value: 1 },
    { name: '虚拟DOM', value: 1 },
    { name: '路由', value: 1 },
    { name: '箭头函数', value: 1 },
    { name: 'this', value: 1 },
    { name: 'SEO', value: 1 },
    { name: 'SPA', value: 1 },
    { name: '安全', value: 1 },
    { name: '性能优化', value: 1 },
    { name: '闭包', value: 1 },
    { name: '柯里化', value: 1 },
    { name: '数组', value: 3 },
    { name: '流式传输', value: 1 },
    { name: 'SSE', value: 1 },
    { name: 'RAG', value: 1 },
    { name: '宏任务', value: 1 },
    { name: '微任务', value: 1 },
    { name: '浏览器', value: 4 },
    { name: '域名解析', value: 1 },
    { name: '跨域', value: 3 },
    { name: '代理', value: 1 },
    { name: 'nextTick', value: 1 },
    { name: 'CSS', value: 3 },
    { name: '布局', value: 2 },
    { name: '双向绑定', value: 1 },
    { name: '重绘&重排', value: 1 },
    { name: 'HTTPS', value: 4 },
    { name: '生命周期', value: 1 },
    { name: 'BFC', value: 1 },
    { name: '盒模型', value: 1 },
    { name: '响应式函数', value: 1 },
    { name: '同步&异步', value: 2 },
    { name: 'Promise', value: 1 },
    { name: '防抖', value: 1 },
    { name: '节流', value: 1 },
    { name: '深拷贝', value: 1 },
    { name: '浅拷贝', value: 1 },
    { name: '简历', value: 1 },
    { name: '组件传参', value: 1 },
    { name: 'markdown', value: 1 },
    { name: '教程', value: 1 }
  ];

  const option = {
    series: [
      {
        type: 'wordCloud',
        // 词云的形状，还可以是 'circle', 'cardioid', 'diamond' 等
        shape: 'diamond',
        left: 'center',
        top: 'center',
        width: '80%',
        height: '80%',
        // 文字大小范围
        sizeRange: [20, 40],
        rotationRange: [-0, 0],
        // 文字旋转概率等配置
        // rotationStep: 10,
        textStyle: {
          // 文字颜色可以配置为渐变等，这里简单示例
          color: function () {
            return 'rgb(' + [
              Math.round(Math.random() * 255),
              Math.round(Math.random() * 255),
              Math.round(Math.random() * 255)
            ].join(',') + ')';
          }
        },
        emphasis: {
          focus: 'self',
        },
        data: wordData
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
