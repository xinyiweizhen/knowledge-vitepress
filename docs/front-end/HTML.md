# HTML


## DOCTYPE 是什么，都有哪些属性？

参考答案

::: details  展开查看

HTML 的 `<!DOCTYPE>` 声明是文档类型声明，用于告知浏览器当前 HTML 文档使用的 HTML 版本，从而确保文档以正确的模式渲染。
它通常出现在 HTML 文档的第一行。

在现代开发中，推荐使用 HTML5 的简单声明

```html
<!DOCTYPE html>
```

在之前的 HTML 版本中，如 HTML4 ，会有其他写法，不过现在已经不常用。

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

:::


## meta 标签是干什么的，都有什么属性和作用

参考答案

::: details 展开查看

HTML 中的 `<meta>` 标签用于提供页面的**元信息**，这些信息不会直接显示在网页内容中，但对浏览器、搜索引擎和其他服务非常重要。

常见的 meta 信息如下：

1. 字符编码。指定网页的字符编码，确保正确显示内容。

```html
<meta charset="UTF-8" />
```

2. 页面视口设置（响应式设计）。控制页面在移动设备上的显示和缩放行为。

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

- `width=device-width`：页面宽度匹配设备屏幕宽度
- `initial-scale=1.0`：初始缩放比例为 1

3. 搜索引擎优化（SEO）。提供描述性信息，便于搜索引擎索引。

```html
<meta
  name="keywords"
  content="前端, 面试, 前端面试, 面试题, 刷题, 面试流程, 前端面试流程, 面试准备, 简历, 前端简历, Javascript, Typescript, React, Vue, webpack, vite, HTTP, 算法"
/>
<meta name="description" content="面试派，整理的前端面试真实流程，大厂面试规范，开源免费" />
<meta name="robots" content="index, follow" />
```

4. 作者信息。提供网页作者信息。

```html
<meta name="author" content="xxxx" />
```

:::

## 如何理解 HTML5 语义化 ？有哪些常见的语义化标签？

理解 HTML5 语义化

::: details 展开查看

HTML5 语义化是指通过使用具有明确含义的标签，使网页的结构和内容更加清晰，方便浏览器、开发者以及搜索引擎理解网页内容。

语义化的核心在于让标签不仅描述外观，还能表达内容的含义，从而提升网页的可读性、可维护性和可访问性。

- 提高代码可读性：开发者无需额外注释即可理解代码结构。
- 增强 SEO（搜索引擎优化）：搜索引擎能更好地抓取和理解网页内容。
- 提升可访问性：辅助技术（如屏幕阅读器）可以更准确地解释页面内容。
- 支持更好的浏览器兼容性：现代浏览器能够更高效地渲染语义化结构。

:::


## 常见的 HTML5 语义化标签

HTML5 引入了许多新的语义化标签，用于更清晰地描述网页内容的结构，方便搜索引擎和开发者理解页面内容。

::: details 展开查看

- `<header>` 注意：要区别于 `<head>`
- `<nav>`
- `<main>`
- `<article>`
- `<section>`
- `<aside>`
- `<footer>`
- `<figure>`
- `<figcaption>`
- `<mark>`
- `<time>`
- `<summary>`
- `<details>`



##### 结构性元素 ：
- `<header>`：定义页面或区块的头部。
- `<nav>`：表示导航链接的部分。
- `<main>`：表示文档的主要内容区域。
- `<section>`：定义文档中的一个独立部分。
- `<article>`：表示独立的内容块（如博客文章、新闻等）。
- `<aside>`：表示与主要内容相关但独立的内容（如侧边栏）。
- `<footer>`：定义页面或区块的底部。
##### 其他语义化元素 ：
- `<figure>` 和 `<figcaption>`：用于标注图片、图表等内容及其说明。
- `<mark>`：高亮显示文本。
- `<time>`：表示日期或时间。
- `<progress>`：表示进度条。
- `<meter>`：表示度量值（如分数、百分比）。


这些语义化标签不仅提高了代码的可读性，还有助于SEO优化。

:::

## 写一个 HTML5 语义化的例子

::: details 展开查看

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HTML5 语义化示例</title>
  </head>
  <body>
    <header>
      <h1>面试派</h1>
      <nav>
        <ul>
          <li><a href="#home">首页</a></li>
          <li><a href="#about">关于</a></li>
          <li><a href="#contact">联系</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <section id="home">
        <h2>欢迎访问</h2>
        <p>这是一个 HTML5 语义化的示例。</p>
      </section>
      <section id="about">
        <h2>关于我们</h2>
        <article>
          <h3>我们的历史</h3>
          <p>这是关于我们历史的介绍。</p>
        </article>
      </section>
    </main>

    <aside>
      <h3>相关文章</h3>
      <ul>
        <li><a href="#">文章 1</a></li>
        <li><a href="#">文章 2</a></li>
      </ul>
    </aside>

    <footer>
      <p>&copy; 2025 &copy; 面试派</p>
    </footer>
  </body>
