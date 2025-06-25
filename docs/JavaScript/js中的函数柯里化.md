---
title: js中的函数柯里化
createTime: 2025/06/25 16:37:49
permalink: /article/2se0q0vp/
tags:
  - JavaScript
  - 柯里化
excerpt: JavaScript 中的函数柯里化（Currying）是一种函数式编程的技术，它将接收多个参数的函数转换为接收单一参数的函数，并返回接收余下参数的新函数。柯里化的过程是逐步传递参数，直到所有参数都被传递完毕为止。本文从概念、原理、优点以及应用场景多个方面详细介绍柯里化。

---

## 什么是函数柯里化？

::: important 概念
函数柯里化的核心思想是 **_将多参数函数转化为多个嵌套的单参数函数_**。换句话说，柯里化后的函数会逐步接收参数，每次接收一个参数后返回一个新函数，直到所有参数都接收完毕，这时返回最终的计算结果。
:::
举个通俗的例子：
- 一个普通的加法函数 `add(a, b)` 接收两个参数并返回两数之和；
- 柯里化后的 `curriedAdd(a)(b)` 则是先接收第一个参数 `a`，返回一个新函数，等待接收第二个参数 `b`，最终返回两数之和。

这种逐步传递参数的方式，虽然看似复杂，但在实际应用中具有很大的灵活性，尤其是在函数复用与组合方面。

代码示例：

```js
function curriedAdd(a) {
  return function(b) {
    return a + b;
  };
}

const add5 = curriedAdd(5); // 返回一个新函数，等待第二个参数
console.log(add5(3)); // 输出 8
```

## 柯里化的原理

柯里化的实现依赖于两个核心概念：==**闭包**== 和 ==**参数延迟传递**==。

1. **闭包的作用** **_（什么是闭包？ → [浅谈js中的闭包](/JavaScript/浅谈js中的闭包.md)）_**

   柯里化函数通过闭包保存了传递的参数。在每次调用时，函数会捕获当前的参数并返回一个新函数，这个新函数可以访问之前的参数。闭包确保了参数在后续调用中能被正确引用。

2. **参数延迟传递**  

   柯里化的过程是逐步接收参数的，而不是一次性传递所有参数。每次接收部分参数后，返回一个新函数，直到收集到所有参数为止。


## 柯里化的优点

1. ==**提高代码复用性**==
   柯里化允许我们为函数预设部分参数，从而创建新的函数。通过这种方式，可以减少重复代码，提高函数的复用性。 例如，一个通用的乘法函数可以通过柯里化生成一个固定倍数的函数。

```js
function multiply(a, b) {
  return a * b;
}

const double = curry(multiply)(2); // 创建一个固定的倍增函数
console.log(double(5)); // 输出 10
console.log(double(10)); // 输出 20
```

2. ==**增强函数灵活性**==  
   柯里化使得函数调用更加灵活，可以逐步传递参数。这种逐步传递的方式，在需要动态确定参数或参数来源分散的情况下非常有用。
```js
function greet(greeting, name) {
  return `${greeting}, ${name}!`;
}

const sayHello = curry(greet)("Hello"); // 固定 greeting 参数
console.log(sayHello("Alice")); // 输出 "Hello, Alice!"
console.log(sayHello("Bob"));   // 输出 "Hello, Bob!"
```

3. ==**更好的函数组合性**==
   柯里化使得函数更容易与其他函数组合，尤其是在函数式编程中。通过柯里化，我们可以将多个小函数组合成复杂的逻辑，而无需关心这些函数的具体实现。

## 柯里化的应用场景

1. ==**事件处理**=={.note}  
   在前端开发中，事件处理函数通常需要绑定特定的参数。通过柯里化，我们可以预设一些参数，只处理特定的事件数据。例如，在 React 中可以通过柯里化为按钮点击事件绑定特定的逻辑。
