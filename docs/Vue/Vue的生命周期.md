---
title: Vue的生命周期
createTime: 2025/06/24 15:00:43
permalink: /article/l0oy48ls/
tags:
  - Vue
  - 生命周期
excerpt: 还是只会用onMounted()吗？好好思考一下 Vue 的生命周期吧！
---
Vue 3 的生命周期依然描述了组件从**创建到销毁**的完整过程，但在钩子函数的命名、组合式 API 中的使用方式上与 Vue 2 有显著差异。本文将聚焦 Vue 3 生命周期的核心概念、钩子函数及实际应用。

## 一、Vue 3 生命周期的核心变化
Vue 3 保留了 Vue 2 生命周期的核心思想，但在 API 设计上更贴合组合式 API（`setup` 语法），同时移除了部分冗余钩子，新增了更灵活的钩子函数。

| **变化类型**       | **具体说明**                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| **API 风格调整**   | 组合式 API 中通过 `onXxx` 函数注册生命周期钩子（如 `onMounted`），替代 Vue 2 的选项式钩子。 |
| **钩子名称变化**   | 移除 `beforeCreate` 和 `created`，统一由 `setup` 替代；其他钩子前缀统一为 `on`（如 `onMounted`）。 |
| **新增钩子**       | 增加 `onRenderTracked`、`onRenderTriggered` 等用于调试的钩子。                  |


## 二、Vue 3 生命周期阶段与钩子函数
Vue 3 的生命周期仍分为**创建、挂载、更新、卸载**四大阶段，每个阶段对应特定的钩子函数。以下是详细说明：

### 1. 创建阶段：组件初始化
组件实例被创建，响应式数据、方法等初始化完成。  
**核心钩子：`setup`**
- `setup` 是组合式 API 的入口函数，替代了 Vue 2 的 `beforeCreate` 和 `created`。
- 执行时机：在组件实例初始化后、props 解析完成、数据和方法初始化前调用。
- 用途：
  - 初始化响应式数据（`ref`、`reactive`）。
  - 定义方法、计算属性（`computed`）、监听器（`watch`）。
  - 注册生命周期钩子（需在 `setup` 内调用 `onXxx` 函数）。

```javascript
// 示例：setup 中初始化数据并注册钩子
import { ref, onMounted } from 'vue'
setup() {
  const count = ref(0) // 初始化响应式数据
  onMounted(() => { // 注册挂载后钩子
    console.log('组件已挂载')
  })
  return { count } // 暴露数据给模板
}
```


### 2. 挂载阶段：组件渲染到 DOM
组件从模板编译到最终插入 DOM 的过程。  
**核心钩子：**
- **`onBeforeMount`**
  - 执行时机：模板编译完成，但尚未挂载到 DOM 上。
  - 特点：此时无法访问真实 DOM，模板仅存在于内存中。

- **`onMounted`**
  - 执行时机：组件已挂载到 DOM，真实 DOM 节点可用。
  - 用途：
    - 执行依赖 DOM 的操作（如获取元素尺寸、初始化第三方库）。
    - 发起异步请求（如接口数据获取）。
    - 绑定 DOM 事件（如滚动、resize 事件）。

```javascript
import { onBeforeMount, onMounted } from 'vue'
setup() {
  onBeforeMount(() => {
    console.log('即将挂载，DOM 未生成')
  })
  onMounted(() => {
    console.log('已挂载，DOM 可用：', document.getElementById('app'))
  })
}
```


### 3. 更新阶段：数据变化触发重新渲染
当组件的响应式数据变化时，触发视图更新的过程。  
**核心钩子：**
- **`onBeforeUpdate`**
  - 执行时机：数据变化后，DOM 更新前调用。
  - 用途：获取更新前的 DOM 状态（如旧数据对应的 DOM 结构）。

- **`onUpdated`**
  - 执行时机：DOM 已完成更新后调用。
  - 用途：
    - 操作更新后的 DOM（如滚动到最新位置）。
    - 避免在此时修改数据，否则可能触发无限更新循环。

