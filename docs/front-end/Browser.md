# 浏览器

## Cookie、sessionStorage 和 localStorage 的区别

在Web开发中，`Cookie`、`sessionStorage` 和 `localStorage` 是三种常见的客户端存储机制，它们各自有不同的用途和特点。以下是它们的区别和应用场景的详细解析：

::: details 展开查看

##### **一、基本概念**

1. **Cookie**：
    - **定义**：Cookie 是一种小型文本文件，由服务器生成并存储在客户端（浏览器）中。
    - **作用**：主要用于保存用户的会话信息（如登录状态、购物车内容等），并在每次请求时自动发送到服务器。
    - **大小限制**：每个 Cookie 的大小通常限制为 **4KB**。
    - **生命周期**：可以通过设置过期时间（`Expires` 或 `Max-Age`）来控制其有效期。如果未设置过期时间，则默认为会话级别的 Cookie，在浏览器关闭后会被清除。

2. **sessionStorage**：
    - **定义**：`sessionStorage` 是 HTML5 提供的一种客户端存储机制，数据仅在当前浏览器窗口或标签页中有效。
    - **作用**：用于临时保存数据，适合需要在页面刷新期间保留的状态信息。
    - **大小限制**：通常为 **5MB**（具体取决于浏览器）。
    - **生命周期**：数据在当前会话期间有效，当浏览器窗口或标签页关闭时，数据会被清除。

3. **localStorage**：
    - **定义**：`localStorage` 是 HTML5 提供的一种持久化存储机制，数据在客户端长期保存。
    - **作用**：用于保存用户偏好设置、缓存数据等需要长期存储的信息。
    - **大小限制**：通常为 **5MB**（具体取决于浏览器）。
    - **生命周期**：数据不会因为浏览器关闭而丢失，除非手动清除或通过代码删除。

---

##### **二、区别对比**

| 特性                  | **Cookie**                         | **sessionStorage**               | **localStorage**                 |
|-----------------------|-------------------------------------|-----------------------------------|----------------------------------|
| **存储位置**          | 客户端（浏览器）                   | 客户端（浏览器）                 | 客户端（浏览器）                |
| **存储大小**          | 4KB                                | 5MB                              | 5MB                             |
| **生命周期**          | 可设置过期时间，或随会话结束清除   | 随浏览器窗口或标签页关闭而清除   | 永久保存，直到手动清除或删除    |
| **是否自动发送到服务器** | 是（每次 HTTP 请求都会携带）        | 否                                | 否                               |
| **访问方式**          | 通过 JavaScript 或 HTTP 头部访问    | 仅限于当前窗口或标签页           | 跨窗口或标签页共享              |
| **安全性**            | 可能被篡改，需注意安全（如使用 HTTPS） | 相对安全                         | 相对安全                        |
| **典型应用场景**      | 用户会话管理、身份验证             | 页面刷新后的状态保持             | 用户偏好设置、离线缓存          |

---

##### **三、优缺点分析**


###### **1. Cookie**
- **优点**：
    - 支持跨域共享（通过 `Domain` 和 `Path` 属性）。
    - 可以设置过期时间，灵活性高。
    - 自动随 HTTP 请求发送到服务器，方便实现会话管理。
- **缺点**：
    - 存储容量小（仅 4KB）。
    - 每次请求都会携带 Cookie，增加网络开销。
    - 安全性较低，易受 XSS（跨站脚本攻击）和 CSRF（跨站请求伪造）攻击。

###### **2. sessionStorage**
- **优点**：
    - 数据仅在当前窗口或标签页中有效，避免了跨窗口干扰。
    - 存储容量较大（5MB）。
    - 不会随 HTTP 请求发送到服务器，减少网络开销。
- **缺点**：
    - 数据无法跨窗口共享。
    - 浏览器关闭后数据即被清除，不适合长期存储。

###### **3. localStorage**
- **优点**：
    - 数据永久保存，适合长期存储。
    - 存储容量较大（5MB）。
    - 不会随 HTTP 请求发送到服务器，减少网络开销。
    - 跨窗口或标签页共享数据。
- **缺点**：
    - 数据不会自动过期，可能导致存储冗余。
    - 安全性较低，易受 XSS 攻击。

---

##### **四、典型应用场景**

1. **Cookie**：
    - 用户登录状态的管理（如保存认证令牌）。
    - 个性化设置（如语言偏好）。
    - 购物车内容的临时存储。

2. **sessionStorage**：
    - 表单数据的临时存储（防止用户刷新页面时数据丢失）。
    - 单个页面内的状态管理（如分步表单的状态）。

3. **localStorage**：
    - 用户偏好设置（如主题颜色、字体大小）。
    - 离线应用的数据缓存（如文章内容、图片资源）。
    - 跨页面共享的数据存储（如全局配置信息）。

---

##### **五、代码示例**

###### **1. 使用 Cookie**
```javascript
// 设置 Cookie
document.cookie = "username=JohnDoe; expires=Fri, 31 Dec 2023 23:59:59 GMT; path=/";

// 获取 Cookie
console.log(document.cookie); // 输出所有 Cookie

// 删除 Cookie（设置过期时间为过去）
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
```

###### **2. 使用 sessionStorage**
```javascript
// 设置数据
sessionStorage.setItem("key", "value");

// 获取数据
console.log(sessionStorage.getItem("key")); // 输出 "value"

// 删除数据
sessionStorage.removeItem("key");

// 清空所有数据
sessionStorage.clear();
```

###### **3. 使用 localStorage**
```javascript
// 设置数据
localStorage.setItem("key", "value");

// 获取数据
console.log(localStorage.getItem("key")); // 输出 "value"

// 删除数据
localStorage.removeItem("key");

// 清空所有数据
localStorage.clear();
```

---

##### **六、总结**

- 如果需要存储少量数据并与服务器交互，选择 **Cookie**。
- 如果需要在当前窗口或标签页内临时存储数据，选择 **sessionStorage**。
- 如果需要长期存储数据且跨窗口共享，选择 **localStorage**。


:::



## 开发一个无限下拉加载图片的页面，如何给每个图片绑定 click 事件？

参考答案

::: details

使用 **事件委托** 实现，避免重复绑定事件，性能高，适合动态加载的场景。

代码示例

```html
<div id="image-container" style="height: 400px; overflow-y: scroll; border: 1px solid #ccc;">
  <!-- 加载图片 -->
</div>

<script>
  const container = document.getElementById('image-container')

  // 模拟 API 请求加载图片
  let page = 1 // 当前加载的页码
  const loadImages = () => {
    for (let i = 1; i <= 10; i++) {
      const img = document.createElement('img')
      img.src = `https://via.placeholder.com/150?text=Image+${(page - 1) * 10 + i}`
      img.style.margin = '10px'
      img.alt = `Image ${(page - 1) * 10 + i}`
      img.className = 'image-item' // 添加统一的类名
      container.appendChild(img)
    }
    page++
  }

  // 绑定父容器的 click 事件
  container.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
      alert(`You clicked on ${event.target.alt}`)
    }
  })

  // 监听滚动事件，实现无限加载
  container.addEventListener('scroll', () => {
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
      loadImages() // 加载更多图片
    }
  })

  // 初次加载图片
  loadImages()
</script>
```

以上代码中，我们把 `click` 事件统一绑定在 `container` 容器中，然后判断 `event.target.tagName === 'IMG'` 即触发事件。

:::
