---
title: React的Hooks
createTime: 2025/11/25 17:08:44
permalink: /article/s6ybo3sr/
tags:
    - Hooks
    - React
excerpt: 整理关于React的Hooks相关知识
---

在 React 16.8 版本之前，函数组件只能作为 _**无状态组件**_ 使用，无法管理状态、处理生命周期，复杂逻辑只能依赖类组件。而 Hooks 的出现彻底改变了这一现状——它是一套可以 **_钩入_** React 核心能力的函数，让函数组件无需编写类，就能实现状态管理、副作用处理、性能优化等功能，同时让代码更简洁、逻辑复用更高效。

## 一、React Hooks 核心认知
### 1. 本质与价值
Hooks 直译是`钩子`，本质是一套能让函数组件使用 React 核心特性（状态、生命周期、上下文等）的函数。它解决了类组件的三大痛点：
- ==状态逻辑复用困难==（无需高阶组件、渲染属性的嵌套）；
- ==生命周期混乱==（集中处理副作用，无需分散在多个生命周期方法）；
- ==this 指向迷惑==（函数组件无需绑定 this）。

### 2. 必须遵守的两条规则
::: tip 注意：
- 只能在**函数组件顶层**调用（不能在 if/for 循环、嵌套函数、条件判断中使用）；
- 只能在**React 函数组件或自定义 Hook** 中调用（不能在普通 JS 函数中使用）。
:::

## 二、常用 React Hooks 详解

### 1. 基础核心 Hooks（必备）
#### （1）useState：函数组件的状态管理器
**核心作用**：让函数组件拥有**可变状态**，状态变化时触发组件重新渲染。  
**适用场景**：管理组件内部可变数据（计数器、表单输入、弹窗显示隐藏、列表数据等）。  
**示例**：
```jsx
import { useState } from 'react';

function Counter() {
  // 定义状态：count（初始值 0），更新函数 setCount
  const [count, setCount] = useState(0);

  return (
    <div>
      计数：{count}
      {/* 点击修改状态，触发组件重新渲染 */}
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```
**关键注意**：
- 初始值==仅在组件第一次渲染时生效=={.danger}；
- ==状态更新是异步=={.danger}的，若需基于旧状态更新（如连续点击累加），用函数式更新：`setCount(prev => prev + 1)`；
- 更新引用类型（对象/数组）时，需返回新值（如 `setUser({ ...user, name: '新名字' })`），不能直接修改旧值。

#### （2）useEffect：处理副作用的万能工具
**核心作用**：处理组件副作用（渲染之外的操作），替代类组件的生命周期方法。  
**适用场景**：网络请求、定时器、DOM 操作、事件订阅、数据清理等。  
**示例**（网络请求 + 定时器清理）：
```jsx
import { useState, useEffect } from 'react';

function ReportList() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // 副作用：请求日报数据（组件挂载后执行）
    const fetchReports = async () => {
      const res = await fetch('https://api.example.com/reports');
      const data = await res.json();
      setReports(data);
    };
    fetchReports();

    // 副作用：开启定时器
    const timer = setInterval(() => console.log('定时器运行'), 1000);

    // 清理函数：组件卸载前清除定时器（避免内存泄漏）
    return () => clearInterval(timer);
  }, []); // 空依赖：仅组件挂载时执行一次

  return <div>日报数量：{reports.length}</div>;
}
```
**关键注意**：
- 依赖数组控制执行时机：
  - 空数组 `[]`：仅挂载时执行（对应 `componentDidMount`）；
  - 带依赖 `[a, b]`：挂载时 + a/b 变化时执行（对应 `componentDidMount + componentDidUpdate`）；
  - 无依赖：每次渲染都执行（慎用，性能差）；
- 清理函数：用于清除副作用（如定时器、事件订阅），避免内存泄漏。

#### （3）useMemo：优化性能的计算缓存器
**核心作用**：缓存复杂计算的结果，避免组件每次渲染重复执行耗时操作。  
**适用场景**：数据过滤、排序、格式化等复杂计算（如从大量数据中筛选特定记录）。  
**示例**：
```jsx
import { useMemo } from 'react';

function FilteredReports({ reports }) {
  // 缓存过滤结果：仅 reports 变化时重新计算
  const recentReports = useMemo(() => {
    // 耗时计算：筛选近7天的日报并排序
    return reports
      .filter(r => new Date(r.date) >= new Date(Date.now() - 7 * 24 * 3600 * 1000))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [reports]); // 依赖 reports

  return <div>近7天日报：{recentReports.map(r => r.title)}</div>;
}
```
**关键注意**：
- 不要滥用！简单计算（如 `count + 1`）无需缓存，缓存开销大于计算收益；
- 依赖数组必须包含计算中用到的所有外部变量，否则会读取到旧值。

