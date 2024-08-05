import { atom } from "jotai";

export const mapAtomWithLocalStorage = <T>(
  key: string,
  initialValue: Map<string, T>
) => {
  const getInitialValue = () => {
    const item = localStorage.getItem(key);
    if (item !== null) {
      return new Map(JSON.parse(item));
    }
    return initialValue;
  };
  const baseAtom = atom(getInitialValue());
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue: Map<string, T> =
        typeof update === "function" ? update(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      localStorage.setItem(
        key,
        JSON.stringify(Array.from(nextValue.entries()))
      );
    }
  );
  return derivedAtom;
};
