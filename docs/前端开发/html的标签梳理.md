---
title: html的标签梳理
createTime: 2025/07/02 20:04:00
permalink: /article/b37ttrlc/
tags: 
  - html
  - 前端开发
excerpt: 面试的时候，你能熟练的说出几个呢？
---

HTML（HyperText Markup Language）作为网页的骨架，其标签系统是构建网页结构的基础。本文将系统梳理 HTML 中所有常用标签，按功能分类详解其用法、属性及最佳实践，帮助你全面掌握 HTML 标签的使用精髓。


## 一、文档结构标签：定义页面的整体框架

这类标签用于构建 HTML 文档的基本结构，告诉浏览器页面的组成部分。

### 1. `<html>`：根元素
- 作用：整个 HTML 文档的根容器，所有其他标签都必须嵌套在其中。
- 属性：`lang`（指定文档语言，如 `lang="zh-CN"` 表示中文）。
- 示例：
```html
<html lang="zh-CN">
  <head>...</head>
  <body>...</body>
</html>
```


### 2. `<head>`：文档头部
- 作用：包含文档的元数据（如标题、编码、样式、脚本等），不直接显示在页面上。
- 常用子标签：`<title>`、`<meta>`、`<link>`、`<style>`、`<script>`。

### 3. `<title>`：页面标题
- 作用：定义浏览器标签页显示的标题，也是搜索引擎优化（SEO）的重要元素。
- 示例：
```html
<head>
  <title>HTML 标签详解 - 技术博客</title>
</head>

```

### 4. `<meta>`：元数据标签
- 作用：提供文档的元信息（如编码、作者、描述等），无闭合标签。
- 常用属性：
  - `charset`：指定字符编码（推荐 `UTF-8`）。
  - `name` + `content`：定义元数据名称和内容（如 `name="description"` 用于 SEO 描述）。
  - `http-equiv`：模拟 HTTP 响应头（如 `http-equiv="refresh"` 实现页面自动刷新）。
- 示例：
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="本文详细介绍 HTML 标签的用法">
<meta http-equiv="refresh" content="5;url=https://example.com">

```

### 5. `<link>`：外部资源链接
- 作用：链接外部资源（如 CSS 样式表、图标等），无闭合标签。
- 常用属性：
  - `rel`：指定资源关系（如 `stylesheet` 表示样式表，`icon` 表示图标）。
  - `href`：资源 URL 地址。
  - `type`：资源 MIME 类型（如 `text/css`）。
- 示例：
```html
<link rel="stylesheet" href="styles.css">
<link rel="icon" href="favicon.ico">
```


### 6. `<body>`：文档主体
- 作用：包含页面所有可见内容（文本、图片、链接等），是网页的主体部分。


## 二、文本内容标签：结构化文本与排版

### 1. 标题标签（`<h1>` - `<h6>`）
- 作用：定义不同级别的标题，`<h1>` 最高级（最重要），`<h6>` 最低级。
- 特点：自带加粗和上下外边距，搜索引擎会根据标题层级判断内容结构。
- 示例：
```html
<h1>一级标题（页面主标题）</h1>
<h2>二级标题（章节标题）</h2>
<h3>三级标题（小节标题）</h3>
```


### 2. 段落与换行标签
- `<p>`：定义段落，段落间会自动添加上下间距。
- `<br>`：强制换行（单标签，无闭合）。
- 示例：
```html
<p>这是一个段落，会自动换行并与其他段落保持距离。</p>
<p>这是第二行<br>这是换行后的内容</p>
```


### 3. 文本格式化标签
- `<strong>`：表示重要文本（加粗，语义化标签）。
- `<em>`：表示强调文本（斜体，语义化标签）。
- `<b>`：单纯加粗文本（无语义，不推荐）。
- `<i>`：单纯斜体文本（无语义，不推荐）。
- `<u>`：下划线文本（注意与链接样式区分）。
- `<s>`：删除线文本（表示过时内容）。
- `<code>`：标记代码片段（默认等宽字体）。
- `<pre>`：保留文本格式（包括空格和换行，常用于显示代码块）。
- 示例：
```html
<p>这是<strong>重要内容</strong>，这是<em>强调内容</em>。</p>
<p>原价<s>100元</s>，现价80元。</p>
<pre>
function hello() {
  console.log("保留格式的代码块");
}
</pre>
```


### 4. 引用与列表标签
- `<blockquote>`：长引用（块级元素，会缩进显示），可通过 `cite` 属性指定引用来源 URL。
- `<q>`：短引用（行内元素，自动添加引号）。
- `<ul>`：无序列表（列表项前默认显示圆点）。
- `<ol>`：有序列表（列表项前显示数字或字母），`type` 属性可指定编号类型（1、A、a、I、i）。
- `<li>`：列表项（必须嵌套在 `<ul>` 或 `<ol>` 中）。
- `<dl>`：定义列表（包含术语和解释）。
- `<dt>`：定义术语（与 `<dl>` 配合使用）。
- `<dd>`：术语解释（与 `<dl>` 配合使用，默认缩进）。
- 示例：
```html
<blockquote cite="https://example.com">
  这是一段长引用，通常用于引用大段文字。
