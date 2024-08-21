import { atom } from "jotai";

export const mapAtomWithLocalStorage = <K, T>(
  key: string, // localstorage key
  initialValue: Map<K, T>
) => {
  const getInitialValue = (): Map<K, T> => {
    const item =
      typeof window !== "undefined" ? localStorage.getItem(key) : null;
    if (item !== null) {
      return new Map(JSON.parse(item));
    }
    return initialValue;
  };
  const baseAtom = atom(getInitialValue());
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue: Map<K, T> =
        typeof update === "function" ? update(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      if (typeof window !== "undefined") {
        localStorage.setItem(
          key,
          JSON.stringify(Array.from(nextValue.entries()))
        );
      }
    }
  );
  return derivedAtom;
};
