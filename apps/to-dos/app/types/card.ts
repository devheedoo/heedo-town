import { Task } from "./task";

export type Card = Omit<Task, "listId" | "description">;
