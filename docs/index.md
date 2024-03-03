---
hero:
  title: Jmi-Hooks
  description: .
  actions:
    - text: 指南
      link: /guide
    - text: Hooks 列表
      link: /hooks
features:
  - title: 易学易用
    emoji: 👾
  - title: 支持 SSR
    emoji: 🍋
    description:
  - title: 对输入输出函数做了特殊处理，避免闭包问题
    emoji: 🧙‍♀️
  - title: 包含大量提炼自业务的高级 Hooks
    emoji: 🚵‍♂️
  - title: 包含丰富的基础 Hooks
    emoji: 🌈
    description:
  - title: 使用 TypeScript 构建，提供完整的类型定义文件
    emoji: 🩸
---

## 介绍

`ahooks` 是一套高质量可靠的 `React Hooks` 库，旨在帮助开发者更轻松地处理状态逻辑和副作用。

本篇教程将从零开始实现 `ahooks` 中的部分 `Hooks`，旨在帮助大家更好地理解 `Hooks` 的设计思路和实现原理。

## 📦 安装

```bash
$ npm install --save jmi-hooks
# or
$ yarn add jmi-hooks
# or
$ pnpm add jmi-hooks
# or
$ bun add jmi-hooks
```

## 🛠️ 使用

```typescript
import { useRequest } from 'jmi-hooks';
```