</blockquote>
<p>爱因斯坦说过：<q>想象力比知识更重要</q>。</p>

<ul>
  <li>无序列表项1</li>
  <li>无序列表项2</li>
</ul>

<ol type="A">
  <li>有序列表项A</li>
  <li>有序列表项B</li>
</ol>

<dl>
  <dt>HTML</dt>
  <dd>超文本标记语言，用于构建网页结构。</dd>
  <dt>CSS</dt>
  <dd>层叠样式表，用于美化网页。</dd>
</dl>
```



## 三、媒体标签：图片、音频与视频

### 1. 图片标签 `<img>`
- 作用：嵌入图片（单标签）。
- 核心属性：
  - `src`：图片 URL 地址（必填）。
  - `alt`：图片加载失败时的替代文本（必填，利于 SEO 和无障碍访问）。
  - `width`/`height`：图片宽度/高度（单位为像素或百分比，只设置一个会自动保持比例）。
  - `loading`：懒加载控制（`lazy` 表示滚动到可见区域时加载，优化性能）。
- 示例：
```html
<img src="image.jpg" alt="风景图片" width="500" loading="lazy">
```


### 2. 音频标签 `<audio>`
- 作用：嵌入音频文件。
- 核心属性：
  - `src`：音频 URL 地址。
  - `controls`：显示默认播放控件（播放/暂停、音量等）。
  - `autoplay`：自动播放（多数浏览器因用户体验禁用，需配合 `muted` 静音播放）。
  - `loop`：循环播放。
  - `preload`：预加载策略（`none` 不预加载，`auto` 自动预加载）。
- 示例：
```html
<audio src="music.mp3" controls loop>
  您的浏览器不支持音频播放。<!-- 浏览器不支持时显示的文本 -->
</audio>
```


### 3. 视频标签 `<video>`
- 作用：嵌入视频文件。
- 核心属性（除与 `<audio>` 共有的外）：
  - `width`/`height`：视频宽度/高度。
  - `poster`：视频加载前显示的封面图片 URL。
- 示例：
```html
<video src="video.mp4" controls width="800" poster="cover.jpg">
  您的浏览器不支持视频播放。
</video>

```


## 四、链接与导航标签

### 1. 超链接标签 `<a>`
- 作用：创建页面间或页面内的链接，是 HTML 构建网络的核心标签。
- 核心属性：
  - `href`：链接目标 URL（必填），值为 `#` 表示空链接（不跳转）。
  - `target`：链接打开方式（`_self` 本窗口打开，`_blank` 新窗口打开，需配合 `rel="noopener noreferrer"` 提升安全性）。
  - `rel`：定义与目标页面的关系（`noopener` 防止新页面获取原页面控制权）。
  - `download`：指定链接为下载资源（值为文件名，可选）。
