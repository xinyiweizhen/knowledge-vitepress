# WeakMap支持使用Symbol作为key（Symbols as WeakMap keys）

## WeakMap

`WeakMap`结构与`Map`结构类似，也是用于生成键值对的集合。

```javascript
const wm = new WeakMap();
let key = { name: 'aaa' };
wm.set(key, 2);
wm.get(key) // 2
```

在 JavaScript 中，`Objects` 和 `Symbols` 被保证是唯一并且不能被重新创建的，这使得它们都是 `WeakMapkeys` 的理想候选者。
以前的版本或规范只允许以这种方式使用 `Objects` ，但新的提案将 `Symbols` 添加到允许的键列表中。

## `WeakMap` 与 `Map`的区别，以及为什么要用`WeakMap`

- `WeakMap`只接受**对象（`null`除外）和 `Symbol` 值作为键名**，`Map` 对象的键可以是**任何类型**
- `Map`所构建的实例需要手动清理，才能被垃圾回收清除，可能会导致内存泄漏，因为数组会一直引用着每个键和值；
而`WeakMap`只要外部的引用消失，所对应的键值对就会自动被垃圾回收清除。
- `WeakMap` 的键是弱引用的，因此对象**不可枚举**。如果想要对象的 `key` 值列表，应该使用`Map`。
如果要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 `WeakMap`。
- 使用 `Symbol` 作为 `WeakMap` 的 `key` 可以更清晰地表明它的键和映射项的角色关系，而不需要创建一个只用作键的新对象。
由于 `Symbol` 类型的属性名是唯一的，可以避免属性名冲突问题。
- `Map` 能够记住键的原始插入顺序，且一个键只能出现一次

```javascript
const weakMap = new WeakMap();
weakMap.set(1, 2) // 报错
weakMap.set(null, 2) // 报错
weakMap.set(Symbol(), 2) // 不报错
weakMap.set({ name: 'aaa' }, 2) // 不报错
```
