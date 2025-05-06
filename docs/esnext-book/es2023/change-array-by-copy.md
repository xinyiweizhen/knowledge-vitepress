# 不改变原数组的新的原型方法（Change Array by Copy）

很多数组的方法会改变原数组，比如`push()`、`pop()`、`reversed()`、`sort()`等等，我们称它们为破坏性方法，只要调用了数组这些方法，它的值就变了。

非破坏性方法，比如我们经常用到的 `filter`、`some`、`map`、`find` 等方法，都是不会改变原数组的。

```javascript
const arr = [3, 2, 1];
const res = arr.sort(); 

console.log(res); // [1, 2, 3]
console.log(arr); // 原数组也变成了 [1, 2, 3]
```

如果想要不改变原数组，就意味着我们需要复制一个新数组，再使用这些方法。

```javascript
const res1 = arr.slice().sort();
const res2 = [...arr].sort();
const res3 = Array.from(arr).sort();
```

现在新增了4个数组的方法，允许对数组进行操作时，不改变原数组，返回一个原数组的拷贝。

### `toReversed()`：是 `reverse()` 的非破坏性版本：

```javascript
const arr = [1, 2, 3];
const res = arr.toReversed();
console.log(res); // [3, 2, 1]
console.log(arr); // [1, 2, 3] 原数组不变
```

### `toSorted()`：是 `sort()` 的非破坏性版本：
```javascript
const arr = [3, 2, 1];
const res = arr.toSorted();
console.log(res); // [1, 2, 3]
console.log(arr); // [3, 2, 1] 原数组不变
```

### `toSpliced(start, deleteCount, ...items)`：是`splice()`的非破坏性版本：
```javascript
const arr = [1, 2, 3];
const res = arr.toSpliced(1, 1, 'z');
console.log(res); // [1, 'z', 3]
console.log(arr); // [1, 2, 3] 原数组不变

```

### `with(index, value)`：是修改数组指定索引值的非破坏性版本
```javascript
const arr = [1, 2, 3];
const res = arr.with(1, 'z');
console.log(res);  // [1, 'z', 3]
console.log(arr); // [1, 2, 3] 原数组不变
```
