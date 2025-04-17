# Javascript


## 变量声明提升？

参考答案：

::: details 展开查看

##### 变量声明提升

大部分编程语言都是先声明变量再使用，但在 JS 中，使用`var`声明变量可以不一样：

```javascript
console.log(a); // undefined
var a = 10;
```

上述代码正常输出`undefined`而不是报错`Uncaught ReferenceError: a is not defined`,这是因为声明提升（hoisting），相当于如下代码：

```javascript
   var a; //声明 默认值是undefined “准备工作”
   console.log(a);
   a = 10; //赋值
```

##### 函数声明提升

我们都知道，创建一个函数的方法有两种，一种是通过函数声明`function foo(){}` ,另一种是通过函数表达式`var foo = function(){}` ,那这两种在函数提升有什么区别呢？

```javascript
   console.log(f1); // function f1(){}
   function f1() {} // 函数声明

   console.log(f2); // undefined
   var f2 = function() {}; // 函数表达式
```

接下来我们通过一个例子来说明这个问题：

```javascript
   function test() {
       foo(); // Uncaught TypeError "foo is not a function"
       bar(); // "this will run!"
       var foo = function() {
           // function expression assigned to local variable 'foo'
           alert("this won't run!");
       };
       function bar() {
           // function declaration, given the name 'bar'
           alert("this will run!");
       }
   }
   test();  // out: 
```

在上面的例子中，`foo()`调用的时候报错了，而 bar 能够正常调用。

我们前面说过变量和函数都会上升，遇到函数表达式 `var foo = function(){}`时，首先会将`var foo`上升到函数体顶部，然而此时的` foo` 的值为 `undefined`,所以执行`foo()`报错。

而对于函数`bar()`, 则是提升了整个函数，所以`bar()`才能够顺利执行。

有个细节必须注意：**当遇到函数和变量同名且都会被提升的情况，函数声明优先级比较高，因此变量声明会被函数声明所覆盖，但是可以重新赋值。**

```javascript
alert(a); //输出：function a(){ alert('我是函数') }
   function a() {
       alert("我是函数");
   } //
var a = "我是变量";
alert(a); //输出：'我是变量'
```

` function` 声明的优先级比`var` 声明高，也就意味着当两个同名变量同时被` function` 和 `var `声明时，`function `声明会覆盖` var` 声明。

这代码等效于：

```javascript
function a() {
  alert("我是函数");
}
var a; //hoisting
alert(a); //输出：function a(){ alert('我是函数') }
a = "我是变量"; //赋值
alert(a); //输出：'我是变量'
```

最后我们看个复杂点的例子：

```javascript
function test(arg) {
       // 1. 形参 arg 是 "hi"
       // 2. 因为函数声明比变量声明优先级高，所以此时 arg 是 function
       console.log(arg);
       var arg = "hello"; // 3.var arg 变量声明被忽略， arg = 'hello'被执行
       function arg() {
           console.log("hello world");
       }
       console.log(arg);
   }
test("hi");
/* 输出：
function arg(){
  console.log('hello world') 
}
hello 
*/
```

这是因为当函数执行的时候,首先会形成一个新的私有的作用域，然后依次按照如下的步骤执行：

- 如果有形参，先给形参赋值

- 进行私有作用域中的预解释，函数声明优先级比变量声明高，最后后者会被前者所覆盖，**但是可以重新赋值**

- 私有作用域中的代码从上到下执行


:::

## 什么是执行上下文（EC）? 执行上下文的生命周期？

参考答案：

::: details 展开查看

执行上下文就是当前 JavaScript 代码被解析和执行时所处环境的抽象概念， JavaScript 中运行任何的代码都是在执行上下文中运行.

在 JavaScript 代码运行时，解释执行全局代码、调用函数或使用` eval `函数执行一个字符串表达式都会创建并进入一个新的执行环境，
而这个执行环境被称之为**执行上下文**。因此执行上下文有三类：全局执行上下文、函数执行上下文、eval 函数执行上下文.

#### 执行上下文总共有三种类型：

- **全局执行上下文**：这是默认的、最基础的执行上下文。不在任何函数中的代码都位于全局执行上下文中。它做了两件事：
1. 创建一个全局对象，在浏览器中这个全局对象就是 window 对象。
2. 将 `this` 指针指向这个全局对象。一个程序中只能存在一个全局执行上下文。
- **函数执行上下文：** 每次调用函数时，都会为该函数创建一个新的执行上下文。每个函数都拥有自己的执行上下文，但是只有在函数被调用的时候才会被创建。
一个程序中可以存在任意数量的函数执行上下文。每当一个新的执行上下文被创建，它都会按照特定的顺序执行一系列步骤，具体过程将在本文后面讨论。
- **eval 函数执行上下文：** 运行在 `eval` 函数中的代码也获得了自己的执行上下文，但由于 Javascript 开发人员不常用 eval 函数。

执行上下文的生命周期包括三个阶段：**创建阶段 → 执行阶段 → 回收阶段**

##### 1. 创建阶段

当函数被调用，但未执行任何其内部代码之前，会做以下三件事：

- 创建变量对象：首先初始化函数的参数` arguments`(形参)，提升函数声明和变量声明。
- 创建作用域链（Scope Chain）：在执行期上下文的创建阶段，作用域链是在变量对象之后创建的。作用域链本身包含变量对象。作用域链用于解析变量。当被要求解析变量时，JavaScript 始终从代码嵌套的最内层开始，如果最内层没有找到变量，就会跳转到上一层父作用域中查找，直到找到该变量。
- 确定 this 指向：包括多种情况，下文会详细说明

在一段 JS 脚本执行之前，要先解析代码（所以说 JS 是解释执行的脚本语言），解析的时候会先创建一个全局执行上下文环境，先把代码中即将执行的变量、函数声明都拿出来。变量先暂时赋值为 undefined，函数则先声明好可使用。这一步做完了，然后再开始正式执行程序。

另外，一个函数在执行之前，也会创建一个函数执行上下文环境，跟全局上下文差不多，不过 函数执行上下文中会多出 this arguments 和函数的参数。

##### 2. 执行阶段

执行变量赋值、代码执行

##### 3. 回收阶段

执行上下文出栈等待虚拟机回收执行上下文

:::

参考资料：

