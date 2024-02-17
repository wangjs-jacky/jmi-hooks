---
nav: Hooks
group: DOM
toc: content
title: useClickAway
---

# useClickAway 源码解析

## 尝试不用钩子实现

<code src="./demo/demo1.tsx" description="监听目标元素外的点击事件，且点击 box 无效">基本功能</code>


## 简易封装

将上述钩子简单提取为钩子。
存在的问题：
1. 不支持多个 `DOM`
2. `eventName` 只能传递 `string` 类型，不支持数组模式。

<code src="./demo/demo2.tsx"></code>

## 完整源码

<code src="./demo/demo3.tsx" description="试试移动鼠标及鼠标点击">监听其他事件</code>

