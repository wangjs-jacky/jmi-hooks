import { useEffect } from "react";
import { createEffectWithTarget } from "../utils/createEffectWithTarget";

export const useEffectWithTarget = createEffectWithTarget(useEffect);