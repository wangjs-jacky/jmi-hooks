import { useEffect } from 'react';

interface UseTitleOptionsType {
  title: string;
}

const useTitle = ({ title }: UseTitleOptionsType) => {
  useEffect(() => {
    setTimeout(() => {
      document.title = title;
    }, 0);
  }, [title]);
};

const Demo = () => {
  useTitle({
    title: 'Hello, JMI-Hooks! from demo2',
  });
  return (
    <div>
      <h1>Hello, JMI-Hooks!</h1>
    </div>
  );
};
export default Demo;
