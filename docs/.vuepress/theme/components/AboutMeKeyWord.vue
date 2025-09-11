<template>
  <!-- VitePress/Nuxt 需加 ClientOnly 确保客户端渲染 -->
    <div class="about-me-card-bg vp-blog-post-item about-me-contribution">
      <div style="margin-left: 20px">
        <p class="about-me-card-title-normal">博客关键词</p>
      </div>
      <!-- SVG 容器（比 Canvas 更适合文本渲染，支持矢量缩放） -->
      <svg ref="wordCloudSvg" class="wordcloud-svg"></svg>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
// 仅引入 D3 核心模块（无多余依赖）
import cloud from 'd3-cloud';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';

const wordCloudSvg = ref(null);
let resizeHandler = null;

// 1. 词云数据（text: 关键词，value: 权重，link: 跳转链接）
const wordData = [
  { text: '计算机网络', value: 3 },
  { text: 'LangChain', value: 1 },
  { text: 'AI', value: 2 },
  { text: 'MCP', value: 2 },
  { text: 'Vue', value: 7 },
  { text: 'React', value: 1 },
  { text: '实习', value: 2 },
  { text: '总结', value: 2 },
  { text: '排序', value: 1 },
  { text: '复杂度分析', value: 1 },
  { text: 'Cookie', value: 1 },
  { text: 'Session', value: 1 },
  { text: '正则表达式', value: 1 },
  { text: '字符串', value: 4 },
  { text: '前端开发', value: 10 },
  { text: 'Vite', value: 1 },
  { text: 'TCP', value: 1 },
  { text: 'UDP', value: 1 },
  { text: '进程', value: 1 },
  { text: '线程', value: 1 },
  { text: '缓存', value: 1 },
  { text: 'HTTP', value: 4 },
  { text: '机器学习', value: 2 },
  { text: '模型训练', value: 1 },
  { text: 'JavaScript', value: 10 },
  { text: '事件', value: 3 },
  { text: 'html', value: 4 },
  { text: '数据类型', value: 1 },
  { text: '虚拟DOM', value: 1 },
  { text: '路由', value: 1 },
  { text: '箭头函数', value: 1 },
  { text: 'this', value: 1 },
  { text: 'SEO', value: 1 },
  { text: 'SPA', value: 1 },
  { text: '安全', value: 1 },
  { text: '性能优化', value: 1 },
  { text: '闭包', value: 1 },
  { text: '柯里化', value: 1 },
  { text: '数组', value: 3 },
  { text: '流式传输', value: 1 },
  { text: 'SSE', value: 1 },
  { text: 'RAG', value: 1 },
  { text: '宏任务', value: 1 },
  { text: '微任务', value: 1 },
  { text: '浏览器', value: 4 },
  { text: '域名解析', value: 1 },
  { text: '跨域', value: 3 },
  { text: '代理', value: 1 },
  { text: 'nextTick', value: 1 },
  { text: 'CSS', value: 3 },
  { text: '动画', value: 3 },
  { text: '布局', value: 2 },
  { text: '双向绑定', value: 1 },
  { text: '重绘&重排', value: 1 },
  { text: 'HTTPS', value: 4 },
  { text: '生命周期', value: 1 },
  { text: 'BFC', value: 1 },
  { text: '盒模型', value: 1 },
  { text: '响应式函数', value: 1 },
  { text: '同步&异步', value: 2 },
  { text: 'Promise', value: 1 },
  { text: '防抖', value: 1 },
  { text: '节流', value: 1 },
  { text: '深拷贝', value: 1 },
  { text: '浅拷贝', value: 1 },
  { text: '简历', value: 1 },
  { text: '组件传参', value: 1 },
  { text: 'markdown', value: 1 },
  { text: '教程', value: 1 },
  { text: 'WebSocket', value:2 },
  { text: '编译', value: 1 },
];