### 2. 进阶常用 Hooks（中大型项目必备）
#### （1）useRef：多功能容器
**核心作用**：两大用途（均不触发组件渲染）：
1. 获取 DOM 元素（如操作输入框焦点）；
2. 存储不触发渲染的变量（如定时器 ID、前一次状态）。  
**适用场景**：DOM 操作、存储临时数据（无需展示在页面）。  
**示例**（获取输入框焦点 + 存储前一次状态）：
```jsx
import { useState, useRef, useEffect } from 'react';

function InputWithFocus() {
  const [count, setCount] = useState(0);
  // 1. 用于获取 DOM 元素
  const inputRef = useRef(null);
  // 2. 用于存储前一次 count（不触发渲染）
  const prevCountRef = useRef(count);

  //  count 变化时更新存储的旧值
  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  return (
    <div>
      <input ref={inputRef} placeholder="请输入" />
      {/* 点击让输入框聚焦（操作 DOM） */}
      <button onClick={() => inputRef.current.focus()}>聚焦输入框</button>
      <p>当前：{count}，上一次：{prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```
**关键注意**：
- 通过 `ref.current` 访问/修改值，修改不会触发组件渲染；
- 用于 DOM 时，需给 DOM 元素绑定 `ref` 属性。

#### （2）useCallback：缓存函数的性能优化工具
**核心作用**：缓存函数引用，避免组件每次渲染重新创建相同函数，优化子组件性能。  
**适用场景**：函数作为 props 传递给子组件（配合 `React.memo` 使用）。  
**极简示例**：
```jsx
import { useState, useCallback, memo } from 'react';

// 子组件：用 memo 缓存，仅 props 变化时渲染
const Child = memo(({ onClick }) => {
  console.log('子组件渲染');
  return <button onClick={onClick}>子组件按钮</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  // 缓存函数：仅 count 变化时重新创建
  const handleClick = useCallback(() => {
    console.log('点击了，count：', count);
  }, [count]); // 依赖 count

  return (
    <div>
      <Child onClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>父组件+1</button>
    </div>
  );
}
```
**关键注意**：
- 与 `useMemo` 类似，但缓存的是 ***函数引用*** 而非 ***计算结果***；
- 常与 `React.memo` 配合，避免子组件因函数引用变化而无效渲染。

#### （3）useContext：跨组件共享状态的桥梁
**核心作用**：解决「属性穿透」，实现跨层级组件状态共享，无需逐层传递 props。  
**适用场景**：全局状态共享（用户信息、主题色、语言设置等）。  
**极简示例**（共享主题色）：
```jsx
import { createContext, useContext, useState } from 'react';

// 1. 创建上下文（存储共享状态）
const ThemeContext = createContext();

// 2. 顶层提供器：包裹组件树，提供共享状态
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light'); // 共享状态：主题色

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. 子组件：直接读取共享状态（任意层级）
function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333' }}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        切换主题
      </button>
    </div>
  );
}

// 入口组件：用提供器包裹
function App() {
  return (
    <ThemeProvider>
      <Header /> {/* 任意子组件都能读取主题色 */}
    </ThemeProvider>
  );
}
```
**关键注意**：
- 需先创建 Context，再通过 `Provider` 提供状态，最后用 `useContext` 读取；
- 适合轻量级全局状态，复杂状态（如多组件频繁修改）可结合 `useReducer` 使用。

