export type Task = {
  id: string;
  title: string;
  createdAt: number;
  state: TaskState;
};

export type TaskState = "todo" | "done";
