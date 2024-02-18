import { useEffect, useState } from 'react';

const DEFAULT_FAVICON_URL = 'https://ahooks.js.org/simple-logo.svg';
const GOOGLE_FAVICON_URL = 'https://www.google.com/favicon.ico';

const Demo = () => {
  const [url, setUrl] = useState<string>(DEFAULT_FAVICON_URL);
  const [imgType, setImgType] = useState<'image/x-icon' | 'image/svg+xml'>(
    'image/x-icon',
  );

  useEffect(() => {
    setTimeout(() => {
      const link: HTMLLinkElement =
        document.querySelector("link[rel*='icon']") ||
        document.createElement('link');

      // 处理 type 属性
      link.type = imgType;

      // 处理 href 属性
      link.href = url;

      // 处理 rel 属性
      // MDN: https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/rel
      link.rel = 'shortcut icon';

      // 插入
      document.getElementsByTagName('head')[0].appendChild(link);
    }, 0);
  }, [url]);

  return (
    <>
      <p>
        Current Favicon: <span>{url}</span>
      </p>
      <button
        style={{ marginRight: 16 }}
        onClick={() => {
          // icon 图标
          setUrl(GOOGLE_FAVICON_URL);
          setImgType('image/x-icon');
        }}
      >
        Change To Google Favicon
      </button>
      <button
        onClick={() => {
          // svg 图标
          setUrl(DEFAULT_FAVICON_URL);
          setImgType('image/svg+xml');
        }}
      >
        Back To AHooks Favicon
      </button>
    </>
  );
};

export default Demo;
