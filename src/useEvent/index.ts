import { useCallback, useRef } from 'react';

export const useEvent = <T extends Function>(callback: T): T => {
  // 始终缓存最新值，以下也可简写为 useLatest(callback);
  const fnRef = useRef<any>();
  fnRef.current = callback;

  const memoFn = useCallback<T>(
    ((...args: any) => fnRef.current?.(...args)) as any,
    [],
  );

  return memoFn;
};
