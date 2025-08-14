# 场景题

## **如果小程序或者H5在低版本的Android上崩溃了，你怎么去定位问题并解决？**

遵循一个完整的故障处理流程：**信息收集 → 问题复现 → 调试定位 → 根因分析与解决 → 预防与总结**。

---

### 面试回答模板：定位并解决低端安卓的崩溃问题

面试官您好，在低端安卓机上遇到 H5 或小程序崩溃，这是一个非常棘手的疑难杂症。处理这种问题，我会采取一套系统性的排查方案，绝不靠猜测。

#### 第一步：信息收集与分析 (Triage)

在没有真实设备的情况下，盲目调试是无效的。首先，我需要尽可能多地收集现场信息，对问题进行初步定性。

1.  **接入前端监控系统**：这是最重要的基础建设。像 Sentry、LogRocket 或者公司的自研监控平台是我们的“天眼”。
    *   **错误日志**：查看是否有 `JS Error` 上报。低端机崩溃有时是因为一个它无法处理的 JS 语法错误或 API 调用错误。
    *   **用户行为录屏（如 LogRocket）**：回溯用户在崩溃前的操作路径，这能提供关键线索，比如“用户是不是点击了某个特定按钮”或“是不是上传了一张大图”。
    *   **性能数据**：监控崩溃前一刻的内存、CPU 使用情况。内存飙升是导致崩溃的最常见原因。
    *   **设备信息**：精确统计出问题的 **Android 系统版本**、**WebView/浏览器版本**、**小程序宿主 App 版本（如微信版本）** 和 **设备型号**。这有助于我们缩小排查范围。

2.  **与用户/测试沟通**：获取无法从日志中看到的信息，例如：
    *   崩溃是“必现”还是“偶现”？
    *   是在什么网络环境下（Wi-Fi/4G/弱网）？
    *   具体操作了什么功能后崩溃的？

#### 第二步：稳定复现问题 (Reproduction)

这是最关键也最困难的一步。如果无法复现，就无法有效定位。

1.  **寻找真机**：最佳方式是找到一台同型号或同系统版本的低端安卓实体机。这是最可靠的复现环境。

2.  **使用云真机平台**：如果没有实体机，我会使用像 **BrowserStack、Sauce Labs 或国内的 WeTest、Testin** 等云真机服务。它们提供了大量的低端设备型号，可以远程操作和调试。

3.  **使用安卓模拟器**：作为最后的选择，可以在 PC 上安装一个安卓模拟器（如 Android Studio 自带的 AVD），创建一个低版本、低配置的虚拟设备。虽然模拟器性能比真机强，但可以模拟出特定的系统环境和 WebView 版本。

#### 第三步：调试与定位 (Debugging & Locating)

一旦能够在某个环境中复现问题，我将采用以下手段，从易到难进行调试：

1.  **远程调试 (Remote Debugging)**：
    *   **H5 页面**：将手机通过 USB 连接到电脑，打开 Chrome 浏览器，在地址栏输入 `chrome://inspect`。如果一切顺利，就可以看到设备上的 WebView 页面，并打开 熟悉的 Chrome DevTools 进行断点调试、查看 console、网络请求和内存快照。
    *   **小程序**：小程序开发者工具也提供了远程调试功能，原理类似。

2.  **当远程调试失效时（常见情况）**：
    *   **植入调试工具 `vConsole` / `eruda`**：这是我的“救命稻草”。我会构建一个带 `vConsole` 的特殊版本，部署到测试环境。`vConsole` 会在页面上生成一个悬浮的绿色按钮，点击后可以打开一个简易版的“控制台”，能查看 `console.log` 的输出、错误信息、网络请求等。我会在代码的关键路径，特别是怀疑的地方，大量打印日志，通过 `vConsole` 观察程序执行到哪一步崩溃了。

3.  **二分法定位**：如果连 `vConsole` 都无法给出明确线索，我会采用最原始但有效的方法——“代码注释法”。
    *   将页面功能模块逐个注释掉，然后发布版本进行测试，观察是否还崩溃。
    *   如果注释掉某个模块（比如一个复杂的图表组件、一个动画效果）后不再崩溃，问题就在这个模块内。
    *   接着再对该模块内部的代码进行二分法注释，逐步缩小问题范围，最终定位到导致崩溃的具体代码行。

