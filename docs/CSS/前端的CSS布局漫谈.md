---
title: 🐳前端的CSS布局漫谈
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

点这里详细了解Flex布局与Grid布局的使用：[flex/Grid布局详细教程——CSDN](https://blog.csdn.net/nihaio25/article/details/125104045)

## rem（根元素字体大小）

:::tip
rem 是相对于 html 元素的字体大小进行计算的单位，常用于实现响应式字体大小或适配移动端。
:::
### 示例代码

```html
<div style="font-size: 16px;">
    <h1 style="font-size: 2rem;">标题</h1>
    <p style="font-size: 1rem;">段落文字</p>
</div>
```
::: demo-wrapper title="rem单位"
<div style="font-size: 16px;">
    <h1 style="font-size: 2rem;">标题</h1>
    <p style="font-size: 1rem;">段落文字</p>
</div>
:::
## Viewport（视口单位）

::: tip
vw 和 vh 是基于视口大小的单位，1vw = 视口宽度的1%，1vh = 视口高度的1%。适合全屏滚动、响应式设计等场景。
:::
### 示例代码

```html

<div style="width: 20vw; height: 20vh; background: rgba(240,240,240,0.25); display: flex; align-items: center; justify-content: center;">
    视口
</div>
```
::: demo-wrapper title="viewport单位"
<div style="width: 20vw; height: 20vh; background: rgba(112,78,239,0.32); display: flex; align-items: center; justify-content: center;">
  视口
</div>
:::

## 浮动（Float）

::: tip
浮动是一种早期常用的布局方式，主要用于文本环绕图片或创建多列布局。但需要注意清除浮动。
:::
### 示例代码

```html
<div style="overflow: hidden;">
    <div style="float: left; width: 30%; background: rgba(243,115,137,0.35); padding: 10px;">
        左侧内容
    </div>
    <div style="margin-left: 35%; background: rgba(100,100,241,0.39); padding: 10px;">
        右侧内容
    </div>
</div>
```

::: demo-wrapper title="float布局"
<div style="overflow: hidden;">
  <div style="float: left; width: 30%; background: rgba(243,115,137,0.35); padding: 10px;">
    左侧内容
  </div>
  <div style="margin-left: 35%; background: rgba(100,100,241,0.39); padding: 10px;">
    右侧内容
  </div>
</div>
:::

## 定位（Positioning）

使用 position 属性可以控制元素的定位行为，常见值包括 static, relative, absolute, fixed, sticky。

### 示例代码

```html

<div style="position: relative; width: 300px; height: 200px; border: 1px solid gray;">
    <div style="position: absolute; top: 10px; left: 10px; background: rgba(232,176,72,0.32); padding: 5px;">
        绝对定位
    </div>
</div>
```

::: demo-wrapper title="position布局"
<div style="position: relative; width: 300px; height: 200px; border: 1px solid gray;">
    <div style="position: absolute; top: 10px; left: 10px; background: rgba(232,176,72,0.32); padding: 5px;">
    绝对定位
  </div>
</div>
:::

## 表格布局（Table Layout）

::: tip
虽然不常用，但在某些特定场景下（如表单对齐）依然有效。使用 display: table, table-row, table-cell 等属性。
:::

### 示例代码

```html
<div style="display: table; width: 100%; border-collapse: collapse;">
    <div style="display: table-row;">
        <div style="display: table-cell; border: 3px solid rgba(112,111,111,0.45); padding: 8px;">单元格1</div>
        <div style="display: table-cell; border: 3px solid rgba(112,111,111,0.45); padding: 8px;">单元格2</div>
    </div>
</div>
```
::: demo-wrapper title="table布局"
<div style="display: table; width: 100%; border-collapse: collapse;">
  <div style="display: table-row;">
    <div style="display: table-cell; border: 3px solid rgba(112,111,111,0.45); padding: 8px;">单元格1</div>
    <div style="display: table-cell; border: 3px solid rgba(112,111,111,0.45); padding: 8px;">单元格2</div>
  </div>
</div>
:::
