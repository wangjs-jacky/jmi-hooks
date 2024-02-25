import { useEffect, useState } from 'react';

const Demo = () => {
  const [inViewport, setInViewport] = useState(true);
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    // 调用回调时，系统会接收一个 IntersectionObserverEntry 对象列表，每个观察到的目标都会有一个对象
    const observer = new IntersectionObserver(
      (entries) => {
        // changes: 目标元素集合(需要取一下才可以)
        console.log('intersectionRatio', entries[0].intersectionRatio);
        console.log('isIntersecting', entries[0].isIntersecting);
        console.log('changes', entries[0]);

        setInViewport(entries[0].isIntersecting);
        setRatio(entries[0].intersectionRatio);
      },
      {
        // 阈值列表：可以提供一个或多个数值，代表目标元素可见度的百分比。
        threshold: [0, 0.25, 0.5, 0.75, 1],
        root: document.getElementById('parent'),
      },
    );

    observer.observe(document.getElementById('children')!);

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
        id="parent"
      >
        scroll here
        <div style={{ height: 800 }}>
          <div
            id="children"
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
        <p>inViewport: {inViewport ? 'visible' : 'hidden'}</p>
        <p>ratio: {ratio}</p>
      </div>
    </div>
  );
};
export default Demo;
