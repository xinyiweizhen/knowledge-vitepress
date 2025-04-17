# CSS

## CSS 有哪些选择器？选择器的优先级？

参考答案

::: details 展开查看

| 选择器     | 语法               | 例子                             |
| ---------- | ------------------ | -------------------------------- |
| 通用选择器 | *                  | -                                |
| 类型选择器 | 节点名称           | `div`                            |
| 相邻选择器 | 直接相邻元素选择器 | `h1+p`                           |
|            | 普通相邻元素选择器 | `h2 ~ h2`                        |
| ID 选择器  | # + ID 名          | `#form`                          |
| 类选择器   | . + 类名           | `.btn-primary`                   |
| 属性选择器 | [属性名]           | `[self]`、`[data-type="hidden"]` |
| 伪类       | :伪类名            | `:hover`、`:focus`               |
| 伪元素     | ::伪元素名         | `::before`、`::after`            |


| 选择器类型          | 示例                               | 说明                                       |
| ------------------- | ---------------------------------- | ------------------------------------------ |
| **元素选择器**      | `p`                                | 选择所有 `<p>` 元素                        |
| **类选择器**        | `.button`                          | 选择所有 `class="button"` 的元素           |
| **ID 选择器**       | `#header`                          | 选择 `id="header"` 的元素                  |
| **通用选择器**      | `*`                                | 选择页面中的所有元素                       |
| **后代选择器**      | `div p`                            | 选择 `div` 内的所有 `<p>` 元素             |
| **子元素选择器**    | `div > p`                          | 选择 `div` 的直接子元素 `<p>`              |
| **相邻兄弟选择器**  | `h1 + p`                           | 选择紧接在 `<h1>` 后面的 `<p>` 元素        |
| **通用兄弟选择器**  | `h1 ~ p`                           | 选择所有紧跟在 `<h1>` 后面的 `<p>` 元素    |
| **属性选择器**      | `a[href]`                          | 选择具有 `href` 属性的所有 `<a>` 元素      |
| **`:hover`**        | `a:hover`                          | 选择鼠标悬停时的 `<a>` 元素                |
| **`:first-child`**  | `p:first-child`                    | 选择父元素中的第一个 `<p>` 元素            |
| **`:nth-child(n)`** | `li:nth-child(odd)`                | 选择父元素中所有奇数位置的 `<li>` 元素     |
| **`::before`**      | `p::before { content: "Note: "; }` | 在每个 `<p>` 元素的前面插入 "Note: "       |
| **`::after`**       | `p::after { content: "."; }`       | 在每个 `<p>` 元素的后面插入一个句点        |
| **`:not()`**        | `p:not(.highlight)`                | 选择所有不具有 `highlight` 类的 `<p>` 元素 |

> 注意，这里的内容比较全，面试时你也许记不住所有，但只要能说上一半儿。


选择器权重表：

| 权重 | 选择器               |
| ---- | -------------------- |
| 1000 | 内联                 |
| 0100 | ID 选择器            |
| 0010 | 类、属性、伪类选择器 |
| 0001 | 标签、伪元素         |

总的来说，就是：**优先级由高到低**   **!important** > 内联style > ID选择器 > 类选择器 > 标签选择器 > 通配符选择器>继承

**内联 > id 选择器 > 类、属性、伪类选择器 > 标签元素、伪元素**

:::

参考资料

