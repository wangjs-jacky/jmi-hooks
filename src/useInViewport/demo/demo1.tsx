import { useEffect, useRef, useState } from 'react';

const Demo = () => {
  const ref = useRef(null);
  const [inViewport, setInViewport] = useState(true);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      // changes: 目标元素集合(需要取一下才可以)
      console.log('intersectionRatio', entries[0].intersectionRatio);
      console.log('isIntersecting', entries[0].isIntersecting);
      console.log('changes', entries[0]);

      setInViewport(entries[0].isIntersecting);
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      <div
        style={{
          width: 300,
          height: 300,
          overflow: 'scroll',
          border: '1px solid',
        }}
      >
        scroll here
        <div style={{ height: 800 }} id="aaa">
          <div
            ref={ref}
            style={{
              border: '1px solid',
              height: 100,
              width: 100,
              textAlign: 'center',
              marginTop: 80,
            }}
          >
            observer dom
          </div>
        </div>
      </div>
      <div style={{ marginTop: 16, color: inViewport ? '#87d068' : '#f50' }}>
        inViewport: {inViewport ? 'visible' : 'hidden'}
      </div>
    </div>
  );
};
export default Demo;
