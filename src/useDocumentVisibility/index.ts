import { useState } from "react";
import { useEventListener2 } from "../useEventListener";

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

export const useDocumentVisibility = () => {
  const [domVisible, setDomVisible] = useState(() => {
    /* 初始化状态 */
    return getDomVisible();
  });

  useEventListener2({
    eventName: "visibilitychange",
    fn: () => {
      setDomVisible(getDomVisible());
    },
    options: {
      target: () => document
    }
  })

  return domVisible
}
