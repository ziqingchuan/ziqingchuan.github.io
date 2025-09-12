---
title: Sass
createTime: 2025/09/12 10:57:42
permalink: /article/cswikea1/
tags:
  - CSS
  - Sass
excerpt: 详细介绍Sass的相关用法。
---
# Sass 全面指南：现代CSS预处理器的核心概念与实战

## 什么是Sass？

:::tip Sass
Sass（Syntactically Awesome Style Sheets）是一款成熟的CSS预处理器，它扩展了CSS语言，增加了变量、嵌套、混合（mixin）、函数等特性，让CSS编写更高效、更易维护。Sass有两种语法格式：
- SCSS（Sassy CSS） - 使用`.scss`扩展名，完全兼容CSS语法
- 缩进语法（Sass） - 使用`.sass`扩展名，使用缩进代替花括号
:::

## 为什么使用Sass？

### 主要优势
1. <Badge text="变量系统" type="danger"/> - 定义可重用的值
2. <Badge text="嵌套规则" type="danger"/> - 更清晰的组织样式结构
3. <Badge text="混合宏" type="danger"/> - 重用样式代码块
4. <Badge text="函数和运算" type="danger"/> - 在样式表中进行计算
5. <Badge text="模块化" type="danger"/> - 将样式拆分为多个文件
6. <Badge text="继承" type="danger"/> - 共享样式属性

## 核心功能详解

### 1. 变量（Variables）

Sass使用`$`符号声明变量：

```scss
// 定义变量
$primary-color: #3498db;
$secondary-color: #2ecc71;
$font-stack: Helvetica, sans-serif;
$container-width: 1200px;

// 使用变量
body {
  font-family: $font-stack;
  color: $primary-color;
}

.container {
  max-width: $container-width;
  margin: 0 auto;
}
```

### 2. 嵌套（Nesting）

Sass允许嵌套CSS规则，反映HTML结构：

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    
    li {
      display: inline-block;
      
      a {
        text-decoration: none;
        padding: 6px 12px;
        
        &:hover {
          background-color: #eee;
        }
      }
    }
  }
}
```

编译后的CSS：
```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav ul li {
  display: inline-block;
}
nav ul li a {
  text-decoration: none;
  padding: 6px 12px;
}
nav ul li a:hover {
  background-color: #eee;
}
```

### 3. 混合宏（Mixins）

Mixins允许定义可重用的样式块：

```scss
// 定义mixin
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  -ms-border-radius: $radius;
  border-radius: $radius;
}

@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

// 使用mixin
.button {
  @include border-radius(5px);
  @include flex-center;
  padding: 10px 20px;
}

.card {
  @include border-radius(8px);
  @include flex-center;
  flex-direction: column;
}
```

### 4. 继承（Extend/Inheritance）

使用`@extend`共享样式：

```scss
// 基础样式
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

// 特定消息类型
.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}
```

### 5. 运算（Operations）

Sass支持数学运算：

```scss
$base-size: 16px;
$container-width: 1000px;

.container {
  width: $container-width;
  padding: $base-size * 1.5;
}

.sidebar {
  width: $container-width / 3;
}

.column {
  width: (100% / 3) - 2%;
}
```

### 6. 函数（Functions）

Sass内置函数和自定义函数：

```scss
// 使用内置函数
$primary: #3498db;
$primary-dark: darken($primary, 20%);
$primary-light: lighten($primary, 20%);

// 自定义函数
@function em($pixels, $context: 16px) {
  @return ($pixels / $context) * 1em;
}

body {
  font-size: em(16px); // 1em
}

h1 {
  font-size: em(32px); // 2em
}
```

### 7. 控制指令（Control Directives）

#### @if 条件判断
```scss
@mixin theme-colors($theme: light) {
  @if $theme == light {
    background-color: #fff;
    color: #000;
  } @else if $theme == dark {
    background-color: #000;
    color: #fff;
  } @else {
    background-color: gray;
    color: #333;
  }
}

.body {
  @include theme-colors(dark);
}
```

#### @for 循环
```scss
@for $i from 1 through 4 {
  .col-#{$i} {
    width: (100% / 4) * $i;
  }
}
```

#### @each 遍历
```scss
$colors: (primary: blue, secondary: green, accent: red);

@each $name, $color in $colors {
  .text-#{$name} {
    color: $color;
  }
}
```

## 模块化与导入

### 文件组织结构
```
sass/
│
├── abstracts/
│   ├── _variables.scss
│   ├── _mixins.scss
│   └── _functions.scss
│
├── base/
│   ├── _reset.scss
│   ├── _typography.scss
│   └── _utilities.scss
│
├── components/
│   ├── _buttons.scss
│   ├── _cards.scss
│   └── _forms.scss
│
├── layout/
│   ├── _header.scss
│   ├── _footer.scss
│   └── _grid.scss
│
├── pages/
│   ├── _home.scss
│   └── _contact.scss
│
└── main.scss
```

### 使用@import（旧版）或@use（新版）

```scss
// main.scss
@use 'abstracts/variables';
@use 'abstracts/mixins';
@use 'base/reset';
@use 'components/buttons';
@use 'layout/header';
```

## 编译与构建工具

### 常用编译方式
1. **命令行工具**：使用Dart Sass或Node Sass
2. **构建工具集成**：Webpack、Gulp、Grunt
3. **GUI工具**：CodeKit、Prepros、Scout-App
4. **编辑器插件**：VS Code、WebStorm等编辑器的Sass插件

### 示例package.json配置
```json
{
  "scripts": {
    "sass:watch": "sass --watch scss:css",
    "sass:build": "sass scss/main.scss css/main.css --style=compressed",
    "sass:dev": "sass scss/main.scss css/main.css --watch"
  },
  "devDependencies": {
    "sass": "^1.32.0"
  }
}
```

## 总结

Sass极大地提升了CSS的开发体验和维护性，通过变量、嵌套、混合宏、函数等特性，让样式代码更加模块化、可重用和易于维护。无论是小型项目还是大型企业级应用，Sass都能提供强大的样式管理解决方案。

