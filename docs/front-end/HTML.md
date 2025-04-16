# HTML

## DOCTYPE 是什么，都有哪些属性？

参考答案

::: details  展开查看

HTML 的 `<!DOCTYPE>` 声明是文档类型声明，用于告知浏览器当前 HTML 文档使用的 HTML 版本，从而确保文档以正确的模式渲染。它通常出现在 HTML 文档的第一行。

在现代开发中，推荐使用 HTML5 的简单声明

```html
<!DOCTYPE html>
```

在之前的 HTML 版本中，如 HTML4 ，会有其他写法，不过现在已经不常用。

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
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

常见的 HTML5 语义化标签

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

:::

写一个 HTML5 语义化的例子

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


## 常见的 HTML 标签哪些是 inline 元素，哪些是 block 元素，哪些是 inline-block 元素

参考答案

::: details 展开查看

1. `inline` 元素有：`a`, `span`, `img`, `strong`, `em`, `b`, `i`, `abbr`, `code`, `br`, `q`（引用）, `sub`（下标）, `sup`（上标）

2. `block` 元素有：`div`, `p`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `ul`, `ol`, `li`, `form`, `section`, `article`, `footer`, `header`, `nav`

3. `inline-block` 元素有：`input` `button`

注意，`table` 虽然也是独占一行，但它 `display: table` 不是 `block`

:::

