import { useEffect, useRef, useState } from 'react';

interface UseExternalOptionsType {
  /** @name 插入路径，如果是本地则存放在public文件内 */
  path?: string;
  /** @name 参数，配置加载资源类型，以及标签属性 */
  options: {
    js?: Record<string, any>;
    css?: Record<string, any>;
  };
}

// 文件加载的状态
type StatusType = 'loading' | 'ready' | 'error' | 'unset';

const loadScript = (path: string, props = {} as any) => {
  const script = document.querySelector(
    `script[src="${path}"]`,
  ) as HTMLScriptElement;
  if (!script) {
    // DOM 插入操作
    const newScript = document.createElement('script');
    newScript.src = path;

    // 对于 <script> 支持传入 `async` 或则 `defer` 属性
    Object.keys(props).forEach((key) => {
      newScript.setAttribute(key, props[key]);
    });

    document.body.appendChild(newScript);

    // 属性插入 data-status 便于调试
    newScript.setAttribute('data-status', 'loading');
    return {
      ref: newScript,
    };
  }

  return {
    ref: script,
  };
};

export const useExternal = ({ path, options }: UseExternalOptionsType) => {
  // script 的 ref 对象
  const ref = useRef<HTMLScriptElement>();
  const [status, setStatus] = useState<StatusType>(() => {
    return path ? 'loading' : 'unset';
  });

  useEffect(() => {
    if (!path) {
      setStatus('unset');
      return;
    }

    if (options.js) {
      // 使用 loadScript 解耦 JS 的加载逻辑
      const { ref: scriptRef } = loadScript(path, options?.js);
      ref.current = scriptRef;
    }

    if (options.css) {
      /* 暂未实现 loadCss 逻辑 */
      // const { ref: cssRef } = loadCss(path, options?.js);
      // ref.current = scriptRef;
    }

    const handler = (event: Event) => {
      const targetStatus = event.type === 'load' ? 'ready' : 'error';
      // 修改 data-status 属性，成功： `loading` → `ready` | 失败： `loading` → `error`
      ref.current?.setAttribute('data-status', targetStatus);
      setStatus(targetStatus);
    };

    ref.current?.addEventListener('load', handler);
    ref.current?.addEventListener('error', handler);

    return () => {
      ref.current?.removeEventListener('load', handler);
      ref.current?.addEventListener('error', handler);
    };
  }, []);

  return {
    status,
  };
};
