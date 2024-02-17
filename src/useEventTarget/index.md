---
title: useEventTarget 
nav: Hooks
group: DOM
toc: content
demo: 
  cols: 2
---

# useEventTarget 源码解析

## 不用钩子实现

<code src="./demo/demo1.tsx" description="受控的 input，支持 reset" >基础用法</code>
<code src="./demo/demo2.tsx" description="只能输入数字的 input 组件" >自定义转换函数</code>


## 简易封装

存在的问题：
1. `reset` 和 `onChange` 没有锁死引用地址。
2. `transform` 是一个函数，当 `hooks` 接受函数时，需特殊处理下。

<code src="./demo/demo3.tsx" description="提取为自定义hooks" >简易封装</code>


## 完整源码
<code src="./demo/demo4.tsx" description="源码" >源码</code>
