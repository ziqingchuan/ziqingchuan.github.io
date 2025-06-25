---
title: 深入理解CSS盒模型
tags:
  - CSS
  - 盒模型
createTime: 2025/06/24 12:27:36
permalink: /article/tnfwyeul/
excerpt: 本文系统讲解了CSS盒模型的核心概念，详细解析了内容区、内边距、边框和外边距的作用，通过代码示例对比了标准盒模型和怪异盒模型的差异，并介绍了如何使用box-sizing属性控制盒模型的计算方式。
---
## 基本概念
::: tip 盒模型
在CSS中，每一个元素都被视为一个矩形盒子。这个“盒子”由四个部分（或称四层）组成，分别是：==内容==(content)、==内边距==(padding)、==边框==(border)和==外边距==(margin)。这四层从内到外构成了所谓的**盒模型**。
:::
### 内容区(Content)
- 内容区是放置元素实际内容的地方，如文本或图片。
### 内边距(Padding)
- 内边距是围绕内容周围的透明空间，用来增加内容与其他元素之间的间距。
### 边框(Border)
- 边框位于内边距之外，是围绕元素内容及其内边距的一个可选区域。
### 外边距(Margin)
- 外边距是围绕边框的透明空间，用于控制元素与其他相邻元素之间的距离。
## 示例代码

```html
<style scoped>
.box { /*[!code focus]*/
    width: 300px;/*[!code focus]*/
    height: 150px;/*[!code focus]*/
    padding: 20px;/*[!code focus]*/
    border: 5px solid rgba(12,69,255,0.21);/*[!code focus]*/
    margin: 10px;/*[!code focus]*/
}
.content {
    background-color: rgba(12,69,255,0.21);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>
<div class="box"> /*[!code focus]*/
    <div class="content">/*[!code focus]*/
        <!--[!code focus]-->
        内容区
    </div>/*[!code focus]*/
</div>/*[!code focus]*/
```

下面是一个简单的例子，展示了如何使用这些属性：
::: demo-wrapper title="示例"
<style scoped>
.box {
    width: 300px;
    height: 150px;
    padding: 20px;
    border: 5px solid rgba(12,69,255,0.21);
    margin: 10px;
}
.content {
    background-color: rgba(12,69,255,0.21);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>
<div class="box">
    <div class="content">
        内容区
    </div>
</div>
:::
在这个例子中，整个`.box`的实际宽度为`350px`（`300px` width + 2 * `20px` padding + 2 * `5px` border + 2 * `10px` margin），高度为`200px`。

## 普通盒模型 vs 怪异盒模型

:::warning 区别
在标准盒模型（也称为W3C盒模型）中，元素的总宽度或高度是由内容区、内边距、边框共同决定的;

而在IE早期版本中的“怪异盒模型”中，width和height实际上指的是内容区加上内边距和边框的总宽度或高度。
:::

::: demo-wrapper title="标准盒模型vs怪异盒模型"
<style scoped>
/* 标准盒模型 */
.standard-box {
    width: 300px;
    height: 150px;
    padding: 20px;
    border: 5px solid rgba(12,69,255,0.21);
    margin: 10px;
    box-sizing: content-box; /* 标准盒模型 */
    background-color: rgba(255, 105, 180, 0.2); /* 粉色背景以区分 */
}
/* 怪异盒模型 */
.weird-box {
    width: 300px;
    height: 150px;
    padding: 20px;
    border: 5px solid rgba(12,69,255,0.21);
    margin: 10px;
    box-sizing: border-box; /* 怪异盒模型 */
    background-color: rgba(0, 255, 0, 0.2); /* 绿色背景以区分 */
}
.content {
    background-color: rgba(12,69,255,0.21);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>
<div class="standard-box">
    <div class="content">标准盒模型</div>
</div>
<div class="weird-box">
    <div class="content">怪异盒模型</div>
</div>
:::

代码：
```html
<style scoped>
/* 标准盒模型 */
.standard-box {
    width: 300px;
    height: 150px;
    padding: 20px;
    border: 5px solid rgba(12,69,255,0.21);
    margin: 10px;
    /*[!code focus]*/
    box-sizing: content-box; /* 标准盒模型 */
    background-color: rgba(255, 105, 180, 0.2); /* 粉色背景以区分 */
}
/* 怪异盒模型 */
.weird-box {
    width: 300px;
    height: 150px;
    padding: 20px;
    border: 5px solid rgba(12,69,255,0.21);
    margin: 10px;
    /*[!code focus]*/
    box-sizing: border-box; /* 怪异盒模型 */
    background-color: rgba(0, 255, 0, 0.2); /* 绿色背景以区分 */
}
.content {
    background-color: rgba(12,69,255,0.21);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>

<div class="standard-box">
    <div class="content">标准盒模型</div>/*[!code focus]*/
</div>
<div class="weird-box">
    <div class="content">怪异盒模型</div>/*[!code focus]*/
</div>
```

要切换盒模型，可以使用box-sizing属性：
```css
.box {
    box-sizing: content-box; /*（默认值）表示遵循标准盒模型。*/
    box-sizing: border-box; /*表示遵循IE怪异盒模型。*/
}
```

例如，如果我们想要让一个元素的总宽度始终是300px，无论其内边距和边框是多少，我们可以这样做：

```css
.box {
    width: 300px;
    padding: 20px;
    border: 5px solid black;
    box-sizing: border-box;
}
```
这样，无论.box的内边距和边框有多宽，它的总宽度将始终保持为300px。