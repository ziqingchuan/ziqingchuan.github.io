---
title: Vue2与Vue3的区别
createTime: 2025/06/30 21:32:17
permalink: /article/f5d1n6ab/
tags: 
  - Vue
excerpt: 淘天一面问到这个，说的有点草率，这次梳理一下具体区别。
---

## 一、响应式系统重构：从 `Object.defineProperty` 到 `Proxy`

| 特性 | Vue2 | Vue3 |
|------|------|------|
| 核心 API | `Object.defineProperty` | `Proxy` |
| 监听范围 | 仅能监听对象属性的读写 | 可监听对象新增/删除属性、数组索引/长度变化 |
| 初始化性能 | 需递归遍历对象所有属性 | 懒代理（访问时才递归子属性） |
| 数组处理 | 需重写数组原型方法（如 `push`、`splice`） | 原生数组方法直接触发响应 |

**核心优势**：  
Vue3 的 `Proxy` 实现解决了 Vue2 中著名的"响应式遗漏"问题，例如：
- 无需再用 `Vue.set(obj, key, value)` 新增响应式属性
- 直接修改数组索引（`arr[0] = 1`）或长度（`arr.length = 0`）会触发更新


## 二、组件写法：Options API 与 Composition API

### Vue2：Options API
通过固定选项（`data`、`methods`、`computed` 等）组织代码，逻辑分散在不同选项中：

```js
export default {
  data() {
    return { count: 0 }
  },
  methods: {
    increment() { this.count++ }
  },
  computed: {
    doubleCount() { return this.count * 2 }
  }
}

```

### Vue3：Composition API（推荐）
通过 `setup` 函数或 `<script setup>` 语法，按功能逻辑组织代码，解决"关注点分散"问题：
```vue
<script setup>
import { ref, computed } from 'vue'

// 计数器相关逻辑（可抽离为独立函数）
const count = ref(0)
const increment = () => { count.value++ }
const doubleCount = computed(() => count.value * 2)
</script>
```


## 三、生命周期钩子变化

Vue3 保留了大部分生命周期概念，但命名和使用方式有调整，且与 Composition API 配合更紧密：

| Vue2 选项式 | Vue3 组合式（setup 中） | 说明 |
|-------------|---------------------------|------|
| beforeCreate | 无（setup 执行时等效） | 初始化前 |
| created | 无（setup 执行时等效） | 初始化后 |
| beforeMount | onBeforeMount | 挂载前 |
| mounted | onMounted | 挂载后 |
| beforeUpdate | onBeforeUpdate | 更新前 |
| updated | onUpdated | 更新后 |
| beforeDestroy | onBeforeUnmount | 卸载前（命名更准确） |
| destroyed | onUnmounted | 卸载后（命名更准确） |


## 四、模板语法增强

### 4.1 多根节点支持（Fragment）
Vue2 模板要求***单一根节点***，Vue3 _**支持多根节点**_，无需额外包裹。

### 4.2 指令与修饰符变化

- `v-model` 重构：==Vue3 统一了组件内外双向绑定逻辑，替代 Vue2 的 `.sync` 修饰符==

- `v-if` 与 `v-for` 优先级：==Vue3 中 `v-if` 优先级高于 `v-for`（避免逻辑混淆）==

- 新增 `v-memo` 指令：缓存模板片段，优化高频更新场景


## 五、性能优化

1. **打包体积减小**：  
   Vue3 移除了部分不常用 API（如 filter），通过 Tree-Shaking 减少打包体积（约减小 40%）。

2. **渲染性能提升**：
    - 引入虚拟 DOM 重写，减少不必要的节点对比
    - 静态节点提升（hoistStatic）：将静态内容编译为常量，避免重复创建
    - 事件缓存（cacheHandlers）：相同事件处理器复用，减少重新绑定

3. **运行时优化**：
    - 响应式系统的懒代理机制，初始化性能更好
    - 组件更新粒度更精确，减少无关组件重渲染


## 六、其他重要差异

| 特性 | Vue2 | Vue3 |
|------|------|------|
| 入口文件 | `new Vue()` 创建实例 | `createApp()` 创建应用 |
| 全局 API | 挂载在 Vue 构造函数上（如 `Vue.use`） | 需从 vue 导入（如 `app.use`） |
| 过滤器（`filter`） | 支持 | 移除（推荐用计算属性替代） |
| 组件 `emits` | 无明确声明（通过 `this.$emit`） | 需在 `emits` 选项中声明（更规范） |
| 插槽语法 | slot 属性 + `slot-scope` | `v-slot` 指令（简化为 #） |