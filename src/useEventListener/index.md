---
nav: Hooks
group: DOM
toc: content
---

# useEventListener

## 引言

不使用该钩子如何使用 `addEventListener` 使用的？


<code src="./demo/demo1.tsx" description="使用 useEffect 包裹监听器，注意退出时卸载（存在的问题：闭）">引言案例</code>

## 简易封装

将上述步骤给抽成一个自定义 `Hooks` 钩子，便于复用，此时需要注意对函数闭包的处理。

```ts
const useEventListener = (
  eventName: string,
  handler: (e: Event) => void,
  options: any = {},
) => {
  const { targetRef = {} } = options;

  // 可以使用 useLatest 替换下
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  // 必须这样包一层才不会有问题，类似于 useEvent 原理
  // 外部 useEventListener 引用地址被 useEffect 锁死，内部通过 ref.current 解决 handler 闭包问题。
  const useEventListener = (event: Event) => {
    return handlerRef.current(event);
  };

  // 由于被 useEffect 包裹，此时 handler 为一个闭包，最好需要 ref 缓存一下。
  useEffect(() => {
    const targetElement = 'current' in targetRef ? targetRef.current : window;
    targetElement?.addEventListener(eventName, useEventListener);
    return () => {
      targetElement?.removeEventListener(eventName, useEventListener);
    };
  }, []);
};
```

<code src="./demo/demo2.tsx" ></code>

## 支持 target 和 eventName 更新

上述钩子已经能满足大部分场景，但当需要更新 `target` 和 `eventName` 时，需要重新卸载和注册事件函数。

其中比较难处里的是 `Target` 对象，在 `React` 中 `target` 支持三种类型 `React.MutableRefObject`、`HTMLElement`、`() => HTMLElement`。

1. `React.MutableRefObject` 类型

```ts
export default () => {
  const blockRef = useRef(null)
  useEventListener('click', handleClick, { targetRef: blockRef });
  return  <Block ref={blockRef} />
}
```

2. `HTMLElement`
```ts
export default () => {
  useEventListener('click', handleClick, { targetRef: document.getElementById("block") });
  return  <Block id="block" />
}
```

3. `() => HTMLElement`
此类写法主要支持 `SSR` 场景，当一段代码既要跑在服务端，又要跑在客户端，以回调形式返回元素。
```ts
export default () => {
  useEventListener('click', handleClick, { targetRef: () => document.getElementById("block") });
  return  <Block id="block" />
}
```

使用 `getTargetElement` 对上述三种形式进行统一处理，返回 `HTMLElement` 类型。

封装钩子 `useEffectWithTarget` 及 `useLayoutEffectWithTarget` 强化 `useEffect` 钩子，依赖数组支持 `target` 类型。

由于该两个钩子大部分功能类似，封装在高阶函数 `createEffectWithTarget` 中。

<code src="./demo/demo3.tsx" ></code>


