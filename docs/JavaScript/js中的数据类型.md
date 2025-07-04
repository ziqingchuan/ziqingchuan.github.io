---
title: js中的数据类型
createTime: 2025/07/02 20:03:07
permalink: /article/guex4lt7/
tags: 
  - JavaScript
  - 数据类型
excerpt: 介绍js中数据的基本类型以及引用类型相关知识点。
---

## 一、JavaScript 数据类型体系

JavaScript 是一种弱类型语言（动态类型语言），变量的类型不需要预先声明，且可以在运行时动态改变。根据 ECMA 标准，JavaScript 共有 8 种数据类型，可分为两大类：**基本类型**（Primitive Types）和**引用类型**（Reference Types）。

### 1.1 数据类型分类总览

- **基本类型（7种）**：字符串（==String==）、数字（==Number==）、布尔值（==Boolean==）、空值（==Null==）、未定义（==Undefined==）、符号（==Symbol==，ES6 新增）、大整数（==BigInt==，ES2020 新增）。
- **引用类型（1种）**：对象（Object），包括数组（==Array==）、函数（==Function==）、日期（==Date==）、正则（==RegExp==）等特殊对象。


## 二、基本类型：不可变的原子数据

::: tip
基本类型是 JavaScript 中最基础的数据单元，它们具有**不可变性**（值本身无法被修改）和**值传递**的特性。
:::

### 2.1 七种基本类型详解

#### （1）String（字符串）
- 定义：用于表示文本数据，用单引号（'）、双引号（"）或反引号（`）包裹。
- 特性：字符串一旦创建就不可修改（==看似修改的操作实际是创建了新字符串=={.note}）。
- 示例：
```js
let str1 = "hello";
let str2 = 'world';
let str3 = `hello ${str2}`; // 模板字符串（ES6+），支持变量嵌入
```


#### （2）Number（数字）
- 定义：表示整数或浮点数，不区分整型和浮点型（统一用 64 位双精度浮点格式存储）。
- 特殊值：
  - `NaN`（Not a Number）：表示非数字（如 "abc" * 1 结果为 NaN），且 NaN !== NaN。
  - `Infinity`：表示无穷大（如 1 / 0 结果为 Infinity）。
- 示例：
```js
let num1 = 42; // 整数
let num2 = 3.14; // 浮点数
let num3 = NaN; // 非数字
let num4 = Infinity; // 无穷大
```


#### （3）Boolean（布尔值）
- 定义：表示真或假，只有两个值：true（真）和 false（假）。
- 应用场景：条件判断、逻辑运算等。
- 示例：
```js
let isDone = true;
let hasError = false;
if (isDone) {
  console.log("操作完成");
}
```


#### （4）Null（空值）
- 定义：表示"故意缺少值"，是一个只有 null 值的特殊类型。
- 注意点：
  - typeof null 返回 "object"（历史遗留的 Bug），需通过 === null 判断。
  - 通常用于主动释放对象引用（如 obj = null）。
- 示例：
```js
let emptyValue = null;
console.log(typeof emptyValue); // 输出 "object"（特殊情况）
console.log(emptyValue === null); // 输出 true（正确判断方式）
```


#### （5）Undefined（未定义）
- 定义：表示变量已声明但未赋值，或对象属性不存在时的默认值。
- 注意点：与 null 的区别是，undefined 是"自然缺少值"，null 是"故意缺少值"。
- 示例：
```js
let unassigned; // 声明未赋值，值为 undefined
let obj = {};
console.log(obj.unknownProperty); // 访问不存在的属性，返回 undefined
```


#### （6）Symbol（符号，ES6+）
- 定义：==表示唯一的、不可变的值，主要用于对象的唯一属性名（避免属性名冲突）=={.note}。
- 特性：每个 Symbol 实例都是唯一的，即使描述相同。
- 示例：
```js
const sym1 = Symbol("id");
const sym2 = Symbol("id");
console.log(sym1 === sym2); // 输出 false（描述相同但实例不同）
// 作为对象唯一属性
const obj = {
    [sym1]: "value1",
    [sym2]: "value2"
};
```

