---
title: useMutationObserver
nav: Hooks
group: DOM
toc: content
demo:
  cols: 2
---

# useMutationObserver 源码解析

一个监听指定的 DOM 树发生变化的 Hook，参考 [MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)

## 不使用钩子实现

<code src="./demo/demo1.tsx" >示例</code>

## 简易封装

将上述逻辑提取为 hooks 钩子函数方便后续复用。

<code src="./demo/demo2.tsx" >示例</code>

> 使用 `useMemo` 缓存下 `options` 对象，避免每次都创建新的引用对象。

目前钩子函数存在的问题：

1. 并不是所有的 `fn` 都需要缓存最新值，若不存在依赖数组可以不用缓存。
2. 在 `useEffectWithTarget` 中，将配置项对象 `[options]` 是直接作为依赖数组传入。由于底层使用的 `Object.is` 对 `deps` 数组进行判断的，即浅比较。但对于配置项而言，我们并不是很关心引用地址，反而对配置内容是否相同更为关注, 封装 `useDeepCompareEffectWithTarget` 改进。

## 完整源码

<code src="./demo/demo3.tsx" >示例</code>
