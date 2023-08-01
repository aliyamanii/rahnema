enum TaskStatus {
    TODO = "todo",
    DOING = "doing",
    DONE = "done",
  }
  
  enum TaskLabel {
    GREEN = "Green",
    RED = "Red",
    BLUE = "Blue",
    YELLOW = "Yellow",
  }
  
  interface Task {
    id: number;
    status: TaskStatus;
    title: string;
    labels?: TaskLabel[];
  }