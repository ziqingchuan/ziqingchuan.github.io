---
title: 详解CSS动画
createTime: 2025/09/02 09:37:51
permalink: /article/w377q62e/
tags: 
  - CSS
  - 动画
excerpt: 详细介绍关于CSS动画的基本知识。
---
动画是提升用户体验的核心手段之一，而CSS动画凭借其轻量、高性能的特性，成为前端开发中实现动效的首选方案。本文将从CSS动画的核心概念出发，逐步深入到关键帧动画、过渡动画、常用属性及实战技巧，帮助你系统掌握CSS动画的设计与实现。

## 一、CSS动画的核心概念
CSS动画主要通过两大技术实现：**过渡动画（Transition）** 和**关键帧动画（Animation）**。二者的核心区别在于控制粒度和适用场景：

| 特性                | 过渡动画（Transition）       | 关键帧动画（Animation）       |
|---------------------|------------------------------|------------------------------|
| 触发方式            | 需通过状态变化触发（如hover、class切换） | 无需触发，可自动执行、循环播放 |
| 动画阶段            | 仅支持“开始-结束”两帧过渡      | 支持多帧自定义（0%~100%）     |
| 控制灵活性          | 较低（仅能控制开始/结束状态）  | 极高（支持循环、方向、暂停等） |
| 适用场景            | 简单交互动效（如按钮hover、弹窗淡入） | 复杂独立动效（如加载动画、Banner轮播） |


## 二、基础：过渡动画（Transition）—— 简单动效的首选
过渡动画是实现“状态切换时平滑过渡”的最简单方式，无需定义复杂帧，仅需指定“过渡属性”“时长”等核心参数。


### 2.1 核心属性
过渡动画的核心由4个属性控制，也可通过`transition`简写：

| 属性                  | 作用                                  | 可选值示例                          |
|-----------------------|---------------------------------------|-----------------------------------|
| `transition-property` | 指定需要过渡的CSS属性（如width、opacity） | `all`（所有属性）、`width, opacity` |
| `transition-duration` | 过渡持续时间（必须指定，否则无效果）    | `0.3s`、`500ms`                    |
| `transition-timing-function` | 过渡速度曲线（缓动效果）          | `ease`（默认）、`linear`、`ease-in-out` |
| `transition-delay`    | 延迟多久开始过渡                      | `0s`（默认）、`0.5s`               |

**简写语法**：`transition: property duration timing-function delay;`  
示例：`transition: all 0.3s ease 0.1s;`


### 2.2 实战示例：按钮交互动效
通过`hover`触发按钮的背景色、尺寸、阴影过渡，实现自然的交互反馈：

```html
<!-- HTML -->
<button class="btn">点击我</button>
```

```css
/* CSS */
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #409eff;
  color: white;
  font-size: 16px;
  /* 过渡配置：所有属性0.3s缓动 */
  transition: all 0.3s ease;
  cursor: pointer;
}

/*  hover状态：触发过渡 */
.btn:hover {
  background-color: #66b1ff;
  transform: scale(1.05); /* 轻微放大 */
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.4); /* 增加阴影 */
}

/*  active状态：点击反馈 */
.btn:active {
  transform: scale(0.98); /* 轻微缩小 */
}
```

::: demo-wrapper title="效果" padding="20px" height="100%"
<button class="btn">点击我</button>
<style scoped>
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #409eff;
  color: white;
  font-size: 16px;
  /* 过渡配置：所有属性0.3s缓动 */
  transition: all 0.3s ease;
  cursor: pointer;
}
.btn:hover {
  background-color: #66b1ff;
  transform: scale(1.05); /* 轻微放大 */
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.4); /* 增加阴影 */
}
.btn:active {
  transform: scale(0.98); /* 轻微缩小 */
}
</style>
:::

### 2.3 注意事项
- **过渡属性必须可量化**：仅支持 “有数值范围”的属性（如`width`、`opacity`、`transform`）、

`display: none -> block`等无过渡效果。

- **避免使用`all`**：`transition: all`会对所有属性过渡，可能导致性能问题，建议明确指定需要过渡的属性（如`transition: background-color 0.3s`）。


## 三、进阶：关键帧动画（Animation）—— 复杂动效的实现
当需要实现多阶段、自动循环或无需触发的动画时，关键帧动画（`@keyframes`）是最佳选择。它通过定义“关键帧”（`0%`到`100%`的状态），让浏览器自动补间过渡。


### 3.1 核心组成
关键帧动画由两部分构成：
1. **`@keyframes`规则**：定义动画的关键帧状态；
2. **动画属性**：控制动画的播放方式（时长、循环、方向等）。


#### 3.1.1 `@keyframes`规则
通过`from`（等价于`0%`）和`to`（等价于`100%`）定义两帧，或通过百分比定义多帧：

```css
/* 两帧动画：从透明到不透明 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 多帧动画：旋转+缩放 */
@keyframes rotateScale {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.2); }
  100% { transform: rotate(360deg) scale(1); }
}
```


#### 3.1.2 动画属性
通过以下属性控制动画的播放行为，也可通过`animation`简写：

