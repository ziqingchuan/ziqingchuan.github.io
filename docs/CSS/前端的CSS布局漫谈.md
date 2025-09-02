---
title: 前端的CSS布局漫谈
createTime: 2025/06/24 15:04:36
permalink: /article/q0qiywjp/
tags:
  - CSS
  - 布局
excerpt: 聊一聊Flex布局、Grid布局、rem单位适配、视口单位、浮动布局、定位布局以及表格布局。
---
## Flex（弹性盒子）

::: tip
Flex 是一种一维布局模型，适用于组件内部子元素的排列与对齐。它非常适合用于响应式设计。
:::


### 示例代码

```html
<div class="flex-container">
  <div class="flex-item">项目1</div>
  <div class="flex-item">项目2</div>
  <div class="flex-item">项目3</div>
</div>

<style scoped>
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
}

.flex-item {
  background-color: rgba(100,202,236,0.3);
  padding: 10px;
  margin: 5px;
}
</style>
```
::: demo-wrapper title="flex布局"
<div class="flex-container">
  <div class="flex-item">项目1</div>
  <div class="flex-item">项目2</div>
  <div class="flex-item">项目3</div>
</div>

<style scoped>
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
}

.flex-item {
  background-color: rgba(100,202,236,0.3);
  padding: 10px;
  margin: 5px;
}
</style>
:::

### Flex核心属性体系
Flex布局的核心是“容器-项目”的双层控制模型，所有属性均围绕这两层展开：

#### 1. 容器属性（父元素）
| 属性                  | 作用                                  | 关键值示例                          |
|-----------------------|---------------------------------------|-----------------------------------|
| `flex-direction`      | 定义主轴方向（决定项目排列方向）        | `row`（默认，水平从左到右）、`column`（垂直从上到下）、`row-reverse`、`column-reverse` |
| `justify-content`     | 主轴上的对齐方式                      | `flex-start`（默认）、`center`（居中）、`space-between`（两端对齐）、`space-around`（等距环绕） |
| `align-items`         | 交叉轴上的对齐方式（单行）             | `stretch`（默认，拉伸填充）、`center`（居中）、`flex-end`（末端对齐）、`baseline`（基线对齐） |
| `flex-wrap`           | 项目是否换行                          | `nowrap`（默认，不换行）、`wrap`（换行）、`wrap-reverse`（反向换行） |
| `align-content`       | 交叉轴上的对齐方式（多行，需配合`flex-wrap: wrap`） | `center`、`space-between`、`stretch` |

#### 2. 项目属性（子元素）
| 属性                  | 作用                                  | 关键值示例                          |
|-----------------------|---------------------------------------|-----------------------------------|
| `flex-grow`           | 项目的放大比例（空间有剩余时）        | `0`（默认，不放大）、`1`（等分剩余空间）、`2`（占比是`1`的2倍） |
| `flex-shrink`         | 项目的缩小比例（空间不足时）          | `1`（默认，缩小）、`0`（不缩小，避免内容溢出） |
| `flex-basis`          | 项目的基准尺寸（计算空间前的初始大小） | `auto`（默认，按内容尺寸）、`200px`、`50%` |
| `flex`                | 简写：`grow shrink basis`             | `1`（等价于`1 1 auto`）、`0 0 200px`（固定尺寸，不放大不缩小） |
| `order`               | 项目的排列顺序（数值越小越靠前）      | `0`（默认）、`-1`（提前）、`1`（延后） |
| `align-self`          | 单个项目覆盖容器的`align-items`       | `center`、`flex-end`、`auto`（继承容器） |


## Grid（网格布局）

::: tip
CSS Grid 是二维布局系统，可以同时处理行和列。它是构建复杂页面结构的理想选择。
:::

### 示例代码

```html
<div class="grid-container">
  <div class="grid-item">A</div>
  <div class="grid-item">B</div>
  <div class="grid-item">C</div>
  <div class="grid-item">D</div>
</div>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  border: 1px solid #ccc;
  padding: 10px;
}

.grid-item {
  background-color: rgba(51,241,51,0.23);
  padding: 10px;
  text-align: center;
}
</style>
```

::: demo-wrapper title="grid布局"
<div class="grid-container">
  <div class="grid-item">A</div>
  <div class="grid-item">B</div>
  <div class="grid-item">C</div>
  <div class="grid-item">D</div>