```javascript
import { ref, onBeforeUpdate, onUpdated } from 'vue'
setup() {
  const count = ref(0)
  onBeforeUpdate(() => {
    console.log('更新前的 count：', count.value) // 旧值
  })
  onUpdated(() => {
    console.log('更新后的 count：', count.value) // 新值
  })
  return { count }
}
```


### 4. 卸载阶段：组件从 DOM 中移除
组件被销毁并清理资源的过程。  
**核心钩子：**
- **`onBeforeUnmount`**
  - 执行时机：组件即将卸载，实例仍完全可用。
  - 用途：
    - 清理资源（如清除定时器、取消接口请求）。
    - 解绑全局事件（如 `window.scroll`）。
    - 销毁第三方库实例（如图表、地图）。

- **`onUnmounted`**
  - 执行时机：组件已完全卸载，DOM 节点被移除。
  - 用途：确认资源已清理，执行卸载后的收尾操作（如日志记录）。

```javascript
import { onBeforeUnmount, onUnmounted } from 'vue'
setup() {
  const timer = setInterval(() => console.log('计时中'), 1000)
  onBeforeUnmount(() => {
    clearInterval(timer) // 清理定时器
    console.log('组件即将卸载')
  })
  onUnmounted(() => {
    console.log('组件已卸载，资源已清理')
  })
}
```


### 5. 其他特殊钩子
- **`onErrorCaptured`**  
  捕获子组件抛出的错误，返回 `false` 可阻止错误继续传播。
  ```javascript
  onErrorCaptured((err, instance, info) => {
    console.log('捕获错误：', err, info)
    return false // 阻止错误冒泡
  })
  ```

- **调试钩子**
  - `onRenderTracked`：跟踪渲染时依赖的收集情况（开发环境用）。
  - `onRenderTriggered`：跟踪渲染触发的原因（开发环境用）。


## 三、生命周期执行顺序示例
以下是组件从创建到卸载的完整钩子执行顺序：
1. setup（初始化数据和方法）
2. onBeforeMount（模板编译完成，未挂载）
3. onMounted（DOM 挂载完成）
4. （数据变化）
5. onBeforeUpdate（DOM 更新前）
6. onUpdated（DOM 更新后）
7. （组件卸载触发）
8. onBeforeUnmount（即将卸载，清理资源）
9. onUnmounted（完全卸载）



## 四、Vue 2 与 Vue 3 生命周期对比
| **Vue 2 选项式钩子** | **Vue 3 组合式钩子** | **说明**                     |
|---------------------|---------------------|-----------------------------|
| `beforeCreate`      | `setup`（替代）      | 组件初始化阶段                |
| `created`           | `setup`（替代）      | 数据和方法初始化完成          |
| `beforeMount`       | `onBeforeMount`     | 挂载前，模板编译完成          |
| `mounted`           | `onMounted`         | 挂载完成，DOM 可用            |
| `beforeUpdate`      | `onBeforeUpdate`    | 数据更新，DOM 未更新          |
| `updated`           | `onUpdated`         | DOM 已更新                   |
| `beforeDestroy`     | `onBeforeUnmount`   | 组件即将卸载，清理资源        |
| `destroyed`         | `onUnmounted`       | 组件已卸载                   |


## 五、常见应用场景
1. **数据获取**：在 `onMounted` 中发起接口请求（确保 DOM 准备就绪）。
2. **DOM 操作**：在 `onMounted` 中初始化依赖 DOM 的插件（如 ECharts）。
3. **资源清理**：在 `onBeforeUnmount` 中清除定时器、解绑事件，避免内存泄漏。
4. **错误处理**：用 `onErrorCaptured` 统一捕获子组件错误，提升用户体验。


## 总结
Vue 3 生命周期通过组合式 API 的 `onXxx` 钩子函数，提供了更灵活的组件生命周期管理方式。核心是理解**创建、挂载、更新、卸载**四大阶段的钩子时机，合理利用钩子函数处理数据初始化、DOM 操作和资源清理，从而编写高效、可维护的 Vue 组件。

**关键点回顾**：
- `setup` 替代了 Vue 2 的初始化钩子，是组合式 API 的入口。
- 挂载后操作 DOM 用 `onMounted`，更新后操作 DOM 用 `onUpdated`。
- 卸载前必须清理资源（定时器、事件），避免内存泄漏。