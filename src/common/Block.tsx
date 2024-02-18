import React, { HTMLAttributes } from 'react';

interface BlockPropsType extends HTMLAttributes<HTMLDivElement> {
  showText?: boolean;
  style?: any;
  children: string;
}

const _Block = React.forwardRef<HTMLDivElement, BlockPropsType>(
  (props, ref) => {
    console.log('Block 渲染');
    const { style = {}, showText = true, children, ...restProps } = props;
    return (
      <div
        ref={ref}
        id=""
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
        {showText ? children : null}
      </div>
    );
  },
);

export const Block = React.memo(_Block);
