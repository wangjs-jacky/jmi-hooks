import { useTitle } from '..';

const Demo = () => {
  useTitle({
    title: 'Hello, JMI-Hooks! from index',
    options: { restoreOnUnmount: true },
  });
  return (
    <div>
      <h1>由于 DUMI 的机制，该钩子无效果</h1>
    </div>
  );
};
export default Demo;