- 示例：
```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  访问示例网站（新窗口打开）
</a>
<a href="document.pdf" download="报告.pdf">下载PDF文件</a>
```


### 2. 锚点链接（页面内跳转）
- 作用：跳转到同一页面的指定位置。
- 实现方式：
  - 目标位置添加 `id` 属性（如 `<h2 id="section1">第一部分</h2>`）。
  - 链接 `href` 指向 `#id`（如 `<a href="#section1">跳转到第一部分</a>`）。
- 示例：
```html
<a href="#footer">跳转到页脚</a>
...
<footer id="footer">页脚内容</footer>
```


### 3. 导航标签 `<nav>`
- 作用：定义页面的导航区域（语义化标签），通常包含多个 `<a>` 标签。
- 示例：
```html
<nav>
  <a href="/home">首页</a>
  <a href="/about">关于我们</a>
  <a href="/contact">联系我们</a>
</nav>

```


## 五、容器与结构标签（语义化标签）

HTML 中的容器标签分为**语义化标签**和**通用容器标签**两类。其中，HTML5 重点引入了一系列**语义化容器标签**，其核心价值在于通过标签名直接表达内容的逻辑含义，替代了过去大量依赖无语义 `<div>` 进行布局的方式，使页面结构更清晰、代码更易维护，同时也能帮助搜索引擎和辅助设备（如屏幕阅读器）更好地理解页面内容。


### 1. 核心语义化容器标签（HTML5 重点推荐）
这类标签的名称本身就承载了明确的语义，适用于对应逻辑的内容场景：

- **`<header>`**：表示页面、文章或区域的**头部区域**。通常包含标题（`<h1>`-`<h6>`）、logo、导航菜单、搜索框等内容。  
  示例：页面顶部的网站标题栏、单篇文章的标题区。
- **`<footer>`**：表示页面、文章或区域的**底部区域**。通常包含版权信息、联系方式、隐私政策链接、备案号等内容。  
  示例：页面底部的版权声明栏、文章末尾的作者信息。
- **`<main>`**：表示页面的**核心内容区域**。一个页面只能有一个 `<main>`，用于包裹与页面主题直接相关的内容，排除头部、底部、侧边栏等辅助内容。
- **`<article>`**：表示**独立完整的内容单元**，其内容可单独取出并理解，不依赖页面其他部分。  
  示例：博客文章、新闻报道、论坛帖子、产品详情页的核心介绍。
- **`<section>`**：表示页面中的**章节、区块或主题分组**。通常需要包含一个明确的标题（`<h1>`-`<h6>`），用于将相关内容归类为一个逻辑整体，与 `<article>` 相比更侧重“**部分性**”（依赖上下文）。  
  示例：文章中的“引言”“正文第一部分”“结论”章节、产品页的“规格参数”“用户评价”区块。
- **`<aside>`**：表示**与主内容相关的辅助内容区域**。内容上可独立于主内容，但逻辑上与主内容关联，通常作为侧边栏呈现。  
  示例：文章的“作者简介”“相关推荐”、页面的“热门标签”“广告栏”。
- **`<figure>`**：表示**包含媒体内容（图片、图表、代码块等）的容器**，通常与说明文本搭配使用。
- **`<figcaption>`**：专门为 `<figure>` 中的媒体内容提供**标题或说明文字**，必须嵌套在 `<figure>` 内部。  
  示例：
  ```html
  <figure>
    <img src="chart.png" alt="年度销量图表">
    <figcaption>图1：2024年产品月度销量变化趋势</figcaption>
  </figure>
  ```


### 2. 通用容器标签（无语义，按需补充使用）
虽然语义化标签是推荐方向，但在没有合适语义标签匹配的场景下（如纯粹的布局分组、无明确逻辑含义的容器），仍可使用**无语义的通用容器**，其核心作用是“**分组内容以便样式控制或脚本操作**”：

