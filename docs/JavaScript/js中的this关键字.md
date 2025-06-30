---
title: 🟢js中的this关键字
createTime: 2025/06/30 21:41:11
permalink: /article/01vwz9t2/
tags: 
  - JavaScript
  - this
excerpt: 字节面试重点考察了关于this的知识点，特此来沉淀一下。
---
在 JavaScript 编程中，this 关键字是一个既基础又极具迷惑性的概念。它在不同执行上下文中会指向不同对象，理解 this 的绑定机制是掌握 JavaScript 核心编程的关键。

## 一、`this` 的核心概念：执行上下文的动态指针

::: tip 概念
`this` 指的是***当前执行上下文中的对象***，它的核心作用是***允许方法访问定义该方法的对象数据***。

理解 `this` 的关键在于：_**它的指向不是由函数定义位置决定的，而是由函数的调用方式决定的。**_
:::

- 类比理解：`this` 就像一个 "动态指针"，当函数被调用时，它会根据调用场景指向不同的对象，类似现实中的 "这" 字在不同语境下指代不同事物。

- 核心价值：通过 `this`，方法可以复用代码逻辑的同时，操作所属对象的私有数据，实现面向对象编程中的封装特性。

## 二、`this` 的五大绑定规则：从默认到显式控制

### ==_**全局上下文绑定：浏览器与严格模式的差异**_==

#### 1. 非严格模式下的全局对象

在全局作用域中（如直接在浏览器控制台输入），`this` 指向全局对象 `window`：

```js
/*[!code highlight]*/
console.log(this === window); // 输出: true
this.globalVar = "全局变量";
console.log(window.globalVar); // 输出: 全局变量
```
#### 2. 严格模式下的 undefined

当使用 `use strict` 开启严格模式时，全局作用域中的 `this` 变为 `undefined`：

```js
"use strict";
/*[!code highlight]*/
console.log(this); // 输出: undefined
this.strictVar = "严格模式变量"; // 报错：Cannot set property 'strictVar' of undefined
```

### ==_**函数上下文绑定：调用方式决定指向**_==

#### 1. 对象方法调用：`this` 指向所属对象

当函数作为对象的方法被调用时，`this` 指向该对象：

```js
const user = {
    name: "Bob",
    sayHello() {
        console.log(`Hello, I'm ${this.name}`);
    }
};
user.sayHello(); // 输出: Hello, I'm Bob
```
#### 2. 独立函数调用：指向全局或 `undefined`

当函数作为独立函数调用时（非对象方法）：

非严格模式下指向全局对象 `window`：

```js
function logThis() {
    console.log(this);
}
logThis(); // 输出: Window 对象（浏览器环境）
```


严格模式下指向 `undefined`：

```js
"use strict";
function strictLog() {
    console.log(this);
}
strictLog(); // 输出: undefined
```

### ==_**构造函数上下文：绑定新创建的实例**_==

当使用 `new` 关键字调用函数时，该函数作为构造函数执行，`this` 指向新创建的实例对象：

```js
function Book(title, author) {
    this.title = title;
    this.author = author;
}

const jsBook = new Book("JavaScript高级程序设计", "Matt Frisbie");
console.log(jsBook.title); // 输出: JavaScript高级程序设计
console.log(jsBook.author); // 输出: Matt Frisbie
```

构造函数中的 `this` 特性：

- 自动创建空对象并绑定为 `this`

- 执行构造函数逻辑初始化 `this`

- 隐式返回 `this`（除非手动返回其他对象）

### ==_**箭头函数：词法作用域继承 `this`**_==

箭头函数是 ES6 引入的语法糖，它没有自己的 `this` 绑定，而是继承外层作用域的 `this`：

```js
const person = {
    name: "Alice",
    age: 30,
    // 错误示范：箭头函数无法正确绑定到 person 对象
    getGreeting() {
        // 箭头函数的 this 继承自外层（这里是全局或严格模式下的 undefined）
        return () => `Hello, I'm ${this.name} and ${this.age} years old`;
    }
};

