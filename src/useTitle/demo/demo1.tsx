import { useEffect } from 'react';

const Demo = () => {
  useEffect(() => {
    setTimeout(() => {
      document.title = 'Hello，Jmi-Hooks';
    }, 0);
  }, []);

  return (
    <div>
      <h1>Hello, JMI-Hooks!</h1>
    </div>
  );
};
export default Demo;