```ts
function handleClick(id) {
  return function(event) {
    console.log(`Clicked item with id: ${id}`);
  };
}

const buttonClick = handleClick(123);
<button onClick={buttonClick}>Click me</button>;
```
2. ==**数据过滤与处理**=={.note} 
   在处理数组或对象数据时，柯里化可以简化数据过滤、排序、映射等操作。例如，我们可以通过柯里化生成特定条件的过滤器函数，用于筛选数据集。
```ts
function filterByAge(minAge) {
  return function(person) {
    return person.age >= minAge;
  };
}

const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 18 },
  { name: "Charlie", age: 30 }
];

const adults = people.filter(curry(filterByAge)(18));
console.log(adults); 
// 输出 [{ name: "Alice", age: 25 }, 
// { name: "Bob", age: 18 }, 
// { name: "Charlie", age: 30 }]
```
3. ==**函数组合**=={.note}  
   在函数式编程中，柯里化函数非常适合与其他函数组合。例如，使用柯里化生成中间结果的函数，再将这些中间结果提供给下一个函数使用。
```ts
// 柯里化的加法函数
function add(a) {
  return function(b) {
    return a + b;
  };
}

// 柯里化的乘法函数
function multiply(a) {
  return function(b) {
    return a * b;
  };
}

// 将函数组合
function compose(f, g) {
  return function(x) {
    return f(g(x));
  };
}

// 使用组合函数
const addAndMultiply = compose(multiply(2), add(3)); // 先加3，再乘以2
console.log(addAndMultiply(5)); // ((5 + 3) * 2) 输出 16
```
4. ==**预设参数的工具函数**=={.note}  
   柯里化允许我们固定某些参数，生成更具体的工具函数。例如，一个通用的 API 请求函数可以通过柯里化生成只适用于某个接口的请求函数。
```ts
function createApiRequest(baseUrl) {
  return function(endpoint) {
    return function(params) {
      const url = `${baseUrl}/${endpoint}?${new URLSearchParams(params).toString()}`;
      return fetch(url).then((response) => response.json());
    };
  };
}

// 创建 API 请求函数
const apiRequest = createApiRequest("https://api.example.com");

// 生成专用于用户数据的请求函数
const getUserData = apiRequest("users");

// 使用预设函数发送请求
getUserData({ id: 123 }).then((data) => console.log(data)); // 获取用户 ID 为 123 的数据
```
## 柯里化的实际意义

1. ==**代码模块化**=={.warning}: 通过柯里化，我们可以将复杂函数拆分为多个小函数。这些小函数可以独立测试、维护和复用，从而提高代码的模块化程度。

2. ==**延迟执行**=={.warning}: 柯里化函数不会立即执行，而是等待参数传递齐全后才执行。这种延迟执行的特性非常适合需要动态确定参数的场景。

3. ==**提升函数的可读性**=={.warning}: 柯里化函数的语义通常非常明确，能够直观表达其功能。例如，一个 `greet("Hello")("Alice")` 的函数调用，清晰地表达了其用途是生成一条问候语。

## 柯里化的注意事项
::: warning
**适用场景** 

   柯里化适用于参数顺序固定且可以逐步传递的函数。如果函数参数之间存在复杂的依赖关系，柯里化可能并不适用。

**性能影响**  

   柯里化通过闭包保存参数，这会引入额外的函数调用和内存开销。在性能敏感的场景下，使用柯里化需要谨慎考虑。

**过度使用的问题**  

   虽然柯里化有诸多优点，但过度使用可能导致代码结构复杂化，影响可读性。因此，应根据实际需求合理使用柯里化技术。
:::
## 总结

函数柯里化是一种强大的函数式编程技术，通过将多参数函数转化为多个单参数函数，极大地提高了代码的复用性、灵活性和可组合性。它在事件处理、数据操作、函数组合等场景中有广泛的应用。然而，在使用柯里化时，也需要注意其适用场景和性能开销，避免过度使用影响代码的可维护性。合理地运用柯里化，可以让我们的代码更加简洁、高效。

