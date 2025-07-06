---
title: 构造函数与new操作符
createTime: 2025/06/30 21:44:31
permalink: /article/du9l209l/
tags: 
  - JavaScript
excerpt: 字节面试中理解代码时考到了相关内容，今天来整理一下。
---

在 JavaScript 中，构造函数与 `new` 操作符是实现面向对象编程的核心机制。它们允许我们创建多个具有相同属性和方法的对象实例，同时保持代码的可复用性。本文将从基础概念到底层原理，全面解析构造函数与 `new` 操作符的工作机制。


## 一、构造函数：对象的"模板"

### 1.1 什么是构造函数？

::: tip 概念
构造函数是一种特殊的函数，用于初始化新创建的对象。它的命名通常采用**帕斯卡命名法**（首字母大写），以区分普通函数。通过构造函数，我们可以定义对象的属性和方法，再通过 `new` 操作符创建多个实例。
:::

示例：一个简单的构造函数
```js
// 定义构造函数（首字母大写）
function Person(name, age) {
  // 实例属性
  this.name = name;
  this.age = age;
  
  // 实例方法
  this.sayHello = function() {
    console.log(`Hello, 我是${this.name}`);
  };
}

// 使用 new 操作符创建实例
const person1 = new Person('Alice', 25);
const person2 = new Person('Bob', 30);

// 访问实例的属性和方法
console.log(person1.name); // 输出 "Alice"
person2.sayHello(); // 输出 "Hello, 我是Bob"
```

### 1.2 构造函数与普通函数的区别

构造函数本质上是普通函数，两者的区别仅在于**调用方式**：
- 用 `new` 操作符调用的函数就是构造函数
- 不用 `new` 调用的就是普通函数（此时 `this` 指向全局对象或 `undefined`）

示例：错误调用构造函数的后果
```js
// 不用 new 调用，此时 this 指向 window（非严格模式）
const person3 = Person('Charlie', 35);
console.log(person3); // 输出 undefined（构造函数无 return 时）
console.log(window.name); // 输出 "Charlie"（意外污染全局变量）
```



## 二、new 操作符：实例创建的"幕后推手"

==`new` 操作符是创建对象实例的关键，它会触发一系列操作，将构造函数转换为可实例化的"模板"==。

### 2.1 new 操作符的工作原理

当执行 `new Constructor(...)` 时，`new` 会完成以下步骤：

1. **创建空对象**：生成一个新的空对象（`{}`）。
2. **绑定原型**：将空对象的 `__proto__` 属性指向构造函数的 `prototype` 属性（建立原型链）。
3. **绑定 this**：将构造函数的 `this` 指向新创建的空对象。
4. **执行构造函数**：运行构造函数内部代码，为新对象添加属性和方法。
5. **返回对象**：
   - 如果构造函数返回一个**对象类型**（对象、数组、函数等），则返回该对象。
   - 否则，返回第 1 步创建的新对象。

示例：模拟 new 操作符的实现
```js
// 自定义函数模拟 new 的功能
function myNew(constructor, ...args) {
  // 1. 创建空对象
  const obj = {};
  // 2. 绑定原型
  obj.__proto__ = constructor.prototype;
  // 3. 绑定 this 并执行构造函数
  const result = constructor.apply(obj, args);
  // 4. 返回结果（如果是对象则返回该对象，否则返回新对象）
  return typeof result === 'object' && result !== null ? result : obj;
}

// 使用自定义 myNew 创建实例
const person4 = myNew(Person, 'Diana', 28);
person4.sayHello(); // 输出 "Hello, 我是Diana"
```



## 三、构造函数的原型与实例共享

### 3.1 原型链的作用

::: tip
每个构造函数都有一个 `prototype` 属性（原型对象），该对象包含所有实例共享的属性和方法。当访问实例的属性或方法时，若实例本身没有，JavaScript 会沿着原型链查找构造函数原型中的对应内容。
:::

示例：将方法定义在原型上（推荐）
```js
function Person(name, age) {
  // 实例属性（每个实例独立）
  this.name = name;
  this.age = age;
}

// 原型方法（所有实例共享）
Person.prototype.sayHello = function() {
  console.log(`Hello, 我是${this.name}`);
};

// 所有实例共享同一个 sayHello 方法
const person5 = new Person('Eve', 22);
const person6 = new Person('Frank', 33);
console.log(person5.sayHello === person6.sayHello); // 输出 true（引用同一函数）
```


### 3.2 实例属性 vs 原型属性

- **实例属性**：定义在构造函数内部（`this.xxx = ...`），每个实例独立拥有，修改一个实例的属性不影响其他实例。
- **原型属性**：定义在构造函数的 `prototype` 上（`Constructor.prototype.xxx = ...`），所有实例共享，修改原型属性会影响所有实例。

示例：
```js
// 实例属性
person5.age = 23; // 仅修改 person5 的 age
console.log(person6.age); // 输出 33（不受影响）

// 原型属性
Person.prototype.gender = 'female';
console.log(person5.gender); // 输出 "female"（共享原型属性）
console.log(person6.gender); // 输出 "female"

Person.prototype.gender = 'male'; // 修改原型属性
console.log(person5.gender); // 输出 "male"（所有实例受影响）
```



