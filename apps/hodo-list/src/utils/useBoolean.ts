import { useState } from "react";

export const useBoolean = (
  value: boolean
): [boolean, () => void, () => void] => {
  const [state, setState] = useState(value);
  return [state, () => setState(true), () => setState(false)];
};
