import type { Task } from "./task";

export type CardType = Omit<Task, "listId" | "description">;
