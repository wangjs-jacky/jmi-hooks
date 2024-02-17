import { useEffect, useState } from "react";

export const isBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

const getDomVisible = () => {
  // 兼容 SSR
  if (!isBrowser) {
    return 'visible';
  }

  return document.visibilityState;
}

const Demo = () => {
  const [domVisible, setDomVisible] = useState(() => {
    /* 初始化状态 */
    return getDomVisible();
  });

  useEffect(() => {
    const fn = () => {
      setDomVisible(getDomVisible())
    };
    document.addEventListener("visibilitychange", fn)
    return () => {
      document.removeEventListener("visibilitychange", fn)
    };
  }, [])

  return (
    <div>Current document visibility state: {domVisible}</div>
  );
}
export default Demo;
