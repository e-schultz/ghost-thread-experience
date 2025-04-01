
export interface Task {
  text: string;
  completed: boolean;
}

export interface LogEntry {
  id: string;
  title: string;
  date: string;
  content: string;
  ocrConfidence: number;
  tasks?: Task[];
  imagePath: string;
}
