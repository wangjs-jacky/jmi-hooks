---
title: useKeyDown
nav: Hooks
group: DOM
toc: content
demo:
  cols: 2
---

# useKeyDown 源码解析

监听键盘按键，支持组合键，支持按键别名。

## 不使用钩子实现

根据 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keypress_event), `keypress` 事件已弃用，推荐使用 `keydonw` 事件。两者的区别在于：

1. 与 `keypress` 事件不同的是，所有按键均会触发 `keydown` 事件，无论这些按键是否会产生字符值。
2. 对应的 `value` 值不同，

其中，键盘的取值方式有多种：

使用 `addEventListener` 事件，可通过 `event.code` 或 `event.key` 获取键值（参考： [keyCode 值](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/code)）

**示例**：

| 键盘输入                 | event.code          | event.key  | event.keyCode(已废弃) |
| ------------------------ | ------------------- | ---------- | --------------------- |
| `c`                      | `KeyC`              | `c`        | 67                    |
| `shift`                  | `CapsLock`          | `CapsLock` | 20                    |
| `shift + c` （含修饰键） | `KeyC`/ `ShiftLeft` | `C`        | 67                    |

<code src="./demo/demo1.tsx" description="支持键盘事件中的 keyCode 和别名，请按 ArrowUp 或 ArrowDown 键进行演示。">基本实现</code>

考虑组合键场景（组件键 = 修饰键 + 普通键）

其中，修饰键指的是：`ctrl` 、`shift` 、 `alt`、`meta`（`Mac` 为 `⌘ `键, `Windows` 为 `⊞` 键 ）。

在 `keydown` 事件中，对于修饰键是做了特殊的处理的，比如长按时，`KeyA` 会触发多次，而对于修饰键仅会触发一次。

<code src="./demo/demo2.tsx" description="其中对于 c 键做了精确匹配处理" >考虑修饰键</code>

> 说明，若不生效，可能与全局系统热键冲突

## 简易封装

将上述逻辑提取为 `hooks` 钩子函数方便后续复用。

需要支持：如果使用 `KeyCode` 实在是太麻烦了，比如判断 `a` ，需要写 `event.code === "KeyA"` ，这样太麻烦了，所以额外需要维护一套 `KeyCodeMap` 方便用户调用（这边直接采用 `ahooks` 中已经封装好的映射关系）

<code src="./demo/demo3.tsx" description="测试单键绑定" >示例 1</code>

<code src="./demo/demo4.tsx" description="测试组合键绑定" >示例 2</code>

## 完整源码

这个钩子相比于 `ahooks` 的 `useKeyPress` 钩子修改了 `keyDown` 事件触发。

避免精确判断带来的钩子心智负担，删去了 `exactMatch` 参数。

<code src="./demo/demo5.tsx" description="测试单键绑定" >示例</code>

后续，仍有两个点可以优化，但使用频率较低，暂不封装了：

1. eventNames 支持函数传参
2. 支持 DOM 绑定。
