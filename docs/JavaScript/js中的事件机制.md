---
title: js中的事件机制
createTime: 2025/07/08 17:08:35
permalink: /article/2wul1j44/
tags: 
  - JavaScript
  - 事件
excerpt: JavaScript 事件系统深度解析：事件循环、事件委托与传播机制
---

## 一、JavaScript 事件循环机制

### 1.1 单线程与异步编程模型

==JavaScript 采用单线程执行模型，这意味着它一次只能处理一个任务==。为了不阻塞主线程，JavaScript 使用事件循环机制来处理异步操作：

```javascript
console.log('开始执行');

setTimeout(() => {
  console.log('定时器回调');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise微任务');
});

console.log('执行结束');

/* 
执行结果输出顺序:
   开始执行
   执行结束
   Promise微任务
   定时器回调
*/
```

### 1.2 事件循环的核心组件

- **调用栈 (Call Stack)**：记录函数调用的栈结构，后进先出
- **任务队列 (Task Queue)**：存放宏任务（setTimeout、I/O等）
- **微任务队列 (Microtask Queue)**：存放微任务（Promise、MutationObserver）
- **Web APIs 环境**：浏览器提供的异步API容器

### 1.3 事件循环执行流程详解

1. 执行当前宏任务（通常是脚本代码）
2. 执行所有微任务（直到微任务队列清空）
3. 必要时进行UI渲染
4. 从宏任务队列取出下一个任务执行
5. 重复上述循环

### 1.4 任务类型对比

| 宏任务                | 微任务                  |
|----------------------|------------------------|
| setTimeout/setInterval | Promise.then/catch/finally |
| DOM事件回调           | MutationObserver       |
| I/O操作               | queueMicrotask         |
| setImmediate(Node)    | process.nextTick(Node) |

## 二、事件传播机制的三个阶段

### 2.1 捕获阶段

==事件从最外层元素==（window/document）==向下传播到目标元素的父级==：

```
window → document → html → body → 父元素 → 目标元素
```

```javascript
// 捕获阶段监听示例
element.addEventListener('click', handler, true);
// 或
element.addEventListener('click', handler, {capture: true});
```

### 2.2 目标阶段

事件到达目标元素本身。此时==无论是否设置了捕获，都会触发监听器==：

```javascript
// 目标元素的事件处理
target.addEventListener('click', function(e) {
  console.log('目标阶段触发:', e.eventPhase);
});
```

### 2.3 冒泡阶段

事件从目标元素向上传播回最外层元素：

```
目标元素 → 父元素 → body → html → document → window
```

```javascript
// 默认的冒泡阶段监听
parentElement.addEventListener('click', function() {
  console.log('冒泡阶段触发');
});
```

### 2.4 完整传播流程示例

```html
<div id="grandparent">
  <div id="parent">
    <div id="child">点击我</div>
  </div>
</div>

<script>
  const log = (id, phase) => console.log(`${id} ${phase}阶段`);

  document.querySelectorAll('div').forEach(el => {
    // 捕获阶段
    el.addEventListener('click', () => log(el.id, '捕获'), true);
    // 冒泡阶段
    el.addEventListener('click', () => log(el.id, '冒泡'));
  });
</script>

/* 
点击child元素后的输出:
    grandparent 捕获阶段
    parent 捕获阶段
    child 捕获阶段
    child 冒泡阶段
    parent 冒泡阶段
    grandparent 冒泡阶段
*/
```

### 2.5 控制事件传播的方法

```javascript
// 阻止事件继续传播
function handleClick(e) {
  e.stopPropagation();
  console.log('事件传播到此为止');
}

// 立即阻止当前元素的其他监听器执行
function handleClickImmediate(e) {
  e.stopImmediatePropagation();
  console.log('后续监听器不会执行');
}

// 阻止默认行为但不影响传播
function handleLinkClick(e) {
  e.preventDefault();
  console.log('链接不会跳转但事件继续传播');
}
```

## 三、事件委托高级实践

### 3.1 事件委托原理深度解析

事件委托==利用事件冒泡机制==，在父元素上统一处理子元素事件：

```javascript
// 传统方式：为每个按钮添加监听器
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', handleClick);
});

// 事件委托：只需一个监听器
document.getElementById('container').addEventListener('click', function(e) {
  if (e.target.classList.contains('btn')) {
    handleClick(e);
  }
});
```

### 3.2 动态内容处理优势

```javascript
// 动态添加的元素自动获得事件处理能力
function addNewButton() {
  const btn = document.createElement('button');
  btn.className = 'btn';
  btn.textContent = '新按钮';
  document.getElementById('container').appendChild(btn);
  // 无需单独添加事件监听
}
```

### 3.3 复杂场景下的委托策略

```javascript
// 处理表格行中的多种元素
document.querySelector('table').addEventListener('click', function(e) {
  const row = e.target.closest('tr');
  if (!row) return;
  
  if (e.target.matches('.edit-btn')) {
    handleEdit(row.dataset.id);
  } else if (e.target.matches('.delete-btn')) {
    handleDelete(row.dataset.id);
  } else if (e.target.matches('td:not(.actions)')) {
    handleRowClick(row.dataset.id);
  }
});
```

### 3.4 性能对比测试

```javascript
// 创建1000个列表项
const list = document.getElementById('list');
for (let i = 0; i < 1000; i++) {
  const item = document.createElement('li');
  item.textContent = `项目 ${i}`;
  list.appendChild(item);
}

// 传统方式内存占用
function traditionalWay() {
  const items = document.querySelectorAll('li');
  items.forEach(item => {
    item.addEventListener('click', () => {});
  });
  // 占用1000个监听器内存
}

// 事件委托方式
function delegationWay() {
  list.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
      // 处理点击
    }
  });
  // 只占用1个监听器内存
}
```

## 四、自定义事件系统

### 4.1 创建和触发自定义事件

```javascript
// 创建带详细数据的事件
const userLoginEvent = new CustomEvent('userLogin', {
  detail: {
    username: 'john_doe',
    timestamp: Date.now()
  },
  bubbles: true,
  cancelable: true
});

// 监听自定义事件
document.addEventListener('userLogin', (e) => {
  console.log(`用户登录: ${e.detail.username} at ${new Date(e.detail.timestamp)}`);
});

// 触发事件
document.dispatchEvent(userLoginEvent);
```

### 4.2 组件间通信实践

```javascript
// 组件A：触发事件
class ComponentA extends HTMLElement {
  notify() {
    this.dispatchEvent(new CustomEvent('dataReady', {
      detail: { data: [1, 2, 3] },
      composed: true  // 跨越Shadow DOM边界
    }));
  }
}

// 组件B：监听事件
class ComponentB extends HTMLElement {
  connectedCallback() {
    document.addEventListener('dataReady', this.handleData);
  }
  
  handleData = (e) => {
    console.log('接收到数据:', e.detail.data);
  };
}
```