import { useEffect, useRef, useState } from 'react';

class Foo {
  name: string;
  constructor(name: string = 'xxxx') {
    this.name = name;
    console.log('构造函数执行');
  }
}

const Demo = () => {
  const testRef = useRef<any>(null);

  useEffect(() => {
    testRef.current = new Foo('bbb');
  }, []);

  const [, update] = useState({});

  return (
    <div>
      <button
        onClick={() => {
          update({});
        }}
      >
        渲染页面
      </button>
    </div>
  );
};
export default Demo;
