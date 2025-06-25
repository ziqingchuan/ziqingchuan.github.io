---
title: 🐳深入理解 BFC
tags:
  - CSS
  - BFC
  - 布局
createTime: 2025/06/24 13:27:20
permalink: /article/aqee6mtn/
excerpt: 本文深入解析了CSS中的BFC概念，详细介绍了触发BFC的多种方式及其核心特性。
---
## 什么是 BFC？

::: tip 定义
**BFC（Block Formatting Context）** 是 Web 页面中一块独立的渲染区域，它有一套自己的布局规则，决定了其内部元素如何定位、以及与其他元素之间的关系。
:::

简单来说：
> **BFC 是一个独立的“盒子”，与外部互不影响。**

在 BFC 中，块级元素会一个接一个地==垂直排列==，且不会受到外部浮动元素的影响。

## 如何触发 BFC？

要创建一个 BFC，只需要满足以下任意一种条件：

| 触发方式 | 说明 |
|----------|------|
| `float` 不为 `none` | 如 `float: left/right` |
| `position` 不为 `static` 或 `relative` | 如 `absolute`, `fixed` |
| `display` 为 `inline-block`、`table-cell`、`flex`、`grid`、`flow-root` 等 |
| `overflow` 不为 `visible` | 如 `hidden`, `auto`, `scroll` |
| `box-sizing: border-box` 并不能单独触发 BFC |

### 示例代码

```css
.bfc {
    overflow: hidden; /* 最常用的创建 BFC 方式 */
}
```
## BFC 的特性
- 内部的块级盒子会在垂直方向上一个接一个排列
- 盒子之间垂直方向的距离由 margin 决定
- 每个盒子的左边与包含块的左边相接触
- BFC 是一个隔离的容器，外部元素不会影响内部布局
- BFC 可以阻止外边距折叠（margin collapse）
- BFC 可以包含浮动元素（清除浮动）

## BFC 的常见用途

### 1. 清除浮动 <Badge type="tip" text="防止父元素高度塌陷"/>
::: demo-wrapper title="未清除浮动"
<style scoped>
.parent-no-bfc {
  border: 2px solid #f00;
  padding: 10px;
  background-color: rgba(252,53,53,0.19);
}
.child-no-bfc {
    float: left;
    width: 100px;
    height: 100px;
    background-color: rgba(86,86,246,0.4); 
    margin: 10px;
    border: 1px solid #ccc;
    text-align: center;
}
</style>

<div class="parent-no-bfc">
    <div class="child-no-bfc">Float 1</div>
    <div class="child-no-bfc">Float 2</div>
</div>
:::


::: demo-wrapper title="清除浮动"
<style scoped>
    .parent {
        border: 2px solid #f00;
        padding: 10px;
        background-color: rgba(252,53,53,0.19);
        /*[!code highlight]*/
        overflow: hidden; /* 创建 BFC 来包裹浮动子元素 */
    }
    .child {
        float: left;
        width: 100px;
        height: 100px;
        background-color: rgba(86,86,246,0.4);
        margin: 10px;
        border: 1px solid #ccc;
        text-align: center;
    }
</style>
<div class="parent">
    <div class="child">Float 1</div>
    <div class="child">Float 2</div>
</div> 
:::

代码：
```html
<style scoped>
    .parent {
        border: 2px solid #f00;
        padding: 10px;
        background-color: rgba(252,53,53,0.19);
        /*[!code highlight]*/
        overflow: hidden; /* 创建 BFC 来包裹浮动子元素 */
    }
    .child {
        float: left;
        width: 100px;
        height: 100px;
        background-color: rgba(86,86,246,0.4);
        margin: 10px;
        border: 1px solid #ccc;
        text-align: center;
    }
</style>
<div class="parent">
    <div class="child">Float 1</div>
    <div class="child">Float 2</div>
</div> 
```

### 2. 防止外边距折叠

::: tip 什么是外边距折叠？
当两个相邻块元素都设置了 margin-top 和 margin-bottom，它们之间的间距会被合并为较大的那个值。通过 BFC 可以避免这种现象。
:::

::: demo-wrapper title="外边距折叠"
<style scoped> 
.box {
  padding: 15px;
  border: 1px solid #ccc;
}

.box-a {
  margin-bottom: 20px;
  background-color: rgba(252,53,53,0.19);
}

.box-b {
  margin-top: 30px;
  background-color: rgba(86,86,246,0.4);
}
</style> 
<div class="box box-a">Box A (下外边距20px)</div>
<div class="box box-b">Box B (上外边距30px)</div>
:::


::: demo-wrapper title="防止 Margin 折叠"
<style scoped> 
.box {
  padding: 15px;
  border: 1px solid #ccc;
}
.bfc-container {
  display: flow-root; /* 创建BFC */
}

.box-a {
  margin-bottom: 20px;
}