const greeting = person.getGreeting();
console.log(greeting()); // 输出: Hello, I'm undefined and undefined years old
```

==正确用法：在需要保留外层 `this` 的场景（如回调函数）中使用箭头函数：=={.tip}

```js
const person = {
    name: "Alice",
    friends: ["Bob", "Charlie"],
    // 正确示范：箭头函数保留了 person 的 this 绑定
    showFriends() {
        this.friends.forEach(friend => {
            console.log(`${this.name}'s friend: ${friend}`);
        });
    }
};
person.showFriends();
// 输出:
// Alice's friend: Bob
// Alice's friend: Charlie
```

### ==_**显式绑定：call、apply、bind 三大方法**_==

JavaScript 提供了三种显式控制 `this` 绑定的方法，它们是解决 `this` 指向问题的核心工具。

#### :star:`call` 方法：立即调用并指定 `this` 和参数列表

- 语法：`function.call(thisArg, arg1, arg2, ...)`

- 作用：**立即执行函数**，将 `this` 绑定到 `thisArg`，并传递多个参数

```js
const calculator = {
    base: 10,
    add(num1, num2) {
        return this.base + num1 + num2;
    }
};

// 借用 calculator 的 add 方法，绑定到新对象并计算
const specialCalc = { base: 5 };
console.log(calculator.add.call(specialCalc, 3, 4)); // 输出: 5 + 3 + 4 = 12

```
#### :star:`apply` 方法：与 `call` 类似但接受参数数组

- 语法：`function.apply(thisArg, [argsArray])`

- 作用：功能与 `call` 相同，但第二个参数为参数数组

```js
const numbers = [1, 2, 3, 4, 5];
// 使用 Math.max 求数组最大值，apply 传递参数数组
console.log(Math.max.apply(null, numbers)); // 输出: 5
```

#### :star:`bind` 方法：创建永久绑定 `this` 的新函数

- 语法：`const boundFunc = function.bind(thisArg, arg1, arg2, ...)`

- 作用：返回一个新函数，其 `this` 永久绑定到 `thisArg`，调用时无需重复指定

```js
const user = {
    name: "David",
    sayHi(greeting) {
        return `${greeting}, ${this.name}`;
    }
};

// 创建绑定到 user 的新函数
const greetDavid = user.sayHi.bind(user);
console.log(greetDavid("Hello")); // 输出: Hello, David

// 即使作为独立函数调用，this 依然指向 user
const standaloneGreet = greetDavid;
console.log(standaloneGreet("Hi")); // 输出: Hi, David

```
## 三、this 绑定优先级：从高到低的决策链

当多个绑定规则可能同时作用时，`this` 的最终指向由以下优先级决定（从高到低）：

- ***`new` 绑定***：通过 `new` 调用构造函数时，优先级最高
- ***显式绑定***：`call`/`apply`/`bind` 显式指定的 `this` 次之
- ***隐式绑定***：作为对象方法调用时的 `this` 绑定
- ***默认绑定***：独立函数调用时的全局对象或 `undefined`
- ***箭头函数***：不参与优先级竞争，直接继承外层 `this`

示例：优先级冲突场景

```js
const obj1 = { 
    name: "obj1", 
    fn: function() { 
        return this.name; 
    } 
};
const obj2 = { 
    name: "obj2" 
};

// 显式绑定（apply）优先级高于隐式绑定
console.log(obj1.fn.apply(obj2)); // 输出: obj2

