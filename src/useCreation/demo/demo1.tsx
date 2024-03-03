import { useRef, useState } from 'react';

class Foo {
  name: string;
  constructor(name: string = 'abc') {
    this.name = name;
    console.log('构造函数执行');
  }
}

const Demo = () => {
  const testRef = useRef(new Foo());
  console.log('testRef', testRef);
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
