// import { useInViewport, useMemoizedFn } from 'ahooks';
import { useCallback, useRef, useState } from 'react';
import { useInViewport } from '..';

const menus = ['menu-1', 'menu-2', 'menu-3'];
const menusColor = ['#1abc9c', '#16a085', '#3498db'];
const content = {
  'menu-1': 'Content for menus 1',
  'menu-2': 'Content for menus 2',
  'menu-3': 'Content for menus 3',
};

export default () => {
  const menuRef = useRef<HTMLDivElement[]>([]);

  const [activeMenu, setActiveMenu] = useState(menus[0]);

  const callback = useCallback((entry) => {
    if (entry.isIntersecting) {
      const active = entry.target.getAttribute('id') || '';
      setActiveMenu(active);
    }
  }, []);

  const handleMenuClick = (index: number) => {
    const contentEl = document.getElementById('content-scroll');
    // 计算距离顶部的高度
    const top = menuRef.current[index]?.offsetTop;

    // 根据每层的 ref 获取对应的
    contentEl?.scrollTo({
      top,
      behavior: 'smooth',
    });
  };

  useInViewport(menuRef.current, {
    fn: callback,
    root: () => document.getElementById('parent-scroll'),
    // 将显示位置整体提升一半的高度
    rootMargin: '-50% 0px -50% 0px',
  });

  return (
    <div
      id="parent-scroll"
      style={{
        width: 300,
        height: 300,
        border: '1px solid',
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      <div style={{ width: '30%', backgroundColor: '#f0f0f0' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {menus.map((menu, index) => (
            <li
              key={menu}
              onClick={() => handleMenuClick(index)}
              style={{
                padding: '10px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'background-color 0.2s ease-in-out',
                backgroundColor: activeMenu === menu ? '#e0e0e0' : '',
              }}
            >
              {menu}
            </li>
          ))}
        </ul>
      </div>
      <div
        id="content-scroll"
        style={{ flex: 1, overflowY: 'scroll', position: 'relative' }}
      >
        {menus.map((menu, index) => (
          <div
            // 缓存每一层楼的 ref 对象
            ref={(el: HTMLDivElement) => {
              menuRef.current[index] = el;
            }}
            key={menu}
            id={menu}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              fontSize: 16,
              backgroundColor: menusColor[index],
            }}
          >
            {content[menu]}
          </div>
        ))}
      </div>
    </div>
  );
};
