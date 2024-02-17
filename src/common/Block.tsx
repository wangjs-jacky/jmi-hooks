import React from 'react';

interface BlockPropsType {
  showText?: boolean;
  style?: any;
}

const _Block = React.forwardRef<HTMLDivElement, BlockPropsType>(
  (props, ref) => {
    console.log('Block 渲染');
    const { style = {}, showText = true, ...restProps } = props;
    return (
      <div
        ref={ref}
        {...restProps}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: '#db7171',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFF',
          ...style,
        }}
      >
        {showText ? '点击这里' : null}
      </div>
    );
  },
);

export const Block = React.memo(_Block);