#### 第四步：根因分析与解决 (Analysis & Solution)

根据定位到的问题，低端安卓崩溃的常见根因通常有以下几类：

1.  **内存溢出 (Memory Leak / High Usage)**：这是 **最常见** 的原因。
    *   **原因**：一次性加载大量数据（如长列表未做虚拟滚动）、加载高清大图（未压缩或处理）、频繁操作 DOM、闭包导致的内存泄漏、三方库的 Bug。
    *   **解决方案**：
        *   **图片优化**：使用 WebP 格式，根据容器大小请求适当尺寸的图片，对用户上传的图片在前端进行压缩。
        *   **长列表优化**：必须使用**虚拟滚动**或**分页/无限加载**。
        *   **内存泄漏排查**：检查 `addEventListener` 是否在组件销毁时被 `remove`，定时器 (`setInterval`) 是否被清除。
        *   **及时销毁**：对不再使用的对象手动设置为 `null`，以便垃圾回收。

2.  **CSS 兼容性与性能问题**：
    *   **原因**：使用了低版本 WebView 不支持的 CSS3 属性（如某些复杂的 `filter`, `flex` 的 `gap` 属性），或者滥用 CSS 动画/`transform` 触发了 GPU 渲染的 Bug。
    *   **解决方案**：
        *   使用 `Autoprefixer` 等工具处理浏览器前缀。
        *   对不支持的属性做优雅降级或者寻找替代方案。
        *   对于复杂的动画，可以尝试关闭硬件加速（`transform: translateZ(0)` 是开启，有时移除反而能解决问题），或者降级为更简单的动画。

3.  **JavaScript (ES) 兼容性问题**：
    *   **原因**：代码中使用了 ES6+ 的新语法或 API（如 `Promise.prototype.finally`, 可选链 `?.`），但没有被 Babel 正确地转译，或者缺少对应的 Polyfill（如 `core-js`）。
    *   **解决方案**：检查 Babel 和 `@babel/preset-env` 的配置，确保 `targets` 包含了目标低端安卓版本对应的浏览器。确保引入了必要的 polyfill。

4.  **WebView 内核 Bug**：
    *   **原因**：某些特定版本的 X5 内核（微信/QQ WebView）或系统原生 WebView 存在 Bug。
    *   **解决方案**：这是一个黑盒。通常只能通过绕过（Workaround）的方式解决，比如用另一种实现方式重写功能，或者在识别到特定 UA 时禁用该功能。

#### 第五步：预防与总结

解决问题后，我会推动团队建立长效机制，避免同类问题再次发生。

*   **完善监控**：对内存、JS 错误、崩溃率建立更完善的监控和报警机制。
*   **代码规范**：在 Code Review 中，特别关注长列表、大图片、复杂动画等高风险代码。
*   **兼容性测试**：将低端设备或云真机测试流程加入到 CI/CD 的关键环节中。
*   **知识库沉淀**：将本次问题的排查过程、原因和解决方案记录到团队文档中，形成知识积累。




## **大文件如何上传？**

大文件上传是实际项目中的常见需求，涉及到文件处理、网络优化、用户体验等多个维度。

---

### 面试回答模板：大文件上传实现方案

大文件上传是前端开发中的一个经典技术挑战。我将从实现原理、技术细节和性能优化等角度来详细解答。

### 核心实现方案

#### 1. 整体流程设计

大文件上传的核心思想是**分片上传 + 断点续传 + 并发控制**，主要包含以下步骤：

```javascript
// 大文件上传核心流程
async function uploadLargeFile(file) {
  // 1. 文件分片
  const chunks = createFileChunks(file);

  // 2. 计算文件hash（用于断点续传）
  const fileHash = await calculateFileHash(file);

  // 3. 检查已上传的分片
  const uploadedChunks = await checkUploadedChunks(fileHash);

  // 4. 过滤未上传的分片
  const needUploadChunks = chunks.filter(chunk => 
    !uploadedChunks.includes(chunk.index)
  );

  // 5. 并发上传分片
  await uploadChunksWithConcurrency(needUploadChunks, fileHash);

  // 6. 通知服务端合并文件
  await mergeFileChunks(fileHash, chunks.length);
}
```

#### 2. 技术实现细节

