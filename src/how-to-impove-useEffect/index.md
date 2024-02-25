---
title: useEffect 存在的问题及改进钩子说明
demo:
  cols: 2
group: 开发指南
---

# useEffect 高阶钩子

## useEffect 存在的问题

`useEffect` 是 `React` 中的一个高阶函数，它允许你在组件渲染时执行一些操作。然而，在使用 `useEffect` 时，可能会遇到一些问题，以下是一些你可能遇到的问题：

1. 无法区分首次加载及首次加载状态。
2. 无法监听 `ref` 对象。
3. 依赖问题：`useEffect` 接受一个依赖数组作为参数，用于指定哪些变量发生变化时需要重新执行副作用。特别注意的是，变量的比较是`浅比较`。
4. 函数执行时间: `useEffect` 属于异步更新，在页面渲染后触发更新操作，若希望在页面渲染前执行可使用 `useLayoutEffect`。虽然 `useLayoutEffect` 已是同步更新，但是还是不够新，具体见下述案例。

## 浅比较问题

在 `useEffect` 中，依赖数组中的变量是使用 `===` 进行比较的，因此如果依赖数组中的变量是引用类型，并且在函数内部修改了该引用类型的值，即使内容没有发生变化，仍会触发函数执行。

浅比较说明：

```ts
let config = { a: 1, b: 2 };
let config2 = { a: 1, b: 2 };
console.log(config === config2); // false
```

<code src="./demo/demo2.tsx" >示例</code>

如果不使用 `useEffect` 的依赖数组项，仅保留其异步特性（渲染后触发执行）

<code src="./demo/demo3.tsx" >示例</code>
