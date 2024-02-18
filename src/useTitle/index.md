---
title: useTitle
nav: Hooks
group: DOM
toc: content
demo:
  cols: 2
---

# useTitle 源码解析

用于设置页面标题

## 不使用钩子实现

标签页的修改是通过 `document.title`来实现的，因此只需要在组件中使用 `DOM` 的手段去修改 `document.title` 即可。

<code src="./demo/demo1.tsx" description="设置页面标题设置为 Hello，Jmi-Hooks.">基础用法</code>

> 这里使用 `setTimeout(()=>{},0)` 包裹一下，是因为 `dumi` 框架内部会在文档加载后去修改头部的标题，导致 `useTitle` 设置的标题被覆盖。

## 简易封装

将上述逻辑提取为 `hooks` 钩子函数方便后续复用。

仍存在的问题：

1. 没有考虑组件卸载的情况，当组件卸载后，需要将 `document.title` 改回为原来的标题，并且暴露 `restoreOnUnmount` 参数，设置后，卸载后仍保留原有标题。
2. 考虑 `SSR` 场景

<code src="./demo/demo2.tsx" description="设置页面标题设置为 Hello, JMI-Hooks! from demo2">示例</code>

## 完整封装

<code src="./demo/demo3.tsx" description="设置页面标题设置为 Hello，Jmi-Hooks from index">示例</code>