#### （7）BigInt（大整数，ES2020+）
- 定义：用于表示超出 Number 类型精度范围的整数（Number 最大安全整数为 $2^{53}  - 1$）。
- 语法：在整数后加 n 或用` BigInt() `构造函数。
- 示例：
```js
const bigNum1 = 9007199254740993n; // 直接声明
const bigNum2 = BigInt(9007199254740993); // 构造函数转换
console.log(bigNum1 + bigNum2); // 输出 18014398509481986n
```



### 2.2 基本类型的核心特性

1. **不可变性**：==基本类型的值一旦创建就无法修改，任何修改操作都会创建新值=={.caution}。
```js
let str = "hello";
str[0] = "H"; // 尝试修改第一个字符（无效）
console.log(str); // 输出 "hello"（原字符串未变）

// 看似修改的操作实际是创建新值
let newStr = str.toUpperCase(); // 创建新字符串 "HELLO"
console.log(str); // 仍为 "hello"
```


2. **值传递**：==变量赋值或函数传参时，传递的是值的副本=={.caution}。

```js
let a = 10;
let b = a; // b 接收 a 的值的副本
b = 20; // 修改 b 不影响 a
console.log(a); // 输出 10

function add(num) {
    /*[!code highlight]*/
  num += 5; // 修改的是参数副本
}
add(a);
/*[!code highlight]*/
console.log(a); // 输出 10（a 未变）
```

## 三、引用类型：动态可变的对象数据

::: tip
引用类型（Object）是 JavaScript 中复杂数据结构的基础，包括数组、函数、日期等，它们具有**可变性**和**引用传递**的特性。
:::

### 3.1 常见引用类型详解

#### （1）Object（普通对象）
- 定义：由键值对（key-value）组成的无序集合，键为字符串或 `Symbol`，值为任意类型。
- 示例：
```js
const person = {
  name: "Alice", // 字符串键
  age: 30,
  [Symbol("id")]: 123 // Symbol 键（避免属性名冲突）
};
```


#### （2）Array（数组）
- 定义：有序的元素集合，元素可以是任意类型，长度动态可变。
- 示例：
```js
const arr = [1, "hello", true, { name: "Bob" }];
arr.push(4); // 动态添加元素
console.log(arr.length); // 输出 5
```


#### （3）Function（函数）
- 定义：可执行的代码块，也是一种特殊对象（可添加属性和方法）。
- 示例：
```js
function greet(name) {
  return `Hello, ${name}`;
}
greet.version = "1.0"; // 函数可添加属性
console.log(greet("Alice")); // 输出 "Hello, Alice"
console.log(greet.version); // 输出 "1.0"
```

#### （4）其他特殊对象
- Date：表示日期和时间，如 `new Date()`。
- RegExp：正则表达式对象，如 /pattern/g。
- Map/Set：ES6 新增的集合类型，分别用于存储键值对和唯一值。


### 3.2 引用类型的核心特性

1. **可变性**：==引用类型的值（对象内容）可以被动态修改=={.caution}。
```js
const obj = { name: "Alice" };
obj.name = "Bob"; // 直接修改对象属性（有效）
console.log(obj.name); // 输出 "Bob"

const arr = [1, 2, 3];
arr[0] = 100; // 修改数组元素
console.log(arr); // 输出 [100, 2, 3]
```

2. **引用传递**：==变量赋值或函数传参时，传递的是对象的引用地址（内存地址的指针），多个变量可指向同一个对象=={.caution}。
```js
const obj1 = { value: 10 };
const obj2 = obj1; // obj2 与 obj1 指向同一个对象
obj2.value = 20; // 修改 obj2 会影响 obj1
console.log(obj1.value); // 输出 20

function updateObj(o) {
  o.value += 5; // 修改的是引用指向的对象
}
updateObj(obj1);
console.log(obj1.value); // 输出 25
```