.box-b {
  margin-top: 30px;
}
</style> 
<div class="bfc-container">
  <div class="box box-a">Box A (下外边距20px)</div>
</div>
<div class="box box-b">Box B (上外边距30px)</div>
:::

代码：
```html
<style scoped>
    .box {
        padding: 15px;
        border: 1px solid #ccc;
    }
    .bfc-container {
        /*[!code highlight]*/
        display: flow-root; /* 创建BFC */
    }

    .box-a {
        margin-bottom: 20px;
    }

    .box-b {
        margin-top: 30px;
    }
</style>
<div class="bfc-container">
    <div class="box box-a">Box A (下外边距20px)</div>
</div>
<div class="box box-b">Box B (上外边距30px)</div>
```

### 3. 实现自适应两栏布局

::: demo-wrapper title="自适应两栏布局"
<style scoped>
.container-bfc {
    /*[!code highlight]*/
    overflow: hidden; /* 创建 BFC */
}
.aside {
    float: left;
    width: 100px;
    background-color: rgba(252,53,53,0.19);
    height: 100px;
    text-align: center;
    border: 1px solid #ccc;
}
.main {
    margin-left: 110px; /* 给 aside 留出空间 */
    background-color: rgba(86,86,246,0.4);
    height: 100px;
    text-align: center;
    border: 1px solid #ccc;
}
</style>

<div class="container-bfc">
    <div class="aside">侧边栏</div>
    <div class="main">主内容区</div>
</div>
:::

代码：
```html
<style scoped>
.container-bfc {
    /*[!code highlight]*/
    overflow: hidden; /* 创建 BFC */
}
.aside {
    float: left;
    width: 100px;
    background-color: rgba(252,53,53,0.19);
    height: 100px;
    text-align: center;
    border: 1px solid #ccc;
}
.main {
    margin-left: 110px; /* 给 aside 留出空间 */
    background-color: rgba(86,86,246,0.4);
    height: 100px;
    text-align: center;
    border: 1px solid #ccc;
}
</style>

<div class="container-bfc">
    <div class="aside">侧边栏</div>
    <div class="main">主内容区</div>
</div>
```

### 4. 防止文字环绕图片

为了防止文字环绕图片，我们可以给图片所在的容器设置 `overflow: hidden` 或其他触发 BFC 的属性。

::: demo-wrapper title="文字环绕图片"
<style scoped>
.float-img {
  float: left;      /* 图片左浮动 */
  width: 50px;      /* 设置宽度 */
  margin-right: 15px; /* 图片右侧留白 */
  margin-bottom: 10px; /* 图片下方留白 */
}

.container {
  border: 1px solid #ccc;
  padding: 15px;
  max-width: 400px; /* 限制容器宽度方便观察 */
}
</style>

<div class="container">
  <img src="/logo.svg" class="float-img" alt="Logo">
  <p>
    这里是环绕图片的文本内容。当图片设置为浮动时，文本会自然地环绕在图片周围。
    这是CSS中常见的图文混排效果。浮动元素会脱离正常文档流，导致容器高度塌陷，
    可能会影响后续元素的布局。观察文本如何围绕浮动的图片排列，形成杂志般的排版效果。
  </p>
</div>
:::

::: demo-wrapper title="防止文字环绕图片"
<style scoped>
/* 保持图片浮动样式不变 */
.float-img {
  float: left;
  width: 50px;
  margin-right: 15px;
  margin-bottom: 10px;
}

/* 创建BFC阻止文字环绕 */
.bfc-content {
  display: flow-root; /* 最干净的BFC创建方式 */
  /* 也可以使用 overflow: hidden; */
}

.container {
  border: 1px solid #ccc;
  padding: 15px;
  max-width: 400px;
}
</style>

<div class="container">
  <img src="/logo.svg" class="float-img" alt="Logo">
  <div class="bfc-content">
    <p>这段文本不再环绕图片，因为它的容器建立了BFC。BFC区域不会与浮动元素重叠，会从下方重新开始布局。这是解决文字环绕问题的有效方法，特别适用于需要控制文本流的情况。</p>
  </div>
</div>
::: 

代码：
```html
<style scoped>
    .float-img {
        float: left;
        width: 50px;
        margin-right: 15px;
        margin-bottom: 10px;
    }
    
    .bfc-content {
        /*[!code highlight]*/
        display: flow-root; /* 最干净的BFC创建方式 */
        /* 也可以使用 overflow: hidden; */
    }

    .container {
        border: 1px solid #ccc;
        padding: 15px;
        max-width: 400px;
    }
</style>

<div class="container">
    <img src="/logo.svg" class="float-img" alt="Logo">
    <div class="bfc-content">
        <p>
            这段文本不再环绕图片，因为它的容器建立了BFC。BFC区域不会与浮动元素重叠，
            会从下方重新开始布局。这是解决文字环绕问题的有效方法，特别适用于需要控制文本流的情况。
        </p>
    </div>
</div>
```