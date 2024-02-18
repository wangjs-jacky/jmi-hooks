---
title: useHover
nav: Hooks
group: DOM
toc: content
demo:
  cols: 2
---

# useHover 源码解析

监听 DOM 元素是否有鼠标悬停。

## 不使用钩子实现

实现思路：通过 `useEventListener` 对 `mouseenter` 和 `mouseleave` 事件进行监听。

由于使用的是 `useEventListener` 函数，`target` 支持 `ref` 、`DOM`、`()=> DOM` 三种形式。

<code src="./demo/demo1.tsx" description="使用 ref 设置需要监听的元素。">基本实现</code>

## 简易封装

将上述逻辑提取为 `hooks` 钩子函数方便后续复用。

<code src="./demo/demo2.tsx" description="使用 ref 设置需要监听的元素。">示例</code>

## 完整封装

上述钩子基本已实现要求功能，在 `ahooks` 中又进一步封装了各个阶段的回调触发函数。
这个技巧出现在大量的 `antd` 组件函数使用的中，也相当于对 `useHover` 内部暴露的生命周期钩子。

目前，存在两个钩子支持透传回调函数，`mouseenter` 以及 `mouseleave`, 除此以外，为了方便开发者调用，将所有状态变化收敛到 `onChange` 这个钩子中。

<code src="./demo/demo3.tsx" description="使用 ref 设置需要监听的元素。">示例</code>
