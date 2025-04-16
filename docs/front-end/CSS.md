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
