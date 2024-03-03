---
title: useEventEmitter
nav: Hooks
toc: content
demo:
  cols: 2
group: Advanced
---

借助 `EventEmitter` 轻松实现多组件通信。

## API 设计

1. 单例模式，创建一个监听器

   ```ts
   const event$ = useEventEmitter();
   ```

2. 通过 `props` 或者 `context` 透传

   ```ts
   export default function () {
     /* 保证单例 */
     const focus = useEventEmitter();
     return (
       <>
         <MessageBox focus={focus} />
         <InputBox focus={focus} />
       </>
     );
   }
   ```

3. 注册与调用

   ```ts
   // 注册（支持接受参数）
   event$.useSubscription((val) => {
     console.log(val);
   });

   // 调用
   event$.emit('hello');
   ```

   > 注：在 `ahooks` 中是忽略 `eventName` 属性，后续我们可以扩展该属性

## 源码实现

首先：实现一个 `EventEmitter` 类，用于存储 `subscriptions` 数组， `ahooks` 考虑的比较简单，省略了 `eventName` 这个字段，因此整体 `hooks` 功能比较轻量。

```ts
class EventEmitter<T> {
  private listeners = new Set<any>();

  // 触发
  emit = (val: T) => {
    for (const fn of this.listeners) {
      fn(val);
    }
  };

  // 由于 on 函数可能会存在多次监听的问题，需要函数重复执行的问题。
  // 因此使用该函数需严格控制执行次数。
  on = (fn: (val: T) => void) => {
    this.listeners.add(fn);
  };

  // 接入 hooks 生命周期，创建时 push，卸载时 delete
  useOn = (fn: (val: T) => void) => {
    // useEffect 包裹会存在函数闭包问题
    const fnRef = useRef(fn);
    fnRef.current = fn;
    const _fn = (val: T) => {
      fnRef.current?.(val);
    };

    useEffect(() => {
      this.listeners.add(_fn);
      return () => {
        this.listeners.delete(_fn);
      };
    }, []);
  };
}

export const useEventEmitter = <T>() => {
  // 单例模式
  const ref = useRef<EventEmitter<T>>();
  if (!ref.current) {
    ref.current = new EventEmitter();
  }
  return ref.current;
};
```

<code src="./demo/demo1.tsx" description="点击 `emit` 触发 `input` 组件聚焦事件">示例</cdoe>

> 对于该钩子仍可优化的点：
>
> 1. 目前事件监听器是由我们自己实现的，部分场景可能没有考虑到，考虑可以接入 `mitt` 这类第三方库，鲁棒性可能更强些。
> 1. 只考虑了 `on` 函数，没有考虑 `once` 函数，后续可以考虑接入。
> 1. 此 hooks 过于简单，若希望支持 eventName ，可参考这篇文章实现 [《React 中优雅的使用 useEventEmitter 进行多组件通信》](https://juejin.cn/post/7069999109800722439)。
