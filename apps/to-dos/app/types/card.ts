import { z } from "zod";

import type { Task } from "./task";

export type CardType = Omit<Task, "listId" | "description">;

export const CardSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  progressRate: z.tuple([z.number(), z.number()]),
  progressColor: z.string(),
  // NOTE: "2024-05-22T08:41:00.787Z"를 Date 타입으로 변환
  deadline: z.coerce.date(),
  commentsCount: z.number(),
  filesCount: z.number(),
});

export const CardsSchema = z.array(CardSchema);