</html>
```

:::


## H5有哪些新特性

HTML5 不仅新增了语义化标签，还引入了许多强大的功能特性，使网页开发更加灵活和高效。


::: details 展开查看

1. 多媒体支持
- 音频和视频 ：

  `<audio>` 和 `<video>` 标签允许直接嵌入音频和视频文件，无需依赖第三方插件（如Flash）。
  支持多种格式（如MP3、OGG、WebM等），并通过属性控制播放行为（如controls、autoplay、loop等）。

示例：

```html
<video controls width="640" height="360">
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.webm" type="video/webm">
  您的浏览器不支持视频播放。
</video>
```

2. 图形和绘图
- Canvas ：

  `<canvas>` 元素提供了一个画布，可以使用JavaScript绘制图形、动画等。
  应用场景包括数据可视化、游戏开发等。

示例：

```html
<canvas id="myCanvas" width="200" height="100"></canvas>
<script>
 const canvas = document.getElementById('myCanvas');
 const ctx = canvas.getContext('2d');
 ctx.fillStyle = 'blue';
 ctx.fillRect(10, 10, 150, 80);
</script>
```

在这个示例中，使用 `document.getElementById()` 方法获取 Canvas 元素，并通过 `getContext(“2d”)` 获取2D绘图上下文。
然后，使用 `fillStyle` 属性设置填充颜色，`fillRect()`方法绘制一个矩形。

- SVG ：

支持矢量图形（Scalable Vector Graphics），适合高分辨率屏幕和动态图形。

3. 表单增强

- 新输入类型 ：

增加了多种新的输入类型，如`email`、`url`、`number`、`date`、`range`等，简化了表单验证。

示例：

```html
<form>
  <input type="email" placeholder="请输入邮箱">
  <input type="date">
  <input type="range" min="0" max="100">
