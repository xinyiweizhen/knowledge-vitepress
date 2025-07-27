# 性能优化


## **导致页面加载白屏时间长的原因有哪些，怎么进行优化？**

### ✅ 简洁回答（适合面试）

> [!TIP] 🧠
> 
> 页面白屏时间过长通常由以下原因导致：
>
> - 首屏 JS 体积过大，解析和执行耗时；
> - 接口请求阻塞了关键路径；
> - 构建未启用 Tree Shaking 和 Code Splitting；
> - 没有服务端渲染（SSR）或预渲染；
> - 资源未压缩、未使用 CDN 或缓存控制不当；
>
> 常见优化手段包括：
>
> - 启用路由懒加载（Code Splitting）；
> - 使用骨架屏或 loading 状态提升感知体验；
> - 异步加载非核心模块；
> - 接口聚合与接口缓存；
> - 启用 Gzip/Brotli 压缩；
> - 使用 Webpack/Vite 的分包能力；
> - 配合 Lighthouse 进行持续优化；

::: details 展开查看详细解析

### 🧠 导致白屏时间长的核心原因分析

#### 1️⃣ **JS 执行时间过长**

- 包体积大，主线程被占用；
- 未做代码拆分，一次性加载所有逻辑；
- 大型依赖库（如 moment、lodash）未按需引入；

##### 示例：

```js
// 白屏风险：同步加载大型组件
import BigComponent from './BigComponent';
const App = () => <BigComponent />;

// 优化后：异步加载
const LazyBigComponent = React.lazy(() => import('./BigComponent'));
```

---

#### 2️⃣ **接口请求阻塞渲染**

- 首屏依赖多个异步请求；
- 接口响应慢，未设置兜底 UI；
- 未使用接口缓存策略；

##### 示例优化：

```js
function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData)
      .catch(() => {
        // 兜底处理
        setData({ fallback: true });
      });
  }, []);

  if (!data) return <SkeletonLoader />;
  return <RealContent data={data} />;
}
```

---

#### 3️⃣ **CSS 加载阻塞渲染**

- CSS 文件过大，未提取关键 CSS；
- 未使用 `media` 控制样式加载优先级；
- 未使用 `rel="preload"` 提前加载关键资源；

##### 优化建议：

```html
<!-- 关键 CSS 内联 -->
<style>.critical { color: #fff; }</style>

<!-- 非关键 CSS 异步加载 -->
<link rel="stylesheet" href="/non-critical.css" media="print" onload="this.media='all'">
```

---

#### 4️⃣ **图片/字体等资源加载慢**

- 图片未压缩、未使用 WebP 格式；
- 字体文件过大；
- 未使用懒加载（`loading="lazy"`）；

##### 示例：

```html
<img src="image.jpg" alt="图片" loading="lazy">
```

---

#### 5️⃣ **未启用 SSR / 预渲染**

- SPA 应用首次加载只有空 HTML；
- 用户必须等待 JS 下载、执行后才能看到内容；
- 对 SEO 不友好；

##### 解决方案：

- 使用 Next.js / Nuxt.js 实现 SSR；
- 使用 Vue/React 的静态生成（Static Generation）；
- 使用 PrerenderSPAPlugin 预渲染关键页面；

---

#### 6️⃣ **构建未优化（Webpack / Vite）**

- 未开启 Tree Shaking，打包冗余代码；
- 未使用动态导入（`import()`）；
- 未启用 SplitChunks 分包；
- 未使用 contenthash 缓存控制；

##### 示例 Webpack 配置优化：

```js
optimization: {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors'
      }
    }
  },
  minimize: true,
  minimizer: [
    new TerserPlugin(),
    new CssMinimizerPlugin()
  ]
}
```

---

#### 7️⃣ **服务器响应慢（TTFB 高）**

- 服务器响应慢（Time to First Byte）；
- 未启用 HTTP/2、CDN；
- 服务端逻辑复杂，未缓存接口结果；

##### 示例优化：

```nginx
# Nginx 配置示例：开启 Gzip + HTTP/2
server {
  listen 443 ssl http2;
  ssl_certificate /etc/nginx/ssl/fullchain.pem;
  ssl_certificate_key /etc/nginx/ssl/privkey.pem;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location ~ \.(js|css|png|jpg|woff2)$ {
    expires 7d;
    add_header Cache-Control "public, max-age=604800";
  }
}
```

---

### 🚀 白屏优化 CheckList（可用于面试加分项）

| 优化点 | 是否推荐 |
|--------|----------|
| 启用 Code Splitting | ✅ 推荐 |
| 使用路由懒加载 | ✅ 推荐 |
| 启用 SSR 或预渲染 | ✅ 推荐 |
| 启用骨架屏 | ✅ 推荐 |
| 接口聚合与缓存 | ✅ 推荐 |
| 启用 Web Workers 处理复杂逻辑 | ✅ 推荐 |
| 减少首屏 JS/CSS 体积 | ✅ 必须 |
| 使用 WebP 图片格式 | ✅ 推荐 |
| 启用 Gzip/Brotli 压缩 | ✅ 必须 |
| 设置 CSP 缓存控制 | ✅ 必须 |

:::
