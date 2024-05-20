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