</div>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  border: 1px solid #ccc;
  padding: 10px;
}

.grid-item {
  background-color: rgba(51,241,51,0.23);
  padding: 10px;
  text-align: center;
}
</style>
:::

#### 2. 项目属性（定位与尺寸）
| 属性                  | 作用                                  | 关键值示例                          |
|-----------------------|---------------------------------------|-----------------------------------|
| `grid-column`          | 项目占据的列范围（网格线编号）        | `1 / 3`（从第1列线到第3列线，占2列）、`2 / span 2`（从第2列线开始，跨2列） |
| `grid-row`             | 项目占据的行范围（网格线编号）        | 同`grid-column`，如`1 / 2`（占第1行） |
| `grid-area`            | 关联容器的`grid-template-areas`命名   | `header`（占据容器定义的`header`区域） |
| `justify-self`         | 单个项目覆盖容器的`justify-items`     | `center`、`start` |
| `align-self`           | 单个项目覆盖容器的`align-items`       | `center`、`end` |


## Flex vs Grid：核心差异与适用场景对比
Flex和Grid是现代CSS布局的两大核心，但二者的设计理念和适用场景截然不同，很多开发者会混淆它们的用法。下面从6个维度进行全面对比，帮你快速判断“何时用Flex，何时用Grid”。

### 1. 布局维度：一维 vs 二维
这是二者最本质的区别：
- **Flex**：**一维布局**，仅能沿“主轴”（水平或垂直）排列项目，虽然支持换行（`flex-wrap`），但换行后的多行依然是“一维的延伸”，无法直接控制行与列的交叉关系。  
  例：想让第1行第2个项目和第2行第1个项目对齐，Flex需要手动计算margin/padding，而Grid可直接通过网格线定位。
- **Grid**：**二维布局**，同时控制“行”和“列”的轨道尺寸，项目可以自由占据任意行和列的交叉区域，天然支持复杂的二维结构。

### 2. 控制粒度：“流”式 vs “网格”式
- **Flex**：基于“流布局”，项目会沿主轴自动排列，容器通过`justify-content`/`align-items`控制整体对齐，**适合“不确定项目数量”的场景**（如导航栏菜单、列表项）。  
  例：导航栏的菜单项数量可能动态变化，Flex的`space-between`可自动调整间距，无需修改代码。
- **Grid**：基于“网格轨道”，需先定义行和列的结构（如3行2列），项目再定位到具体网格，**适合“固定结构”的场景**（如页面布局、卡片网格）。  
  例：页面的“头部-侧边栏-主内容-底部”结构固定，Grid的`grid-template-areas`可直接映射该结构，代码更直观。

### 3. 项目关系：独立 vs 关联
- **Flex**：项目之间是“独立”的，仅通过容器的整体规则排列，无法直接定义单个项目与其他项目的位置关系。  
  例：想让项目A在项目B的正下方，Flex需要确保二者在同一列，且中间没有其他项目干扰。
- **Grid**：项目之间通过“网格线”关联，可直接通过`grid-column`/`grid-row`定义项目占据的行列范围，即使项目顺序混乱，也能正确定位。  
  例：HTML中项目A在项目B之后，但通过`grid-row: 1`和`grid-row: 2`，可让A在B上方。

### 4. 适用场景：组件内部 vs 页面整体
| 场景类型                | 推荐布局       | 具体案例                          |
|-------------------------|----------------|-----------------------------------|
| **组件内部布局**        | Flex           | 导航栏菜单、按钮组、卡片内容对齐、表单元素排列 |
| **页面整体布局**        | Grid           | 头部+侧边栏+主内容+底部、仪表盘网格、相册网格 |
| **动态数量项目**        | Flex           | 搜索结果列表、评论列表（数量不固定） |
| **固定结构卡片**        | Grid           | 产品卡片（图片+标题+价格固定排列）、数据看板 |
| **对齐与分布**          | Flex           | 元素居中、两端对齐、等距分布       |
| **跨行列复杂布局**      | Grid           | 不规则卡片网格（如1个项目占2行2列） |

