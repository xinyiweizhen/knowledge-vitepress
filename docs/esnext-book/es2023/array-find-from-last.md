# 从后往前查找数组（Array find from last）

## 简介

在数组中查找元素是常见的需求， 以下是我们遍历数组中常用的两个方法，但是目前这两种方法都是从前往后遍历的。

- `Array.prototype.find()` : 返回第一个查找到的元素，如果没有找到，返回 `undefined`
- `Array.prototype.findIndex()` : 返回第一个查找到的元素的索引，如果没有找到，返回 `-1`

如果我们想查找满足条件的最后一个元素时，需要先将数组进行`reverse`后再处理。

现在新增了两个数组方法`findLast()`和`findLastIndex()` ，用法跟 `find` 和 `findIndex` 完全一致，
唯一的区别就是它们会从数组的最后一个成员开始，依次向前检查。这两个方法都很方便，可跳过创建临时的重复、突变和混乱的索引减法。

- `Array.prototype.findLast()` : 返回第一个查找到的元素，如果没有找到，返回 `undefined`
- `Array.prototype.findLastIndex()` : 返回第一个查找到的元素的索引，如果没有找到，返回 `-1`


```javascript
const arr = [1, 2, 3, 4, 5];

const res = arr.findLast(i => i > 3);
console.log(res); // 5

const res2 = arr.findLastIndex(i => i > 3);
console.log(res2); // 4

```

## 代码实现

```javascript
function findLast(arr, callback, thisArg) {
     for (let i = arr.length-1; i >= 0; i--) {
         if (callback.call(thisArg, arr[i], i, arr)) {
            return arr[i];
         }
      }
     return undefined;
}

const arr = [1, 2, 3, 4, 5];
const res = findLast(arr, i => i > 1);
console.log(res); // 5

```

```javascript
function findLastIndex(arr, callback, thisArg){
    for(var i = arr.length - 1; i >= 0; i--){
        if (callback.call(thisArg, arr[i], i, arr)) {
            return i;
       }
    }
    return -1;
}

const arr = [1, 2, 3, 4, 5];
const res = findLastIndex(arr, i => i > 1);
console.log(res); // 4

```
