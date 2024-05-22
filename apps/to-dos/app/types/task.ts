import { z } from "zod";

export type Task = {
  listId: string;
  description: string;
  title: string;
  subtitle: string;
  progressRate: [number, number];
  progressColor: string;
  deadline?: Date;
  commentsCount?: number;
  filesCount?: number;
};

export const TaskSchema = z.object({
  listId: z.string(),
  description: z.string(),
  title: z.string(),
  subtitle: z.string(),
  progressRate: z.tuple([z.number(), z.number()]),
  progressColor: z.string(),
  // NOTE: "2024-05-22T08:41:00.787Z"를 Date 타입으로 변환
  deadline: z.coerce.date(),
  commentsCount: z.number(),
  filesCount: z.number(),
});
