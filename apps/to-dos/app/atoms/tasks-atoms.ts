import { atomWithStorage } from "jotai/utils";
import type { z } from "zod";

import { CardsSchema, type CardType } from "@/app/types/card";

export function createTasksAtom<T>(
  key: string,
  initialValue: T,
  schema: z.ZodType<T>
) {
  const tasksAtom = atomWithStorage<T>(key, initialValue, {
    getItem(key, initialValue) {
      const storedValue = localStorage.getItem(key);
      try {
        return schema.parse(JSON.parse(storedValue ?? ""));
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
  return tasksAtom;
}

export const toDosAtom = createTasksAtom<CardType[]>("to-dos", [], CardsSchema);

export const doingsAtom = createTasksAtom<CardType[]>(
  "doings",
  [],
  CardsSchema
);

export const donesAtom = createTasksAtom<CardType[]>("dones", [], CardsSchema);
