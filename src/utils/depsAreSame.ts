import type { DependencyList } from 'react';
export const depsAreSame = (oldDeps: DependencyList, deps: DependencyList) => {
    // 数组大小不同，直接返回
    if (oldDeps.length !== deps.length) return false;

    // 比较引用地址
    if (oldDeps === deps) return true;

    for (let i = 0; i < oldDeps.length; i++) {
        if (!Object.is(oldDeps[i], deps[i])) return false;
    }
    return true;
}