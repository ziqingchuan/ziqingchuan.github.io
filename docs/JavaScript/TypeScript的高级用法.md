---
title: TypeScript的高级用法
createTime: 2025/09/12 10:58:21
permalink: /article/f99ghd6w/
tags:
  - TypeScript
excerpt: 介绍TypeScript的一些高级用法
---

TypeScript 作为 JavaScript 的超集，引入了许多强大的类型系统特性，本文将详细介绍 TypeScript 的各种高级用法。

## 1. 类型别名 vs 接口

### 类型别名 (Type Aliases)
使用 `type` 关键字创建新名称来引用一个类型：

```typescript
type UserID = string | number;
type User = {
  id: UserID;
  name: string;
  email: string;
};
```

### 接口 (Interfaces)
使用 `interface` 关键字定义对象形状：

```typescript
interface User {
  id: string | number;
  name: string;
  email: string;
}
```

### 主要区别
- 接口可扩展（使用 `extends`），类型别名使用 `&` 交叉类型
- 接口支持声明合并（同名接口自动合并）
- 类型别名可以表示原始类型、联合类型、元组等

## 2. 实用工具类型

TypeScript 提供了一系列内置工具类型来简化常见类型转换：

### Partial\<T\>
使类型 `T` 的所有属性变为可选：

```typescript
interface User {
  name: string;
  age: number;
}

type PartialUser = Partial<User>;
// 等价于 { name?: string; age?: number; }
```

### Required\<T\>
使类型 `T` 的所有属性变为必需：

```typescript
interface User {
  name?: string;
  age?: number;
}

type RequiredUser = Required<User>;
// 等价于 { name: string; age: number; }
```

### Readonly\<T\>
使类型 `T` 的所有属性变为只读：

```typescript
interface User {
  name: string;
  age: number;
}

type ReadonlyUser = Readonly<User>;
// 等价于 { readonly name: string; readonly age: number; }
```

### Pick\<T, K\>
从类型 `T` 中选择一组属性 `K`：

```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

type UserBasicInfo = Pick<User, 'name' | 'email'>;
// 等价于 { name: string; email: string; }
```

### Omit\<T, K\>
从类型 `T` 中排除一组属性 `K`：

```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

type UserWithoutEmail = Omit<User, 'email'>;
// 等价于 { name: string; age: number; }
```

### Record\<K, T\>
构造一个对象类型，其属性键为 `K`，属性值为 `T`：

```typescript
type UserRoles = Record<string, boolean>;
// 等价于 { [key: string]: boolean; }
```

### Exclude\<T, U\>
从类型 `T` 中排除那些可以赋值给 `U` 的类型：

```typescript
type T = Exclude<'a' | 'b' | 'c', 'a'>;
// 结果为 'b' | 'c'
```

### Extract\<T, U\>
从类型 `T` 中提取那些可以赋值给 `U` 的类型：

```typescript
type T = Extract<'a' | 'b' | 'c' | 1, string>;
// 结果为 'a' | 'b' | 'c'
```

### NonNullable\<T\>
从类型 `T` 中排除 `null` 和 `undefined`：

```typescript
type T = NonNullable<string | null | undefined>;
// 结果为 string
```

### ReturnType\<T\>
获取函数类型 `T` 的返回值类型：

```typescript
type T = ReturnType<() => string>;
// 结果为 string
```

### Parameters\<T\>
获取函数类型 `T` 的参数类型：

```typescript
type T = Parameters<(a: string, b: number) => void>;
// 结果为 [a: string, b: number]
```

## 3. 高级类型特性

### 联合类型 (Union Types)
表示一个值可以是几种类型之一：

```typescript
type ID = string | number;
type Status = 'active' | 'inactive' | 'pending';
```

### 交叉类型 (Intersection Types)
将多个类型合并为一个类型：

```typescript
interface Person {
  name: string;
}

interface Employee {
  employeeId: number;
}

type Staff = Person & Employee;
// 必须同时有 name 和 employeeId
```

### 类型守卫 (Type Guards)
在运行时检查类型，帮助 TypeScript 缩小类型范围：

```typescript
function isString(value: any): value is string {
  return typeof value === 'string';
}

if (isString(input)) {
  // 这里 TypeScript 知道 input 是 string 类型
  console.log(input.toUpperCase());
}
```

### 索引签名 (Index Signatures)
定义对象中未知属性的类型：

```typescript
interface StringDictionary {
  [key: string]: string;
}

const dict: StringDictionary = {
  name: "John",
  email: "john@example.com"
};
```

### 映射类型 (Mapped Types)
基于旧类型创建新类型：

```typescript
type Optional<T> = {
  [P in keyof T]?: T[P];
};

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

### 条件类型 (Conditional Types)
根据条件选择类型：

```typescript
type IsString<T> = T extends string ? true : false;
type A = IsString<'hello'>; // true
type B = IsString<number>; // false
```

### 模板字面量类型 (Template Literal Types)
基于字符串模板创建类型：

```typescript
type Event = 'click' | 'scroll';
type Handler = `on${Capitalize<Event>}`;
// 结果为 'onClick' | 'onScroll'
```

## 4. 枚举 (Enums)

TypeScript 扩展了 JavaScript 的枚举功能：

```typescript
// 数字枚举
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

// 字符串枚举
enum FileAccess {
  Read = "READ",
  Write = "WRITE"
}

// 常量枚举（编译时被完全移除）
const enum Colors {
  Red,
  Green,
  Blue
}
```

## 5. 泛型约束

使用 `extends` 关键字约束泛型参数：

```typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): void {
  console.log(arg.length);
}

// 只能传递有 length 属性的参数
logLength("hello"); // 5
logLength([1, 2, 3]); // 3
```

## 6. 命名空间 (Namespaces)

TypeScript 中的命名空间帮助组织代码，避免全局污染：

```typescript
namespace Utilities {
  export function formatDate(date: Date): string {
    return date.toISOString();
  }
  
  export function generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

// 使用命名空间中的函数
Utilities.formatDate(new Date());
```

## 7. 声明文件 (.d.ts)

为 JavaScript 库提供类型信息：

```typescript
// global.d.ts
declare module 'my-library' {
  export function doSomething(): void;
  export const value: number;
}

// 使用声明
import { doSomething } from 'my-library';
```

## 8. 装饰器 (Decorators)

TypeScript 支持装饰器（实验性特性），用于修改类、方法、属性等：

```typescript
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(`调用方法: ${key}`);
    return originalMethod.apply(this, args);
  };
  
  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}
```
