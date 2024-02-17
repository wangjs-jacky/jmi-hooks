import { useLayoutEffect } from "react";
import { createEffectWithTarget } from "../utils/createEffectWithTarget";

export const useLayoutEffectWithTarget = createEffectWithTarget(useLayoutEffect);