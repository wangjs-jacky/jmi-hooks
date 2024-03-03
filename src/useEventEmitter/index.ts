import { useEffect, useRef } from 'react';

export class EventEmitter<T> {
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
