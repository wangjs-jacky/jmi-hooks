import { useEventListener } from '../useEventListener';
import { keyCodeMap } from './keyCodeMap';

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

const modifierKey = {
  ctrl: 'ctrlKey',
  shift: 'shiftKey',
  alt: 'altKey',
  meta: 'metaKey',
};

type EventType = {
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
};

export const useKeyDown = (
  keys: string | string[],
  handler: (e: KeyboardEvent, key: string) => any,
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
    const e = keyCode.split('.').reduce<EventType>((pre, key) => {
      const _key = key as keyof typeof modifierKey;
      if (modifierKey[_key]) {
        // 修饰键
        pre[modifierKey[_key] as keyof EventType] = true;
      } else {
        if (Object.keys(keyCodeMap).includes(key)) {
          codes.push(transFormKeyCode(key as keyof typeof keyCodeMap));
        }
      }
      return pre;
    }, {});

    return {
      ModifierFlags: countModifierKey(e),
      codes,
    };
  };

  const keysArr = Array.isArray(keys) ? keys : [keys];

  const removeModifierKey = (keyCode: string) => {
    if (
      [
        'MetaLeft',
        'MetaRight',
        'ControlLeft',
        'ControlRight',
        'ShiftLeft',
        'ShiftRight',
        'AltLeft',
        'AltRight',
      ].includes(keyCode)
    ) {
      return undefined;
    }
    return keyCode;
  };

  useEventListener('keydown', (event) => {
    const eventModifierFlags = countModifierKey(event);
    keysArr.forEach((key) => {
      const { ModifierFlags, codes } = getCodeFromString(key);
      const eventCode = removeModifierKey(event.code);

      // 触发条件: 修饰符相同，且 codes 包含
      if (
        ModifierFlags === eventModifierFlags &&
        ((eventCode && codes.includes(eventCode)) ||
          (!eventCode && codes.length === 0))
      ) {
        handler(event, key);
      }
    });
  });
};
