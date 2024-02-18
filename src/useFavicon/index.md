---
title: useFavicon
nav: Hooks
group: DOM
toc: content
demo:
  cols: 2
---

# useFavicon 源码解析

设置页面的图标

根据 [MDN-link](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link) 可知，`favicon` 设置的方案为：

一个网站图标的链接：

```html
<!-- basic favicon -->
<link rel="icon" href="favicon.ico" />
```

还有一些其他的与图标相关的 rel 值，主要用于表示不同移动平台上特殊的图标类型，例如：

```html
<link
  rel="apple-touch-icon-precomposed"
  sizes="114x114"
  href="apple-icon-114.png"
  type="image/png"
/>
```

属性说明：

- `sizes` 属性表示图标大小
- `type` 属性包含了链接资源的 `MIME` 类型
  > 苹果的 IOS 系统并不支持这个属性，于是苹果的 IPhone 以及 IPad 使用特殊的、非标准的 link 类型值去定义作为 Web Clip 或开始占位符：`apple-touch-icon` 和 `apple-touch-startup-icon`。

## 不使用钩子实现

因此实现思路为：

1. 找到对应的 `<link>` 标签，如果不存在就创建一个新的 `link` 标签
2. 处理支持透传给 `link` 的 `props` 属性。
3. 插入在 `head`，使用 `[head].appendChild(link)` 的方式插入。

<code src="./demo/demo1.tsx" >基本实现</code>

## 简易封装

将上述逻辑提取为 `hooks` 钩子函数方便后续复用。

仍存在的问题：

1. 目前仅支持 `href` 和 `type` 两个属性，其实对于开发者来说 `type` 的取值是需要开发经验来说的，对应的 `MIME` 关系可以内置为 `Map` 对象：

   ```ts
   const ImgTypeMap = {
     SVG: 'image/svg+xml',
     ICO: 'image/x-icon',
     GIF: 'image/gif',
     PNG: 'image/png',
   };
   ```

<code src="./demo/demo2.tsx">示例</code>

## 完整封装

特性：

1. 根据类型推断出，`href` 属性推断出 `type` 值（由 `ImgTypeMap` 字典维护）

<code src="./demo/demo3.tsx">示例</code>
