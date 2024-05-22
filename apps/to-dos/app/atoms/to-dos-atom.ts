import { atomWithStorage } from "jotai/utils";

import { CardsSchema, type CardType } from "@/app/types/card";

export const toDosAtom = atomWithStorage<CardType[]>("to-dos", [], {
  getItem(key, initialValue) {
    const storedValue = localStorage.getItem(key);
    try {
      return CardsSchema.parse(JSON.parse(storedValue ?? ""));
    } catch (error) {
      return initialValue;
    }
  },
  removeItem(key) {
    localStorage.removeItem(key);
  },
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
});
