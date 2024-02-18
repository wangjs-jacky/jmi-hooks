---
title: useExternal
nav: Hooks
group: DOM
toc: content
demo:
  cols: 2
---

# useExternal 源码解析

动态注入 JS 或 CSS 资源，useExternal 可以保证资源全局唯一。

## 不使用钩子实现

由于本篇主要是教程讲解钩子原理为主，因此一开始降低难度，从实现 `JS` 资源脚本开始。
该钩子的作用无非是加载一段外部资源，通过钩子插入 `document` 标签的 `head` 节点下。

因此具体的实现步骤：

1. 首先判断下是否存在 `<script src="目标地址">` 标签，如果没有则：
   - 通过 `document.createElement('script')` 创建 `<script></script>` 节点。
   - 通过 `document.body.appendChild()` 的方式插入目标结构。
2. 如果存在节点，则直接返回。

> 测试脚本存放在 `public` 文件资源夹下，若发布则相对于服务器地址。待载入脚本如下：
>
> ```ts
> window.TEST_SCRIPT = {
>   start: function () {
>     return 'Hello World';
>   },
> };
> ```

<code src="./demo/demo1.tsx" >基本实现</code>

存在的问题：

1. 由于 `<script>`脚本是边下载边执行的是需要时间的，但由于代码的执行是同步的，因此脚本加载结束后，需要手动调用一次渲染触发。
2. 在业务中，我们喜欢有一个不好的习惯，常用 `setTimeout` 方式手动触发视图刷新，由于加载的代码量非常小，这边手动设置了 `1000ms` 的时长。
3. 理想情况下是监听 `load` 加载事件，当脚本加载完成时，视图刷新由事件触发执行。

<code src="./demo/demo2.tsx" >使用 ref 添加 addEventLinstener 的 load 事件</code>

## 简易封装

如果是业务代码已经基本可用了，现在将逻辑提取为 `hooks` 钩子函数方便后续复用。

`hooks` 函数设计：通过暴露出 `status` 状态标识资源的加载情况，通过改变 `status` 状态用于视图刷新。

因此 `API` 设计如下：

```ts
const { status } = useExternal({
  path: '/useExternal/test-external-script.js',
});
```

该案例仍存在的问题，可以改进的点：

- 错误处理：
  - 只考虑了资源加载成功的情况，缺少对失败状态的监听器的添加。
- 新增特性：
  - 如果不通过 `network` 面板很难知道资源的加载情况，可以通过 `data-status` 属性注入到 `<script></script>` 结构中，方便后续排查问题。
  - 资源的加载也分多种情况，如：`ready` 表示成功，`loading` 表示加载中， `error` 表示失败。

<code src="./demo/demo3.tsx" ></code>

## 二次封装

新增功能：

1. 支持 DOM 状态资源显示情况. `data-status` 属性
2. 支持资源加载失败的条件处理。

仍存在的问题：

1. 不支持 `script` 标签属性，如 `async` 或 `defer` 属性。
2. 代码仅支持 `js` 场景，为了方便后续扩展，`options` 中需要支持更多的资源类型。
3. 资源存在多次加载的情况，当组件卸载后，需要移除 `script` 节点。

<code src="./demo/demo4.tsx" ></code>

## 三次封装

新增功能：

1. 支持 `script` 支持透传 `props` 属性，通过 `options` 设置

   ```tsx | pure
   const { status } = useExternal({
     path: '/useExternal/test-external-script.js',
     options: { js: { async: true } },
   });
   ```

2. 将 `js` 文件逻辑抽离为 `loadScript` 函数，方便后续支持多种类型。

   如 ： `loadCss`、`loadScss` 、`loadMeta` 等功能。

缺点：

1. 无法保证资源的全局唯一性，希望做到，当组件卸载时，且资源不被使用后，删除对应 `<script></script>` 节点。

<code src="./demo/demo5.tsx" ></code>
