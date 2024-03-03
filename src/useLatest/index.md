---
title: useLatest
nav: Hooks
toc: content
demo:
  cols: 2
group: Advanced
---

# useLatest 源码解析

返回当前最新值的 Hook，可以避免闭包问题。

## 使用场景说明

在之前的章节中已经阐述了，在 `React` 中最容易犯的一个点就是 `陈旧闭包现象`。

尤其是当自定义钩子中入参存在 `fn` 函数时，并且该函数又被另一个函数 `fn2` 引用，那么 `fn2` 中的 `fn` 函数就会变成一个 `陈旧闭包` 存在。

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

此时，每次我们都需要写上这么一段模板代码，看上去非常不简洁，而 `useLatest` 核心就这么两段代码。

```ts
const fnRef = useRef(fn);
fnRef.current = fn;
```

## 完整源码

> ps: 由于该钩子太过于简单，还是建议直接写在代码里头，无需引入第三方包，通俗易懂更方便后续维护。

<code src="./demo/demo1.tsx">示例</code>
