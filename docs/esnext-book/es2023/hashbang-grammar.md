# Hashbang 语法（Hashbang Grammar）

`Hashbang`，也称为 `shebang`，就是在文件开头的一行，以 `#!` 开头的注释，用来指定脚本的解释器。
```javascript
#!usr/bin/env node // 这个注释的意思是，使用 `Node.js` 作为解释器来运行这个脚本。
console.log('hashbang');
```
在终端用路径执行脚本即可：`./demo.js`

```javascript
console.log('no hashbang')
```
没有 `Hashbang` 在终端执行时，需要使用 `node` 指令才能执行：`node ./demo2.js`

只有当脚本直接在 **shell** 中运行时，`Hashbang` 语法才有语意意义，其他环境下 **JavaScript 解释器**会把它视为**普通注释**。