</form>
```
- 表单属性 ：

新增了`placeholder`、`required`、`pattern`等属性，提升了用户体验和数据验证能力。

4. 本地存储

- Web Storage ：
  提供了`localStorage`和`sessionStorage`，允许在客户端存储数据，替代了传统的Cookie。
  `localStorage`数据持久化，`sessionStorage`数据仅在当前会话有效。

示例：

```javascript
localStorage.setItem('name', 'Alice');
console.log(localStorage.getItem('name')); // 输出 "Alice"
```

- IndexedDB ：
  更高级的本地数据库，支持复杂的数据存储和查询。

5. 离线应用
   Application Cache （已废弃）和 Service Worker ：
   Service Worker 可以拦截网络请求，实现离线访问和缓存管理。
   应用场景包括PWA（渐进式Web应用）。

6. Web Workers
   允许在后台运行JavaScript，避免阻塞主线程，提升性能。
   适用于复杂的计算任务。

7. 地理位置 API
   提供获取用户地理位置的功能。

示例：

```javascript
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    console.log(`纬度: ${position.coords.latitude}, 经度: ${position.coords.longitude}`);
  });
}
```

8. WebSocket
   实现全双工通信，适合实时应用（如聊天室、在线游戏）。

9. Drag and Drop
   支持拖放操作，增强了交互性。

:::

## 常见的 HTML 标签哪些是 inline 元素，哪些是 block 元素，哪些是 inline-block 元素

参考答案

::: details 展开查看

1. `inline` 元素有：`a`, `span`, `img`, `strong`, `em`, `b`, `i`, `abbr`, `code`, `br`, `q`（引用）, `sub`（下标）, `sup`（上标）

2. `block` 元素有：`div`, `p`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `ul`, `ol`, `li`, `form`, `section`, `article`, `footer`, `header`, `nav`

3. `inline-block` 元素有：`input` `button`

> 注意，`table` 虽然也是独占一行，但它 `display: table` 不是 `block`

区别:

- 是否能占据一行。
- 是否可以设置宽高。
- 行内元素只能容纳行内元素或者文本，块级元素可以容纳其他任意元素。


块级元素：

- 总是在新行上开始，就是每个块级元素独占一行，默认从上到下排列
- 宽度缺少时是它的容器的100%，除非设置一个宽度
- 高度、行高以及外边距和内边距都是可以设置的
- 块级元素可以容纳其它行级元素和块级元素

行内元素：

- 和其它元素都会在一行显示
- 高、行高以及外边距和内边距可以设置
- 宽度就是文字或者图片的宽度，不能改变
- 行级元素只能容纳文本或者其它行内元素


使用行内元素需要注意的是：

- 行内元素设置宽度`width`无效
- 行内元素设置`height`无效，但是可以通过`line-height`来设置
- 设置`margin`只有左右有效，上下无效
- 设置`padding`只有左右有效，上下无效

可以通过display属性对行内元素和块级元素进行切换
行内转块级：display: block;
块级转行内：display: inline;

:::


## 什么是 DOM ，它和 HTML 有什么区别？

参考答案

::: details 展开查看

DOM 即 Document Object Model 文档对象模型，它是一个 JS 对象。而 HTML 是一种标记语言（和 XML 类似）用于定义网页的内容和结构。

DOM 的特点

- 树形结构，DOM 树
- 可编程，可以使用 Javascript 读取和修改 DOM 数据
- 动态性，通过 DOM API 动态修改结构和数据

HTML 到 DOM 的过程

- HTML 解析：浏览器解析 HTML 代码，生成 DOM 树。
- CSSOM 生成：解析 CSS，生成 CSSOM（CSS 对象模型）。
- 渲染树：结合 DOM 和 CSSOM，生成渲染树。
- 页面渲染：根据渲染树将内容显示在页面上。

:::


## DOM 节点的 attr 和 property 有何区别

- attr 指的是 HTML 属性（attribute）
- property 指的是 DOM 对象的属性（property）

主要区别

::: details 展开查看

定义不同

- attr 定义在 HTML 元素上的初始属性，存储在 DOM 元素的属性列表中，与 HTML 源代码一一对应。
- property 是 DOM 对象的属性，是通过浏览器解析 HTML 并生成 DOM 对象时动态创建的，供 JavaScript 操作。

存储位置不同

- attr 是 HTML 的一部分，存储在元素的 HTML 标记 中。
- property 是 DOM 的一部分，存储在 JavaScript 对象中。

行为不同

- attr 一般是静态的，表示元素初始的值，即从 HTML 源代码中解析的值，通常不会因用户操作或脚本修改而自动更新。除非你手动使用 JS 修改值。
- property 一般是动态的，表示当前状态，可以通过 JavaScript 修改，并反映在 DOM 中。

对于一些常用的属性（如 id、value、checked 等），attr 和 property 会部分同步：

- 修改 attr 会影响 property 值。
- 而修改 property 可能不会同步回 attr。

总结，一般来说，attr 用于设置元素的初始状态，而 property 用于操作和获取当前状态。

:::


## offsetHeight scrollHeight clientHeight 有什么区别

参考答案

::: details

`offsetHeight` 元素的总高度，包括内容高度、内边距（padding）、水平滚动条高度（如果存在）、以及边框（border）。不包括外边距（margin）。

`scrollHeight` 元素的实际内容高度，包括不可见的溢出部分（scrollable content），大于等于 `clientHeight`。

`clientHeight` 元素的可见内容高度，包括内容高度和内边距（padding），但不包括水平滚动条高度、边框（border）和外边距（margin）。

:::


## HTMLCollection 和 NodeList 的区别

在操作 DOM 时，`HTMLCollection` 和 `NodeList` 都是用来表示节点集合的对象，它们的区别是：

::: details

`HTMLCollection` 只包含 **HTML 元素**节点。通过 `document.getElementsByTagName` 或 `document.getElementsByClassName` 返回的结果是 `HTMLCollection。`

`NodeList` 包括 **元素节点、文本节点、注释节点** 等，不仅仅是 **HTML 元素**节点

- 通过 `document.querySelectorAll` 返回的是 静态 `NodeList`
- 通过 `childNodes` 返回的是 动态 `NodeList`

当文档结构发生变化时

- `HTMLCollection` 和 动态 `NodeList` 会随着 DOM 的变化自动更新
- 静态 `NodeList` **不会**随着 DOM 的变化自动更新

:::


## Node 和 Element 有什么区别？

在 DOM（文档对象模型）中，HTML Element 和 Node 都是表示文档结构中的对象，但它们有不同的定义和用途。

::: details 展开查看

Node 是 DOM 树中所有类型对象的基类，是一个接口，表示文档树中的一个节点。它有多个子类型，Element 是其中的一个。其他的还有 Text、Comment 等。

Node 常见属性如 `nodeName` `nodeValue`

HTML Element 是 Node 的子类，专门表示 HTML 元素节点。它提供了与 HTML 元素相关的更多功能，如属性、样式等。
HTML Element 仅表示 HTML 元素节点，通常对应 HTML 标签，如 `<div>`, `<p>`, `<a>` 等。

Element 常见属性和方法如 `innerHTML` `getAttribute` `setAttribute`

:::

## window.onload 和 DOMContentLoaded 的区别是什么？

这两个事件都用于检测页面的加载状态，但触发的时机和作用范围有所不同。

::: details

`DOMContentLoaded` 是当 **DOM 树构建完成**（HTML 被解析完成，不等待样式表、图片、iframe 等资源加载）时触发，不依赖于外部资源。

`window.onload` 是当 **整个页面及所有资源**（包括样式表、图片、iframe、脚本等）加载完成时触发，依赖于外部资源。

`DOMContentLoaded` 会更早触发。

使用推荐

- 如果你的逻辑只依赖 DOM 的加载（如操作页面结构、绑定事件），使用 `DOMContentLoaded`。
- 如果你的逻辑需要依赖页面所有资源加载完成（如获取图片尺寸、执行动画），使用 `window.onload`。

:::

## 如何一次性插入多个 DOM 节点？考虑性能

参考答案

::: details 展开查看

直接多次操作 DOM（如多次 `appendChild` 或 `innerHTML` 更新）会导致性能问题，因为每次操作都会触发 DOM 的重新渲染。

`DocumentFragment` 是一个轻量级的文档片段，可以在内存中操作节点，最后一次性插入到 DOM 中，从而减少重绘和回流。

```js
// 获取目标容器
const container = document.getElementById('list')

