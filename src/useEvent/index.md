---
title: useEvent
nav: Hooks
toc: content
demo:
  cols: 2
group: Advanced
---

# useEvent 源码解析

`useCallback` 的高级版，基本可以完全取代。

该钩子也是在 `React RFCs` 原本也是钩子列表中的其中一项，见[链接](https://github.com/reactjs/rfcs/pull/220#issuecomment-1259938816) ，但是出于某些原因，已经被官方移除。

![image-20240303163739958](https://vblog-img.oss-cn-shanghai.aliyuncs.com/jacky-blog-vuepress/202403031637386.png)

虽然没有得到官方的原生支持，但是我们仍可以在代码中使用，简化我们在使用 `useCallback` 产生的心智负担。

## 使用场景

正常情况下，我们缓存一个函数的引用地址非常麻烦。

特别是处理 useCallback 的依赖数组。

<code src="./demo/demo1.tsx"></code>

现在希望封装一个钩子，省略掉依赖数组，类似于如下钩子：

- `rc-util` 中的 `useEvent`
- `ahooks` 中的 `useMemoizedFn`

该钩子实现的思路非常巧妙：
在函数中对于函数来说，可以通过下面这种方式无限包裹。

```ts
const fn1 = (arg1, arg2) => {};
// 对入参 arg1, arg2 继承
export const fn2 = (arg1, arg2) => {
  fn1(arg1, arg2);
};
```

在 `js` 编程中不会这么写，但是对于 `hooks` 编程来说，正好可以利用到这多包裹一层的箭头函数。

为避免重复渲染，可以使用 `useCallback` 缓存函数对包裹的箭头函数进行缓存，这样既解决了 deps 的问题，也可以锁死引用地址。

```ts
var envVar; /* 环境变量(注意) */

// 🚨 注意使用 ref 缓存
const envVarRef = useRef();
const fnRef = useRef(fn);
fnRef.currrent = fnRef;

// fn1 引用地址发生变化
const fn1 = (arg1, arg2) => {
  /* 使用到了 envVar */
  console.log(envVarRef.current);
};

// fn2 固定引用地址
export const fn2 = React.useCallback((arg1, arg2) => {
  fn1(arg1, arg2);
}, []);
```

> 需要特别注意的是, `fn1` 仅会被执行一次，因此需要对 `fn1` 中所有的环境变量进行 `ref` 缓存。

## 完整源码

<code src="./demo/demo2.tsx">示例</code>
