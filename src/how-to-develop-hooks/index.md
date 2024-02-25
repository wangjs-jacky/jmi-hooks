---
demo:
  cols: 2
toc: content
group: 开发指南
---

# 开发 hooks 注意项

在 React 开发中，新手容易犯的常见错误，应尽量避免使用。

## 【特别理解】了解状态即快照的概念

在 `React` 中，`状态即快照`的概念非常重要，如果不理解，新手特别容易产生一些不可预知的错误出现，且难以排查

> 详细的解释可以参考 [React 官方文档](https://react.dev/learn/state-as-a-snapshot) 响应章节

状态即快照，其实就是对 `React` 渲染理念【单向数据流，或称为数据驱动视图】的实践，任何 `React` 中的渲染都可用一个表达式表述，即 `UI = Hooks(state)`。

输入 `state` 泛指内部的 `state` 或者外部传入的 `props` 变量，输出 `UI` 视图 (`JSX.Element`), 而 `Hooks` 指的是 `React` 中的 `Hooks` 函数式写法，每次渲染就是一次函数执行。

典型的示例是：点击按钮自增三次

```ts
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        type="button"
        onClick={() => {
          setNumber(number + 1); // number 永远为 0
          setNumber(number + 1);
          setNumber(number + 1);
        }}
      >
        +3
      </button>
    </>
  );
}
```

<code src="./demo/demo02.tsx"  description="react 点击按钮自增三次">示例</code>

可以发现，点击按钮，`number` 值每次仅 `+1`，与可能预想 `+3` 的结果不一致。

套一下公式 `UI = Hooks(state)` 理解 `snapshot` 的概念。

- `state`: 与渲染视图有关的 `state` 就只有 `number`, 初始执行时 `number` 为 `0`
- `Hooks` : `return (....)` (了解 `JSX` 原理的知道，这里的 `return` 其实为 `React.createElement` 的简化写法，这部分由 `babel`/ `tsx` 等编译层帮助我们自动翻译的)
- `UI` 即为 `JSX.Element` 元素。

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