##### 文件分片实现
```javascript
function createFileChunks(file, chunkSize = 2 * 1024 * 1024) { // 默认2MB
  const chunks = [];
  let currentChunk = 0;

  while (currentChunk < file.size) {
    const chunk = file.slice(currentChunk, currentChunk + chunkSize);
    chunks.push({
      file: chunk,
      index: Math.floor(currentChunk / chunkSize),
      start: currentChunk,
      end: Math.min(currentChunk + chunkSize, file.size)
    });
    currentChunk += chunkSize;
  }

  return chunks;
}
```

##### 文件Hash计算（用于断点续传）
```javascript
async function calculateFileHash(file) {
  return new Promise((resolve) => {
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();
    const chunks = [];
  
    // 采样策略：大文件不全量计算hash，而是采样计算
    const sampleSize = 2 * 1024 * 1024; // 2MB采样
    const samples = [];
  
    // 取文件头、尾和中间部分进行hash计算
    samples.push(file.slice(0, sampleSize));
    samples.push(file.slice(file.size / 2, file.size / 2 + sampleSize));
    samples.push(file.slice(-sampleSize));
  
    let currentIndex = 0;
  
    fileReader.onload = (e) => {
      spark.append(e.target.result);
      currentIndex++;
    
      if (currentIndex < samples.length) {
        fileReader.readAsArrayBuffer(samples[currentIndex]);
      } else {
        resolve(spark.end());
      }
    };
  
    fileReader.readAsArrayBuffer(samples[0]);
  });
}
```

##### 并发上传控制
```javascript
async function uploadChunksWithConcurrency(chunks, fileHash, concurrency = 3) {
  const results = [];
  const executing = [];

  for (const chunk of chunks) {
    const promise = uploadSingleChunk(chunk, fileHash).then(result => {
      executing.splice(executing.indexOf(promise), 1);
      return result;
    });
  
    results.push(promise);
    executing.push(promise);
  
    if (executing.length >= concurrency) {
      await Promise.race(executing);
    }
  }

  return Promise.all(results);
}

async function uploadSingleChunk(chunk, fileHash) {
  const formData = new FormData();
  formData.append('chunk', chunk.file);
  formData.append('chunkIndex', chunk.index);
  formData.append('fileHash', fileHash);

  return fetch('/upload/chunk', {
    method: 'POST',
    body: formData
  });
}
```

---

### 追问解答

#### 1. 大文件拆分为多个 chunk 这一步是如何进行的？

**核心原理**：利用 JavaScript 的 **`File.prototype.slice()`** 方法进行文件分片。

**详细实现**：
```javascript
// File.slice() 方法详解
const chunk = file.slice(start, end);
// start: 分片开始位置（字节）
// end: 分片结束位置（字节）
// 返回: 新的 Blob 对象，包含指定范围的数据
```

**分片策略考虑**：
- **分片大小选择**：通常选择 1-5MB
    - 太小：分片数量过多，HTTP请求开销大
    - 太大：单个分片传输时间长，失败重传成本高
- **动态分片大小**：根据网络状况动态调整
  ```javascript
  function getOptimalChunkSize(networkSpeed) {
    if (networkSpeed > 10 * 1024 * 1024) { // >10MB/s
      return 5 * 1024 * 1024; // 5MB
    } else if (networkSpeed > 1 * 1024 * 1024) { // >1MB/s
      return 2 * 1024 * 1024; // 2MB
    } else {
      return 512 * 1024; // 512KB
    }
  }
  ```

**内存优化**：
- `File.slice()` 是**惰性操作**，不会立即读取文件内容到内存
- 只有在实际上传时（如添加到FormData）才会读取对应分片的数据
- 这确保了即使是几GB的大文件，也不会占用过多内存

#### 2. 为什么大文件要分片，小文件为什么不用？

**大文件分片的必要性**：

1. **网络稳定性**：
    - **问题**：大文件传输时间长，网络中断概率高
    - **解决**：分片后单个请求时间短，失败重传成本低
   ```javascript
   // 示例：100MB文件
   // 不分片：失败后需重传100MB
   // 分片(2MB)：失败后只需重传2MB
   ```

2. **用户体验**：
    - **进度显示**：分片上传可以实时显示精确进度
    - **响应性**：避免浏览器长时间无响应
   ```javascript
   function updateProgress(uploadedChunks, totalChunks) {
     const progress = (uploadedChunks / totalChunks) * 100;
     progressBar.style.width = `${progress}%`;
   }
   ```

