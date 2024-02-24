import { useState } from 'react';
import { useEventListener } from '../../useEventListener';
import { keyCodeMap } from '../keyCodeMap';

interface UseKeyDownOptions {
  useAliasKeyCode?: boolean;
  exactMatch?: boolean;
}

const CtrlKey = 0b0001;
const ShiftKey = 0b0010;
const AltKey = 0b0100;
const MetaKey = 0b1000;

const countModifierKey = (e: EventType) => {
  let ModifierFlags = 0b0000;
  if (e.ctrlKey) {
    ModifierFlags = ModifierFlags | CtrlKey;
  }
  if (e.shiftKey) {
    ModifierFlags = ModifierFlags | ShiftKey;
  }
  if (e.altKey) {
    ModifierFlags = ModifierFlags | AltKey;
  }
  if (e.metaKey) {
    ModifierFlags = ModifierFlags | MetaKey;
  }
  return ModifierFlags;
};

interface ModifierKeyType {
  ctrl: 'ctrlKey';
  shift: 'shiftKey';
  alt: 'altKey';
  meta: 'metaKey';
  [key: string]: string;
}

const modifierKey: ModifierKeyType = {
  ctrl: 'ctrlKey',
  shift: 'shiftKey',
  alt: 'altKey',
  meta: 'metaKey',
};

type EventType = {
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  metaKey: boolean;
};

const useKeyDown = (
  keys: string | string[],
  handler: (e: KeyboardEvent) => any,
  options: UseKeyDownOptions = {},
) => {
  const { useAliasKeyCode = true } = options;

  const transFormKeyCode = (keyCode: keyof typeof keyCodeMap) => {
    return useAliasKeyCode ? keyCodeMap[keyCode] : keyCode;
  };

  /**
   * 根据监听的 keyCode 字符串，提取对应的结构，方便后续判断
   *
   * 示例：
   * "shift.c" → {code: ["KeyC"], ModifierFlag: 0b0010}
   * "c" → {code: ["KeyC"], ModifierFlag: 0b0010}
   *
   * 默认采用别名模式，支持通过 useAliasKeyCode 传递 false 采用 event.code
   * "Shift.KeyC"  → {code: ["KeyC"], ModifierFlag: 0b0010}
   *
   * */
  const getCodeFromString = (keyCode: string) => {
    const codes = [] as string[];
    // 判断是否存在组合键:  修饰符 + 普通键
    if (keyCode.split('.').length > 1) {
      const e = keyCode.split('.').reduce<EventType>((pre, key) => {
        if (modifierKey[key]) {
          // 修饰键
          pre[modifierKey[key]] = true;
        } else {
          if (Object.keys(keyCodeMap).includes(key)) {
            codes.push(transFormKeyCode(key as keyof typeof keyCodeMap));
          }
        }
        return pre;
      }, {});

      console.log('key-123', keyCode, transFormKeyCode(keyCode));

      return {
        ModifierFlags: countModifierKey(e),
        codes: [transFormKeyCode(keyCode)],
      };
    }
    return {
      ModifierFlags: 0,
      codes: [transFormKeyCode(keyCode)],
    };
  };

  const keysArr = Array.isArray(keys) ? keys : [keys];

  useEventListener('keydown', (event) => {
    const eventModifierFlags = countModifierKey(event);
    keysArr.forEach((key) => {
      const { ModifierFlags, codes } = getCodeFromString(key);
      console.log('codes', codes);

      // 触发条件: 修饰符相同，且 codes 包含
      if (ModifierFlags === eventModifierFlags && codes.includes(event.code)) {
        handler(event);
      }
    });
  });
};

const Demo = () => {
  const [count, setCount] = useState(0);

  useKeyDown(['↑', '↓'], (e) => {
    if (e.code === 'ArrowUp') {
      setCount((c) => c + 1);
    }
    if (e.code === 'ArrowDown') {
      setCount((c) => c - 1);
    }
  });

  return (
    <div>
      <p>Try pressing the following: </p>
      <div>1. Press ArrowUp by key to increase</div>
      <div>2. Press ArrowDown by keyCode to decrease</div>
      <div>
        counter: <span style={{ color: '#f00' }}>{count}</span>
      </div>
    </div>
  );
};
export default Demo;
