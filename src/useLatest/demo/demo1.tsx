import { useEffect, useState } from 'react';
import useLatest from '..';

const Demo = () => {
  const [count, setCount] = useState(0);
  const latestCountRef = useLatest(count);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(latestCountRef.current + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <p>count: {count}</p>
    </>
  );
};

export default Demo;
