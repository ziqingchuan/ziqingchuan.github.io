---
title: 关于虚拟DOM
createTime: 2025/07/02 19:05:39
permalink: /article/4lfh65ud/
tags: 
  - 前端开发
  - 虚拟DOM
excerpt: 虚拟DOM和真实的DOM有什么区别呢？为什么需要虚拟DOM？
---

在现代前端框架（如Vue、React）中，虚拟DOM（Virtual DOM）是提升渲染性能的核心技术之一。它通过在JavaScript中模拟DOM结构，减少直接操作真实DOM的开销，成为高效UI更新的关键。本文将从原理、优势到简易实现，全面解析虚拟DOM的工作机制。

## 一、什么是虚拟DOM？

::: tip 概念
虚拟DOM（Virtual DOM）是**用JavaScript对象模拟的DOM树结构**，它包含了真实DOM的节点信息（标签名、属性、子节点等）。当**页面状态变化时，虚拟DOM会先在内存中计算出前后两次虚拟DOM的差异（Diff算法），再将差异批量更新到真实DOM**，从而避免频繁操作真实DOM带来的性能损耗。
:::

### 真实DOM的性能瓶颈

真实DOM是浏览器渲染引擎的核心部分，它不仅包含节点的结构信息，还关联着样式计算、布局（重排）、绘制（重绘）等复杂操作。直接频繁操作真实DOM会导致：
- 多次触发重排/重绘，引发页面卡顿
- DOM操作API调用成本高（JavaScript引擎与渲染引擎的通信开销）

例如，循环创建1000个列表项，直接操作DOM会触发1000次重排；而通过虚拟DOM，可先在内存中构建完整结构，再一次性更新到真实DOM，仅触发1次重排。


## 二、虚拟DOM的核心原理

虚拟DOM的工作流程可概括为"**三步曲**"：==构建虚拟DOM树=={.note} → ==计算差异（Diff）=={.note} → ==应用差异（Patch）=={.note}。

### 构建虚拟DOM树

虚拟DOM通常是一个嵌套的JavaScript对象，每个节点包含以下核心属性：
- `tag`：标签名（如"div"、"span"）
- `props`：节点属性（如`class`、`style`、`onClick`）
- `children`：子节点数组（包含其他虚拟DOM节点）
- `key`：用于Diff算法识别节点的唯一标识（优化性能）

示例：一个简单的虚拟DOM结构
```js
// 真实DOM
<div class="container">
  <h1>Hello Virtual DOM</h1>
  <p>这是一个示例</p>
</div>

// 对应的虚拟DOM对象
const vnode = {
    tag: "div",
    props: { class: "container" },
    children: [
        {
            tag: "h1",
            props: {},
            children: ["Hello Virtual DOM"]
        },
        {
            tag: "p",
            props: {},
            children: ["这是一个示例"]
        }
    ]
};

```


### 计算差异（Diff算法）

当页面状态变化时（如数据更新），会生成新的虚拟DOM树。==Diff算法的作用是**对比新旧虚拟DOM树，找出需要更新的节点**（而非全量替换）=={.warning}。

#### Diff算法的核心策略

1. **层级比较**：只对比同一层级的节点（DOM树的跨层级移动概率极低，忽略跨层级对比可减少计算量）。
2. **同层节点匹配**：
    - 先通过`key`属性匹配相同节点（`key`是节点的唯一标识，如列表项的`id`）
    - 无`key`时通过标签名和属性粗略匹配
3. **差异类型**：
    - 节点新增/删除
    - 节点属性变化（如`class`、`style`修改）
    - 节点文本内容变化
    - 节点类型变化（如`div`变为`span`，直接销毁旧节点创建新节点）

示例：Diff算法的差异识别

```js
// 旧虚拟DOM
{ tag: "ul", children: [
{ tag: "li", key: 1, children: ["Item 1"] },
{ tag: "li", key: 2, children: ["Item 2"] }
]}

// 新虚拟DOM
{ tag: "ul", children: [
{ tag: "li", key: 2, children: ["Item 2 (updated)"] }, // 属性变化
{ tag: "li", key: 3, children: ["Item 3"] } // 新增节点
]}

// Diff结果：
// 1. key=2的节点：文本内容更新
// 2. key=1的节点：删除
// 3. key=3的节点：新增

```


### 应用差异（Patch操作）

根据Diff算法计算出的差异列表（Patch），将变化批量更新到真实DOM。这一步的核心是==最小化真实DOM操作，只更新必要的节点=={.note}。

示例：Patch操作的执行逻辑
```js
// 差异列表（简化版）
const patches = [
{ type: "UPDATE_TEXT", key: 2, content: "Item 2 (updated)" },
{ type: "REMOVE", key: 1 },
{ type: "ADD", newVnode: { tag: "li", key: 3, children: ["Item 3"] } }
];

// 应用差异到真实DOM
function patch(realDOM, patches) {
    patches.forEach(patch => {
        switch(patch.type) {
            case "UPDATE_TEXT":
                // 找到key=2的真实节点，更新文本
                findRealNodeByKey(realDOM, patch.key).textContent = patch.content;
                break;
            case "REMOVE":
                // 找到key=1的真实节点，移除
                findRealNodeByKey(realDOM, patch.key).remove();
                break;
            case "ADD":
                // 创建新节点并插入
                const newNode = createRealNode(patch.newVnode);
                realDOM.appendChild(newNode);
                break;
        }
    });
}
```

## 三、虚拟DOM的优势

### 提升性能，减少DOM操作

