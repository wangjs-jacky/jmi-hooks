---
demo:
   cols: 2
toc: content
group: 开发指南
---

# 开发 hooks 注意项

## 状态即快照的概念

在 `React` 中，[状态即快照](https://react.dev/learn/state-as-a-snapshot)的概念非常重要。

<code src="./demo/demo02.tsx"  description="react 点击按钮自增三次">状态即快照</code>

## `React` 中的陈旧闭包现象

典型场景：当出现延迟执行时，非常容易出现闭包行为。

<code src="./demo/demo01.tsx"  description="在 setTimeout 或者 setInterval 中引用外部 state">setTimeout/setInterval 闭包问题</code>

但是这里的有个误区，闭包是由 `setTimeout` 引起的吗？

其实不然，在 `React` 中使用 `setTimeout` 或者 `setInterval` 函数时，必须借助 `useEffect` 实现，如果硬要使用，下面是一个典型的错误写法示例

<code src="./demo/demo06.tsx"  description="setTimeout 错误示例">setTimeout 典型错误写法，存在内存泄露</code>

所以思考闭包产生的核心逻辑是：

原因是函数的执行结果取决于两个因素，`入参` + `环境变量`。对于原始数据类型，环境变量是固定的，不会发生变化。而对于引用数据类型，环境变量是可变的，会发生变化。

对于同步函数执行，函数定义后直接执行，环境变量不会发生变化，因此不会出现闭包问题。

使用 `useCallbak` 产生闭包：

<code src="./demo/demo03.tsx"  description="锁死引用地址">useCallback 闭包产生示例</code>

由于函数仅在定义时执行一次，此时`环境变量`取决于定义时，从而该变量转变为一个`闭包变量`。

## 闭包问题与 `setTimeout/setInterval` 无关

在这个例子中，setTimeout 每次都会返回一个新的引用地址，因此总是能获取新的值。

闭包产生的条件，函数只在初始化定义一次，后续延迟执行时，在 React 中可通过 `useCallback` 或 `useEffect` 在多次渲染时仅定义一次。

<code src="./demo/demo04.tsx"  description="延迟调用">useCallback 闭包问题</code>


## 当自定义钩子接受 `fn` 应如何正确处理

处理方案：
1. 首先对 `fn` 使用 `useLatest`(后续将另起一篇章程介绍)。
2. 在使用 `()=>{}` 箭头函数对 `fn` 再包一层，包过的函数可以被随意调用，而不会考虑产生闭包问题。
> 随意调用：指的是被 `useCallback`，或者被 `useEffect` 等包裹。

```ts
const useXXX = ({ fn }: { fn: () => void }) => {
  // 1. 使用 ref 缓存
  const fnRef = useRef(fn);
  fnRef.current = fn;

  // 2. 再包一层，并通过 useCallback 锁死引用地址
  const fn2 = useCallback(() => {
    fnRef.current();
  }, []);

  return {
    fn: fn,
    // ✅ 锁死引用地址，又解决了闭包的问题
    fn2: fn2,
  };
};

```

<code src="./demo/demo05.tsx"  description="使用 ref">使用 ref 缓存最新的函数地址</code>


