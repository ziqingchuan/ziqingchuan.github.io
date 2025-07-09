---
title: v-if、v-show、v-for
createTime: 2025/07/02 19:05:07
permalink: /article/b1htjq0a/
tags:
  - Vue
excerpt: 面试经常被问到v-if、v-show、v-for 相关内容，在这里总结一下。
---

## 一、条件渲染：v-if 与 v-show 的本质区别

### 1.1 ==v-if：真正的条件渲染=={.note}

v-if 是 Vue 中最常用的条件渲染指令，它会根据表达式的值**动态创建或销毁DOM元素**。

当条件为 false 时，对应的 DOM 元素及其子元素会被完全移除（从 DOM 树中删除），再次变为 true 时会重新创建。

示例：
```vue
<template>
  <div>
    <button @click="showContent = !showContent">切换显示</button>
    <div v-if="showContent">这是一段动态内容</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const showContent = ref(true)
</script>
```

特性：
- **惰性渲染**：初始条件为 false 时，DOM 元素不会被创建
- **有较高的切换开销**：每次切换都会触发 DOM 元素的创建和销毁
- 支持与 v-else、v-else-if 组合使用（必须连续）

### 1.2 ==v-show：CSS 驱动的显示控制=={.note}

v-show 同样用于条件渲染，但它的实现方式是**通过 CSS 的 display 属性控制元素的显示与隐藏**。

无论条件如何，**DOM 元素始终存在于 DOM 树**中，只是通过 `display: none` 隐藏。

示例：
```vue
<template>
  <div>
    <button @click="showContent = !showContent">切换显示</button>
    <div v-show="showContent">这是一段动态内容</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const showContent = ref(true)
</script>
```
特性：
- **初始渲染开销**：无论条件如何，DOM 元素都会被创建
- **切换开销低**：仅修改 CSS 属性，不涉及 DOM 元素的创建和销毁
- 不支持与 v-else、v-else-if 组合使用

### 1.3 性能对比与适用场景

| 场景 | v-if | v-show |
|------|------|--------|
| 条件不频繁变化 | 更优（初始渲染后无需额外开销） | 较差（始终占用 DOM 空间） |
| 频繁切换条件 | 较差（频繁创建销毁元素） | 更优（仅修改 CSS） |
| 初始条件为 false | 不渲染元素（节省资源） | 渲染但隐藏（浪费资源） |

最佳实践：
- 当条件在运行时很少改变时，优先使用 v-if
- 当需要频繁切换显示状态时，使用 v-show
- 对于嵌套较深的组件，避免初始渲染时条件为 false 的 v-if（减少首次渲染时间）


## 二、列表渲染：v-for 的高级用法与性能优化

### 2.1 v-for 的基本用法

v-for 用于遍历数组或对象，将数据渲染为列表。它的语法为 item in/of iterable，其中 iterable 可以是数组、对象、数字或字符串。

示例 1：遍历数组

```vue
<template>
  <ul>
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'
const items = ref([
  { id: 1, name: '苹果' },
  { id: 2, name: '香蕉' },
  { id: 3, name: '橙子' }
])
</script>

```

示例 2：遍历对象
```vue
<template>
  <div>
    <p v-for="(value, key) in userInfo" :key="key">
      {{ key }}: {{ value }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const userInfo = ref({
  name: '张三',
  age: 30,
  gender: '男'
})
</script>
```


### 2.2 v-for 的索引与参数

v-for 支持获取当前项的索引（数组索引或对象属性顺序），以及第三个参数（对象的键名）。

示例：
```vue
<template>
  <ul>
    <li v-for="(item, index) in items" :key="item.id">
      {{ index }}: {{ item.name }}
    </li>
  </ul>
</template>
```


### 2.3 v-for 与 v-if 的优先级问题

==在 Vue3 中，**v-if 的优先级高于 v-for**; 在 Vue2 中，**v-for 优先级高于 v-if**。

错误示例（性能问题）：
```vue
<template>
  <ul>
    <!-- 错误：每次循环都要计算 shouldShow -->
    <li v-for="item in items" v-if="item.shouldShow" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
</template>

正确做法：
<template>
  <ul>
    <!-- 先过滤数据，再渲染列表 -->
    <li v-for="item in filteredItems" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
</template>

<script setup>
import { computed, ref } from 'vue'
const items = ref([...])
const filteredItems = computed(() => items.value.filter(item => item.shouldShow))
</script>
```


### 2.4 性能优化：避免原地更新数组

Vue3 的响应式系统基于 Proxy，当数组内容变化时，Vue 会自动检测并更新 DOM。但某些操作（如直接修改数组索引）可能导致 Vue 无法检测到变化。

