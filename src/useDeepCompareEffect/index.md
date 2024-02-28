---
title: useDeepCompareEffect
nav: Hooks
toc: content
demo:
  cols: 2
group: useEffect
order: 2
---

# useDeepCompareEffect 源码解析

## 浅比较问题

在 `useEffect` 中，依赖数组中的变量是使用 `===` 进行比较的，因此如果依赖数组中的变量是引用类型，并且在函数内部修改了该引用类型的值，即使内容没有发生变化，仍会触发函数执行。

浅比较说明：

```ts
let config = { a: 1, b: 2 };
let config2 = { a: 1, b: 2 };
console.log(config === config2); // false
```

<code src="./demo/demo1.tsx" >示例</code>

## 模仿实现：`useEffect` 依赖数组

`useEffect` 的第二个数组 `[]` ，用于控制函数体的执行。

其实我们也可以不使用 `useEffect` 的依赖数组项，通过编写逻辑自己控制函数体的执行逻辑。

```ts
// 使用 Object.is 比较两个依赖数组
function depsAreSame(oldDeps: DependencyList, deps: DependencyList): boolean {
  if (oldDeps === deps) return true;
  for (let i = 0; i < oldDeps.length; i++) {
    if (!Object.is(oldDeps[i], deps[i])) return false;
  }
  return true;
}

// hooks 写法
const depsRef = useRef(deps);
//  depsRef.current = deps; 一般写在这里，这里需要做一层拦截

useEffect(() => {
  if (!firstMountRef.current) {
    // mount 阶段
    firstMountRef.current = true;
    depsRef.current = deps;
    return;
  } else {
    // 拦截一层：比较依赖
    if (!depsAreSame(depsRef.current, deps)) {
      // update 阶段
      callback();
      depsRef.current = deps;
    }
  }
});
```

<code src="./demo/demo2.tsx" >示例</code>

## 将浅比较改造为深比较

使用 `lodash-es` 的 `isEqual` 替换掉 `depsAreSame` 中的 `Object.is` 浅比较逻辑。

```ts
function depsEqual(aDeps: DependencyList = [], bDeps: DependencyList = []) {
  return isEqual(aDeps, bDeps);
}

useEffect(() => {
  if (!depsEqual(depsRef.current, deps)) {
    // update 阶段
    callback();
    depsRef.current = deps;
  }
});
```

<code src="./demo/demo3.tsx" >示例</code>

这边封装了一个 `useDeepCompare` 基本解决了这个问题，但是这边有一个不好的点是，每次渲染都会重新定义函数，渲染代码片段，也算是重复渲染了。

这里可以尝试通过修改 `useEffect` 的方式，让 `useEffect` 包裹的函数在需要改变的时候触发执行调用。

<code src="./demo/demo4.tsx" >示例</code>