- 真实DOM操作成本高，虚拟DOM将多次分散的DOM操作合并为一次批量操作，减少重排/重绘次数。

    例如：更新10个节点属性，直接操作DOM需10次更新；虚拟DOM计算差异后，一次批量更新即可。

### 抽象DOM操作，简化开发

- 开发者无需手动操作DOM，只需关注数据变化（如Vue的`data`、React的`state`），框架通过虚拟DOM自动处理DOM更新。

  示例：在Vue中修改`this.count = 10`，虚拟DOM会自动更新对应的UI，无需调用`document.getElementById`等API。

### 跨平台兼容性

- 虚拟DOM是JavaScript对象，与具体平台无关。通过不同的"渲染器"，可将虚拟DOM转换为不同平台的视图：
    - 浏览器：转换为真实DOM
    - 移动端：转换为原生组件（如React Native）
    - 服务端：转换为字符串（如SSR中的HTML字符串）

### 支持复杂状态管理

- 当应用状态复杂（如嵌套组件、深层数据）时，虚拟DOM的Diff算法能精准定位变化位置，避免全量渲染。
- 配合响应式系统（如Vue的`reactive`、React的`useState`），可实现数据与UI的自动同步。


## 四、虚拟DOM的局限性

### 并非所有场景都更优

- 对于简单、静态的UI（如纯展示的页面），虚拟DOM的Diff计算可能带来额外开销，性能不如直接操作DOM。 

    例如：一次性渲染1000个静态列表项，直接插入HTML字符串可能比虚拟DOM更快。

### 内存占用增加

- 虚拟DOM需要在内存中维护一份DOM的副本，对于超大型应用（如10万级节点），可能增加内存消耗。


## 五、简易虚拟DOM实现（核心代码）

下面通过一个简化示例，展示虚拟DOM的核心实现（创建虚拟节点、Diff算法、Patch操作）。

### 创建虚拟节点（vnode）

```js
// 函数：创建虚拟节点对象
function h(tag, props = {}, children = []) {
    return { tag, props, children, key: props.key || null };
}

// 示例：创建一个虚拟div节点
const vnode = h(
    "div",
    { class: "box", key: "container" },
    [
        h("h1", {}, ["虚拟DOM示例"]),
        h("p", {}, ["这是一个简易实现"])
    ]
);

```


### 将虚拟节点转换为真实DOM
```js
// 函数：将虚拟节点渲染为真实DOM
function render(vnode) {
    // 文本节点（children为字符串）
    if (typeof vnode === "string") {
        return document.createTextNode(vnode);
    }
    // 元素节点
    const el = document.createElement(vnode.tag);
    // 设置属性
    Object.keys(vnode.props).forEach(key => {
        el.setAttribute(key, vnode.props[key]);
    });
    // 递归渲染子节点
    vnode.children.forEach(childVnode => {
        el.appendChild(render(childVnode));
    });
    return el;
}
```


### Diff算法（简化版，只对比同层节点）
```js
// 函数：对比新旧虚拟节点，返回差异列表
function diff(oldVnode, newVnode) {
    const patches = [];
    // 1. 节点类型不同：直接替换
    if (oldVnode.tag !== newVnode.tag) {
        patches.push({ type: "REPLACE", newVnode });
        return patches;
    }
    // 2. 文本节点：对比内容
    if (typeof oldVnode === "string" && typeof newVnode === "string") {
        if (oldVnode !== newVnode) {
            patches.push({ type: "TEXT", content: newVnode });
        }
        return patches;
    }
    // 3. 对比属性
    const propsPatches = {};
    // 旧属性是否变化
    Object.keys(oldVnode.props).forEach(key => {
        if (oldVnode.props[key] !== newVnode.props[key]) {
            propsPatches[key] = newVnode.props[key];
        }
    });
    // 新属性是否新增
    Object.keys(newVnode.props).forEach(key => {
        if (!oldVnode.props.hasOwnProperty(key)) {
            propsPatches[key] = newVnode.props[key];
        }
    });
    if (Object.keys(propsPatches).length > 0) {
        patches.push({ type: "PROPS", props: propsPatches });
    }
    // 4. 对比子节点（简化版：只对比同索引子节点）
    oldVnode.children.forEach((oldChild, index) => {
        const newChild = newVnode.children[index];
        // 递归对比子节点
        const childPatches = diff(oldChild, newChild);
        if (childPatches.length > 0) {
            patches.push({ type: "CHILDREN", index, patches: childPatches });
        }
    });
    return patches;
}

```


### Patch操作（应用差异到真实DOM）

```js
// 函数：将差异应用到真实DOM
function patch(el, patches) {
    patches.forEach(patch => {
        switch (patch.type) {
            case "REPLACE":
                // 替换节点
                const newEl = render(patch.newVnode);
                el.parentNode.replaceChild(newEl, el);
                break;
            case "TEXT":
                // 更新文本内容
                el.textContent = patch.content;
                break;
            case "PROPS":
                // 更新属性
                Object.keys(patch.props).forEach(key => {
                el.setAttribute(key, patch.props[key]);
                });
                break;
            case "CHILDREN":
                // 递归更新子节点
                patch(el.children[patch.index], patch.patches);
                break;
        }
    });
}
```

## 六、总结：虚拟DOM的价值与未来

虚拟DOM作为现代前端框架的核心技术，其核心价值在于：**通过抽象DOM操作，在性能与开发效率之间取得平衡**。
随着前端技术的发展，虚拟DOM也在不断优化：
- Vue3引入了"编译时优化"，通过静态标记减少Diff计算量
- React推出了Fiber架构，将Diff算法拆分为可中断的小任务，避免主线程阻塞