#### （4）useReducer：复杂状态的管理者
**核心作用**：当状态逻辑复杂（多字段、多更新方式）时，替代 `useState` 让状态管理更清晰。  
**适用场景**：表单多字段、列表增删改查、状态更新依赖多个条件等。  
**示例**（管理日报列表状态）：
```jsx
import { useReducer } from 'react';

// 1. 初始状态
const initialState = { reports: [], loading: false };

// 2. reducer 函数：集中处理所有状态更新逻辑
function reportReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START': // 开始请求
      return { ...state, loading: true };
    case 'FETCH_SUCCESS': // 请求成功
      return { ...state, loading: false, reports: action.payload };
    case 'DELETE_REPORT': // 删除日报
      return { ...state, reports: state.reports.filter(r => r.id !== action.payload) };
    default:
      return state;
  }
}

function ReportList() {
  // 3. 使用 useReducer：返回当前状态和 dispatch 函数
  const [state, dispatch] = useReducer(reportReducer, initialState);

  // 触发状态更新：通过 dispatch 发送「动作」
  const fetchReports = () => {
    dispatch({ type: 'FETCH_START' }); // 发送「开始请求」动作
    // 模拟网络请求
    setTimeout(() => {
      const data = [{ id: 1, title: '日报1' }, { id: 2, title: '日报2' }];
      dispatch({ type: 'FETCH_SUCCESS', payload: data }); // 发送「请求成功」动作
    }, 1000);
  };

  return (
    <div>
      {state.loading && <div>加载中...</div>}
      <button onClick={fetchReports}>加载日报</button>
      <ul>
        {state.reports.map(r => (
          <li key={r.id}>
            {r.title}
            <button onClick={() => dispatch({ type: 'DELETE_REPORT', payload: r.id })}>
              删除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```
**关键注意**：
- reducer 是纯函数（无副作用、相同输入返回相同输出）；
- 通过 `dispatch` 发送动作（包含 `type` 和 `payload`），统一管理状态更新逻辑，便于调试。

### 3. 小众但实用的 Hooks
#### （1）useLayoutEffect：同步执行的副作用
**核心作用**：与 `useEffect` 类似，但副作用在「DOM 更新后、浏览器绘制前」同步执行。  
**适用场景**：需要基于 DOM 布局修改样式（如获取元素宽高后立即调整位置）。  
**示例**：
```jsx
import { useLayoutEffect, useRef } from 'react';

function LayoutDemo() {
  const divRef = useRef(null);

  useLayoutEffect(() => {
    // DOM 更新后立即执行：获取元素宽高并修改样式
    const width = divRef.current.offsetWidth;
    divRef.current.style.height = `${width}px`; // 让 div 变成正方形
  }, []);

  return <div ref={divRef} style={{ background: 'red', width: '200px' }}></div>;
}
```

#### （2）useImperativeHandle：自定义暴露给父组件的方法
**核心作用**：让子组件自定义通过 `ref` 暴露给父组件的方法，避免暴露多余 DOM 细节。  
**适用场景**：父组件需要调用子组件的特定方法（如子组件表单提交）。  
**极简示例**：
```jsx
import { useRef, useImperativeHandle, forwardRef } from 'react';

// 子组件：用 forwardRef 接收父组件的 ref
const Child = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  // 自定义暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    focusInput: () => inputRef.current.focus() // 暴露「聚焦输入框」方法
  }));

  return <input ref={inputRef} placeholder="子组件输入框" />;
});

// 父组件：调用子组件暴露的方法
function Parent() {
  const childRef = useRef(null);
  return (
    <div>
      <Child ref={childRef} />
      <button onClick={() => childRef.current.focusInput()}>
        聚焦子组件输入框
      </button>
    </div>
  );
}
```

#### （3）useId：生成唯一 ID
**核心作用**：生成跨渲染稳定的唯一 ID，避免因组件重新渲染导致 ID 变化。  
**适用场景**：表单标签关联（`htmlFor`）、无障碍属性（ARIA）。  
**极简示例**：
```jsx
import { useId } from 'react';

function FormInput() {
  const inputId = useId(); // 生成唯一 ID
  return (
    <div>
      <label htmlFor={inputId}>用户名：</label>
      <input id={inputId} placeholder="请输入用户名" />
    </div>
  );
}
```

## 三、Hook 实战最佳实践
1. **单一职责**：一个 Hook 只处理一类逻辑（如 `useEffect` 不混用网络请求和定时器）；
2. **依赖写全**：`useEffect`、`useMemo`、`useCallback` 的依赖数组必须包含所有外部变量；
3. **避免过度优化**：简单计算、不传递给子组件的函数，无需用 `useMemo`/`useCallback`；
4. **自定义 Hook 复用逻辑**：将通用逻辑（如请求数据、本地存储）封装成自定义 Hook（命名以 `use` 开头，如 `useFetch`）；
5. **优先内置 Hooks**：无需盲目封装自定义 Hook，内置 Hooks 已覆盖大多数场景。
