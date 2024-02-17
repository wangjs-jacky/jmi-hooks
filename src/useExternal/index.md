---
title: useExternal
nav: Hooks
group: DOM
toc: content
demo: 
  cols: 2
---

# useExternal 源码解析

## 不使用钩子实现

思路：
1. 动态的插入 `<script></script>` 结构。

待载入脚本：
```ts
window.TEST_SCRIPT = {
  start: function () {
    return 'Hello World';
  },
};
```

<code src="./demo/demo1.tsx" >基本实现</code>

存在的问题：
1. 目前通过 `setTimeout` 手动刷新视图，理想情况下是监听 `load` 加载事件，当脚本加载完成时，自动刷新视图。

<code src="./demo/demo2.tsx" >使用 ref 监听 script 的 load 事件</code>


## 简易封装

通过暴露出一个 `status` 状态标识资源的加载情况

```ts
const { status } = useExternal({
  path: "/useExternal/test-external-script.js"
})
```

存在的问题：
1. 目前只考虑了资源加载成功的情况，缺少对失败状态的监听器的添加。
2. 资源的加载分多种情况，`ready` 成功，`loading` 加载中， `error` 失败。
3. 如果不通过 `network` 面板很难知道资源的加载情况，可以通过 `data-status` 属性注入到 `<script></script>` 结构中，方便后续排查问题。

<code src="./demo/demo3.tsx" ></code>

## 二次封装

新增功能：
1. 支持 DOM 状态资源显示情况. `data-status` 属性
2. 支持资源加载失败的条件处理。

存在的问题：
1. 不支持 `script` 标签属性，如 `async` 或 `defer` 属性。
2. 代码仅支持 `js` 场景，为了方便后续扩展，`options` 中需要支持更多的资源类型。
3. 资源存在多次加载的情况，当组件卸载后，需要移除 `script` 节点。

<code src="./demo/demo4.tsx" ></code>

## 最终封装












