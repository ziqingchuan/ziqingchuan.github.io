---
title: Vue是如何实现双向绑定的
createTime: 2025/06/24 15:04:03
permalink: /article/9nw00l1b/
tags:
  - Vue
  - 双向绑定
excerpt: 关于双向绑定，一直处于模糊状态，未来会反复打磨这篇文章，加深对双向绑定的理解！
---

## Vue 3 双向绑定的核心原理

Vue 3 依然遵循“数据驱动视图”的理念，但响应式系统的底层实现从 `Object.defineProperty` 改为了 **`Proxy`**，同时保留了依赖收集、Watcher 等核心机制，但流程上更高效。

### 一、响应式系统的底层：Proxy 代理

Vue 3 用 `Proxy` 替代 `Object.defineProperty` 实现数据劫持，这是两者最核心的区别。

#### Proxy 的优势
- **劫持整个对象**：`Object.defineProperty` 需要遍历对象的每个属性单独设置 getter/setter，而 `Proxy` 可以直接代理整个对象，包括新增属性、删除属性等操作（解决了 Vue 2 中对象新增属性无法触发响应的问题）。
- **支持数组劫持**：`Proxy` 可以直接监听数组的变化（如 `push`、`pop` 等方法），无需像 Vue 2 那样重写数组原型方法。
- **更简洁的代码**：无需递归遍历对象的所有属性，实现更高效。

#### 基本用法示例
```javascript
const data = { name: 'Vue 3', age: 3 }
const proxyData = new Proxy(data, {
  // 读取属性时触发
  get(target, key) {
    console.log(`读取了 ${key} 属性`)
    return target[key]
  },
  // 修改属性时触发
  set(target, key, value) {
    console.log(`修改了 ${key} 属性，新值为 ${value}`)
    target[key] = value
    return true // 表示修改成功
  }
})

// 读取属性：触发 get
console.log(proxyData.name) // 输出：读取了 name 属性 → Vue 3

// 修改属性：触发 set
proxyData.age = 4 // 输出：修改了 age 属性，新值为 4
```


### 二、响应式系统的核心流程

Vue 3 的响应式系统依然围绕 **数据劫持 + 依赖收集 + 触发更新** 三个步骤，但实现细节更优化。

#### 1. 数据劫持：Proxy 代理对象
- Vue 3 会对组件的 `data`、`props` 等数据创建 `Proxy` 代理，当数据被访问或修改时，代理会触发对应的拦截方法（`get`/`set`）。
- 对于嵌套对象，Vue 3 会在 `get` 拦截时**懒递归**创建子对象的 Proxy（即只有当访问子属性时才会代理，提升初始化性能）。

#### 2. 依赖收集：Track（追踪依赖）
当数据被访问时（触发 `get` 拦截），Vue 3 会通过 `track` 函数收集依赖，记录“哪些组件/副作用依赖于这个数据”。
- **依赖的载体**：Vue 3 中用 `Effect` 替代了 Vue 2 的 `Watcher`，每个组件的渲染函数、`watch` 监听、`computed` 计算属性等都会被包装成 `Effect`。
- **依赖存储**：依赖会被存储在一个 `targetMap` 结构中，键是被代理的对象，值是该对象所有属性的依赖集合（`depsMap`）。

#### 3. 触发更新：Trigger（触发依赖）
当数据被修改时（触发 `set` 拦截），Vue 3 会通过 `trigger` 函数通知所有依赖该数据的 `Effect` 执行（如重新渲染组件、执行 `watch` 回调等）。


### 三、v-model 双向绑定的实现

Vue 3 中 `v-model` 依然是“语法糖”，但用法和底层绑定逻辑有微调，核心是“数据 → 视图”和“视图 → 数据”的双向同步。

#### 1. 数据 → 视图的绑定
- 当数据变化时，通过 Proxy 的 `set` 拦截触发 `trigger`，通知组件的 `Effect`（渲染函数）重新执行，将新数据渲染到视图中（如输入框的 `value` 属性）。

#### 2. 视图 → 数据的绑定
- `v-model` 会自动给表单元素绑定 `input` 事件（或其他事件，如复选框的 `change`），当用户操作视图（如输入内容）时，事件触发并调用回调函数，将视图中的新值同步到数据中（触发 Proxy 的 `set` 拦截）。

#### 3. Vue 3 中 v-model 的变化
- 移除了 `.sync` 修饰符，统一用 `v-model:prop` 语法实现多个属性的双向绑定（如 `v-model:title`）。
- 对于自定义组件，`v-model` 的默认 prop 从 `value` 改为 `modelValue`，默认事件从 `input` 改为 `update:modelValue`，更直观。

**示例：输入框双向绑定**
```vue
<template>
  <input v-model="message" />
</template>

<script setup>
import { ref } from 'vue'
const message = ref('Hello Vue 3') // ref 会通过 Proxy 包装成响应式数据
</script>
```
- 底层等价于：
  ```vue
  <input 
    :value="message" 
    @input="message = $event.target.value" 
  />
  ```


### 四、与 Vue 2 的核心区别

| 特性                | Vue 2                          | Vue 3                          |
|---------------------|--------------------------------|--------------------------------|
| 数据劫持方式        | `Object.defineProperty`       | `Proxy`                        |
| 响应式数据范围      | 仅能监听已声明的属性          | 可监听新增/删除属性、数组变化  |
| 依赖收集时机        | 初始化时递归遍历所有属性      | 访问属性时懒递归代理          |
| 依赖载体            | `Watcher`                      | `Effect`                       |
| v-model 底层事件    | 固定 `input` 事件 + `value` prop | 可自定义事件（默认 `update:modelValue`） |


## 总结

Vue 3 双向绑定的核心是：
1. 用 `Proxy` 代理数据，实现更全面的劫持；
2. 通过 `track` 收集依赖（`Effect`），`trigger` 触发依赖更新；
3. `v-model` 语法糖封装了“数据→视图”和“视图→数据”的双向同步逻辑。
