---
title: useMergedState
nav: Hooks
toc: content
demo:
  cols: 2
group: Advanced
order: 2
---

# useMergedState 源码解析

在某些组件开发时，我们需要组件的状态既可以自己管理，也可以被外部控制，useControllableValue 就是帮你管理这种状态的 Hook。

该钩子为 `rc-util` 中对应的钩子 `useMergedState`，在对应的 `ahooks` 的钩子为 `useControllableValue`。

## 受控模式与非受控模式

<code src="./demo/demo1.tsx"  description="传入 value">受控</code>
<code src="./demo/demo2.tsx" description="传入 defaultValue, 通过 ref 获取 value" >非受控</code>

<!-- <code src="./demo/demo3.tsx" description="同时传入 value 和 defaultValue 控制台报错">同时传入</code> -->

![](https://vblog-img.oss-cn-shanghai.aliyuncs.com/jacky-blog-vuepress/202403021706455.png)

## 不使用钩子实现

`Input` 组件存在两个控制来源：

- `value` ← `props.value` 发生变化
  当外部传入 `value` ，`props.value` 改变时，`input` 发生变化【父组件受控】

- `value` ← `onChange` 变化
  组件内存在 `onChange` 发生变化时，`input` 也能改变【子组件内部受控】

具体实现思路：

- 当没有传递 `value` 属性时，子组件内部维护一套状态，以及状态的修改机制。【非受控】
  典型的如 `antd` 的 `form` 组件，通过 `formRef.current.getFieldsValue()` 来实时获取字段值。

- 当传递 `value` 属性时，子组件又可切换为受控模式，完全取决于父组件的属性传递。

**解决方案**

1. 使用 `innerValue` 让 `<input />` 组件完全受控，这里可以给 `useState` 传递一个函数用于 `初始化`
2. 处理 `innerValue` 受控条件

<code src="./demo/demo4.tsx" ></code>

具体实现效果：

- 当父组件传递 `value` 值为 `undefined` 时，子组件呈现非受控，可以子组件输入框可以输入文本。
- 当父组件传递 `value` 值为非空时，子组件呈现受控模式，子组件的显示内容完全取决于外部的 `props` 控制。

## 简易封装

改造：原有钩子只有当父组件透传 `undefined` 属性时，才会切换为非受控模式。感觉 `rc-util` 设计的不是很合理。

在实际开发中可能存在一个场景，表格打开一个表单的场景，表单初始化打开时有部分初始值是由表格行数据渲染，而表单内部也维护了一套状态，支持内部控制，修改后无需通知父组件。

<code src="./demo/demo5.tsx" ></code>