| 属性                  | 作用                                  | 可选值示例                          |
|-----------------------|---------------------------------------|-----------------------------------|
| `animation-name`      | 关联`@keyframes`定义的动画名称         | `fadeIn`、`rotateScale`           |
| `animation-duration`  | 动画持续时间（必须指定）              | `1s`、`2000ms`                    |
| `animation-timing-function` | 动画速度曲线                  | `linear`、`ease-in-out`            |
| `animation-delay`     | 延迟开始时间                          | `0s`、`1s`                        |
| `animation-iteration-count` | 播放次数                  | `1`（默认）、`infinite`（无限循环） |
| `animation-direction` | 播放方向                              | `normal`（默认）、`reverse`（反向）、`alternate`（交替） |
| `animation-fill-mode` | 动画结束后保持的状态                  | `none`（默认）、`forwards`（保持最后一帧）、`backwards`（延迟时保持第一帧） |
| `animation-play-state` | 控制播放/暂停                        | `running`（默认）、`paused`（暂停） |

**简写语法**：`animation: name duration timing-function delay iteration-count direction fill-mode;`  
示例：`animation: fadeIn 1s ease 0.5s infinite alternate forwards;`


### 3.2 实战示例1：加载动画（无限旋转）
实现一个经典的加载动画——无限旋转的圆形进度条：

```html
<!-- HTML -->
<div class="loader"></div>
```

```css
/* CSS */
.loader {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3; /* 浅色边框 */
  border-top: 4px solid #409eff; /* 深色顶部边框 */
  border-radius: 50%; /* 圆形 */
  /* 动画配置：无限旋转，1s线性 */
  animation: spin 1s linear infinite;
}

/* 定义旋转关键帧 */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

::: demo-wrapper title="效果" padding="20px" height="100%"
<style scoped>
.loader {
  width: 40px;
  height: 40px;
  border: 4px solid #c5c5c5; 
  border-top: 4px solid #409eff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
<div class="loader"></div>
:::


### 3.3 实战示例2：Banner轮播动画（多帧交替）
实现一个自动轮播的Banner，包含“淡入-停留-淡出”三阶段动画：

```html
<!-- HTML -->
<div class="banner-container">
  <div class="banner">Banner 1</div>
  <div class="banner">Banner 2</div>
  <div class="banner">Banner 3</div>