// new 绑定优先级高于显式绑定
function Fn() { this.name = "newObj"; }
const boundFn = Fn.bind(obj1); // 尝试绑定到 obj1
const newObj = new boundFn();    // new 绑定生效
console.log(newObj.name); // 输出: newObj，而非 obj1.name
```

## 四、常见 this 陷阱与最佳实践

### 箭头函数与对象方法的混用陷阱

==错误场景：在对象中使用箭头函数定义方法，导致 `this` 指向错误=={.danger}

```js
const counter = {
    count: 0,
    // 错误：箭头函数的 this 指向全局（或 undefined）
    /*[!code --]*/
    increment: () => {
        /*[!code --]*/
        this.count++; // 这里的 this 不是 counter 对象
        /*[!code --]*/
    }
};
counter.increment();
console.log(counter.count); // 输出: 0，未正确递增
```

==正确做法：对象方法使用普通函数定义，需要保留外层 `this` 时用箭头函数=={.tip}

```js
const counter = {
    count: 0,
    /*[!code ++]*/
    increment() {
        // 正确：普通函数的 this 指向 counter 对象
        /*[!code ++]*/
        this.count++;
        // 内部回调使用箭头函数保留外层 this
        setTimeout(() => {
            /*[!code ++]*/
            this.count++; // 正确访问 counter.count
        }, 100);
    }
};
```
### 事件处理中的 this 指向问题

==常见场景：DOM 事件处理函数中的 `this` 指向触发事件的元素==

```js
const button = document.getElementById("myButton");
button.addEventListener("click", function() {
    // this 指向 button 元素
    console.log(this.textContent); // 输出按钮文本
});
```


:warning:==陷阱：使用箭头函数会导致 `this` 指向外层作用域（如 `window`）=={.warning}

```js
const button = document.getElementById("myButton");
button.addEventListener("click", () => {
    // 箭头函数的 this 继承自外层（window）
    console.log(this === window); // 输出: true
});
```

### 异步回调中的 this 保留方案

当在异步函数（如 `setTimeout`、`Promise`）中需要访问对象的 `this` 时，有三种解决方案：

**_1. 保存 `this` 到变量（ES5 常用方式）：_**

```js
const user = {
    name: "Eve",
    fetchData() {
        const self = this; // 保存 this 到 self
        fetch("api/data")
            .then(response => response.json())
            .then(data => {
                console.log(`${self.name} got data: ${data}`);
            });
    }
};
```

**_2. 使用箭头函数（ES6+ 推荐方式）：_**

```js
const user = {
    name: "Eve",
    fetchData() {
        fetch("api/data")
            .then(response => response.json())
            .then(data => {
                // 箭头函数继承 fetchData 的 this
                console.log(`${this.name} got data: ${data}`);
            });
    }
};
```

**_3. 使用 `bind` 显式绑定：_**

```js
const user = {
    name: "Eve",
    processData(data) {
        console.log(`${this.name} processed: ${data}`);
    },
    fetchData() {
        fetch("api/data")
            .then(response => response.json())
            .then(this.processData.bind(this)); // 绑定 this
    }
};
```


## 五、ES6+ 中的 this 相关新特性

### class 中的 this 绑定

ES6 的 `class` 语法糖内部使用严格模式，`class` 方法中的 `this` 指向实例对象：

```js
class Animal {
constructor(name) {
this.name = name;
}

    sayName() {
        // 严格模式下，this 指向实例
        console.log(`I'm ${this.name}`);
    }
}

const dog = new Animal("Dog");
dog.sayName(); // 输出: I'm Dog

```

:warning:==注意：`class` 方法默认是普通函数，若使用箭头函数定义方法，会导致 `this` 指向错误：=={.warning}

```js
class ErrorDemo {
    name = "Demo";
    // 错误：箭头函数的 this 指向类定义时的上下文
    wrongThis = () => {
        console.log(this); // 指向 window 或 undefined（严格模式）
    }
}
```

### 箭头函数与 generator 函数

`Generator` 函数（使用 function* 定义）中的 `this` 遵循普通函数的绑定规则，而箭头函数在 `generator` 内部依然继承外层 `this`：

```js
function* generator() {
    console.log(this); // 调用时根据上下文决定指向
    yield () => {
        // 箭头函数继承 generator 的 this
        console.log(this);
    };
}

```


## 六、总结：this 绑定的终极判断流程

理解 `this` 的最佳方式是遵循以下判断流程：

1. **是否通过 new 调用？** 若是，`this` 指向新创建的实例。
2. **是否通过 _**call/apply/bind**_ 调用？** 若是，`this` 指向指定的 `thisArg`。
3. **是否作为对象的方法调用？** 若是，`this` 指向该对象。
4. **是否为箭头函数？** 若是，`this` 继承自外层作用域。
5. **默认情况**：非严格模式指向全局对象，严格模式指向 `undefined`。

通过反复实践和理解这五大绑定规则，你将彻底掌握 JavaScript 中 `this` 关键字的核心本质，在复杂的编程场景中精准控制 `this` 指向，写出更健壮的代码。







