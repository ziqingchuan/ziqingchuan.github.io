---
title: var,let,const的区别
createTime: 2025/07/02 20:03:27
permalink: /article/w1s59tt5/
tags:
  - JavaScript
excerpt: 简单梳理一下var,let,const的区别。
---

## 变量声明的演进：从 var 到块级作用域

JavaScript 在 ES6（2015 年）之前，只有 `var` 一种变量声明方式，但其设计存在诸多不合理之处（如函数级作用域、变量提升导致的意外行为）。ES6 新增 `let` 和 `const` 两种声明方式，引入了**块级作用域**，从根本上解决了 `var` 的缺陷。

- **var**：ES5 及之前的唯一声明方式，函数级作用域，存在变量提升和重复声明问题。
- **let**：ES6 新增，块级作用域，支持重新赋值，无变量提升的意外行为。
- **const**：ES6 新增，块级作用域，**声明后不可重新赋值**（==但对象属性可修改==）。


## 核心差异一：作用域范围

作用域决定了变量的可访问范围，三种声明方式的作用域规则截然不同：

### `var`：函数级作用域

==`var` 声明的变量仅在**当前函数内部**可访问，若在函数外声明，则为全局变量（挂载在 `window` 对象上）=={.note}。

示例 1：函数内的 var 变量
```js
function testVar() {
    var innerVar = "函数内变量";
    console.log(innerVar); // 输出 "函数内变量"（函数内可访问）
}
testVar();
console.log(innerVar); // 报错：innerVar is not defined（函数外不可访问）
```


示例 2：块级结构（if/for 等）无法限制 var 变量

```js
if (true) {
    var blockVar = "块内变量";
}
console.log(blockVar); // 输出 "块内变量"（if 块无法限制 var 作用域）

for (var i = 0; i < 3; i++) {
// 循环内的 i 会泄露到外部
}
console.log(i); // 输出 3（for 块无法限制 var 作用域）

```


### `let` 与 `const`：块级作用域

==`let` 和 `const` 声明的变量被限制在**最近的块级结构内**（用 `{}` 包裹的区域，如 if、for、函数体等），外部无法访问=={.note}。

示例 1：if 块内的 let 变量
```js
if (true) {
    let blockLet = "let 块内变量";
    const blockConst = "const 块内变量";
    console.log(blockLet); // 输出 "let 块内变量"（块内可访问）
}
console.log(blockLet); // 报错：blockLet is not defined（块外不可访问）
console.log(blockConst); // 报错：blockConst is not defined
```


示例 2：for 循环内的 let 变量（经典面试题）

```js
for (let j = 0; j < 3; j++) {
    setTimeout(() => {
        console.log(j); // 输出 0、1、2（每次循环的 j 是独立的）
    }, 100);
}
// 对比 var 的情况（输出 3、3、3）
for (var k = 0; k < 3; k++) {
    setTimeout(() => {
        console.log(k); // 输出 3、3、3（所有回调共享同一个 k）
    }, 100);
}
```

## 核心差异二：变量提升与暂时性死区

### `var` 的变量提升（Hoisting）

`var` 声明的变量会被"提升"到作用域顶部（仅声明提升，赋值不提升），导致变量在声明前可访问（值为 undefined）。

示例：
```js
console.log(hoistVar); // 输出 undefined（声明被提升，赋值未提升）
var hoistVar = "变量提升";
console.log(hoistVar); // 输出 "变量提升"
```



### `let` 与 `const` 的暂时性死区（TDZ）

`let` 和 `const` 不存在变量提升，在声明语句之前访问变量会直接报错（称为"暂时性死区"），避免了意外使用未初始化的变量。

示例：
```js
console.log(tdzLet); // 报错：Cannot access 'tdzLet' before initialization
let tdzLet = "暂时性死区";

console.log(tdzConst); // 报错：Cannot access 'tdzConst' before initialization
const tdzConst = "暂时性死区";
```

## 核心差异三：重复声明与可变性

### 重复声明规则

- `var`：允许在同一作用域内重复声明同一变量（覆盖之前的声明）。
- `let`/`const`：禁止在同一作用域内重复声明同一变量（无论之前用什么方式声明）。

示例 1：var 的重复声明
```js
var repeat = "第一次声明";
var repeat = "第二次声明"; // 允许重复声明，覆盖之前的值
console.log(repeat); // 输出 "第二次声明"
```


示例 2：let/const 的重复声明报错

```js
let unique = "唯一声明";
let unique = "重复声明"; // 报错：Identifier 'unique' has already been declared

var existing = "用 var 声明";
let existing = "用 let 重复声明"; // 报错：Identifier 'existing' has already been declared
```



### 可变性（是否允许重新赋值）

- `var` 和 `let`：允许重新赋值（可以多次修改变量的值）。
- `const`：**禁止重新赋值**（声明后必须初始化，且不能指向新值）。

示例 1：var 和 let 的重新赋值

```js
var varReassign = "初始值";
varReassign = "新值"; // 允许

let letReassign = "初始值";
letReassign = "新值"; // 允许
```


示例 2：const 的不可重新赋值特性
```js
const constReassign = "初始值";
constReassign = "新值"; // 报错：Assignment to constant variable.

// const 声明必须初始化
const uninitialized; // 报错：Missing initializer in const declaration
```



### `const` 与对象的可变性（常见误区）

==`const` 仅保证变量**引用地址不变**，但对象的**内部属性可以修改**（因为对象是引用类型，引用地址未变）=={.note}。

示例：
```js
const user = { name: "Alice" };
user.name = "Bob"; // 允许修改对象属性（引用地址未变）
console.log(user.name); // 输出 "Bob"

user = { name: "Charlie" }; // 报错：Assignment to constant variable.（引用地址改变）
```



## 全局变量的差异

在全局作用域中，三种声明方式的行为也不同：

- `var` 声明的全局变量会**挂载到 `window` 对象上**（成为 `window` 的属性）。
- `let` 和 `const` 声明的全局变量**不会挂载到 `window` 上**，仅存在于全局作用域中。

示例：
```js
var globalVar = "var 全局变量";
console.log(window.globalVar); // 输出 "var 全局变量"

let globalLet = "let 全局变量";
console.log(window.globalLet); // 输出 undefined

const globalConst = "const 全局变量";
console.log(window.globalConst); // 输出 undefined

```

## 六、最佳实践：如何选择合适的声明方式

1. **优先使用 `const`**：
    - 当变量的值不需要重新赋值时（如对象、函数、常量），优先用 `const`。
    - 好处：明确变量不可变，减少意外修改，代码可读性更高。

2. **合理使用 `let`**：
    - 当变量需要重新赋值时（如循环计数器、条件判断的临时变量），使用 `let`。
    - 示例：for 循环计数器、需要动态更新的状态变量。

3. **避免使用 `var`**：
    - `var` 的函数级作用域和变量提升容易导致 Bug（如循环变量泄露、变量被意外覆盖）。
    - 仅在维护老旧 ES5 代码时使用 `var`，新项目一律用 `let`/`const`。


## 七、总结：三者核心差异对比表

| 特性 | var | let | const |
|------|-----|-----|-------|
| 作用域 | 函数级 | 块级 | 块级 |
| 变量提升 | 有（声明提升） | 无（暂时性死区） | 无（暂时性死区） |
| 重复声明 | 允许 | 禁止 | 禁止 |
| 重新赋值 | 允许 | 允许 | 禁止 |
| 全局变量挂载到 `window` | 是 | 否 | 否 |
| 必须初始化 | 否 | 否 | 是 |