</div>
```

```css
/* CSS */
.banner-container {
   position: relative;
   height: 200px;
   overflow: hidden;
}
.banner {
   position: absolute;
   display: flex;
   align-items: center;
   justify-content: center;
   padding: 80px;
   font-size: 32px;
   font-weight: bold;
   color: white;
   opacity: 0;
   animation: bannerAnimation 9s infinite;
}
.banner:nth-child(1) {
   background: linear-gradient(135deg, #409EFF, #337ecc);
   animation-delay: 0s;
}
.banner:nth-child(2) {
   background: linear-gradient(135deg, #67C23A, #529b2e);
   animation-delay: 3s;
}
.banner:nth-child(3) {
   background: linear-gradient(135deg, #F56C6C, #c45656);
   animation-delay: 6s;
}
@keyframes bannerAnimation {
   0% {
      opacity: 0;
      transform: scale(1.05);
   }
   3.33% {
      opacity: 1;
      transform: scale(1);
   }
   30% {
      opacity: 1;
      transform: scale(1);
   }
   33.33% {
      opacity: 0;
   }
   100% {
      opacity: 0;
      transform: scale(1);
   }
}
```
::: demo-wrapper title="效果" padding="20px" height="100%"
<style scoped>
.banner-container {
    position: relative;
    height: 200px;
    overflow: hidden;
}
.banner {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px;
    font-size: 32px;
    font-weight: bold;
    color: white;
    opacity: 0;
    animation: bannerAnimation 9s infinite;
}
.banner:nth-child(1) {
    background: linear-gradient(135deg, #409EFF, #337ecc);
    animation-delay: 0s;
}
.banner:nth-child(2) {
    background: linear-gradient(135deg, #67C23A, #529b2e);
    animation-delay: 3s;
}
.banner:nth-child(3) {
    background: linear-gradient(135deg, #F56C6C, #c45656);
    animation-delay: 6s;
}
@keyframes bannerAnimation {
    0% {
        opacity: 0;
        transform: scale(1.05);
    }
    3.33% {
        opacity: 1;
        transform: scale(1);
    }
    30% {
        opacity: 1;
        transform: scale(1);
    }
    33.33% {
        opacity: 0;
    }
    100% {
        opacity: 0;
        transform: scale(1);
    }
}
</style>
<div class="banner-container">
    <div class="banner">Banner 1</div>
    <div class="banner">Banner 2</div>
    <div class="banner">Banner 3</div>
</div>

:::


### 3.4 高级技巧：动画暂停与控制
通过`animation-play-state`可控制动画的播放/暂停，结合JS实现交互控制：

```html
<!-- HTML -->
<div class="box"></div>
<button onclick="toggleAnimation()">暂停/播放</button>
```

```css
/* CSS */
.box {
  width: 100px;
  height: 100px;
  background-color: #409eff;
  animation: move 3s linear infinite alternate;
}

@keyframes move {
  from { transform: translateX(0); }
  to { transform: translateX(300px); }
}
```

```js
// JS
function toggleAnimation() {
  const box = document.querySelector('.box');
  // 切换动画状态：暂停↔播放
  box.style.animationPlayState = 
    box.style.animationPlayState === 'paused' ? 'running' : 'paused';
}
```
::: demo-wrapper title="效果" padding="20px" height="100%"
<style scoped>
.box {
  width: 100px;
  height: 100px;
  background-color: #409eff;
  animation: move 3s linear infinite alternate;
  animation-play-state: running; /* 确保动画初始为运行状态 */
}
@keyframes move {
  from { transform: translateX(0); }
  to { transform: translateX(300px); }
}
button {
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #409eff;
  color: white;
  font-size: 16px;
  cursor: pointer;
}
</style>
<div class="box"></div>
<button class="btn" onclick="
  const box = document.querySelector('.box');
  box.style.animationPlayState = 
    box.style.animationPlayState === 'paused' ? 'running' : 'paused';
">暂停/播放</button>

:::

## 四、核心属性：Transform—— 动画的“变形”基础
无论是Transition还是Animation，都离不开`transform`属性——它用于实现元素的平移、旋转、缩放、倾斜等变形，且不会影响其他元素的布局（不会触发重排），性能极佳。

### 4.1 常用Transform函数
| 函数                  | 作用                                  | 示例                              |
|-----------------------|---------------------------------------|-----------------------------------|
| `translate(x, y)`     | 平移（x水平，y垂直）                  | `translate(50px, 20px)`、`translateX(50px)` |
| `rotate(angle)`       | 旋转（正角度顺时针）                  | `rotate(45deg)`、`rotate(-90deg)` |
| `scale(x, y)`         | 缩放（x水平，y垂直）                  | `scale(1.2)`（等比缩放）、`scaleX(0.8)` |
| `skew(x-angle, y-angle)` | 倾斜（正角度向右/下倾斜）        | `skew(10deg, 5deg)`、`skewY(-5deg)` |
| `matrix()`            | 复合变形（不推荐直接使用）            | ——                                 |

### 4.2 复合变形与顺序
多个`transform`函数可组合使用，**顺序会影响结果**（先平移再旋转 ≠ 先旋转再平移）：

```css
/* 先平移50px，再旋转45度 */
.box1 { transform: translate(50px) rotate(45deg); }

/* 先旋转45度，再平移50px（方向随旋转改变） */
.box2 { transform: rotate(45deg) translate(50px); }
```


## 五、性能优化：让CSS动画更流畅
CSS动画的性能核心在于**避免触发浏览器的“重排”（Layout）和“重绘”（Paint）**，优先使用“合成层”属性（仅触发“合成”，性能最高）。

详细了解重绘与重排：[点击跳转](/前端开发/重绘与重排.md)

### 5.1 优先使用的属性（高性能）
以下属性修改时仅触发“合成”，不会影响其他元素布局，推荐优先使用：
- `transform`（平移、旋转、缩放等）
- `opacity`（透明度）

### 5.2 避免使用的属性（低性能）
以下属性修改时会触发重排或重绘，尽量避免在动画中使用：
- `width`、`height`、`margin`、`padding`（触发重排）
- `background-color`、`box-shadow`、`color`（触发重绘）

### 5.3 其他优化技巧
1. **使用`will-change`提前声明动画属性**：告诉浏览器该元素将动画，提前优化：
   ```css
   .animated-element { will-change: transform, opacity; }
   ```
2. **限制动画元素数量**：避免同时动画大量元素（如超过20个）。
3. **使用`transform: translateZ(0)`强制创建合成层**：将元素提升到独立合成层，减少重绘范围（谨慎使用，过多合成层会占用内存）。


## 六、常见问题与解决方案
### 6.1 动画在移动设备上卡顿？
- 原因：移动设备GPU性能较弱，或动画触发了重排。
- 解决方案：仅使用`transform`和`opacity`动画，避免`box-shadow`等重绘属性。

### 6.2 动画结束后回到初始状态？
- 原因：默认`animation-fill-mode: none`，动画结束后恢复初始状态。
- 解决方案：设置`animation-fill-mode: forwards`，保持最后一帧状态。

### 6.3 过渡动画不生效？
- 检查是否指定了`transition-duration`（必须大于0）；
- 检查过渡的属性是否可量化（如`display`无法过渡，可用`opacity`+`visibility`替代）；
- 检查是否通过JS动态添加了样式（需确保过渡属性在状态变化前已定义）。


## 七、总结
CSS动画是前端开发中实现动效的高效工具，核心在于根据场景选择合适的技术：
- **简单交互动效**：优先使用`transition`（如hover反馈、弹窗淡入）；
- **复杂循环动效**：使用`@keyframes`+`animation`（如加载动画、Banner轮播）；
- **性能优先**：始终优先使用`transform`和`opacity`实现动画，避免重排重绘。