推荐使用以下方法更新数组：
- `push()`、`pop()`、`shift()`、`unshift()`、`splice()`、`sort()`、`reverse()` 等变异方法
- 替换整个数组（如 `items.value = [...items.value, newItem]`）

错误示例：
```js
// 不会触发更新
items.value[0] = { id: 1, name: '新值' }
```


正确示例：
```js
// 方法1：使用 splice
items.value.splice(0, 1, { id: 1, name: '新值' })

// 方法2：替换整个数组
items.value = [
{ id: 1, name: '新值' },
...items.value.slice(1)
]

```


## 三、key：Vue 列表渲染的性能密钥

### 3.1 key 的作用与原理

key 是 v-for 指令中最重要的参数，它用于**帮助 Vue 识别哪些元素发生了变化**。

Vue 默认采用"就地复用"策略，当列表项的顺序发生变化时，==没有 key 的情况下，Vue 会尝试复用相同位置的元素，这可能导致渲染错误或性能问题==。

正确使用 key 后，Vue 会基于 key 的变化重新排列元素顺序，并移除/销毁 key 不存在的元素，从而实现高效更新。

### 3.2 如何正确使用 key

1. **优先使用唯一标识**：如数据库记录的 id、唯一时间戳等
```vue
<template>
  <ul>
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </ul>
</template>
```


2. **避免使用索引作为 key**：当数组顺序变化时，索引会导致 Vue 错误复用元素
```vue
// 错误：不要使用索引作为 key
<li v-for="(item, index) in items" :key="index">{{ item.name }}</li>
```


3. **字符串或数字类型**：key 必须是字符串或数字类型，其他类型会被自动转换
```vue
// 错误：不要使用对象作为 key
<li v-for="item in items" :key="item">{{ item.name }}</li>
```


### 3.3 key 的性能影响

- **无 key 或使用索引作为 key**：
    - 当列表顺序变化时，Vue 会复用 DOM 元素（即使内容不同），可能导致数据与 DOM 不匹配
    - 适合简单静态列表（数据不变且无需维护状态）

- **使用唯一 key**：
    - Vue 会根据 key 的变化准确地添加、删除、移动元素
    - 适合动态列表（数据频繁变化，如增删改查场景）

示例：对比使用 key 与不使用 key 的差异

```text
// 不使用 key 或使用索引作为 key
初始数据：[A, B, C] → 插入 D 后：[D, A, B, C]
Vue 可能会复用原 DOM 元素，导致内容显示为：[D, A, B, C] 但实际数据为 [A, B, C, D]
```

```text
// 使用唯一 key
初始数据：[A(id:1), B(id:2), C(id:3)] → 插入 D(id:4) 后：[D(id:4), A(id:1), B(id:2), C(id:3)]
Vue 会正确插入 D 元素，保持数据与 DOM 一致
```

## 四、v-if、v-show、v-for 的综合应用技巧

### 4.1 在同一元素上避免 v-if 和 v-for

如前所述，v-for 与 v-if优先级不同，可能导致不必要的性能开销。应优先过滤数据而非在循环中使用 v-if。

### 4.2 条件渲染与列表渲染的嵌套

当需要对整个列表进行条件渲染时，将 v-if 放在外层元素上：

```vue
<template>
  <div v-if="showList">
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>
```


### 4.3 动态组件与 v-if 的结合

对于复杂组件的条件渲染，考虑使用动态组件（`<component :is="componentName">`）替代 v-if：
```vue
<template>
  <div>
    <button @click="currentComponent = 'ComponentA'">显示组件A</button>
    <button @click="currentComponent = 'ComponentB'">显示组件B</button>
    <component :is="currentComponent"></component>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ComponentA from './ComponentA.vue'
import ComponentB from './ComponentB.vue'

const currentComponent = ref('ComponentA')
</script>
```



## 五、总结：最佳实践指南

1. **v-if 与 v-show 的选择**：
    - 很少切换：v-if
    - 频繁切换：v-show
    - 初始条件为 false：v-if（避免不必要的 DOM 创建）

2. **v-for 的性能优化**：
    - 始终为 v-for 提供唯一 key（避免使用索引）
    - 避免在同一元素上同时使用 v-for 和 v-if（优先过滤数据）
    - 使用数组变异方法（`push`、`splice` 等）或替换整个数组触发更新

3. **key 的使用原则**：
    - 必须是唯一标识（如 id）
    - 避免使用不稳定的值（如索引、随机数）
    - 复杂组件列表必须使用 key（确保状态正确维护）