[深入理解 JavaScript 执行上下文和执行栈](https://zhuanlan.zhihu.com/p/59784952)

[【译】理解 Javascript 执行上下文和执行栈](https://zhuanlan.zhihu.com/p/48590085)


## 变量对象（VO）是什么？活动对象（AO）是什么？它们有什么联系？


参考答案：

::: details 展开查看

- **变量对象**是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。

- **活动对象**是在进入函数上下文时刻被创建的，它通过函数的 arguments 属性初始化。arguments 属性值是 Arguments 对象。

未进入执行阶段之前，变量对象(VO)中的属性都不能访问！但是进入执行阶段之后，变量对象(VO)转变为了活动对象(AO)，AO 还包含函数的 parameters(函数传入的参数)，以及 arguments 这个特殊对象。里面的属性都能被访问了，然后开始进行执行阶段的操作。

:::

参考资料：

[冴羽大佬的JavaScript深入之变量对象](https://github.com/mqyqingfeng/Blog/issues/5)


## 作用域链？

当查找变量的时候，会先从**当前上下文**的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，
一直找到**全局上下文**的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。

::: details 展开查看

在 JavaScript 中，**作用域链（Scope Chain）** 是控制变量和函数访问规则的核心机制。它决定了代码中某个位置可以访问哪些变量、函数或对象。理解作用域链对避免变量污染、闭包问题和调试代码至关重要。

---

#### **一、作用域链的核心概念**
1. **作用域（Scope）**：
    - 变量和函数的“可访问范围”，分为：
        - **全局作用域**：整个脚本文件内有效。
        - **函数作用域**：函数内部有效（通过 `function` 关键字定义）。
        - **块级作用域**：`{}` 内有效（通过 `let`/`const` 定义）。

2. **作用域链**：
    - 当访问一个变量时，JavaScript 引擎会从**当前作用域**开始查找，如果找不到，会逐级向上级作用域搜索，直到全局作用域。这种层级关系称为作用域链。

---

#### **二、作用域链的形成**
作用域链的形成与**函数定义的位置**（词法作用域）相关，而非函数调用的位置。以下是一个经典示例：

```javascript
// 全局作用域（Global Scope）
var globalVar = "I am global";

function outer() {
  // outer 函数作用域
  var outerVar = "I am outer";

  function inner() {
    // inner 函数作用域
    var innerVar = "I am inner";
    console.log(innerVar);  // 输出 "I am inner"
    console.log(outerVar);  // 输出 "I am outer"（向上查找 outer 作用域）
    console.log(globalVar); // 输出 "I am global"（向上查找全局作用域）
  }

  inner();
}

outer();
```

**作用域链示意图**：
```
inner 作用域 → outer 作用域 → 全局作用域
```

---

#### **三、作用域链的层级关系**
1. **全局作用域**：
    - 最外层作用域，所有代码均可访问。
    - 在浏览器中，全局对象是 `window`；在 Node.js 中是 `global`。

2. **函数作用域**：
    - 每个函数创建一个新的作用域。
    - 嵌套函数的作用域链会包含外层函数的作用域。

3. **块级作用域**（ES6 新增）：
    - 通过 `let` 和 `const` 在 `{}` 内声明的变量仅在块内有效。

---

#### **四、作用域链的查找规则**
- **就近原则**：优先查找当前作用域的变量，若找不到则逐级向上查找。
- **单向性**：作用域链只能从内向外查找，无法反向。

**示例**：
```javascript
var x = 1;

function foo() {
  var x = 2;
  function bar() {
    var x = 3;
    console.log(x); // 输出 3（当前作用域）
  }
  bar();
  console.log(x); // 输出 2（上层作用域）
}

foo();
console.log(x); // 输出 1（全局作用域）
```

---

#### **五、作用域链与闭包**
闭包的形成与作用域链密切相关。当内部函数引用外部函数的变量时，即使外部函数执行完毕，其作用域仍会保留在作用域链中。

**示例**：
```javascript
function outer() {
  var count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer();
counter(); // 输出 1
counter(); // 输出 2
```
- `inner` 函数保留了对 `outer` 作用域的引用，形成闭包。

---

#### **六、作用域链的可视化**

1. **嵌套作用域**：
   ```
   全局作用域
     │
     ▼
   outer() 作用域
     │
     ▼
   inner() 作用域
   ```

2. **查找路径**：
   ```
   inner 作用域 → outer 作用域 → 全局作用域
   ```

---

#### **七、常见问题**
1. **变量提升（Hoisting）**：
    - 变量和函数声明会被提升到当前作用域的顶部，但赋值不会。
   ```javascript
   console.log(x); // 输出 undefined（已声明但未赋值）
   var x = 10;
   ```

2. **块级作用域与 `var`**：
    - `var` 不支持块级作用域，可能导致意外覆盖变量。
   ```javascript
   if (true) {
     var x = 5;
   }
   console.log(x); // 输出 5（全局作用域）
   ```

3. **`this` 与作用域链**：
    - `this` 的指向与作用域链无关，由函数调用方式决定。

---

#### **八、总结**
- **作用域链**是 JavaScript 实现变量访问的核心机制，基于词法作用域（静态作用域）。
- 通过合理设计作用域，可以避免变量污染和命名冲突。
- 闭包的实现依赖于作用域链的持久性。


:::


## 对原型、原型链、 Function、Object 的理解.

参考答案：

::: details 展开查看

---

#### **基础概念**

##### **1. 原型（Prototype）**
- **定义**：每个 JavaScript 对象（`null` 除外）都有一个内置的 `[[Prototype]]` 属性（通常通过 `__proto__` 访问），指向其构造函数的 `prototype` 对象。
- **作用**：实现对象之间的属性和方法共享。

##### **2. 原型链（Prototype Chain）**
- **定义**：当访问一个对象的属性时，如果对象自身没有该属性，JavaScript 会沿着 `[[Prototype]]` 链逐级向上查找，直到找到或到达 `null`。
- **作用**：实现继承和属性共享。

##### **3. Function 与 Object**
- **Function**：所有函数的构造函数是 `Function`，包括 `Object` 和 `Function` 自身。
- **Object**：所有对象的构造函数是 `Object`，但 `Object` 本身是一个函数（由 `Function` 创建）。

---

#### **关键关系解析**

##### **1. Function 与 Object 的“鸡与蛋”问题**
- **`Function` 是一个函数**，它的构造函数是 `Function` 自己：
  ```javascript
  Function instanceof Function; // true
  Function.__proto__ === Function.prototype; // true
  ```
- **`Object` 是一个函数**，由 `Function` 创建：
  ```javascript
  Object instanceof Function; // true
  Object.__proto__ === Function.prototype; // true
  ```
- **`Function.prototype` 是一个对象**，由 `Object` 创建：
  ```javascript
  Function.prototype instanceof Object; // true
  ```

##### **2. 原型链的终点**
- 所有原型链的终点是 `null`：
  ```javascript
  Object.prototype.__proto__ === null; // true
  ```

---


**原型**是指把所有的对象共用的属性全部放在堆内存的一个对象（共用属性组成的对象），然后让每一个对象的` __proto__`存储这个「共用属性组成的对象」的地址。而这个共用属性就是原型。

**原型链**就是对象通过`__proto__`向当前实例所属类的原型上查找属性或方法的机制，如果找到Object的原型上还是没有找到想要的属性或者是方法则查找结束，最终会返回undefined

####  理解下面三句话

- **当 new 一个函数的时候会创建一个对象，『函数.prototype』 等于 『被创建对象.\_\_proto\_\_』**
- **函数的原型对象『函数.prototype』都是由 Object 这个函数创建的，所以『Object.prototype === 函数.prototype.\_\_proto\_\_』**
- **一切函数『函数.prototype.constructor』都是由 Function 这个函数创建的，所以『Function.prototype === 被创建的函数.\_\_proto\_\_』**

---

![原型与原型链](https://gh-proxy.com/raw.githubusercontent.com/xinyiweizhen/ImageGallery/main/blog_img/20210401160225.png)

:::

## 了解哪些最新的 ES 新特性？

参考答案

::: details 展开查看

**特性 1: ES2024 的 JSON 模块**

支持直接通过 `import` 语法加载 JSON 文件，避免额外的文件读取逻辑。

```js
import config from './config.json' assert { type: 'json' }

console.log(config.setting) // 输出 JSON 文件中的指定属性
```

**特性 2: ES2023 的 Array.prototype.findLast & Array.prototype.findLastIndex**

两个数组新方法，用于从最后一个元素搜索数组元素。它们的功能与 `find() 和 findIndex()` 类似，但搜索从数组末尾开始。

这些方法可在 `Array 和 TypedArray` 原型上使用。此功能通过消除手动数组反转的过程，为逆序搜索提供了一种有效的方法。

```js
const isOdd = (number) => number % 2 === 1
const numbers = [1, 2, 3, 4, 5]

console.log(numbers.findLast(isOdd)) // 5
console.log(numbers.findLastIndex(isOdd)) // 4
```

**特性 3: ES2022 的类字段与私有方法**

支持类中的私有字段 `（#field）` 和私有方法，增强了封装性。

```js
class Counter {
  #count = 0

  increment() {
    this.#count++
  }

  #logCount() {
    console.log(this.#count)
  }
}

const counter = new Counter()
counter.increment()
// counter.#logCount(); // 报错，私有方法不可访问
```

**特性 4: ES2021 的逻辑赋值运算符**

新增 `&&=, ||=, ??=`，简化条件赋值逻辑。

```js
let user = { name: 'Alice', age: null }

user.name ||= 'Default Name' // 如果 name 为 falsy，则赋值
user.age ??= 18 // 如果 age 为 null 或 undefined，则赋值

console.log(user) // { name: 'Alice', age: 18 }
```

**特性 5: ES2020 的可选链和空值合并操作符**

简化深层嵌套对象属性的访问，并安全处理空值。

```js
const user = {
  profile: {
    details: { name: 'Alice' },
  },
}

const name = user.profile?.details?.name ?? 'Anonymous'
console.log(name) // 输出 'Alice'

const age = user.profile?.age ?? 18
console.log(age) // 输出 18
```

**特性 6: ES2019 的数组 flat 和 flatMap 方法**

flat 展开多层嵌套数组，flatMap 结合映射与扁平化操作。

```js
const nestedArray = [1, [2, [3, 4]], 5]
console.log(nestedArray.flat(2)) // [1, 2, 3, 4, 5]

const strings = ['hello', 'world']
console.log(strings.flatMap((str) => str.split('')))
// ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']
```

:::

参考文档

[面试官问：了解哪些最新的 ES 新特性？——这样回答更好！](https://juejin.cn/post/7459351912133132351)


## ES6的新特性

::: details 展开查看

- let/const（常用） 面试会涉及到var、let、const的区别
- 箭头函数（常用）面试会涉及到箭头函数与普通函数的区别
- 解构赋值（常用）面试会涉及对象的结构和数组的结构
- 剩余/扩展运算符（常用）
- 对象属性/方法简写（常用）
- 字符串新增的方法（常用）
- Promise对象（常用）
- 类的定义与类的继承（常用）
- for ... of循环
- ES6 Module(常用)
- 函数默认值(常用)
- Proxy
- iterator迭代器
- map，filter，reduce
- ......

:::

参考文档

- [面试题之ES6的新特性（详细）](https://zhuanlan.zhihu.com/p/235025429)

- [ES6中常用的10个新特性讲解](https://juejin.cn/post/6844903618810757128)

- [hello-es6](https://github.com/xinyiweizhen/hello-es6)

- [ECMAScript 6 入门](https://es6.ruanyifeng.com/)



## 15. let, const, var的区别及使用场景

参考答案

::: details 展开查看

在 JavaScript 中，`var`、`let` 和 `const` 是用于声明变量的三个关键字，它们的主要区别在于作用域、可重新赋值性以及可重新声明性。这些关键字的使用场景也因特性不同而有所差异。

1. **作用域**：
    - `var` 声明的变量具有**函数作用域**或**全局作用域**，即变量在整个函数内或全局范围内都可访问。此外，`var` 存在变量提升（hoisting）现象，即变量会被提升到作用域顶部，但初始化不会提升，这可能导致意外行为。
    - `let` 和 `const` 声明的变量具有**块作用域**，即变量仅在其声明的代码块（如 `if` 语句或循环）内有效。这种特性避免了变量提升问题，使得代码更易于理解和维护。
2. **可重新赋值性**：
    - `var` 声明的变量可以被重新赋值和重新声明。
    - `let` 声明的变量可以被重新赋值，但不能被重新声明。
    - `const` 声明的变量一旦被赋值后，其值不能被重新赋值。
3. **可重新声明性**：
    - `var` 和 `let` 都支持在同一作用域内重新声明同一个变量。
    - `const` 不允许重新声明。
4. **使用场景**：
    - **`var`**：由于其作用域和提升特性可能导致意外行为，通常不推荐使用。但在某些遗留代码中仍可能见到其使用。
    - **`let`**：适用于需要在块作用域内声明变量的场景，例如循环、条件语句等。它提供了灵活性，同时避免了变量提升问题。
    - **`const`**：适用于声明常量或不需要重新赋值的变量。它强调变量不可变性，符合函数式编程思想，有助于减少代码中的错误。

总结：

- 如果变量值可能需要改变，推荐使用 `let`。
- 如果变量值不需要改变，推荐使用 `const`。
- 避免使用 `var`，除非在特定情况下需要兼容旧版浏览器。

:::

参考文档

- [JavaScript 中 var 和 let 和 const 的区别](https://www.cnblogs.com/jspa/p/10784215.html)

- [AI](https://metaso.cn/s/p5EhikE)



## `typeof` 能判断哪些类型

参考答案

::: details 展开查看

| **类型**                | **返回值**    | **备注**                                               |
| ----------------------- | ------------- | ------------------------------------------------------ |
| **Undefined**           | `"undefined"` | 当变量未被定义或未赋值时，返回此值。                   |
| **Null**                | `"object"`    | 历史遗留问题，`null` 被错误地识别为对象。              |
| **Boolean**             | `"boolean"`   | 适用于 `true` 或 `false` 值。                          |
| **Number**              | `"number"`    | 适用于整数和浮点数（包括特殊值 `NaN` 和 `Infinity`）。 |
| **String**              | `"string"`    | 适用于字符串（例如 `"hello"`）。                       |
| **BigInt**              | `"bigint"`    | 适用于任意大的整数（例如 `10n`）。                     |
| **Symbol**              | `"symbol"`    | 适用于 `Symbol` 类型。                                 |
| **Function（classes）** | `"function"`  | 适用于可调用的对象（如函数和类定义）。                 |
| **其他对象**            | `"object"`    | 包括数组、普通对象、日期对象、正则表达式等非函数对象。 |

**注意：**

1. **`typeof null === "object"`**
   在 JavaScript 最初的实现中，JavaScript 中的值是由一个表示类型的标签和实际数据值表示的。对象的类型标签是 0。由于 null 代表的是空指针（大多数平台下值为 0x00），因此，null 的类型标签是 0，typeof null 也因此返回 "object"

2. **实际使用**
   对于更复杂的类型检测，可以使用工具函数，如 `Object.prototype.toString.call()` 或第三方库（如 `lodash`）。

```js
// 数值
typeof 37 === 'number'
typeof 3.14 === 'number'
typeof 42 === 'number'
typeof Math.LN2 === 'number'
typeof Infinity === 'number'
typeof NaN === 'number' // 尽管它是 "Not-A-Number" (非数值) 的缩写
typeof Number(1) === 'number' // Number 会尝试把参数解析成数值
typeof Number('shoe') === 'number' // 包括不能将类型强制转换为数字的值

typeof 42n === 'bigint'

// 字符串
typeof '' === 'string'
typeof 'bla' === 'string'
typeof `template literal` === 'string'
typeof '1' === 'string' // 注意内容为数字的字符串仍是字符串
typeof typeof 1 === 'string' // typeof 总是返回一个字符串
typeof String(1) === 'string' // String 将任意值转换为字符串，比 toString 更安全

// 布尔值
typeof true === 'boolean'
typeof false === 'boolean'
typeof Boolean(1) === 'boolean' // Boolean() 会基于参数是真值还是虚值进行转换
typeof !!1 === 'boolean' // 两次调用 !（逻辑非）运算符相当于 Boolean()

// Symbols
typeof Symbol() === 'symbol'
typeof Symbol('foo') === 'symbol'
typeof Symbol.iterator === 'symbol'

// Undefined
typeof undefined === 'undefined'
typeof declaredButUndefinedVariable === 'undefined'
typeof undeclaredVariable === 'undefined'

// 对象
typeof { a: 1 } === 'object'

// 使用 Array.isArray 或者 Object.prototype.toString.call
// 区分数组和普通对象
typeof [1, 2, 4] === 'object'

typeof new Date() === 'object'
typeof /regex/ === 'object'

// 下面的例子令人迷惑，非常危险，没有用处。避免使用它们。
typeof new Boolean(true) === 'object'
typeof new Number(1) === 'object'
typeof new String('abc') === 'object'

// 函数
typeof function () {} === 'function'
typeof class C {} === 'function'
typeof Math.sin === 'function'
```

:::


## `==` 和 `===` 有什么区别？

参考答案

::: details 展开查看

- **`==`（宽松相等）**：会在比较两个操作数时执行 **类型转换**，尝试将两者转换为相同类型后再比较。
- **`===`（严格相等）**：不会执行类型转换，仅在类型和值完全相同的情况下返回 `true`。
- **推荐使用 `===`**：因为它更严格、更符合预期，能避免潜在的错误。尤其是在需要精确判断值和类型时。
- 实际工作中，使用 if (a == null) 可判断 a 是否是 null 或者 undefined。

**常见比较结果**

| **x**               | **y**               | **==** | **===** |
| ------------------- | ------------------- | ------ | ------- |
| `undefined`         | `undefined`         | ✅     | ✅      |
| `null`              | `null`              | ✅     | ✅      |
| `true`              | `true`              | ✅     | ✅      |
| `false`             | `false`             | ✅     | ✅      |
| `'foo'`             | `'foo'`             | ✅     | ✅      |
| `0`                 | `0`                 | ✅     | ✅      |
| `+0`                | `-0`                | ✅     | ✅      |
| `+0`                | `0`                 | ✅     | ✅      |
| `-0`                | `0`                 | ✅     | ✅      |
| `0n`                | `-0n`               | ✅     | ✅      |
| `0`                 | `false`             | ✅     | ❌      |
| `""`                | `false`             | ✅     | ❌      |
| `""`                | `0`                 | ✅     | ❌      |
| `'0'`               | `0`                 | ✅     | ❌      |
| `'17'`              | `17`                | ✅     | ❌      |
| `[1, 2]`            | `'1,2'`             | ✅     | ❌      |
| `new String('foo')` | `'foo'`             | ✅     | ❌      |
| `null`              | `undefined`         | ✅     | ❌      |
| `null`              | `false`             | ❌     | ❌      |
| `undefined`         | `false`             | ❌     | ❌      |
| `{ foo: 'bar' }`    | `{ foo: 'bar' }`    | ❌     | ❌      |
| `new String('foo')` | `new String('foo')` | ❌     | ❌      |
| `0`                 | `null`              | ❌     | ❌      |
| `0`                 | `NaN`               | ❌     | ❌      |
| `'foo'`             | `NaN`               | ❌     | ❌      |
| `NaN`               | `NaN`               | ❌     | ❌      |

说明：

- ✅ 表示比较结果为 `true`
- ❌ 表示比较结果为 `false`

:::


## `undefined`和`null`有什么区别？

参考答案

::: details 展开查看

####    赋值角度:

- `null`表示没有对象，即该处不应该有值.

   - 作为函数的参数，表示该函数的参数不是对象.
   - 作为对象原型链的终点.

- `undefined`表示缺少值，即此处应该有值，但没有定义.

   - 定义了形参，没有传实参，显示`undefined`.

   - 对象属性名不存在时，显示`undefined`.

   - 函数没有写返回值，即没有写`return`，拿到的是`undefined`.

   - 写了`return`，但是没有赋值，拿到的是`undefined`.

####    数据转换角度:

- `null`默认转成 **0**
- `undefined`默认转成 **NaN**

:::

## 值类型和引用类型的区别

参考答案

::: details 展开查看

```js
// 值类型
let a = 100
let b = a
a = 200
console.log(b) // 100
```

```js
// 引用类型
let a = { age: 20 }
let b = a
b.age = 21
console.log(a.age) // 21
```

| 特性               | 值类型                                                                | 引用类型                                     |
| ------------------ | --------------------------------------------------------------------- | -------------------------------------------- |
| **存储内容**       | 数据值本身                                                            | 数据的引用（地址）                           |
| **存储位置**       | 栈内存                                                                | 栈存引用，堆存实际数据                       |
| **赋值方式**       | 拷贝值                                                                | 拷贝引用（地址）                             |
| **变量之间独立性** | 互相独立，互不影响                                                    | 指向同一数据，互相影响                       |
| **常见数据类型**   | 基本数据类型（如 `number，string，boolean，undefined，null，symbol`） | 复杂数据类型（如 `Object，Array，Function`） |

1. 为什么有值类型和引用类型？

- **值类型**适合存储简单、占用内存较小的数据，操作快速。
- **引用类型**适合存储复杂、占用内存较大的数据，支持动态扩展。

2. 如何避免引用类型的共享问题？

- 如果需要创建引用类型的副本，使用深拷贝，而非浅拷贝。

深拷贝例子：

```javascript
const obj1 = { name: 'Alice' }
const obj2 = JSON.parse(JSON.stringify(obj1)) // 创建深拷贝
obj2.name = 'Bob'
console.log(obj1.name) // "Alice"
```

浅拷贝例子：

```javascript
const obj1 = { name: 'Alice' }
const obj2 = { ...obj1 } // 浅拷贝
obj2.name = 'Bob'
console.log(obj1.name) // "Alice"
```

:::


## 你熟悉哪些数组 API ？

参考答案

::: details 展开查看

1. **创建数组**
   - `Array()`, `Array.of()`, `Array.from()`

```js
Array.of(1, 2, 3) // [1, 2, 3]
Array.from('123') // ['1', '2', '3']
```

2. **添加/删除元素**
   - `push()`: 在末尾添加
   - `pop()`: 删除末尾
   - `unshift()`: 在开头添加
   - `shift()`: 删除开头

```js
let arr = [1, 2]
arr.push(3) // [1, 2, 3]
arr.pop() // [1, 2]
arr.unshift(4) // [4, 1, 2]
arr.shift() // [1, 2]
```

3. **组合/拆分数组**
   - `concat()`: 合并数组，不影响原数组，浅拷贝
   - `join()`: 将数组连接为字符串
   - `slice()`: 截取部分数组（不修改原数组）

```js
;[1, 2].concat([3, 4]) // [1, 2, 3, 4]
;['a', 'b', 'c'].join('-') // 'a-b-c'
```

4. **替换/重组**
   - `splice()`: 添加、删除或替换元素

```js
let arr = [1, 2, 3]
arr.splice(1, 1, 'a') // [1, 'a', 3]
```

5. **查找单个元素**
   - `indexOf()`: 查找首次出现的索引
   - `lastIndexOf()`: 查找最后出现的索引
   - `find()`: 找到第一个满足条件的元素
   - `findIndex()`: 找到第一个满足条件的索引

```js
;[1, 2, 3].indexOf(2) // 1
;[1, 2, 3, 2].lastIndexOf(2) // 3
;[1, 2, 3].find((x) => x > 2) // 3
```

6. **判断**
   - `includes()`: 判断是否包含某元素
   - `some()`: 判断是否至少有一个元素满足条件
   - `every()`: 判断是否所有元素满足条件

```js
;[1, 2, 3].includes(2) // true
;[1, 2, 3].some((x) => x > 2) // true
;[1, 2, 3].every((x) => x > 0) // true
```

7. **迭代**
   - `forEach()`: 遍历元素，无法 break，可以用 try/catch 中 throw new Error 来停止

```js
;[1, 2, 3].forEach((item, index) => console.log(item, index))
```

8. **映射/变换**
   - `map()`: 对每个元素进行操作并生成新数组

```javascript
;[1, 2, 3].map((x) => x * 2) // [2, 4, 6]
```

9. **过滤**
   - `filter()`: 筛选出满足条件的元素

```js
;[1, 2, 3].filter((x) => x > 1) // [2, 3]
```

10. **规约**

- `reduce()`: 将数组缩减为单一值
- `reduceRight()`: 从右向左缩减

```js
;[1, 2, 3].reduce((acc, val) => acc + val, 0) // 6
;['a', 'b', 'c'].reduceRight((acc, val) => acc + val, '') // 'cba'
```

11. **排序**

- `sort()`: 对数组进行排序
- `reverse()`: 反转数组顺序

```js
;[3, 1, 2].sort((a, b) => a - b) // [1, 2, 3]
;[1, 2, 3].reverse() // [3, 2, 1]
```

12. **填充**

- `fill()`: 用指定值填充数组

```js
new Array(3).fill(0) // [0, 0, 0]
```

13. **扁平化**

- `flat()`: 将多维数组展平成一维
- `flatMap()`: 映射并展平

```js
;[1, [2, [3]]].flat(2) // [1, 2, 3]
;[1, 2].flatMap((x) => [x, x * 2]) // [1, 2, 2, 4]
```

14. **复制/填充**

- `copyWithin()`: 将数组的部分内容复制到其他位置

```js
;[1, 2, 3, 4].copyWithin(1, 2) // [1, 3, 4, 4]
```

15. **生成键值对**

- `keys()`, `values()`, `entries()`

```js
const arr = ['a', 'b', 'c']
;[...arr.keys()] // [0, 1, 2]
;[...arr.entries()] // [[0, 'a'], [1, 'b'], [2, 'c']]
```

16. **判断是否是数组**

- `Array.isArray()`

```js
Array.isArray([1, 2, 3]) // true
```

:::

## JavaScript数组所有API全解密

数组是一种非常重要的数据类型，它语法简单、灵活、高效。 在多数编程语言中，数组都充当着至关重要的角色，以至于很难想象没有数组的编程语言会是什么模样。特别是JavaScript，它天生的灵活性，又进一步发挥了数组的特长，丰富了数组的使用场景。可以毫不夸张地说，不深入地了解数组，不足以写JavaScript。

截止ES7规范，数组共包含33个标准的API方法和一个非标准的API方法，使用场景和使用方案纷繁复杂，其中有不少浅坑、深坑、甚至神坑。下面将从Array构造器及ES6新特性开始，逐步帮助你掌握数组。

声明：以下未特别标明的方法均为ES5已实现的方法。

::: details 展开查看

#### **改变自身值的方法(9个)**

基于ES6，改变自身值的方法一共有**9个**，分别为`pop`、`push`、`reverse`、`shift`、`sort`、`splice`、`unshift`，以及两个ES6新增的方法`copyWithin` 和 `fill`。

> [!TIP]
> Vue2.x中，对数组的`push`、`pop`、`shift`、`unshift`、`splice`、`sort`、`reverse`等方法进行了封装，使用以上方法会触发视图更新，从而达到数据绑定的效果。

##### 1. **`pop`**

---

`pop() `方法删除一个数组中的最后的一个元素，并且返回这个元素。如果是栈的话，这个过程就是栈顶弹出。

```javascript
var array = ["cat", "dog", "cow", "chicken", "mouse"];
var item = array.pop();
console.log(array); // ["cat", "dog", "cow", "chicken"]
console.log(item); // mouse
```

由于设计上的巧妙，`pop`方法可以应用在类数组对象上，即 `鸭式辨型`. 如下：

```javascript
var o = {0:"cat", 1:"dog", 2:"cow", 3:"chicken", 4:"mouse", length:5}
var item = Array.prototype.pop.call(o);
console.log(o); // Object {0: "cat", 1: "dog", 2: "cow", 3: "chicken", length: 4}
console.log(item); // mouse
```

但如果类数组对象**不具有length属性**，那么该对象将被**创建**length属性，length值为0。如下：

```javascript
var o = {0:"cat", 1:"dog", 2:"cow", 3:"chicken", 4:"mouse"}
var item = Array.prototype.pop.call(o);
console.log(array); // Object {0: "cat", 1: "dog", 2: "cow", 3: "chicken", 4: "mouse", length: 0}
console.log(item); // undefined
```

---

##### 2. **`push`**

---

`push()`方法添加**一个或者多个元素**到**数组末尾**，并且**返回数组新的长度**。如果是栈的话，这个过程就是**栈顶压入**。

语法：**`arr.push(element1, …, elementN)`**

```javascript
var array = ["football", "basketball", "volleyball", "Table tennis", "badminton"];
var i = array.push("golfball");
console.log(array); // ["football", "basketball", "volleyball", "Table tennis", "badminton", "golfball"]
console.log(i); // 6
```

同pop方法一样，push方法也可以应用到类数组对象上，**如果length不能被转成一个数值或者不存在length属性时，则插入的元素索引为0，且length属性不存在时，将会创建它。**

```javascript
var o = {0:"football", 1:"basketball"};
var i = Array.prototype.push.call(o, "golfball");
console.log(o); // Object {0: "golfball", 1: "basketball", length: 1}
console.log(i); // 1
```

实际上，`push`方法是根据**length属性**来决定从**哪里开始插入给定的值**。

```javascript
var o = {0:"football", 1:"basketball",length:1};
var i = Array.prototype.push.call(o,"golfball");
console.log(o); // Object {0: "football", 1: "golfball", length: 2}
console.log(i); // 2
```

利用push根据length属性插入元素这个特点，可以实现数组的合并，如下：

```javascript
var array = ["football", "basketball"];
var array2 = ["volleyball", "golfball"];
var i = Array.prototype.push.apply(array,array2);
console.log(array); // ["football", "basketball", "volleyball", "golfball"]
console.log(i); // 4
```
---

##### 3. **`reverse`**

---

`reverse()`方法**颠倒数组中元素的位置，第一个会成为最后一个，最后一个会成为第一个**，该方法返回**对数组的引用**。

语法：**`arr.reverse()`**

```javascript
var array = [1,2,3,4,5];
var array2 = array.reverse();
console.log(array); // [5,4,3,2,1]
console.log(array2===array); // true
```

同上，`reverse` 也是鸭式辨型的受益者，颠倒元素的范围受**length属性**制约。如下:

```javascript
var o = {0:"a", 1:"b", 2:"c", length:2};
var o2 = Array.prototype.reverse.call(o);
console.log(o); // Object {0: "b", 1: "a", 2: "c", length: 2}
console.log(o === o2); // true
```

如果 **length 属性小于2 或者 length 属性不为数值**，那么原类数组对象将没有变化。**即使 length 属性不存在，该对象特别的是，当 length 属性较大时，类数组对象的『索引』会尽可能的向 length 看齐。**如下:

```javascript
var o = {0:"a", 1:"b", 2:"c",length:100};
var o2 = Array.prototype.reverse.call(o);
console.log(o); // Object {97: "c", 98: "b", 99: "a", length: 100}
console.log(o === o2); // true
```
---

##### 4. **`shift`**

---

`shift()`方法**删除数组的第一个元素，并返回这个元素**。如果是栈的话，这个过程就是栈底弹出。

语法：**arr.shift()**

```javascript
var array = [1,2,3,4,5];
var item = array.shift();
console.log(array); // [2,3,4,5]
console.log(item); // 1
```

同样受益于鸭式辨型，对于类数组对象，shift仍然能够处理。如下：

```javascript
var o = {0:"a", 1:"b", 2:"c", length:3};
var item = Array.prototype.shift.call(o);
console.log(o); // Object {0: "b", 1: "c", length: 2}
console.log(item); // a
```

如果类数组对象length属性不存在，将添加length属性，并初始化为0。如下：

```javascript
var o = {0:"a", 1:"b", 2:"c"};
var item = Array.prototype.shift.call(o);
console.log(o); // Object {0: "a", 1: "b", 2:"c" length: 0}
console.log(item); // undefined
```

---

##### 5. **`sort`**

---

`sort()`方法对**数组元素进行排序，并返回这个数组**。sort方法比较复杂，这里我将多花些篇幅来讲这块。

语法：**arr.sort([comparefn])**

`comparefn`是可选的，如果省略，数组元素将按照各自转换为**字符串的Unicode(万国码)位点顺序排序**，例如”Boy”将排到”apple”之前。当对数字排序的时候，25将会排到8之前，因为转换为字符串后，”25”将比”8”靠前。例如：

```javascript
var array = ["apple","Boy","Cat","dog"];
var array2 = array.sort();
console.log(array); // ["Boy", "Cat", "apple", "dog"]
console.log(array2 == array); // true

array = [10, 1, 3, 20];
var array3 = array.sort();
console.log(array3); // [1, 10, 20, 3]
```

如果指明了`comparefn`，数组将按照调用该函数的返回值来排序。若 a 和 b 是两个将要比较的元素：

- 若 comparefn(a, b) < 0，那么a 将排到 b 前面；
- 若 comparefn(a, b) = 0，那么a 和 b 相对位置不变；
- 若 comparefn(a, b) > 0，那么a , b 将调换位置；

如果数组元素为数字，则排序函数comparefn格式如下所示：

```javascript
function compare(a, b){
  return a-b;
}
```

如果数组元素为非ASCII字符的字符串(如包含类似 e、é、è、a、ä 或中文字符等非英文字符的字符串)，则需要使用**`String.localeCompare`**。下面这个函数将排到正确的顺序。

```javascript
var array = ['互','联','网','改','变','世','界'];
var array2 = array.sort();

var array = ['互','联','网','改','变','世','界']; // 重新赋值,避免干扰array2
var array3 = array.sort(function (a, b) {
  return a.localeCompare(b);
});

console.log(array2); // ["世", "互", "变", "改", "界", "网", "联"]
console.log(array3); // ["变", "改", "互", "界", "联", "世", "网"]
```

如上，『互联网改变世界』这个数组，sort函数默认**按照数组元素unicode字符串形式进行排序**，然而实际上，我们期望的是按照拼音先后顺序进行排序，显然`String.localeCompare` 帮助我们达到了这个目的。

为什么上面测试中需要重新给array赋值呢，这是因为sort每次排序时改变的是数组本身，并且返回数组引用。如果不这么做，经过连续两次排序后，array2 和 array3 将指向同一个数组，最终影响我们测试。array重新赋值后就断开了对原数组的引用。

同上，sort一样受益于鸭式辨型，比如：

```javascript
var o = {0:'互',1:'联',2:'网',3:'改',4:'变',5:'世',6:'界',length:7};
Array.prototype.sort.call(o,function(a, b){
  return a.localeCompare(b);
});
console.log(o); // Object {0: "变", 1: "改", 2: "互", 3: "界", 4: "联", 5: "世", 6: "网", length: 7}, 可见同上述排序结果一致
```
> [!TIP]
> 注意：使用sort的鸭式辨型特性时，若**类数组对象不具有length属性，它并不会进行排序，也不会为其添加length属性**。

```javascript
var o = {0:'互',1:'联',2:'网',3:'改',4:'变',5:'世',6:'界'};
Array.prototype.sort.call(o,function(a, b){
  return a.localeCompare(b);
});
console.log(o); // Object {0: "互", 1: "联", 2: "网", 3: "改", 4: "变", 5: "世", 6: "界"}, 可见并未添加length属性
```

---

##### 6. **`splice`**

---

`splice()`方法**用新元素替换旧元素的方式来修改数组**。它是一个常用的方法，复杂的数组操作场景通常都会有它的身影，特别是**需要维持原数组引用时，就地删除或者新增元素，splice是最适合的**。

语法：**`arr.splice(start,deleteCount[, item1[, item2[, …]]])`**

`start` 指定从哪一位开始修改内容。如果**超过了数组长度，则从数组末尾开始添加内容**；如果**是负值**，则其指定的索引位置等同于 `length`+ `start` (length为数组的长度)，表示从数组末尾开始的第 `-start `位。

`deleteCount` 指定要**删除的元素个数**，若**等于0，则不删除**。这种情况下，至少应该**添加一位新元素，若大于start之后的元素总和，则start及之后的元素都将被删除**。

`itemN` 指定**新增的元素**，如果**缺省，则该方法只删除数组元素**。

**返回值** 由原数组中**被删除元素组成的数组**，如果**没有删除，则返回一个空数组**。

```javascript
var array = ["apple","boy"];
var splices = array.splice(1,1);
console.log(array); // ["apple"]
console.log(splices); // ["boy"] ,可见是从数组下标为1的元素开始删除,并且删除一个元素,由于itemN缺省,故此时该方法只删除元素

array = ["apple","boy"];
splices = array.splice(2,1,"cat");
console.log(array); // ["apple", "boy", "cat"]
console.log(splices); // [], 可见由于start超过数组长度,此时从数组末尾开始添加元素,并且原数组不会发生删除行为

array = ["apple","boy"];
splices = array.splice(-2,1,"cat");
console.log(array); // ["cat", "boy"]
console.log(splices); // ["apple"], 可见当start为负值时,是从数组末尾开始的第-start位开始删除,删除一个元素,并且从此处插入了一个元素

array = ["apple","boy"];
splices = array.splice(-3,1,"cat");
console.log(array); // ["cat", "boy"]
console.log(splices); // ["apple"], 可见即使-start超出数组长度,数组默认从首位开始删除

array = ["apple","boy"];
splices = array.splice(0,3,"cat");
console.log(array); // ["cat"]
console.log(splices); // ["apple", "boy"], 可见当deleteCount大于数组start之后的元素总和时,start及之后的元素都将被删除
```

同上, `splice`一样受益于鸭式辨型, 比如:

```javascript
var o = {0:"apple",1:"boy",length:2};
var splices = Array.prototype.splice.call(o,1,1);
console.log(o); // Object {0: "apple", length: 1}, 可见对象o删除了一个属性,并且length-1
console.log(splices); // ["boy"]
```

注意：如果类数组对象没有`length`属性，splice将为该类数组对象添加length属性，并初始化为0。（此处忽略举例，如果需要请在评论里反馈）

如果需要删除数组中一个已存在的元素，可参考如下：

```javascript
var array = ['a','b','c'];
array.splice(array.indexOf('b'),1);
```

---

##### 7. **`unshift`**

---

`unshift()` 方法用于在**数组开始处插入**一些元素(就像是栈底插入)，并返回数组新的长度。

语法：`arr.unshift(element1, …, elementN)`

```javascript
var array = ["red", "green", "blue"];
var length = array.unshift("yellow");
console.log(array); // ["yellow", "red", "green", "blue"]
console.log(length); // 4
```

如果给unshift方法传入一个数组呢？

```javascript
var array = ["red", "green", "blue"];
var length = array.unshift(["yellow"]);
console.log(array); // [["yellow"], "red", "green", "blue"]
console.log(length); // 4, 可见数组也能成功插入
```

同上，unshift也受益于鸭式辨型，呈上栗子：

```javascript
var o = {0:"red", 1:"green", 2:"blue",length:3};
var length = Array.prototype.unshift.call(o,"gray");
console.log(o); // Object {0: "gray", 1: "red", 2: "green", 3: "blue", length: 4}
console.log(length); // 4
```
> [!TIP]
> 注意：如果类数组对象不指定length属性，则返回结果是这样的 `Object {0: "gray", 1: "green", 2: "blue", length: 1}`，shift会认为数组长度为0，此时将从对象下标为0的位置开始插入，相应位置属性将被替换，此时初始化类数组对象的length属性为插入元素个数。

---

##### 8. **`copyWithin`(ES6)**

---

`copyWithin()` 方法基于**ECMAScript 2015（ES6）规范**，用于**数组内元素之间的替换，即替换元素和被替换元素均是数组内的元素**。

语法：`arr.copyWithin(target, start[, end = this.length])`

`taget` 指定**被替换元素的索引**，`start `指定**替换元素起始的索引**，`end`可选，指的是**替换元素结束位置的索引**。

如果**start为负**，则其指定的**索引位置等同于length+start，length为数组的长度。end也是如此**。

注：目前只有Firefox（版本32及其以上版本）实现了该方法。

```javascript
var array = [1,2,3,4,5]; 
var array2 = array.copyWithin(0,3);
console.log(array===array2,array2); // true [4, 5, 3, 4, 5]

var array = [1,2,3,4,5]; 
console.log(array.copyWithin(0,3,4)); // [4, 2, 3, 4, 5]

var array = [1,2,3,4,5]; 
console.log(array.copyWithin(0,-2,-1)); // [4, 2, 3, 4, 5]
```

同上，copyWithin一样受益于鸭式辨型，例如：

```javascript
var o = {0:1, 1:2, 2:3, 3:4, 4:5,length:5}
var o2 = Array.prototype.copyWithin.call(o,0,3);
console.log(o===o2,o2); // true Object { 0=4,  1=5,  2=3,  更多...}
```

如需在Firefox之外的浏览器使用copyWithin方法，请参考 [Polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin#Polyfill)。

---

##### 9. **`fill`(ES6)**

---

`fill() `方法基于**ECMAScript 2015（ES6）规范**，它同样用于数组元素替换，但与copyWithin略有不同，它主要用于将数组指定区间内的元素替换为某个值。

语法：`arr.fill(value, start[, end = this.length])`

value 指定被替换的值，start 指定替换元素起始的索引，end 可选，指的是替换元素结束位置的索引。

如果start为负，则其指定的索引位置等同于length+start，length为数组的长度。end也是如此。

注：目前只有Firefox（版本31及其以上版本）实现了该方法。

```javascript
var array = [1,2,3,4,5];
var array2 = array.fill(10,0,3);
console.log(array===array2,array2); // true [10, 10, 10, 4, 5], 可见数组区间[0,3]的元素全部替换为10
// 其他的举例请参考copyWithin
```

同上，fill 一样受益于鸭式辨型，例如：

```javascript
var o = {0:1, 1:2, 2:3, 3:4, 4:5,length:5}
var o2 = Array.prototype.fill.call(o,10,0,2);
console.log(o===o2,o2); // true Object { 0=10,  1=10,  2=3,  更多...}
```

如需在Firefox之外的浏览器使用fill方法,请参考 [Polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill#Compatibility)。

#### **不会改变自身的方法(9个)**

基于ES7，不会改变自身的方法一共有9个，分别为`concat`、`join`、`slice`、`toString`、`toLocateString`、`indexOf`、`lastIndexOf`、未标准的`toSource`以及ES7新增的方法`includes`。

##### 1. **`concat`**

---

`concat() `方法将传入的数组或者元素与原数组合并，组成一个新的数组并返回。

语法：`arr.concat(value1, value2, …, valueN)`

```javascript
var array = [1, 2, 3];
var array2 = array.concat(4,[5,6],[7,8,9]);
console.log(array2); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(array); // [1, 2, 3], 可见原数组并未被修改
```

若`concat`方法中**不传入参数**，那么将基于**原数组浅复制生成一个一模一样的新数组**（指向新的地址空间）。

```javascript
var array = [{a: 1}];
var array3 = array.concat();
console.log(array3); // [{a: 1}]
console.log(array3 === array); // false
console.log(array[0] === array3[0]); // true，新旧数组第一个元素依旧共用一个同一个对象的引用
```

同上，`concat` 一样受益于鸭式辨型，但其效果可能达不到我们的期望，如下：

```javascript
var o = {0:"a", 1:"b", 2:"c",length:3};
var o2 = Array.prototype.concat.call(o,'d',{3:'e',4:'f',length:2},['g','h','i']);
console.log(o2); // [{0:"a", 1:"b", 2:"c", length:3}, 'd', {3:'e', 4:'f', length:2}, 'g', 'h', 'i']
```

可见，类数组对象合并后返回的是依然是数组，并不是我们期望的对象。


##### 2. **`join`**

---

`join()` 方法将数组中的所有元素连接成一个字符串。

语法：`arr.join([separator = ‘,’])`    separator可选，缺省默认为逗号。

```javascript
var array = ['We', 'are', 'Chinese'];
console.log(array.join()); // "We,are,Chinese"
console.log(array.join('+')); // "We+are+Chinese"
console.log(array.join('')); // "WeareChinese"
```

同上，join 一样受益于鸭式辨型，如下：

```javascript
var o = {0:"We", 1:"are", 2:"Chinese", length:3};
console.log(Array.prototype.join.call(o,'+')); // "We+are+Chinese"
console.log(Array.prototype.join.call('abc')); // "a,b,c"
```


##### **3. `slice`**

---

`slice()` 方法将数组中一部分元素**浅复制**存入新的数组对象，并且返回这个数组对象。

语法：`arr.slice([start[, end]])`

参数 `start` 指定**复制开始位置的索引**，`end`如果有值则表示复制**结束位置的索引（不包括此位置）**。

如果 start 的值**为负数**，假如**数组长度为 length**，则表示从 **length+start 的位置**开始复制，此时参数 end 如果有值，只能是比 start 大的负数，否则将返回空数组。

slice方法参数为空时，同concat方法一样，都是浅复制生成一个新数组。

```javascript
var array = ["one", "two", "three","four", "five"];
console.log(array.slice()); // ["one", "two", "three","four", "five"]
console.log(array.slice(2,3)); // ["three"]
```

**浅复制** 是指当对象的被复制时，只是复制了对象的引用，指向的依然是同一个对象。下面来说明slice为什么是浅复制。

```javascript
var array = [{color:"yellow"}, 2, 3];
var array2 = array.slice(0,1);
console.log(array2); // [{color:"yellow"}]
array[0]["color"] = "blue";
console.log(array2); // [{color:"bule"}]
```

由于slice是浅复制，复制到的对象只是一个引用，改变原数组array的值，array2也随之改变。

同时，稍微利用下 slice 方法第一个参数为负数时的特性，我们可以非常方便的拿到数组的最后一项元素，如下：

```javascript
console.log([1,2,3].slice(-1));//[3]
```

同上，slice 一样受益于鸭式辨型。如下：

```javascript
var o = {0:{"color":"yellow"}, 1:2, 2:3, length:3};
var o2 = Array.prototype.slice.call(o,0,1);
console.log(o2); // [{color:"yellow"}] ,毫无违和感...
```

鉴于IE9以下版本对于该方法支持性并不是很好，如需更好的支持低版本IE浏览器，请参考[polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)。


##### 4. **`toString`**

---

toString() 方法返回数组的字符串形式，该字符串由数组中的每个元素的 `toString()` 返回值经调用 `join()` 方法连接（由逗号隔开）组成。

语法： *arr.toString()*

```javascript
var array = ['Jan', 'Feb', 'Mar', 'Apr'];
var str = array.toString();
console.log(str); // Jan,Feb,Mar,Apr
```

当数组直接和字符串作连接操作时，将会自动调用其`toString()`方法。

```javascript
var str = ['Jan', 'Feb', 'Mar', 'Apr'] + ',May';
console.log(str); // "Jan,Feb,Mar,Apr,May"
// 下面我们来试试鸭式辨型
var o = {0:'Jan', 1:'Feb', 2:'Mar', length:3};
var o2 = Array.prototype.toString.call(o);
console.log(o2); // [object Object]
console.log(o.toString()==o2); // true
```

可见，`Array.prototype.toString()`方法处理类数组对象时，跟类数组对象直接调用`Object.prototype.toString()`方法结果完全一致，说好的鸭式辨型呢？

根据ES5语义，toString() 方法是通用的，可被用于任何对象。如果对象有一个join() 方法，将会被调用，其返回值将被返回，没有则调用`Object.prototype.toString()`，为此，我们给o对象添加一个join方法。如下：

```javascript
var o = {
  0:'Jan', 
  1:'Feb', 
  2:'Mar', 
  length:3, 
  join:function(){
    return Array.prototype.join.call(this);
  }
};
console.log(Array.prototype.toString.call(o)); // "Jan,Feb,Mar"
```


##### 5. **`toLocaleString`**

---

`toLocaleString()` 类似`toString()`的变型，该字符串由数组中的每个元素的 `toLocaleString()` 返回值经调用 `join()` 方法连接（由逗号隔开）组成。

语法：*arr.toLocaleString()*

数组中的元素将调用各自的 `toLocaleString` 方法：

- Object：Object.prototype.toLocaleString()
- Number：Number.prototype.toLocaleString()
- Date：Date.prototype.toLocaleString()
```javascript
var array= [{name:'zz'}, 123, "abc", new Date()];
var str = array.toLocaleString();
console.log(str); // [object Object],123,abc,2016/1/5 下午1:06:23
```
其鸭式辨型的写法也同`toString`保持一致，如下：
```javascript
var o = {
   0:123,
   1:'abc',
   2:new Date(),
   length:3,
   join:function(){
      return Array.prototype.join.call(this);
   }
};
console.log(Array.prototype.toLocaleString.call(o)); // 123,abc,2016/1/5 下午1:16:50
```


##### 6. **`indexOf`**

---

`indexOf()` 方法用于查找元素在数组中第一次出现时的索引，如果没有，则返回-1。

语法：*arr.indexOf(element, fromIndex=0)*

`element` 为需要查找的元素。

`fromIndex` 为开始查找的位置，缺省默认为 0。如果超出数组长度，则返回 -1。
如果为负值，假设数组长度为 length，则从数组的第 length + fromIndex项开始往数组末尾查找，如果length + fromIndex<0 则整个数组都会被查找。

`indexOf` 使用严格相等（即使用 === 去匹配数组中的元素）。
```javascript
var array = ['abc', 'def', 'ghi','123'];
console.log(array.indexOf('def')); // 1
console.log(array.indexOf('def',-1)); // -1 此时表示从最后一个元素往后查找,因此查找失败返回-1
console.log(array.indexOf('def',-4)); // 1 由于4大于数组长度,此时将查找整个数组,因此返回1
console.log(array.indexOf(123)); // -1, 由于是严格匹配,因此并不会匹配到字符串'123'
```
得益于鸭式辨型，`indexOf` 可以处理类数组对象。如下：

```javascript
var o = {0:'abc', 1:'def', 2:'ghi', length:3};
console.log(Array.prototype.indexOf.call(o,'ghi',-4));//2
```

然而该方法并不支持IE9以下版本，如需更好的支持低版本IE浏览器（IE6~8）， 请参考 Polyfill。

##### 7. **`lastIndexOf`**

---

`lastIndexOf()` 方法用于查找元素在数组中最后一次出现时的索引，如果没有，则返回-1。并且它是indexOf的逆向查找，即从数组最后一个往前查找。

语法：*arr.lastIndexOf(element, fromIndex=length-1)*

`element` 为需要查找的元素。

`fromIndex` 为开始查找的位置，缺省默认为数组长度length-1。如果超出数组长度，由于是逆向查找，则查找整个数组。
如果为负值，则从数组的第 length + fromIndex 项开始往数组开头查找，如果 length + fromIndex < 0 则数组不会被查找。

同 `indexOf` 一样，`lastIndexOf` 也是严格匹配数组元素。

举例请参考 `indexOf` ，不再详述，兼容低版本IE浏览器（IE6~8），请参考 `Polyfill`。

##### 8. **`includes(ES7)`**

---

`includes()`方法基于ECMAScript 2016（ES7）规范，它用来判断当前数组是否包含某个指定的值，如果是，则返回 true，否则返回 false。

语法：*arr.includes(element, fromIndex=0)*

`element` 为需要查找的元素。

`fromIndex` 表示从该索引位置开始查找 element，缺省为0，它是正向查找，即从索引处往数组末尾查找。

```javascript
var array = [-0, 1, 2];
console.log(array.includes(+0)); // true
console.log(array.includes(1)); // true
console.log(array.includes(2,-4)); // true
```

以上，`includes` 似乎忽略了 ` -0 `与 ` +0 ` 的区别，这不是问题，因为 `JavaScript` 一直以来都是不区分` -0 `和 ` +0 ` 的。

你可能会问，既然有了`indexOf`方法，为什么又造一个`includes`方法，`arr.indexOf(x) > -1 ` 不就等于 `arr.includes(x)` ？看起来是的，几乎所有的时候它们都等同，
唯一的区别就是includes能够发现`NaN`，而`indexOf`不能。
```javascript
var array = [NaN];
console.log(array.includes(NaN)); // true
console.log(arra.indexOf(NaN)>-1); // false
```

该方法同样受益于鸭式辨型。如下：
```javascript
var o = {0:'a', 1:'b', 2:'c', length:3};
var bool = Array.prototype.includes.call(o, 'a');
console.log(bool); // true
```
该方法只有在**Chrome 47、opera 34、Safari 9**版本及其更高版本中才被实现。如需支持其他浏览器，请参考 Polyfill。

##### 9. **`toSource(非标准)`**

---

`toSource()` 方法是非标准的，该方法返回数组的源代码，目前只有 `Firefox` 实现了它。

语法：*arr.toSource()*

```javascript
var array = ['a', 'b', 'c'];
console.log(array.toSource()); // ["a", "b", "c"]

// 测试鸭式辨型
var o = {0:'a', 1:'b', 2:'c', length:3};
console.log(Array.prototype.toSource.call(o)); // ["a","b","c"]
```

**遍历方法(12个)**

基于ES6，不会改变自身的方法一共有12个，分别为`forEach`、`every`、`some`、`filter`、`map`、`reduce`、`reduceRight` 以及ES6新增的方法`entries`、`find`、`findIndex`、`keys`、`values`。

##### 1. **`forEach`**

---

`forEach()` 方法指定数组的每项元素都执行一次传入的函数，返回值为`undefined`。

语法：*arr.forEach(fn, thisArg)*

`fn` 表示在数组每一项上执行的函数，接受三个参数：

- `value` 当前正在被处理的元素的值
- `index` 当前元素的数组索引
- `array` 数组本身

`thisArg` 可选，用来当做fn函数内的this对象。

`forEach` 将为数组中每一项执行一次 `fn` 函数，那些已删除，新增或者从未赋值的项将被跳过（但不包括值为 undefined 的项）。

遍历过程中，fn会被传入上述三个参数。
```javascript
var array = [1, 3, 5];
var obj = {name:'cc'};
var sReturn = array.forEach(function(value, index, array){
    array[index] = value * value;
    console.log(this.name); // cc被打印了三次
},obj);

console.log(array); // [1, 9, 25], 可见原数组改变了
console.log(sReturn); // undefined, 可见返回值为undefined
```

得益于鸭式辨型，虽然`forEach`不能直接遍历对象，但它可以通过`call`方式遍历 类数组对象。如下：
```javascript
var o = {0:1, 1:3, 2:5, length:3};
Array.prototype.forEach.call(o,function(value, index, obj){
console.log(value,index,obj);
obj[index] = value * value;
},o);
// 1 0 Object {0: 1, 1: 3, 2: 5, length: 3}
// 3 1 Object {0: 1, 1: 3, 2: 5, length: 3}
// 5 2 Object {0: 1, 1: 9, 2: 5, length: 3}
console.log(o); // Object {0: 1, 1: 9, 2: 25, length: 3}
```
参考前面的文章 [详解JS遍历](https://louiszhai.github.io/2015/12/18/traverse/#forEach) 中 `forEach`的讲解，我们知道，`forEach`无法直接退出循环，只能使用`return` 来达到 for循环中 `continue` 的效果，
并且`forEach`不能在低版本IE（6~8）中使用，兼容写法请参考 [Polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#%E5%85%BC%E5%AE%B9%E6%97%A7%E7%8E%AF%E5%A2%83%EF%BC%88Polyfill%EF%BC%89)。

##### 2. **`every`**

---

`every()` 方法使用传入的函数测试所有元素，只要其中有 **一个函数** 返回值为 `false`，那么该方法的结果为 `false`；
如果**全部**返回 `true`，那么该方法的结果才为 `true`。

因此` every `方法存在如下规律：

若需检测数组中存在元素大于100 （即 one > 100），那么我们需要在传入的函数中构造 “false” 返回值 （即返回 item <= 100），
同时整个方法结果为 false 才表示数组存在元素满足条件；（简单理解为：若是单项判断，可用 one false ===> false）
若需检测数组中是否所有元素都大于100 （即all > 100）那么我们需要在传入的函数中构造 “true” 返回值 （即返回 item > 100），
同时整个方法结果为 true 才表示数组所有元素均满足条件。(简单理解为：若是全部判断，可用 all true ===> true）
语法同上述`forEach`，具体还可以参考 [详解JS遍历](https://louiszhai.github.io/2015/12/18/traverse/#every) 中every的讲解。

以下是鸭式辨型的写法：
```javascript
var o = {0:10, 1:8, 2:25, length:3};
var bool = Array.prototype.every.call(o,function(value, index, obj){
return value >= 8;
},o);
console.log(bool); // true
```

`every` 一样不能在低版本IE(6~8)中使用，兼容写法请参考 [Polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every#Compatibility)。

##### 3. **`some`**

---

`some()` 方法刚好同 `every()` 方法**相反**，`some` 测试数组元素时，只要有**一个函数**返回值为 `true`，则该方法返回 `true`，
若**全部**返回 `false`，则该方法返回 `false`。

some 方法存在如下规律：

若需检测数组中存在元素大于100 (即 one > 100)，那么我们需要在传入的函数中构造 “true” 返回值 (即返回 item > 100)，同时整个方法结果为 true 才表示数组存在元素满足条件；（简单理解为：若是单项判断，可用 one true ===> true）
若需检测数组中是否所有元素都大于100（即 all > 100），那么我们需要在传入的函数中构造 “false” 返回值 （即返回 item <= 100），同时整个方法结果为 false 才表示数组所有元素均满足条件。（简单理解为：若是全部判断，可用 all false ===> false）

你注意到没有，`some`方法与`includes`方法有着异曲同工之妙，他们都是探测数组中是否拥有满足条件的元素，一旦找到，便返回true。
多观察和总结这种微妙的关联关系，能够帮助我们深入理解它们的原理。

`some` 的鸭式辨型写法可以参照`every`，同样它也不能在低版本IE（6~8）中使用，兼容写法请参考 [Polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some#Compatibility)。

##### 4. **`filter`**

---

`filter()` 方法使用传入的函数测试所有元素，并返回**所有通过测试的元素**组成的**新数组**。它就好比一个过滤器，筛掉不符合条件的元素。

语法：*arr.filter(fn, thisArg)*

```javascript

var array = [18, 9, 10, 35, 80];
var array2 = array.filter(function(value, index, array){
return value > 20;
});
console.log(array2); // [35, 80]

```

`filter`一样支持鸭式辨型，具体请参考`every`方法鸭式辨型写法。其在低版本IE（6~8）的兼容写法请参考 [Polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#Compatibility)。

##### 5. **`map`**

---

`map()` 方法遍历数组，使用传入函数**处理每个元素**，并返回**函数的返回值组成的新数组**。

语法：*arr.map(fn, thisArg)*

参数介绍同 `forEach` 方法的参数介绍。

具体用法请参考 [详解JS遍历](https://louiszhai.github.io/2015/12/18/traverse/#map) 中 map 的讲解。

map 一样支持鸭式辨型, 具体请参考`every`方法鸭式辨型写法。

其在低版本IE（6~8）的兼容写法请参考 [Polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Compatibility)。

##### 6. **`reduce`**

---

`reduce()` 方法接收一个方法作为累加器，数组中的每个值(从左至右) 开始合并，最终为一个值。

语法：*arr.reduce(fn, initialValue)*

`fn` 表示在数组每一项上执行的函数，接受四个参数：

- `previousValue` 上一次调用回调返回的值，或者是提供的初始值
- `value` 数组中当前被处理元素的值
- `index` 当前元素在数组中的索引
- `array` 数组自身

`initialValue` 指定第一次调用 fn 的第一个参数。

当 fn 第一次执行时：

如果 `initialValue` 在调用 `reduce` 时被提供，那么第一个 `previousValue` 将等于 `initialValue`，此时 `item` 等于数组中的第一个值；
如果 `initialValue` 未被提供，那么 `previousVaule` 等于数组中的第一个值，`item` 等于数组中的第二个值。此时如果数组为空，那么将抛出 `TypeError`。
如果数组仅有一个元素，并且没有提供 `initialValue`，或提供了 `initialValue` 但数组为空，那么fn不会被执行，数组的唯一值将被返回。

```javascript

var array = [1, 2, 3, 4];
var s = array.reduce(function(previousValue, value, index, array){
return previousValue * value;
},1);
console.log(s); // 24
// ES6写法更加简洁
array.reduce((p, v) => p * v); // 24

```

以上回调被调用4次，每次的参数和返回见下表：

|callback|	previousValue|	currentValue|	index|	array|	return value|
|:---:|:---:|:---:|:---:|:---:|:---:|
|第1次	|1	|1	|0	|[1,2,3,4]|	1|
|第2次	|1	|2	|1	|[1,2,3,4]|	2|
|第3次	|2	|3	|2	|[1,2,3,4]|	6|
|第4次	|6	|4	|3	|[1,2,3,4]|	24|

`reduce` 一样支持鸭式辨型，具体请参考`every`方法鸭式辨型写法。

其在低版本IE（6~8）的兼容写法请参考 [Polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#%E5%85%BC%E5%AE%B9%E6%97%A7%E7%8E%AF%E5%A2%83%EF%BC%88Polyfill%EF%BC%89)。

##### 7. **`reduceRight`**

---

`reduceRight()` 方法接收一个方法作为累加器，数组中的每个值（从右至左）开始合并，最终为一个值。除了与`reduce`执行**方向相反**外，其他完全与其一致，请参考上述 `reduce` 方法介绍。

其在低版本IE（6~8）的兼容写法请参考 [Polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#.E5.85.BC.E5.AE.B9.E6.80.A7.E6.97.A7.E7.8E.AF.E5.A2.83.EF.BC.88Polyfill.EF.BC.89)。

##### 8. **`entries(ES6)`**

---

`entries()`方法基于ECMAScript 2015（ES6）规范，返回一个数组迭代器对象，该对象包含数组中每个索引的键值对。

语法：*arr.entries()*

```javascript
var array = ["a", "b", "c"];
var iterator = array.entries();
console.log(iterator.next().value); // [0, "a"]
console.log(iterator.next().value); // [1, "b"]
console.log(iterator.next().value); // [2, "c"]
console.log(iterator.next().value); // undefined, 迭代器处于数组末尾时, 再迭代就会返回undefined

```

很明显，`entries` 也受益于鸭式辨型，如下：

```javascript

var o = {0:"a", 1:"b", 2:"c", length:3};
var iterator = Array.prototype.entries.call(o);
console.log(iterator.next().value); // [0, "a"]
console.log(iterator.next().value); // [1, "b"]
console.log(iterator.next().value); // [2, "c"]

```

##### 9. **`find`** & 10. **`findIndex(ES6)`**

---

`find()`方法基于ECMAScript 2015（ES6）规范，返回数组中第一个满足条件的**元素**（如果有的话）， 如果没有，则返回 `undefined` 。

`findIndex()` 方法也基于ECMAScript 2015（ES6）规范，它返回数组中第一个满足条件的元素的**索引**（如果有的话）否则返回 `-1` 。

语法：*arr.find(fn, thisArg)*，*arr.findIndex(fn, thisArg)*

我们发现它们的语法与`forEach`等十分相似，其实不光语法，`find`（或`findIndex`）在参数及其使用注意事项上，均与`forEach`一致。因此此处将略去 `find`（或`findIndex`）的参数介绍。

下面我们来看个例子🌰 ：

```javascript
var array = [1, 3, 5, 7, 8, 9, 10];
function f(value, index, array){
return value%2==0; // 返回偶数
}
function f2(value, index, array){
return value > 20; // 返回大于20的数
}
console.log(array.find(f)); // 8
console.log(array.find(f2)); // undefined
console.log(array.findIndex(f)); // 4
console.log(array.findIndex(f2)); // -1
```

由于其鸭式辨型写法也与`forEach`方法一致，故此处略去。

兼容性上我没有详测，可以知道的是，最新版的Chrome v47，以及Firefox的版本25均实现了它们。

##### 11. **`keys(ES6)`**

---

`keys()` 方法基于ECMAScript 2015（ES6）规范，返回一个数组索引的迭代器。（浏览器实际实现可能会有调整）

语法：*arr.keys()*

```javascript
var array = ["abc", "xyz"];
var iterator = array.keys();
console.log(iterator.next()); // Object {value: 0, done: false}
console.log(iterator.next()); // Object {value: 1, done: false}
console.log(iterator.next()); // Object {value: undefined, done: false}

```

索引迭代器会包含那些没有对应元素的索引，如下：

```javascript
var array = ["abc", , "xyz"];
var sparseKeys = Object.keys(array);
var denseKeys = [...array.keys()];
console.log(sparseKeys); // ["0", "2"]
console.log(denseKeys);  // [0, 1, 2]

```

其鸭式辨型写法请参考上述 `entries` 方法。

前面我们用`Array.from`生成一个从 0到 指定数字 的新数组，利用 `keys `也很容易实现。
```javascript

[...Array(10).keys()]; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
[...new Array(10).keys()]; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

```

由于`Array`的特性，`new Array` 和`Array` 对单个数字的处理相同，因此以上两种均可行。

##### 12. **`values(ES6)`**
values() 方法基于ECMAScript 2015（ES6）规范，返回一个数组迭代器对象，该对象包含数组中每个索引的值。其用法基本与上述 entries 方法一致。

语法：*arr.values()*

遗憾的是，现在没有浏览器实现了该方法，因此下面将就着看看吧。
```javascript
var array = ["abc", "xyz"];
var iterator = array.values();
console.log(iterator.next().value);//abc
console.log(iterator.next().value);//xyz

```

##### **`Symbol.iterator(ES6)`**

---

该方法基于ECMAScript 2015（ES6）规范，同 `values` 方法功能相同。

语法：*`arr[Symbol.iterator]()`*

```javascript
var array = ["abc", "xyz"];
var iterator = array[Symbol.iterator]();
console.log(iterator.next().value); // abc
console.log(iterator.next().value); // xyz
```

其鸭式辨型写法请参考上述 `entries` 方法。

#### 小结
以上，`Array.prototype` 的各方法基本介绍完毕，这些方法之间存在很多共性。比如：

所有插入元素的方法, 比如 `push`、`unshift`，一律返回数组新的长度；
所有删除元素的方法，比如 `pop`、`shift`、`splice` 一律返回删除的元素，或者返回删除的多个元素组成的数组；
部分遍历方法，比如 `forEach`、`every`、`some`、`filter`、`map`、`find`、`findIndex`，它们都包含`function(value,index,array){} `和 `thisArg` 这样两个形参。
`Array.prototype` 的所有方法均具有鸭式辨型这种神奇的特性。它们不止可以用来处理数组对象，还可以处理类数组对象。

例如 javascript 中一个纯天然的类数组对象字符串（String），像join方法（不改变当前对象自身）就完全适用，可惜的是 `Array.prototype` 中很多方法均会去试图修改当前对象的 `length` 属性，
比如说 `pop`、`push`、`shift`, `unshift` 方法，操作 `String` 对象时，由于`String`对象的长度本身不可更改，这将导致抛出`TypeError`错误。

还记得么，`Array.prototype`本身就是一个数组，并且它的长度为0。



::: 

参考文档：

- [【深度长文】JavaScript数组所有API全解密](http://louiszhai.github.io/2017/04/28/array/)
