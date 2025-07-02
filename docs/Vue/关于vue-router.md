---
title: 关于vue-router
createTime: 2025/06/30 21:45:07
permalink: /article/v72tpktz/
tags:
  - Vue
  - 路由
excerpt: 图灵深视的一面遇到这个问题，简单梳理一下。
---
## 一、Vue Router 核心概念

### 1.1 什么是 Vue Router？

::: tip 概念
Vue Router 是 Vue.js 官方的路由插件，它允许我们通过定义**路由规则**来管理 SPA 中的页面跳转，实现**无需刷新页面的 URL 变化与组件切换**。
:::
Vue Router 的核心功能包括：
- 嵌套路由映射 
- 动态路由匹配
- 编程式导航
- 命名路由与命名视图
- 路由守卫（导航控制）
- 路由元信息

### 1.2 路由的基本构成

一个完整的路由系统包含三个核心部分：

- <Badge text="路由配置" type="tip"/>：定义 URL 路径与组件的映射关系
- <Badge text="路由出口" type="warning"/>：`<router-view>` 组件，用于渲染匹配到的组件
- <Badge text="路由导航" type="danger"/>：`<router-link>` 组件或编程式方法，用于触发路由跳转


## 二、Vue Router 安装与基础使用（以 Vue3 + Vue Router 4 为例）

### 2.1 安装依赖

```bash
# Vue3 项目使用 Vue Router 4
npm install vue-router@4
# 或
yarn add vue-router@4
```

### 2.2 基本配置步骤

#### 步骤 1：创建路由实例

在 `src/router/index.js` 中定义路由规则：

```js
import { createRouter, createWebHistory } from 'vue-router'
// 导入组件
import Home from '../views/Home.vue'
import About from '../views/About.vue'

// 路由规则数组
const routes = [
  {
    path: '/', // URL 路径
    name: 'Home', // 路由名称（可选）
    component: Home // 匹配的组件
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // 采用 HTML5 History 模式
  routes // 注入路由规则
})

export default router
```
#### 步骤 2：在 Vue 应用中挂载路由

在 `main.js` 中引入并使用路由：

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 导入路由实例

createApp(App)
    .use(router) // 挂载路由
    .mount('#app')
```

#### 步骤 3：使用路由出口与导航

在 `App.vue` 中添加路由出口和导航链接：

```vue
<template>
  <div id="app">
    <!-- 路由导航：替代 a 标签，避免页面刷新 -->
    <router-link to="/">首页</router-link> |
    <router-link to="/about">关于我们</router-link>

    <!-- 路由出口：匹配的组件将在这里渲染 -->
    <router-view></router-view>
  </div>
</template>

```

## 三、路由匹配规则进阶

### 3.1 动态路由匹配（参数传递）

用于匹配路径参数（如 ID、用户名），通过 `:参数名` 定义：

```js
// 路由规则
const routes = [
  {
    path: '/user/:id', // 动态参数 id
    name: 'User',
    component: () => import('../views/User.vue') // 懒加载组件
  }
]
```
在组件中获取参数：

```vue
<template>
  <div>用户 ID：{{ $route.params.id }}</div>
</template>

<script setup>
import { useRoute } from 'vue-router'
// 组合式 API 方式获取路由信息
const route = useRoute()
console.log(route.params.id) // 输出 URL 中的 id 参数
</script>
```

### 3.2 嵌套路由（子路由）

==用于实现页面布局中的嵌套结构（如侧边栏 + 内容区）==，通过 children 配置：

```js
const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    // 子路由（路径相对父路由）
    children: [
      {
        path: '', // 默认子路由（/dashboard 直接匹配）
        component: DashboardHome
      },
      {
        path: 'profile', // 完整路径：/dashboard/profile
        component: DashboardProfile
      }
        ]
  }
]
```

在父组件中添加子路由出口：

```vue
<!-- Dashboard.vue -->
        <template>
            <div class="dashboard">
                <sidebar></sidebar>
                <!-- 子路由组件将在这里渲染 -->
                <router-view></router-view>
            </div>
        </template>
```

### 3.3 路由懒加载（代码分割）

通过动态 import 实现组件按需加载，减少初始打包体积：

```js
const routes = [
  {
    path: '/about',
    name: 'About',
    // 懒加载：只有访问 /about 时才会加载组件
    component: () => import('../views/About.vue')
  }
]
```

### 3.4 命名路由与命名视图

_**命名路由：通过名称跳转路由**_

```js
// 路由规则（定义 name）
{ path: '/user/:id', name: 'User', component: User }

```

跳转方式：

```vue
<!-- 模板中 -->
<router-link :to="{ name: 'User', params: { id: 123 }}">用户 123</router-link>

