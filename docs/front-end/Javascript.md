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

在 JavaScript 代码运行时，解释执行全局代码、调用函数或使用` eval `函数执行一个字符串表达式都会创建并进入一个新的执行环境，而这个执行环境被称之为**执行上下文**。因此执行上下文有三类：全局执行上下文、函数执行上下文、eval 函数执行上下文.

#### 执行上下文总共有三种类型：

- **全局执行上下文**：这是默认的、最基础的执行上下文。不在任何函数中的代码都位于全局执行上下文中。它做了两件事：1. 创建一个全局对象，在浏览器中这个全局对象就是 window 对象。2. 将 `this` 指针指向这个全局对象。一个程序中只能存在一个全局执行上下文。
- **函数执行上下文：** 每次调用函数时，都会为该函数创建一个新的执行上下文。每个函数都拥有自己的执行上下文，但是只有在函数被调用的时候才会被创建。一个程序中可以存在任意数量的函数执行上下文。每当一个新的执行上下文被创建，它都会按照特定的顺序执行一系列步骤，具体过程将在本文后面讨论。
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

