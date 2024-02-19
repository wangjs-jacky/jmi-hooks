---
title: useMouse
nav: Hooks
group: DOM
toc: content
demo:
  cols: 2
---

# useMouse 源码解析

监听鼠标位置

## 不使用钩子实现

在实现这个钩子前，我们需要先区分出 `screenX`/`Y`, `clientX`/`Y` and `pageX`/`Y` 这几个坐标位置的区别是什么？

在 [stackOverflow](https://stackoverflow.com/questions/6073505/what-is-the-difference-between-screenx-y-clientx-y-and-pagex-y) 中，高赞回答有张图将位置关系展现的很清晰。

- 对于 `screen` 属性，相对的是窗口。
- 对于 `client` 属性，相对的是视口。
- 对于 `page` 属性，相对于 `client` 会稍微小一些，主要存在滚动相关的属性。

![image-20240219001548253](https://vblog-img.oss-cn-shanghai.aliyuncs.com/jacky-blog-vuepress/202402190015025.png)

实现思路：

1. 通过 `mousemove` 事件可以获取鼠标的相对位置，对应的 `ts` 类型是 `MouseEvent`

   ```ts
   const hanlder = (event: MouseEvent) => {
     // 鼠标的相对位置
     const { screenX, screenY, clientX, clientY, pageX, pageY } = event;
   };
   ```

2. 可以使用已经封装好的 `useEventListener` 简化监听操作。

   由于 `mousemove` 全局监听， `target` 可以传入 `window` 或者 `document` 。

   ```ts
   useEventListner('mousemove', handler, { target: () => document });
   ```

<code src="./demo/demo1.tsx" >基本实现</code>

额外的需求，

1. 需要支持相对定位，即鼠标在元素内移动时，获取鼠标在元素内的相对位置。

2. 计算的过程

   - 首先，我们必须获得元素左上角的坐标位置,通过

     `elementX = element.getBoundingClientRect().left + window.scrollX`

   - 计算相对位置，需要借助到 `event.pageX/Y` 属性

     `elemenPosX = pageX - elementX`

<code src="./demo/demo2.tsx" >支持元素内相对定位</code>

## 完整源码

将 `demo1` 和 `demo2` 两个案例，逻辑提取为 `hooks` 钩子函数方便后续复用。

<code src="./demo/demo3.tsx" >示例</code>