## 四、构造函数的返回值

构造函数通常不需要显式返回值，`new` 操作符会默认返回新创建的对象。但如果显式返回值，会遵循以下规则：

1. 若返回**基本类型**（字符串、数字、布尔值等），则忽略返回值，仍返回新对象。
2. 若返回**对象类型**（对象、数组、函数等），则返回该对象，新创建的对象会被丢弃。

示例：构造函数的返回值规则
```js
// 情况1：返回基本类型（被忽略）
function Car(brand) {
  this.brand = brand;
  return '我是返回的字符串'; // 基本类型，被忽略
}
const car1 = new Car('Tesla');
console.log(car1.brand); // 输出 "Tesla"（返回新对象）
```

```js
// 情况2：返回对象类型（覆盖新对象）
function Phone(model) {
  this.model = model;
  return { fakeModel: '假手机' }; // 对象类型，返回该对象
}
const phone1 = new Phone('iPhone');
console.log(phone1.model); // 输出 undefined（原对象被丢弃）
console.log(phone1.fakeModel); // 输出 "假手机"（返回的对象）
```



## 五、构造函数的继承：通过原型链实现

构造函数可以通过原型链实现继承，让子类实例继承父类的属性和方法。

示例：实现构造函数的继承
```js
// 父类构造函数
function Animal(name) {
  this.name = name;
}
// 父类原型方法
Animal.prototype.eat = function() {
  console.log(`${this.name}在吃东西`);
};
```
```js
// 子类构造函数
function Dog(name, breed) {
  // 调用父类构造函数，继承实例属性
  Animal.call(this, name);
  this.breed = breed; // 子类自己的属性
}

// 继承父类原型方法
Dog.prototype = Object.create(Animal.prototype);
// 修复子类构造函数指向（否则 Dog.prototype.constructor 会指向 Animal）
Dog.prototype.constructor = Dog;

// 子类原型方法
Dog.prototype.bark = function() {
  console.log(`${this.name}在汪汪叫`);
};

// 创建子类实例
const dog1 = new Dog('旺财', '金毛');
dog1.eat(); // 输出 "旺财在吃东西"（继承父类方法）
dog1.bark(); // 输出 "旺财在汪汪叫"（子类自己的方法）
```




## 六、ES6 class：构造函数的语法糖

::: tip
ES6 引入的 `class` 语法本质上是构造函数的语法糖，它提供了更简洁、更接近传统面向对象的写法，但底层仍基于原型链实现。
:::

示例：用 class 重写构造函数
```js
// ES6 class 语法
class Person {
  // 构造方法（对应构造函数）
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  // 原型方法（等同于 Person.prototype.sayHello）
  sayHello() {
    console.log(`Hello, 我是${this.name}`);
  }
  
  // 静态方法（属于类本身，不被实例继承）
  static create(name, age) {
    return new Person(name, age);
  }
}

// 使用 class 创建实例
const person7 = new Person('Grace', 26);
person7.sayHello(); // 输出 "Hello, 我是Grace"

// 调用静态方法
const person8 = Person.create('Henry', 31);
console.log(person8.age); // 输出 31
```



## 七、构造函数的常见问题与最佳实践

### 7.1 忘记使用 new 操作符

若忘记用 `new` 调用构造函数，`this` 会指向全局对象（非严格模式），导致意外污染全局变量。

解决方法：
- 在构造函数中检查调用方式
```js
function SafePerson(name) {
  // 若不是用 new 调用，返回新实例
  if (!(this instanceof SafePerson)) {
    return new SafePerson(name);
  }
  this.name = name;
}

// 无论是否用 new 调用，都能得到正确实例
const p1 = SafePerson('Ivy');
const p2 = new SafePerson('Jack');
console.log(p1 instanceof SafePerson); // 输出 true

```

### 7.2 避免在构造函数中定义方法

在构造函数内部定义方法（`this.method = function() {}`）会导致每个实例都拥有方法的副本，浪费内存。

最佳实践：
- 将方法定义在原型上（`Constructor.prototype.method = function() {}`）
- 或使用 ES6 class 的原型方法语法

### 7.3 合理使用静态方法

静态方法（定义在构造函数本身或 `class` 的 `static` 中）用于实现与实例无关的工具函数，不依赖实例的属性。

示例：
```js
class MathUtil {
  static sum(a, b) {
    return a + b;
  }
}
console.log(MathUtil.sum(2, 3)); // 输出 5（无需创建实例）
```



## 八、总结

构造函数与 `new` 操作符是 JavaScript 面向对象编程的基础，核心要点如下：

1. **构造函数**：用于定义对象模板，通过 `this` 绑定实例属性，原型上定义共享方法。
2. **new 操作符**：创建实例的关键，通过四步操作（创建对象、绑定原型、绑定 this、返回对象）完成实例初始化。
3. **原型链**：实现实例共享方法的机制，避免内存浪费。
4. **ES6 class**：构造函数的语法糖，提供更清晰的面向对象写法。