3. **服务器资源管理**：
    - **内存控制**：服务器可以流式处理小分片，避免大文件占用过多内存
    - **超时控制**：避免长时间占用连接资源

4. **断点续传**：
    - 网络中断后可以从断点继续，而不是重新开始
   ```javascript
   // 检查已上传分片，实现断点续传
   const uploadedChunks = await fetch(`/check-chunks/${fileHash}`);
   const remainingChunks = allChunks.filter(chunk => 
     !uploadedChunks.includes(chunk.index)
   );
   ```

**小文件不分片的原因**：

1. **HTTP开销**：
    - 每个HTTP请求都有固定开销（请求头、响应头、TCP握手等）
    - 小文件分片会增加总的网络开销
   ```javascript
   // 示例：100KB文件分成10个10KB分片
   // HTTP头开销可能比文件内容还大
   ```

2. **复杂性成本**：
    - 分片上传增加了前后端的复杂性
    - 小文件传输快，失败重传成本低，不值得增加复杂性

3. **性能考虑**：
    - 小文件直接上传通常比分片上传更快
    - 避免了分片合并的服务器开销

**分界点判断**：
```javascript
function shouldUseChunkedUpload(fileSize) {
  const CHUNK_THRESHOLD = 10 * 1024 * 1024; // 10MB
  return fileSize > CHUNK_THRESHOLD;
}
```

#### 3. 浏览器并发上传每次最多能并发上传多少？

**浏览器并发限制**：

1. **HTTP/1.1 限制**：
    - **同域名并发连接数**：通常为 **6-8个**
    - 这是浏览器的硬性限制，超出部分会排队等待
   ```javascript
   // Chrome/Firefox: 6个并发连接
   // Safari: 6个并发连接
   // IE: 2-8个（版本不同）
   ```

2. **HTTP/2 优势**：
    - **多路复用**：理论上可以在单个连接上并发多个请求
    - **实际限制**：浏览器通常限制在 **100-1000个** 并发流
   ```javascript
   // HTTP/2环境下可以设置更高的并发数
   const concurrency = isHTTP2() ? 10 : 3;
   ```

**实际并发策略**：

```javascript
class ConcurrencyController {
  constructor(maxConcurrency = 3) {
    this.maxConcurrency = maxConcurrency;
    this.running = 0;
    this.queue = [];
  }

  async add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        task,
        resolve,
        reject
      });
      this.process();
    });
  }

  async process() {
    if (this.running >= this.maxConcurrency || this.queue.length === 0) {
      return;
    }
  
    this.running++;
    const { task, resolve, reject } = this.queue.shift();
  
    try {
      const result = await task();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      this.process(); // 处理队列中的下一个任务
    }
  }
}
```

**最佳实践建议**：

1. **保守并发数**：
   ```javascript
   const OPTIMAL_CONCURRENCY = {
     'HTTP/1.1': 3, // 保留一些连接给其他请求
     'HTTP/2': 6,   // 可以适当提高
     'mobile': 2    // 移动端网络不稳定，降低并发
   };
   ```

2. **动态调整**：
   ```javascript
   function getOptimalConcurrency() {
     const connection = navigator.connection;
     if (connection) {
       // 根据网络状况动态调整
       if (connection.effectiveType === '4g') return 6;
       if (connection.effectiveType === '3g') return 3;
       return 2;
     }
     return 3; // 默认值
   }
   ```

3. **错误处理与重试**：
   ```javascript
   async function uploadWithRetry(chunk, maxRetries = 3) {
     for (let i = 0; i < maxRetries; i++) {
       try {
         return await uploadSingleChunk(chunk);
       } catch (error) {
         if (i === maxRetries - 1) throw error;
         // 指数退避重试
         await new Promise(resolve => 
           setTimeout(resolve, Math.pow(2, i) * 1000)
         );
       }
     }
   }
   ```

**总结**：
- **HTTP/1.1**：建议并发数 **2-3个**，为其他请求预留连接
- **HTTP/2**：可以提升到 **6-10个**，但需要考虑服务器承载能力
- **移动端**：建议降低到 **2个**，考虑网络稳定性
- **关键是平衡**：并发数不是越高越好，需要考虑网络状况、服务器性能和用户体验

这样的实现方案既保证了大文件上传的可靠性和性能，又充分考虑了浏览器限制和用户体验。
