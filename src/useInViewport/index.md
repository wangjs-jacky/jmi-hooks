---
title: useInViewport
nav: Hooks
group: DOM
toc: content
demo:
  cols: 2
---

# useInViewport 源码简析

观察元素是否在可见区域，以及元素可见比例。更多信息参考 [Intersection Observer API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)。

## 不用钩子实现

根据 MDN 的 API 介绍，我们可以用 `IntersectionObserver` 来实现。

```ts
const observer = new IntersectionObserver((entries, observer) => {
  // changes: 目标元素集合(需要取一下才可以)
  console.log('intersectionRatio', entries[0].intersectionRatio);
  console.log('isIntersecting', entries[0].isIntersecting);
});

observer.observe(document.getElementById('target'));
```

<code src="./demo/demo1.tsx" description="监听元素是否在可见区域内">示例 1</code>
<code src="./demo/demo2.tsx" description="传入 `options.threshold`, 可以控制在可见区域达到该比例时触发 `ratio` 更新。
`options.root` 可以控制相对父级元素，在这个例子中，不会相对浏览器视窗变化。">示例 2</code>

## 简易封装

将上述逻辑提取为 `hooks` 钩子函数方便后续复用。

整体封装还是较为基础的，`IntersectionObserver` 需要传入的元素有 `target`、监听器配置 `config`、待触发的回调函数 `callback`

需要处理的操作有：

1. 使用 `getTargeElement` 函数兼容 `target` 的三种写法。
2. 使用 `ref` 缓存 `callback`。
3. `config` 为配置文件，采用深比较方案。

<code src="./demo/demo3.tsx" description="监听元素是否在可见区域内">示例</code>

## 锚点案例

拓展内容：有关元素的滚动可以看下[这篇文章](https://zh.javascript.info/size-and-scroll)

<code src="./demo/demo4.tsx" description="监听锚定">示例</code>
