import { useEffect } from 'react';

interface UseFaviconOptionsType {
  // favicon 图标地址
  href: string;
  // type 非必选属性，可根据 href 推断出来
  type?: string;
}

const ImgTypeMap = {
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.gif': 'image/gif',
  '.png': 'image/png',
};

type ImgTypes = keyof typeof ImgTypeMap;

export const useFavicon = ({ href, type }: UseFaviconOptionsType) => {
  useEffect(() => {
    setTimeout(() => {
      const link: HTMLLinkElement =
        document.querySelector("link[rel*='icon']") ||
        document.createElement('link');

      // 提取出 img 后缀
      const extname = href.match(/\.(svg|ico|gif|png)$/)?.[0] as ImgTypes;

      // 处理 type 属性
      link.type = type || ImgTypeMap[extname || '.ico'];

      // 处理 href 属性
      link.href = href;

      // 处理 rel 属性
      // MDN: https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/rel
      link.rel = 'shortcut icon';

      // 插入
      document.getElementsByTagName('head')[0].appendChild(link);
    }, 0);
  }, [href]);
};
