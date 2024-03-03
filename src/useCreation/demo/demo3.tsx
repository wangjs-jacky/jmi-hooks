import { useState } from 'react';
import { useCreation } from '..';

class Foo {
  constructor() {
    this.data = Math.random();
  }

  data: number;
}

export default function () {
  const foo = useCreation<{ data: number }>(() => new Foo(), []);
  const [, setFlag] = useState({});
  return (
    <>
      <p>{foo.current.data}</p>
      <button
        type="button"
        onClick={() => {
          setFlag({});
        }}
      >
        Rerender
      </button>
    </>
  );
}
