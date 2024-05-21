export type TaskType = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  notes: string;
};

export type TasksSectionType = {
  id: string;
  title: string;
  statusColor: string;
  tasks: TaskType[];
};

export type KanbanBoardType = {
  id: string;
  title: string;
  icon: string;
  sections: TasksSectionType[];
};

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}
