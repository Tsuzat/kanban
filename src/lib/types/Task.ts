import { TaskPriority, type TaskType } from './types';

export default class Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  notes: string;

  constructor(
    id: string,
    title: string,
    description: string,
    dueDate: string,
    priority: TaskPriority = TaskPriority.LOW,
    notes: string = ''
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
  }

  static fromJSON(json: TaskType): Task {
    return new Task(
      json.id,
      json.title,
      json.description,
      json.dueDate,
      json.priority as TaskPriority,
      json.notes
    );
  }

  toJSON(): TaskType {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority,
      notes: this.notes
    };
  }
}
