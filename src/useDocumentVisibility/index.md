---
title: useDocumentVisibility
nav: Hooks
group: DOM
toc: content
---

# useDocumentVisibility 源码解析

MDN 文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/visibilityState

`Document.visibilityState` （只读属性）, 返回document的可见性，即当前可见元素的上下文环境。由此可以知道当前文档 (即为页面) 是在背后，或是不可见的隐藏的标签页，或者 (正在) 预渲染。可用的值如下：

- `visible` : 此时页面内容至少是部分可见。即此页面在前景标签页中，并且窗口没有最小化。
- `hidden` : 此时页面对用户不可见。即文档处于背景标签页或者窗口处于最小化状态，或者操作系统正处于 '锁屏状态' .
- `prerender` : 页面此时正在渲染中，因此是不可见的 (considered hidden for purposes of document.hidden). 文档只能从此状态开始，永远不能从其他值变为此状态。注意：浏览器支持是可选的。


基本使用：
```ts
document.addEventListener("visibilitychange", function () {
  console.log(document.visibilityState);
  // Modify behavior...
});
```


## 不使用钩子实现

该钩子只是对 `visibilitychange` 事件的封装，当 `document` 的可见性发生变化时，触发回调函数。

<code src="./demo/demo1.tsx" ></code>

## 简易封装

<code src="./demo/demo2.tsx" ></code>

## 完整源码

基本功能已实现，可以使用已经封装过的 `useEventListener2` 简化卸载操作。

<code src="./demo/demo3.tsx" ></code>