[[ 面试系列 ] - 八：说一下 CSS 选择器优先级](https://juejin.cn/post/6844904128364150797)


## 盒模型概念，如何切换盒模型？


::: details 展开查看

CSS盒模型本质上是一个盒子，封装周围的HTML元素，它包括：`外边距（margin）`、`边框（border）`、`内边距（padding）`、`实际内容（content）`四个属性。

CSS盒模型有：**标准模型 + IE模型**

**标准盒模型**和**IE盒模型**的区别在于设置`width`和`height`时，所对应的范围不同：


- **标准盒模型的`width`和`height`属性的范围只包含了`content`**
- **IE盒模型的`width`和`height`属性的范围包含了`border`、`padding`和`content`**


**W3C盒子模型(标准盒模型)**

标准盒模型：盒子总宽度/高度 = `width/height + padding + border + margin`。（ 即 width/height 只是**内容高度**，不包含 padding 和 border 值）

![标准盒模型](../images/content-box.jpg)



**IE盒子模型(怪异盒模型)**

IE盒子模型：盒子总宽度/高度 = `width/height + margin = (内容区宽度/高度 + padding + border) + margin`。（ 即 width/height 包含了 padding 和 border 值 ）

![怪异盒模型](../images/border-box.jpg)


**设置这两种模型**(`box-sizing`)

   ```
   标准：box-sizing: content-box; ( 浏览器默认设置 )
   IE： box-sizing: border-box;
   ```


:::

参考资料

[常见的面试问题：【CSS】CSS盒模型](https://zhuanlan.zhihu.com/p/74817089)

[CSS盒模型完整介绍](https://segmentfault.com/a/1190000013069516)

[对盒模型的理解](https://juejin.cn/post/6905539198107942919#heading-12)


## lineHeight 如何继承？

如下代码，`<p>` 标签的行高将会是多少？

```html
<!--如下代码，p 标签的行高将会是多少？-->
<style>
  body {
    font-size: 20px;
    line-height: 200%;
  }
  p {
    font-size: 16px;
  }
</style>

<body>
  <p>AAA</p>
</body>
```

答案

::: details 展开查看
`line-height` 不同类型的值，继承规则是不一样的

- 写具体的数值，如 `30px`，则继承该数值 —— 比较好理解
- 写百分比，如 `200%` ，则继承当前计算出来的值，如上述题目 —— 重要！！！
- 写比例，如 `2` 或 `1.5` ，则继承比例

所以，该问题的的答案是，继承 `40px` 。
:::

## margin 负值问题

参考答案

::: details 展开查看

- `margin-left` 负值，元素左移
- `margin-top` 负值，元素上移
- `margin-right` 负值，自身宽度缩小，右侧元素会跟进，但内容不受影响
- `margin-bottom` 负值，自身高度缩小，下方元素会跟进，但内容不受影响

:::


## BFC概念？作用？常用场景？

::: details 展开查看

**概念**

>  BFC 即 Block Formatting Contexts (块级格式化上下文). 具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。

**触发 BFC**

只要元素满足下面任一条件即可触发 BFC 特性：[MDN创建块格式化上下文的方式](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

- HTML 就是一个 BFC
- 浮动元素：float 除`none` 以外的值
- 绝对定位元素：position (`absolute`、`fixed`)
- display 为` inline-block`、`table-cells`、`flex`
- overflow 除了` visible `以外的值 (`hidden`、`auto`、`scroll`)

**BFC 特性及应用**

- 同一个 BFC 下外边距会发生重叠
- BFC 可以包含浮动的元素（清除浮动）
- BFC 不与浮动元素重叠

:::

参考资料

[10 分钟理解 BFC 原理](https://zhuanlan.zhihu.com/p/25321647)

[面试官：请说说什么是BFC？大白话讲清楚](https://juejin.cn/post/6950082193632788493)


## 水平垂直居中？兼容性？不知道宽高情况下？

::: details 展开查看

分两大类：子元素已知宽高和子元素未知宽高

- **已知宽高**

    - 绝对定位和负margin值

      ```css
      .box {
          width: 200px;
          height: 200px;
          border: 1px solid red;
          position: relative;
      }
      .children-box {
          position: absolute;
          width: 100px;
          height: 100px;
          background: yellow;
          left: 50%;
          top: 50%;
          margin-left: -50px;
          margin-top: -50px; 
      }
      ```

    - 绝对定位 + transform(子元素未知宽高也可用)

      ```css
      .box {
          width: 200px;
          height: 200px;
          border: 1px solid red;
          position: relative;
      }
      .children-box {
          position: absolute;
          width: 100px;
          height: 100px;
          background: yellow;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%); 
      }
      ```

    - 绝对定位 + left/right/bottom/top + margin

      ```css
      .box {
          width: 200px;
          height: 200px;
          border: 1px solid red;
          position: relative;
      }
      .children-box {
          position: absolute;
          display: inline;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0px;
          background: yellow;
          margin: auto;
          height: 100px;
          width: 100px;
      }
      ```

    - flex布局(子元素未知宽高也可用, 只需设置父元素，可惜PC端兼容性不太友好)

      ```css
      .box {
          width: 200px;
          height: 200px;
          border: 1px solid red;
          display: flex;
          justify-content: center;
          align-items: center;
      }
      .children-box {
          background: yellow;
          height: 100px;
          width: 100px;
      }
      ```

    - grid布局

      ```css
      .box {
          width: 200px;
          height: 200px;
          border: 1px solid red;
          display: grid;
      }
      .children-box {
          width: 100px;
          height: 100px;
          background: yellow;
          margin: auto;
      }
      ```

    - table-cell + vertical-align + inline-block/margin: auto

      ```css
      .box {
          width: 200px;
          height: 200px;
          border: 1px solid red;
          display: table-cell;
          text-align: center;
          vertical-align: middle;
      }
      .children-box {
          width: 100px;
          height: 100px;
          background: yellow;
          display: inline-block;// 可以换成margin: auto;
      }
      ```

- **不定宽高**

    - 绝对定位 + transform

      ```css
      .box {
          width: 200px;
          height: 200px;
          border: 1px solid red;
          position: relative;
      }
      .children-box {
         position: absolute;
         background: yellow;
         left: 50%;
         top: 50%;
         transform: translate(-50%, -50%);
      }
      ```



    - table-cell

       ```css
       .box {
           width: 200px;
           height: 200px;
           border: 1px solid red;
           display: table-cell;
           text-align: center;
           vertical-align: middle;
       }
       .children-box {
          background: yellow;
          display: inline-block;
       }
       ```

       

    - flex布局

       ```css
       .box {
           width: 200px;
           height: 200px;
           border: 1px solid red;
           display: flex;
           justify-content: center;
           align-items: center;
       }
       .children-box {
           background: yellow;
       }
       ```

       

    - flex变异布局

       ```css
       .box {
           width: 200px;
           height: 200px;
           border: 1px solid red;
           display: flex;
       }
       .children-box {
           background: yellow;
           margin: auto;
       }
       ```

       

    - grid + flex布局

       ```css
       .box {
           width: 200px;
           height: 200px;
           border: 1px solid red;
           display: grid;
       }
       .children-box {
           background: yellow;
           align-self: center;
           justify-self: center;
       }
       ```


    - gird + margin布局

       ```css
       .box {
           width: 200px;
           height: 200px;
           border: 1px solid red;
           display: grid;
       }
       .children-box {
           background: yellow;
           margin: auto;
       }
        ```

:::

参考资料

[水平垂直居中的布局（定宽高和不定宽高）](https://zhuanlan.zhihu.com/p/89197310)

[如何让一个元素水平垂直居中](https://zhuanlan.zhihu.com/p/113341088)

[面试官：你能实现多少种水平垂直居中的布局（定宽高和不定宽高](https://juejin.cn/post/6844903982960214029#heading-17)
