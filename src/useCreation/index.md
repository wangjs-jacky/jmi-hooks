---
title: useCreation
nav: Hooks
toc: content
demo:
  cols: 2
group: Advanced
---

# useCreation 源码解析

在 `ahooks` 中最难以理解的恐怕就是这个钩子了，在官网中是这么介绍 `useCreation`, 它是 useMemo 或 useRef 的替代品。

## useRef 存在的问题

`useRef` 不像 `useState` 支持接受初始化函数。

```ts
✅
const ref = useRef(initialValue);
❎
const ref = useRef(()=>initialValue);
```

如果使用构造函数初始化时，每次执行时，`contructor` 会被重复执行。

<code src="./demo/demo1.tsx" description="打开控制台可发现构造函数被重复执行">示例</code>

但是这个问题也好解决，通过 `useEffect` 控制只在初始化赋值即可解决这个问题。

<code src="./demo/demo2.tsx" >示例</code>

每次重渲染，都会执行实例化 Subject 的过程，即便这个实例立刻就被扔掉了

## useMemo 存在的问题

`useMemo` 的问题在于 `React` 官方文档的一段描述，

> You may rely on useMemo as a performance optimization, not as a semantic guarantee. In the future, React may choose to “forget” some previously memoized values and recalculate them on next render, e.g. to free memory for offscreen components. Write your code so that it still works without useMemo — and then add it to optimize performance.

即，在离屏模式下，依赖数组中之前缓存的变量可能被主动"忘记"。因此，不推荐直接使用 `useMemo` 的 `[]` 参数，这块我们最好手动去实现比较 `deps` 数组的逻辑。

<code src="./demo/demo3.tsx">示例</code>

> 注：`useMemo` 或者 `useCreation` 是同步执行函数，在此前的封装中，使用 `useFirtMount` 等钩子实现实际上是错误的，因为底层使用的是 `useEffect` 这类钩子，而 `useEffect` 本身是异步执行的。

> 注 2： 在 `ahooks` 中几乎所有涉及 `deps` 依赖的比对，都是通过封装 `depsRef` 并借助 `depsAreSame`(Object.is) / `isEqual`(lodash-es) 实现的。如：`useDeepCompareUseEffect` 钩子，依赖数组是通过传标志位 `{}` 用于控制 `useEffect` 函数刷新的。