3. **比较的是引用**：==两个引用类型变量相等，仅当它们指向同一个对象=={.caution}。
```js
const a = { x: 1 };
const b = { x: 1 }; // 与 a 内容相同但引用不同
console.log(a === b); // 输出 false

const c = a; // c 与 a 指向同一个对象
console.log(a === c); // 输出 true
```


## 四、基本类型与引用类型的核心区别

| 特性 | 基本类型 | 引用类型 |
|------|----------|----------|
| 存储方式 | 栈内存中直接存储值 | 堆内存中存储值，栈内存中存储引用地址 |
| 可变性 | 不可变（修改会创建新值） | 可变（直接修改对象内容） |
| 赋值/传参 | 值传递（传递值的副本） | 引用传递（传递引用地址的副本） |
| 比较方式 | 比较值是否相等 | 比较引用地址是否相同（是否指向同一对象） |
| 类型判断 | typeof（除 null 外准确） | typeof 多返回 "object"，需用 instanceof 或 Object.prototype.toString |


## 五、类型判断的正确方式

在开发中，准确判断变量类型是常见需求，不同类型需采用不同方法：

1. **基本类型判断**：用 `typeof`（注意 null 的特殊处理）
```js
console.log(typeof "hello"); // 输出 "string"
console.log(typeof 42); // 输出 "number"
console.log(typeof true); // 输出 "boolean"
console.log(typeof undefined); // 输出 "undefined"
console.log(typeof Symbol("id")); // 输出 "symbol"
console.log(typeof 123n); // 输出 "bigint"
// null 特殊处理
console.log(null === null); // 输出 true（正确判断 null 的方式）
```


2. **引用类型判断**：用 `instanceof` 或 `Object.prototype.toString`
```js
// instanceof 判断对象是否为某个构造函数的实例
console.log([] instanceof Array); // 输出 true
console.log({} instanceof Object); // 输出 true
console.log(function() {} instanceof Function); // 输出 true

// Object.prototype.toString（更通用，返回 "[object 类型名]"）
console.log(Object.prototype.toString.call([])); // 输出 "[object Array]"
console.log(Object.prototype.toString.call(new Date())); // 输出 "[object Date]"
```

## 六、实际开发中的常见问题与解决方案

### 6.1 引用类型的浅拷贝与深拷贝

**问题**：直接赋值引用类型变量会导致修改相互影响，需要拷贝对象时需区分浅拷贝和深拷贝。

**浅拷贝**：仅拷贝对象的第一层属性，嵌套对象仍为引用传递（适用于单层对象）
```js
// 方法1：Object.assign
const obj = { a: 1, b: { c: 2 } };
const shallowCopy = Object.assign({}, obj);
shallowCopy.b.c = 3; // 修改嵌套对象会影响原对象
console.log(obj.b.c); // 输出 3

// 方法2：展开运算符（...）
const shallowCopy2 = { ...obj };
```

**深拷贝**：递归拷贝所有层级的属性，嵌套对象完全独立（适用于多层嵌套对象）

```js
// 简单场景：JSON 序列化（不支持函数、Symbol 等）
const deepCopy1 = JSON.parse(JSON.stringify(obj));

// 复杂场景：递归实现深拷贝
function deepClone(source) {
  if (typeof source !== "object" || source === null) {
    return source; // 基本类型直接返回
  }
  const target = Array.isArray(source) ? [] : {};
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = deepClone(source[key]); // 递归拷贝
    }
  }
  return target;
}
```


### 6.2 基本类型的包装对象

**问题**：基本类型不是对象，但可以调用方法（如 "abc".toUpperCase()），这是因为 JavaScript 会临时创建包装对象。

**原理**：当基本类型调用方法时，JavaScript 会自动创建对应的包装对象（如 String、Number），方法执行后立即销毁。

```js
const str = "hello";
// 执行过程：临时创建 new String("hello") → 调用 toUpperCase() → 销毁包装对象
console.log(str.toUpperCase()); // 输出 "HELLO"

// 注意：不能给基本类型添加属性（因为包装对象是临时的）
str.foo = "bar";
console.log(str.foo); // 输出 undefined
```

