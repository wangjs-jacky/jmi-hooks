import { useEffect, useRef, useState } from 'react';

interface UseExternalOptionsType {
  /** @name 插入路径，如果是本地则存放在public文件内 */
  path?: string;
}

// 文件加载的状态
type StatusType = "loading" | "ready" | "error" | "unset";

const useExternal = ({ path }: UseExternalOptionsType) => {
  // script 的 ref 对象
  const scriptRef = useRef<HTMLScriptElement>();
  const [status, setStatus] = useState<StatusType>(() => {
    return path ? "loading" : "unset";
  });

  useEffect(() => {
    if (!path) {
      setStatus('unset');
      return;
    }
    const script = document.querySelector(`script[src="${path}"]`);
    // 不存在，即插入
    if (!script) {
      const newScript = document.createElement('script');
      newScript.src = path;
      document.body.appendChild(newScript);

      // 属性插入 data-status 便于调试
      newScript.setAttribute('data-status', 'loading');
      scriptRef.current = newScript;
    } else {
      scriptRef.current = script as HTMLScriptElement;
    }

    const handler = (event: Event) => {
      const targetStatus = event.type === 'load' ? 'ready' : 'error';
      // 属性插入 data-status 便于调试
      scriptRef.current?.setAttribute("data-status", targetStatus)
      setStatus(targetStatus);
    };

    scriptRef.current?.addEventListener("load", handler)
    scriptRef.current?.addEventListener("error", handler)

    return () => {
      scriptRef.current?.removeEventListener("load", handler)
      scriptRef.current?.addEventListener("error", handler)
    }
  }, [])

  return {
    status
  }
}


export default () => {
  const { status } = useExternal({
    path: "/useExternal/test-external-script.js"
  })

  return (
    <>
      <p>
        Status: <b>{status}</b>
      </p>
      <p>
        {"打印 window.TEST_SCRIPT.start() 的执行结果:"}
        <div>
          {window?.TEST_SCRIPT?.start()}
        </div>
      </p>
    </>
  );
};
