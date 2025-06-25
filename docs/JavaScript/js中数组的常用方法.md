---
title: js中数组的常用方法
createTime: 2025/06/25 14:54:53
permalink: /article/gkwazc48/
tags:
  - JavaScript
  - 数组
excerpt: 本文全面介绍了JavaScript数组的常用操作方法，包括join、push、pop等基础操作，以及forEach、map、filter等遍历方法，详细说明了每种方法的语法、功能和使用场景，帮助开发者高效处理数组数据。
---
## 操作数组
### **_1. `join`_** 
将数组的所有元素连接成一个字符串
```js
  let arr = ['Hello', 'world', '!'];
  console.log(arr.join(' ')); // 输出: "Hello world !"
```

### **_2. `split`_** 
根据指定的分隔符将字符串拆分为子字符串，并==返回由这些子字符串组成的数组==
```js
  let str = "Hello world!";
  console.log(str.split(' ')); // 输出: ["Hello", "world!"]
```

### **_3. `push`_** 
在数组末尾添加一个或多个元素，并返回数组的新长度。
```js
  let arr = [1, 2];
  arr.push(3);
  console.log(arr); // 输出: [1, 2, 3]
```
### **_4. `pop`_**
移除数组的最后一个元素，并返回该元素。
```js
  let arr = [1, 2, 3];
  console.log(arr.pop()); // 输出: 3
  console.log(arr); // 输出: [1, 2]
```

### **_5. `unshift`_**
在数组开头添加一个或多个元素，并返回数组的新长度。
```js
  let arr = [1, 2, 3];
  arr.unshift(0);
  console.log(arr); // 输出: [0, 1, 2, 3]
```

### **_6. `shift`_**
移除并返回数组的第一个元素。
```js
  let arr = [1, 2, 3];
  console.log(arr.shift()); // 输出: 1
  console.log(arr); // 输出: [2, 3]
```

### **_7. `reverse`_**
颠倒数组中元素的位置。==原地修改数组，并返回修改后的数组==。
```js
  let arr = [1, 2, 3];
  arr.reverse();
  console.log(arr); // 输出: [3, 2, 1]
```

### **_8. `sort`_**
对数组元素进行排序。默认按字符串Unicode码点顺序排列。可以传入一个比较函数以自定义排序规则。
```js
  let arr = [3, 1, 2];
  arr.sort((a, b) => a - b);//默认a < b，返回值 < 0 为升序
  console.log(arr); // 输出: [1, 2, 3]
```

### **_9. `concat`_**
合并两个或更多数组而==不改变原数组，返回新数组==。
```js
  let arr1 = [1, 2];
  let arr2 = [3, 4];
  let newArr = arr1.concat(arr2);
  console.log(newArr); // 输出: [1, 2, 3, 4]
```

### **_10. `splice`_**
通过删除、替换现有元素或添加新元素来修改数组，并返回被删除的元素。
```js
  let arr = [1, 2, 3, 4];
  arr.splice(1, 2, 'a', 'b'); // 从索引1开始删除2个元素，插入'a'和'b'
  console.log(arr); // 输出: [1, 'a', 'b', 4]
```

### **_11. `slice`_**
提取数组的一部分并==返回一个新数组。不修改原数组==。
```js
  let arr = [1, 2, 3, 4, 5];
  let newArr = arr.slice(1, 4); // 提取从索引1到索引4（不包括）的元素
  console.log(newArr); // 输出: [2, 3, 4]
```

## 遍历数组
### **_1. `forEach`_**
对数组的每个元素执行一次提供的函数，没有返回值。
```js
  let arr = [1, 2, 3];
  arr.forEach((value, index) => console.log(`Index: ${index}, Value: ${value}`));
  // 输出:
  // Index: 0, Value: 1
  // Index: 1, Value: 2
  // Index: 2, Value: 3
```
### **_2. `map`_**
创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
```js  
  let arr = [1, 2, 3];
  let newArr = arr.map(value => value * 2);
  console.log(newArr); // 输出: [2, 4, 6]
```

### **_3. `filter`_**
创建一个新数组，包含通过所提供函数实现的测试的所有元素。
```js
  let arr = [1, 2, 3, 4];
  let filteredArr = arr.filter(value => value > 2);
  console.log(filteredArr); // 输出: [3, 4]
```

### **_4. `find`_**
返回数组中满足提供的测试函数的==第一个元素的值==。如果没有找到，则返回undefined。
```js
  let arr = [1, 2, 3, 4];
  let foundValue = arr.find(value => value > 2);
  console.log(foundValue); // 输出: 3
```

### **_5. `findIndex`_**
返回数组中满足提供的测试函数的==第一个==元素的==索引==。如果没有找到，则返回-1。
```js
  let arr = [1, 2, 3, 4];
  let foundIndex = arr.findIndex(value => value > 2);
  console.log(foundIndex); // 输出: 2
```

### **_6. `some`_**
测试数组中的某些元素是否==至少有一个==通过了由提供的函数实现的测试。
```js
  let arr = [1, 2, 3, 4];
  let hasBigNumber = arr.some(value => value > 3);
  console.log(hasBigNumber); // 输出: true
```

### **_7. `every`_**
测试数组的==所有元素==是否都通过了由提供的函数实现的测试。
```js
  let arr = [1, 2, 3, 4];
  let allSmallNumbers = arr.every(value => value < 5);
  console.log(allSmallNumbers); // 输出: true
```

### **_8. reduce`_**
对数组中的==每个元素==执行一个reducer函数（升序执行），将其结果汇总为单个返回值。
```js
  let arr = [1, 2, 3, 4];
  let sum = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  console.log(sum); // 输出: 10
```
