import { useMemo } from 'react';
import { useInViewport, type UseInViewportOptionsType } from '..';

const Demo = () => {
  const fn = (entry: IntersectionObserverEntry) => {
    // changes: 目标元素集合(需要取一下才可以)
    console.log('intersectionRatio', entry.intersectionRatio);
    console.log('isIntersecting', entry.isIntersecting);
    console.log('changes', entry);
  };

  const options: UseInViewportOptionsType = useMemo(
    () => ({
      threshold: [0, 0.25, 0.5, 0.75, 1],
      root: document.getElementById('parent'),
      fn: fn,
    }),
    [],
  );

  const [inViewport, ratio] = useInViewport(
    () => document.getElementById('children2'),
    options,
  );

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
            id="children2"
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