// 创建 DocumentFragment
const fragment = document.createDocumentFragment()

// 创建多个节点并添加到 fragment 中
for (let i = 1; i <= 1000; i++) {
  const li = document.createElement('li')
  li.textContent = `item ${i}`
  fragment.appendChild(li)
}

// 一次性插入到 DOM
container.appendChild(fragment)
```

:::

## 说一下 `<script>` 标签的作用，以及它们的特殊用法。

`<script>` 标签是 HTML 中用于嵌入或引用 JavaScript 代码的核心元素，它的作用和特殊用法如下：

::: details 展开查看

简单概括：

1. 我们可以通过`script`标签的`scr`属性，引入**外部的js**脚本，浏览器解析HTML文件时，如果碰到`script`标签，
   会**阻塞**HTML的解析。


2. 同时我们可以在`<script></script>`标签中编写js代码，编写的代码会和我们引入的外部js脚本**共享作用域**。


3. 通过`script`标签引入外部js脚本时，可以添加`defer`属性，它可以使我们的js脚本进行**并行解析和延时加载**，
   当使用该属性时，浏览器碰到`script`标签时，**不会阻塞**HTML的解析，而是会并行解析js脚本，解析完成后不会执行，
   会在整个文档解析完成后（包括其他资源的下载和处理），然后按照js脚本在文档中出现的顺序依次执行，这些脚本文件，
   会在DOMContentLoaded事件之前解析执行完毕；


4. 通过`script`标签引入外部js脚本时，可以添加`async`属性，它可以使我们的js脚本进**行并行解析和立即加载**，当使用该属性时，
   浏览器碰到`script`标签时，不会阻塞HTML的解析，而是会并行解析js脚本，和`defer`不同的是，解析完成后会立即执行如果此时HTML文件没有解析完毕，
   那么会阻塞HTML文件的解析。而且如果我们引入多个外部js脚本时，谁先解析完毕，谁先执行，和他们的引入顺序无关，
   而且这些脚本文件可能会在`DOMContentLoaded`事件之前或之后执行完毕，但会在load事件之前执行完毕；


5. 同时我们可以利用`script`标签来处理跨域问题，这也是`jsonp`处理跨域问题的原理。


小结

`defer` -> js 加载 -> 文档解析 -> js 执行
`async` -> js 加载 -> js 执行 -> 文档解析

---

深度思考：

#### **一、基本作用**

1. **嵌入 JavaScript 代码**：
   ```html
   <script>
     console.log("Hello, World!");
   </script>
   ```

2. **引用外部 JavaScript 文件**：
   ```html
   <script src="script.js"></script>
   ```

---

#### **二、特殊用法与高级特性**

##### **1. 属性控制脚本行为**
- **`async`**（异步加载）：
    - 脚本会异步加载，不会阻塞 HTML 解析。
    - 适用于独立脚本（如统计代码），加载完成后立即执行。
    - 示例：
      ```html
      <script src="analytics.js" async></script>
      ```

- **`defer`**（延迟执行）：
    - 脚本会异步加载，但会在 HTML 解析完成后、`DOMContentLoaded` 事件之前按顺序执行。
    - 适用于依赖 DOM 的脚本，且需要保持执行顺序。
    - 示例：
      ```html
      <script src="app.js" defer></script>
      ```

- **`type`**（指定脚本类型）：
    - 默认 `type="text/javascript"`，可省略。
    - 特殊类型：
        - **`module`**：声明 ES6 模块（支持 `import`/`export`）。
          ```html
          <script type="module" src="module.js"></script>
          ```
        - **`importmap`**：定义模块导入映射（解决模块路径问题）。
          ```html
          <script type="importmap">
            {
              "imports": {
                "lodash": "/node_modules/lodash/lodash.js"
              }
            }
          </script>
          ```

---

##### **2. 动态加载脚本**
通过 JavaScript 动态创建 `<script>` 标签，实现按需加载或异步加载：
```javascript
const script = document.createElement('script');
script.src = 'dynamic.js';
script.async = true;
document.head.appendChild(script);
```

---

##### **3. 内联脚本与安全性**
- **内联脚本**（直接写在 HTML 中）：
  ```html
  <script>
    // 内联 JavaScript 代码
  </script>
  ```
    - **风险**：可能引发 XSS（跨站脚本攻击），需配合 CSP（内容安全策略）使用。

- **`nonce` 属性**（增强安全性）：
    - 与 CSP 结合，允许执行带有特定随机数的内联脚本。
  ```html
  <script nonce="random-value">
    // 安全的内联代码
  </script>
  ```

---

##### **4. 模块化与现代特性**
- **ES6 模块**：
    - 使用 `type="module"` 启用模块化功能，支持 `import`/`export`。
  ```html
  <script type="module">
    import { add } from './math.js';
    console.log(add(2, 3));
  </script>
  ```

- **`nomodule` 属性**：
    - 为旧浏览器提供回退脚本。
  ```html
  <script type="module" src="app.js"></script>
  <script nomodule src="fallback.js"></script>
  ```

---

##### **5. 特殊场景**
- **JSONP（跨域请求）**：
    - 利用 `<script>` 标签不受同源策略限制的特性，动态加载跨域数据。
  ```html
  <script src="https://api.example.com/data?callback=handleData"></script>
  <script>
    function handleData(data) {
      console.log(data);
    }
  </script>
  ```

- **预加载脚本**：
    - 使用 `rel="preload"` 提前加载关键脚本。
  ```html
  <link rel="preload" href="critical.js" as="script">
  ```

---

#### **三、注意事项**
1. **执行顺序**：
    - 无 `async`/`defer` 的脚本会阻塞 HTML 解析，按顺序执行。
    - `async` 脚本无顺序，加载完成后立即执行。
    - `defer` 脚本按顺序执行，且在 DOM 解析完成后触发。

2. **兼容性**：
    - `type="module"` 需要现代浏览器支持。
    - `importmap` 兼容性较差，建议使用打包工具（如 Webpack）处理模块。

3. **性能优化**：
    - 优先使用 `async`/`defer` 避免阻塞页面渲染。
    - 合并脚本文件减少 HTTP 请求。

---

#### **四、总结**
`<script>` 标签不仅是 JavaScript 的载体，还通过属性（如 `async`、`defer`、`type`）和动态加载技术，
实现了性能优化和现代开发模式（如模块化）。合理使用这些特性，可以提升网页的加载速度和安全性。

:::


## `<script>`标签放在 head 里，怎么解决加载阻塞的问题

在 HTML 中，`<script>` 标签通常会阻塞页面的渲染，尤其是当它放在 `<head>` 部分时，因为浏览器会在执行 JavaScript 代码之前停止解析 HTML。

可参考的解决方案

::: details 展开查看

1. 使用 `async` 属性。当 `async` 属性添加到 `<script>` 标签时，脚本会异步加载，并在加载完成后立即执行，不会阻塞页面的渲染。适用于不依赖其他脚本或页面内容的独立脚本，但多个 JS 文件时无法保证加载和执行顺序。

```html
<head>
  <script src="script.js" async></script>
</head>
```

2. 使用 `defer` 属性。`defer` 属性使得脚本延迟执行，直到 HTML 文档解析完毕。这意味着脚本不会阻塞 HTML 渲染，且会按照文档中 `<script>` 标签的顺序执行。适用于依赖 DOM 元素的脚本（如操作页面内容）。

```html
<head>
  <script src="script.js" defer></script>
</head>
```

3. 将 `<script>` 放在 `<body>` 最后。

:::
