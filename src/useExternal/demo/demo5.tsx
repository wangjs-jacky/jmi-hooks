import { useExternal } from '..';

export default () => {
  const { status } = useExternal({
    path: '/useExternal/test-external-script.js',
    options: { js: { async: true } },
  });

  return (
    <>
      <p>
        Status: <b>{status}</b>
      </p>
      <p>
        {'打印 window.TEST_SCRIPT.start() 的执行结果:'}
        <div>{window?.TEST_SCRIPT?.start()}</div>
      </p>
    </>
  );
};
