import { useEffect, useRef, useLayoutEffect } from "react";
import type { EffectCallback, DependencyList } from "react";
import { HTMLTargetType, getTargetEelement } from "./getTargetElement";
import { depsAreSame } from "./depsAreSame";

// 高阶函数
export const createEffectWithTarget = (useEffectType: typeof useEffect | typeof useLayoutEffect) => {
  const useEffectWithTarget = (
    effect: EffectCallback,
    deps: DependencyList,
    // 支持监听多个 DOM 结构
    target: HTMLTargetType | HTMLTargetType[] = [],
  ) => {
    const hasInitRef = useRef(false);
    const lastElementRef = useRef<(Element | null)[]>([]);
    const unLoadRef = useRef<any>();

    // 增强版 useEffect / useLayoutEffect
    useEffectType(() => {
      // 兼容 depsAreSome 函数，需要传入数组
      const targets = Array.isArray(target) ? target : [target];

      // 兼容3种类型 refs 写法，最后获取 Element 数组
      const els = targets.map((item) => getTargetEelement(item));

      // 首次加载
      if (!hasInitRef.current) {
        hasInitRef.current = true;
        lastElementRef.current = els;

        // 缓存卸载函数
        unLoadRef.current = effect();
        return;
      }

      // 更新阶段（什么时候更新）
      if (
        !depsAreSame(els, lastElementRef)
      ) {
        // 执行卸载函数
        unLoadRef.current?.();

        // 更新依赖
        lastElementRef.current = els;

        // 更新卸载函数
        unLoadRef.current = effect();
      }

    }, [deps]);

    // 兼容 React-refresh 热更新
    useEffect(() => {
      return () => {
        unLoadRef.current?.();
        hasInitRef.current = false;
      }
    }, [])
  }
  return useEffectWithTarget;
}