点这里详细了解Flex布局与Grid布局的使用：[flex/Grid布局详细教程——CSDN](https://blog.csdn.net/nihaio25/article/details/125104045)


## rem布局：从原理到实战的完整逻辑
`rem`（Root EM）是基于“根元素（`<html>`）字体大小”的相对单位，是移动端响应式布局的经典方案。很多开发者只知道“设置`<html>`的`font-size`，再用`rem`写样式”，但不理解其底层逻辑和适配原理。

### 1. rem的核心原理
- **定义**：`1rem = <html>元素的font-size值`（默认情况下，浏览器`<html>`的`font-size`为`16px`，因此`1rem = 16px`）。
- **本质**：通过动态修改根元素的字体大小，让所有使用`rem`的元素尺寸“同步缩放”，从而实现“一套样式适配不同屏幕”。

#### 对比其他相对单位
| 单位   | 基准对象                | 特点                                  | 适用场景                          |
|--------|-------------------------|---------------------------------------|-----------------------------------|
| `rem`  | `<html>`的font-size     | 全局统一基准，修改一次影响所有元素    | 移动端整体布局、字体大小          |
| `em`   | 父元素的font-size       | 嵌套时基准会继承，易混乱              | 局部文本调整（如按钮内图标与文字对齐） |
| `vw`   | 视口宽度的1%            | 直接依赖视口，无需JS动态计算          | 全屏布局、固定比例元素            |
| `px`   | 绝对像素                | 固定尺寸，不随屏幕变化                | 边框、固定尺寸图标                |


### 2. rem布局的核心逻辑：“屏幕宽度适配”
移动端适配的核心需求是“让元素尺寸随屏幕宽度等比例缩放”，rem布局通过以下三步实现：

#### 步骤1：设定设计稿基准
假设设计稿宽度为`750px`（常见移动端设计稿尺寸，如iPhone 6/7/8的两倍稿），为了计算方便，通常将设计稿的`100px`对应`1rem`，即：
- 设计稿基准：`750px = 7.5rem`（因为`1rem = 100px`）；
- 开发时换算：设计稿中`200px`的按钮 → 代码中`2rem`；设计稿中`32px`的字体 → 代码中`0.32rem`。


#### 步骤2：动态计算根元素font-size
根据“当前屏幕宽度”与“设计稿宽度”的比例，动态修改`<html>`的`font-size`，确保`1rem`在不同屏幕上的实际像素值与屏幕宽度成比例。

##### 核心公式
```
根元素font-size = (当前屏幕宽度 / 设计稿宽度) × 设计稿中1rem对应的像素值
```

以“设计稿750px，1rem=100px”为例，公式简化为：
```
根元素font-size = 当前屏幕宽度 / 7.5
```
- 当屏幕宽度为`750px`（设计稿尺寸）：`font-size = 750 / 7.5 = 100px` → `1rem=100px`（完全匹配设计稿）；
- 当屏幕宽度为`375px`（iPhone 6/7/8实际宽度）：`font-size = 375 / 7.5 = 50px` → `1rem=50px`（元素尺寸自动缩小为设计稿的1/2）；
- 当屏幕宽度为`414px`（iPhone 11宽度）：`font-size = 414 / 7.5 = 55.2px` → `1rem=55.2px`（元素尺寸按比例放大）。


##### 实现方式：JS动态计算
在页面加载和窗口大小变化时，通过JS执行上述计算，这是rem布局的“核心动作”：
```html
<!-- 放在<head>中，确保优先执行，避免页面闪烁 -->
<script>
// 设计稿宽度（根据实际设计稿修改）
const designWidth = 750;
// 设计稿中1rem对应的像素值（通常设为100，方便计算）
const designRem = 100;

// 计算根元素font-size
function setRootFontSize() {
  // 当前屏幕宽度（考虑横竖屏，取可视区宽度）
  const screenWidth = document.documentElement.clientWidth || window.innerWidth;
  // 按公式计算font-size
  const rootFontSize = (screenWidth / designWidth) * designRem;
  // 设置根元素font-size（可加限制，避免过小或过大）
  if (rootFontSize < 40) { // 最小font-size为40px（避免小屏元素过小）
    document.documentElement.style.fontSize = '40px';
  } else if (rootFontSize > 120) { // 最大font-size为120px（避免大屏元素过大）
    document.documentElement.style.fontSize = '120px';
  } else {
    document.documentElement.style.fontSize = rootFontSize + 'px';
  }
}

// 页面加载时执行
setRootFontSize();
// 窗口大小变化时执行（适配横竖屏切换）
window.addEventListener('resize', setRootFontSize);
// 页面旋转时执行（部分设备需要）
window.addEventListener('orientationchange', setRootFontSize);
</script>
```


#### 步骤3：开发时按设计稿换算rem
有了动态的根元素`font-size`，开发时只需将设计稿的`px`值除以“设计稿中1rem对应的像素值”（如100），即可得到`rem`值。

##### 示例：设计稿750px，实现一个按钮
- 设计稿按钮：宽度`200px`、高度`60px`、字体`32px`、边距`20px`；
- 代码换算：`200/100=2rem`、`60/100=0.6rem`、`32/100=0.32rem`、`20/100=0.2rem`；
- 最终代码：
  ```css
  .btn {
    width: 2rem;
    height: 0.6rem;
    font-size: 0.32rem;
    margin: 0.2rem;
    background-color: #409eff;
    color: white;
    border: none;
    border-radius: 0.08rem; /* 8px / 100 = 0.08rem */
  }
  ```

##### 效率优化：使用CSS预处理器自动换算
手动除以100容易出错，可通过Sass/Less的函数自动换算：
```scss
// Sass函数：px转rem（designRem为设计稿中1rem对应的px值）
$designRem: 100;
@function px2rem($px) {
  @return ($px / $designRem) + rem;
}

// 使用示例
.btn {
  width: px2rem(200); // 自动生成2rem
  height: px2rem(60); // 自动生成0.6rem
  font-size: px2rem(32); // 自动生成0.32rem
}
```


### 3. rem布局的进阶优化
#### 3.1 解决“1px边框”问题
移动端Retina屏幕下，`1px`实际会显示为`2px`（因为屏幕像素密度更高），rem布局中可通过“transform缩放”解决：
```css
/* 1px下边框 */
.border-bottom {
  position: relative;
}
.border-bottom::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: #ccc;
  /* 按设备像素比缩放 */
  transform: scaleY(1 / window.devicePixelRatio);
  transform-origin: bottom;
}
```


#### 3.2 避免字体过大/过小：限制根元素font-size范围
在步骤2的JS代码中，我们已经加了`40px~120px`的限制，原因是：
- 小屏设备（如320px宽度）：若不限制，`font-size=320/7.5≈42.6px`，字体和元素不会过小；
- 大屏设备（如平板1024px宽度）：若不限制，`font-size=1024/7.5≈136.5px`，元素会过大，影响体验。


#### 3.3 结合媒体查询：适配特殊屏幕
对于平板等超大屏设备，可通过媒体查询覆盖rem布局，切换为固定布局：
```css
/* 屏幕宽度≥768px时（平板），使用固定px布局 */
@media (min-width: 768px) {
  html {
    font-size: 16px !important; /* 重置为默认16px，避免rem过大 */
  }
  .container {
    width: 750px; /* 固定容器宽度，居中显示 */
    margin: 0 auto;
  }
  .btn {
    width: 200px !important; /* 覆盖rem值，使用固定px */
    height: 60px !important;
  }
}
```


### 4. rem布局的优缺点与替代方案
#### 4.1 优点
- **兼容性好**：支持iOS 6+、Android 4.4+，覆盖绝大多数移动设备；
- **灵活性高**：一套样式适配所有屏幕，无需为不同设备写多套代码；
- **易于理解**：基于“比例换算”的逻辑，开发成本低。


#### 4.2 缺点
- **依赖JS**：必须通过JS动态计算`font-size`，若JS加载失败，布局会错乱；
- **精度问题**：不同屏幕下`font-size`可能为小数（如55.2px），导致元素尺寸有细微偏差；
- **不适合复杂布局**：对于需要“固定比例”（如16:9图片）的场景，`vw`单位更直接。


#### 4.3 替代方案对比
| 方案         | 核心逻辑                  | 适用场景                          | 缺点                              |
|--------------|---------------------------|-----------------------------------|-----------------------------------|
| **rem布局**  | JS动态修改根元素font-size | 移动端整体布局、中小屏适配        | 依赖JS，大屏适配需额外处理        |
| **vw布局**   | 1vw=视口宽度1%，无需JS    | 全屏布局、固定比例元素（如Banner）| 兼容性稍差（iOS 8+、Android 4.4+）|
| **Flex+vw**  | Flex负责排版，vw负责尺寸  | 组件内部布局+响应式尺寸          | 复杂布局需结合Grid                |
