import { useEffect, useRef, useState } from 'react';

export default () => {
  const [, update] = useState({});
  const scriptRef = useRef<HTMLScriptElement>();

  useEffect(() => {
    const path = "/useExternal/test-external-script.js";
    const script = document.querySelector(`script[src="${path}"]`);
    // 不存在，即插入
    if (!script) {
      const newScript = document.createElement('script');
      newScript.src = path;
      document.body.appendChild(newScript);
      scriptRef.current = newScript;
      return;
    }
    scriptRef.current = script as HTMLScriptElement;

    const handler = () => {
      update({})
    };

    scriptRef.current?.addEventListener("load", handler)

    return () => {
      scriptRef.current?.removeEventListener("load", handler)
    }
  }, [])

  return (
    <>
      <p>
        {"打印 window.TEST_SCRIPT.start() 的执行结果:"}
        <div>
          {window?.TEST_SCRIPT?.start()}
        </div>
      </p>
    </>
  );
};
