import { useState } from 'react';
import { useFavicon } from '..';

const DEFAULT_FAVICON_URL = 'https://ahooks.js.org/simple-logo.svg';
const GOOGLE_FAVICON_URL = 'https://www.google.com/favicon.ico';

const Demo = () => {
  const [url, setUrl] = useState<string>(DEFAULT_FAVICON_URL);

  useFavicon({ href: url });

  return (
    <>
      <p>
        Current Favicon:{' '}
        <a href={url}>
          <span>{url}</span>
        </a>
      </p>
      <button
        style={{ marginRight: 16 }}
        onClick={() => {
          // icon 图标
          setUrl(GOOGLE_FAVICON_URL);
        }}
      >
        Change To Google Favicon
      </button>
      <button
        onClick={() => {
          // svg 图标
          setUrl(DEFAULT_FAVICON_URL);
        }}
      >
        Back To AHooks Favicon
      </button>
    </>
  );
};

export default Demo;