<!-- 脚本中（编程式导航） -->
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
router.push({ name: 'User', params: { id: 123 }})
</script>
```

_**命名视图：同时渲染多个组件**_

用于复杂布局（如头部 + 侧边栏 + 内容区）：

```js
const routes = [
  {
    path: '/',
    components: {
      default: Home, // 匹配未命名的 <router-view>
      header: Header, // 匹配 <router-view name="header">
      sidebar: Sidebar // 匹配 <router-view name="sidebar">
    }
  }
]
```

模板中使用：

```vue
<router-view></router-view> <!-- 渲染 default 组件 -->
<router-view name="header"></router-view> <!-- 渲染 header 组件 -->
<router-view name="sidebar"></router-view> <!-- 渲染 sidebar 组件 -->
```

## 四、导航控制：编程式导航与路由守卫

### 4.1 编程式导航（JS 控制跳转）

通过 `useRouter` 提供的方法实现：

```vue
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

// 跳转到指定路径
const goToHome = () => {
  router.push('/') // 字符串路径
}

// 带参数跳转
const goToUser = () => {
  router.push({ name: 'User', params: { id: 1 }}) // 对象形式
}

// 后退/前进
const goBack = () => {
  router.go(-1) // 后退一步，类似 history.back()
}
</script>
```

### 4.2 路由守卫（导航钩子）

用于控制导航权限（如登录验证、权限检查），分为三类：

==全局守卫 —— 作用于所有路由，定义在路由实例上==：

```js
// 全局前置守卫：导航触发前调用
router.beforeEach((to, from, next) => {
  // to：目标路由
  // from：当前路由
  // next()：放行；next('/login')：重定向；next(false)：取消导航
  
  // 示例：未登录则跳转到登录页
  if (to.path !== '/login' && !isLogin()) {
    next('/login')
  } else {
    next()
  }
})
```
```js
// 全局后置守卫：导航完成后调用（无 next）
router.afterEach((to, from) => {
  // 示例：修改页面标题
  document.title = to.meta.title || '默认标题'
})

```

==路由独享守卫 —— 作用于单个路由，定义在路由规则中==：

```js
const routes = [
  {
    path: '/admin',
    component: Admin,
    // 路由独享前置守卫
    beforeEnter: (to, from, next) => {
      // 示例：检查是否为管理员
      if (isAdmin()) {
        next()
      } else {
        next('/forbidden')
      }
    }
  }
]
```

==组件内守卫 —— 作用于当前组件，定义在组件内部==：

```vue
<script setup>
import { onBeforeRouteEnter, onBeforeRouteLeave } from 'vue-router'

// 进入组件前调用（此时组件实例未创建，不能用 this）
onBeforeRouteEnter((to, from, next) => {
  next(vm => {
    // vm 是组件实例，可访问组件数据
    vm.fetchData()
  })
})

// 离开组件前调用
onBeforeRouteLeave((to, from, next) => {
  // 示例：确认是否离开未保存的表单
  if (confirm('数据未保存，确定离开吗？')) {
    next()
  } else {
    next(false)
  }
})
</script>
```


## 五、路由元信息与过渡动画

### 5.1 路由元信息（meta）

用于存储路由的附加信息（如标题、权限要求），通过 `meta` 字段定义：

```js
const routes = [
  {
    path: '/about',
    component: About,
    meta: {
      title: '关于我们', // 页面标题
      requiresAuth: false // 是否需要登录
    }
  }
]
```


在守卫中使用：

```js
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 权限检查
  if (to.meta.requiresAuth && !isLogin()) {
    next('/login')
  } else {
    next()
  }
})
```

### 5.2 路由过渡动画

通过 `<transition>` 包裹 `<router-view>` 实现页面切换动画：

```vue
<template>
  <!-- 为路由添加过渡效果 -->
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<style>
/* 定义过渡样式 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
```

## 六、Vue Router 常见问题与解决方案

### 6.1 刷新页面 404 问题（History 模式）

原因：==History 模式依赖 HTML5 History API，刷新时服务器会直接请求该 URL，若服务器未配置会返回 404。=={.warning}

解决方案：
服务器配置所有请求指向 index.html（以 Nginx 为例）：

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### 6.2 路由参数变化时组件不更新

原因：==路由参数变化（如 /user/1 → /user/2）时，组件会复用，生命周期钩子不会重新执行。=={.warning}

解决方案：

监听路由参数变化：
```vue
<script setup>
import { useRoute, watch } from 'vue-router'
const route = useRoute()

// 监听参数变化
watch(
  () => route.params.id,
  (newId) => {
    // 参数变化时重新加载数据
    fetchUser(newId)
  }
)
</script>
```
