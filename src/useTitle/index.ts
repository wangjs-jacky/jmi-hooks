import { useEffect, useRef } from 'react';
import { isBrowser } from '../utils/isBrowser';

interface UseTitleOptionsType {
  /** @name 标题 */
  title: string;
  /** @name 设置项，卸载时还原原有标题 */
  options?: {
    restoreOnUnmount?: boolean;
  };
}

export const useTitle = ({ title, options = {} }: UseTitleOptionsType) => {
  const { restoreOnUnmount } = options;

  // 缓存组件加载前的 页面标题
  const titleRef = useRef(isBrowser ? document.title : '');
  useEffect(() => {
    if (isBrowser) {
      document.title = title;
    }
  }, [title]);

  return () => {
    if (restoreOnUnmount) {
      // 卸载时，还原
      document.title = titleRef.current;
    }
  };
};