- **`<div>`**：通用**块级容器**。默认独占一行，主要用于对块级元素进行分组，实现布局或样式批量控制（如包裹多个按钮形成按钮组、作为网格布局的单元格）。
- **`<span>`**：通用**行内容器**。默认与其他行内元素共处一行，主要用于包裹行内文本或行内元素，实现局部样式调整（如给段落中的某个词语加颜色、绑定脚本事件）。


### 3. 语义化标签的核心价值
1. **提升代码可读性**：开发者通过标签名即可快速理解内容结构（如看到 `<article>` 就知道是独立文章），无需依赖注释。
2. **优化 SEO**：搜索引擎可通过语义标签识别页面核心内容，提升相关内容的权重。
3. **增强可访问性**：辅助设备（如屏幕阅读器）可借助语义标签为残障用户提供更清晰的内容导航（如“跳转到主要内容 `<main>`”）。
4. **规范开发标准**：避免团队中因“用 `<div>` 随意包裹”导致的结构混乱问题。

## 六、表格标签

### 1. 基础表格结构
- `<table>`：定义表格。
- `<tr>`：定义表格行（table row）。
- `<th>`：定义表头单元格（table header，默认加粗居中）。
- `<td>`：定义表格数据单元格（table data）。

### 2. 表格属性与辅助标签
- `<caption>`：表格标题（位于表格上方）。
- `<thead>`：表格头部（包含表头行，语义化标签）。
- `<tbody>`：表格主体（包含数据行，语义化标签）。
- `<tfoot>`：表格底部（包含汇总行，语义化标签）。
- `border`：表格边框（值为像素数，HTML5 中推荐用 CSS 控制）。
- `colspan`：单元格跨列合并（如 `colspan="2"` 表示跨两列）。
- `rowspan`：单元格跨行合并（如 `rowspan="2"` 表示跨两行）。

### 3. 示例

```html
<table border="1">
  <caption>学生成绩表</caption>
  <thead>
    <tr>
      <th>姓名</th>
      <th>语文</th>
      <th>数学</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>张三</td>
      <td>90</td>
      <td>85</td>
    </tr>
    <tr>
      <td>李四</td>
      <td colspan="2">缺考</td> <!-- 跨两列 -->
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th>平均分</th>
      <th>90</th>
      <th>85</th>
    </tr>
  </tfoot>
</table>
```



## 七、表单标签

表单是用户与页面交互的核心，用于收集用户输入并提交数据。

### 1. 表单容器 `<form>`
- 作用：定义表单区域，包含所有表单控件。
- 核心属性：
  - `action`：表单提交的目标 URL 地址。
  - `method`：提交方式（`get` 或 `post`，`get` 数据在 URL 中，`post` 数据在请求体中）。
  - `enctype`：表单数据编码类型（上传文件时需设置为 `multipart/form-data`）。
  - `onsubmit`：提交前的事件处理（返回 `false` 可阻止提交）。

### 2. 输入控件 `<input>`
- 作用：接收用户输入（单标签），通过 `type` 属性指定输入类型。
- 常用 `type` 值及属性：
  - `text`：单行文本输入（默认），`maxlength` 限制最大长度。
  - `password`：密码输入（内容隐藏为圆点）。
  - `number`：数字输入，`min`/`max` 限制范围，`step` 设定步长。
  - `email`：邮箱输入（自带基本格式验证）。
  - `tel`：电话输入（移动端会弹出数字键盘）。
  - `url`：URL 输入（自带基本格式验证）。
  - `date`/`time`/`datetime-local`：日期/时间输入（浏览器提供日期选择器）。
  - `checkbox`：复选框，`name` 相同为一组，`value` 为提交值，`checked` 表示默认选中。
  - `radio`：单选按钮，`name` 相同为一组，`checked` 表示默认选中。
  - `file`：文件上传，`multiple` 允许选择多个文件，`accept` 限制文件类型（如 `image/*` 仅图片）。
  - `hidden`：隐藏输入（用户不可见，用于传递额外数据）。
  - `submit`：提交按钮（点击提交表单）。
  - `reset`：重置按钮（点击重置表单为初始状态）。
  - `button`：普通按钮（需配合 JavaScript 实现功能）。