// 2. 初始化词云
const initWordCloud = () => {
  // 仅在客户端执行（避免 SSR 报错）
  if (typeof window === 'undefined' || !wordCloudSvg.value) return;

  nextTick(() => {
    const svgElement = wordCloudSvg.value;
    const container = svgElement.parentElement;

    // 容器尺寸（响应式）
    const containerWidth = container.clientWidth * 0.9; // 占父容器90%宽度
    const containerHeight = 350; // 固定高度（可按需调整）

    // 清空 SVG 内容（避免重复渲染）
    select(svgElement).selectAll('*').remove();

    // 字体大小映射：权重 → 字体大小（1-10 → 15-45px）
    const fontSizeScale = scaleLinear()
        .domain([1, Math.max(...wordData.map(d => d.value))]) // 权重范围
        .range([20, 40]); // 字体大小范围

    // 生成词云布局
    cloud()
        .size([containerWidth, containerHeight]) // 词云尺寸
        .words(wordData.map(d => ({
          ...d,
          size: fontSizeScale(d.value) // 计算每个词的字体大小
        })))
        .padding(3) // 词之间的间距
        .rotate(() => 0) // 不旋转（0°）
        .font('Microsoft YaHei, Arial, sans-serif') // 支持中文
        .fontSize(d => d.size) // 字体大小
        .on('end', (layoutWords) => {
          // 布局计算完成后，渲染到 SVG
          renderWordCloud(layoutWords, svgElement, containerWidth, containerHeight);
        })
        .start(); // 启动布局计算
  });
};

// 3. 渲染词云到 SVG
const renderWordCloud = (words, svgElement, width, height) => {
  const svg = select(svgElement)
      .attr('width', width)
      .attr('height', height)
      // 居中对齐词云
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

  // 渲染每个关键词
  svg.selectAll('text')
      .data(words)
      .enter()
      .append('text')
      .attr('text-anchor', 'middle') // 文字居中
      .attr('transform', d => `translate(${d.x}, ${d.y})rotate(${d.rotate})`) // 位置+旋转
      .text(d => d.text)
      .style('font-size', d => `${d.size}px`)
      .style('font-family', 'Microsoft YaHei, Arial')
      .style('cursor', 'pointer') // 鼠标悬停显示指针
      // 完全随机颜色（RGB 0-255）
      .style('fill', () => {
        // 定义红橙黄绿青蓝紫七种颜色的固定值
        const rainbowColors = [
            'rgba(255,0,0,0.76)',
          '#ff9d3c',
          'rgba(207,207,0,0.93)',
          'rgba(54,209,54,0.87)',
          '#00c4ff',
          'rgb(52,115,255)',
          'rgba(181,82,255,0.89)'];
        // 随机选择其中一种颜色
        const color = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
        return color;
      })
      // 鼠标悬浮效果（加粗）
      .on('mouseover', function() {
        select(this).style('font-weight', 'bold');
      })
      .on('mouseout', function() {
        select(this).style('font-weight', 'normal');
      })
      // 点击跳转链接
      .on('click', (e, d) => {
        if (d.link) {
          window.open(d.link, '_blank');
        }
      });
};

// 4. 组件挂载时初始化
onMounted(() => {
  initWordCloud();

  // 响应式调整（窗口大小变化时重新渲染）
  resizeHandler = () => {
    initWordCloud();
  };
  window.addEventListener('resize', resizeHandler);
});

// 5. 组件卸载时清理
onUnmounted(() => {
  if (resizeHandler && typeof window !== 'undefined') {
    window.removeEventListener('resize', resizeHandler);
  }
});
</script>

<style scoped>
.about-me-contribution {
  height: 420px;
  padding: 20px 0;
  overflow: visible;
  position: relative;
}

/* SVG 容器样式 */
.wordcloud-svg {
  display: block;
  margin: 0 auto;
  background-color: transparent;
  border-radius: 8px;
}
</style>
