import { atomWithStorage } from "jotai/utils";

import type { Ability } from "@/types/ability.type";

export const abilitiesAtom = atomWithStorage<Ability[]>("abilities", []);