### 3. 其他表单控件
- `<label>`：为表单元素提供标签（点击标签会聚焦到关联控件，提升用户体验），通过 `for` 属性与控件 `id` 关联。
- `<textarea>`：多行文本输入，`rows`/`cols` 设定初始行数/列数，`resize: none` 可禁用大小调整（CSS）。
- `<select>`：下拉选择框，`multiple` 允许多选（按住 Ctrl 键）。
- `<option>`：下拉选项（嵌套在 `<select>` 中），`value` 为提交值，`selected` 表示默认选中。
- `<optgroup>`：对 `<option>` 分组，`label` 为组名。
- `<button>`：按钮（比 `<input type="button">` 更灵活，可包含文本和标签），`type` 为 `submit`（默认）、`reset` 或 `button`。

### 4. 表单示例

```html
<form action="/submit" method="post">
  <label for="username">用户名：</label>
  <input type="text" id="username" name="username" required maxlength="20">

  <label>性别：</label>
  <input type="radio" name="gender" value="male" checked> 男
  <input type="radio" name="gender" value="female"> 女

  <label>爱好：</label>
  <input type="checkbox" name="hobby" value="reading"> 阅读
  <input type="checkbox" name="hobby" value="sports"> 运动

  <label for="birth">出生日期：</label>
  <input type="date" id="birth" name="birth">

  <label for="intro">个人简介：</label>
  <textarea id="intro" name="intro" rows="4" cols="30"></textarea>

  <label for="city">城市：</label>
  <select id="city" name="city">
    <optgroup label="一线城市">
      <option value="beijing">北京</option>
      <option value="shanghai" selected>上海</option>
    </optgroup>
    <optgroup label="二线城市">
      <option value="hangzhou">杭州</option>
      <option value="chengdu">成都</option>
    </optgroup>
  </select>

  <label for="avatar">上传头像：</label>
  <input type="file" id="avatar" name="avatar" accept="image/*">

  <input type="hidden" name="token" value="abc123">

  <button type="submit">提交</button>
  <button type="reset">重置</button>
</form>

```


## 八、其他常用标签

### 1. 特殊符号（实体字符）
HTML 中部分字符有特殊含义（如 `<` 表示标签开始），需用实体字符表示：
- `&lt;`：<（小于号）
- `&gt;`：>（大于号）
- `&amp;`：&（与号）
- `&nbsp;`：空格（非换行空格）
- `&copy;`：©（版权符号）
- `&reg;`：®（注册商标符号）

示例：
```html
<p>公式：a &lt; b &amp; b &gt; c</p>
<p>版权所有 &copy; 2023</p>
```


### 2. 水平线标签 `<hr>`
- 作用：插入一条水平线（单标签），用于分隔内容区块。
- 示例：
```html
<p>第一部分内容</p>
<hr>
<p>第二部分内容</p>

```

### 3. 嵌入外部内容标签
- `<iframe>`：在当前页面嵌入另一个页面（框架页），`src` 为目标页面 URL，`width`/`height` 设定尺寸，`frameborder="0"` 移除边框。
- 示例：
```html
<iframe src="https://example.com" width="800" height="500" frameborder="0"></iframe>

```


## 九、HTML 标签使用原则

1. **语义优先**：优先使用语义化标签（如 `<header>`、`<article>`）而非通用 `<div>`，提升代码可读性和 SEO 友好度。
   
2. **简洁性**：避免不必要的嵌套（如 `<p>` 内不嵌套块级元素），保持标签结构扁平。
   
3. **兼容性**：注意旧浏览器对新标签的支持（如 IE 不支持 HTML5 语义化标签，需通过 JavaScript 定义）。
   
4. **可访问性**：为媒体标签添加替代文本（`<img alt>`），使用 `<label>` 关联表单控件，确保辅助技术（如屏幕阅读器）可正常解析。
   
5. **性能优化**：图片使用 `loading="lazy"` 懒加载，避免过多 `<iframe>` 影响页面加载速度。
