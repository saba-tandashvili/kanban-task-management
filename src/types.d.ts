type MainProps = {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
  task: Board[];
  setTask: React.Dispatch<React.SetStateAction<Board[]>>;
};

type SideProps = {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
  sidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  board: string;
  setBoard: React.Dispatch<React.SetStateAction<string>>;
  setShowNewBoard: React.Dispatch<React.SetStateAction<boolean>>;
  task: Board[];
};

type TaskProps = {
  dark: boolean;
  task: Board[];
  board: string;
  setBoard: React.Dispatch<React.SetStateAction<string>>;
  setTask: React.Dispatch<React.SetStateAction<Board[]>>;
  showNew: boolean;
  setShowNew: React.Dispatch<React.SetStateAction<boolean>>;
  showNewBoard: boolean;
  setShowNewBoard: React.Dispatch<React.SetStateAction<boolean>>;
  showEditBoard: boolean;
  setShowEditBoard: React.Dispatch<React.SetStateAction<boolean>>;
  showDelete: boolean;
  setShowDelete: React.Dispatch<React.SetStateAction<boolean>>;
};

type HeaderProps = {
  dark: boolean;
  board: string;
  setShowNew: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditBoard: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDelete: React.Dispatch<React.SetStateAction<boolean>>;
  width: number;
  task: Board[];
  setBoard: React.Dispatch<React.SetStateAction<string>>;
  setShowNewBoard: React.Dispatch<React.SetStateAction<boolean>>;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
};

type DetailsProps = {
  dark: boolean;

  updateSubtask: (taskTitle: string, subIndex: number) => void;

  showDetails: boolean;
  taskOptions: boolean;

  setTaskOptions: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;

  selectedTask: Task | null;

  setActiveTask: React.Dispatch<React.SetStateAction<Task | null>>;

  setShowEditTask: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDeleteTask: React.Dispatch<React.SetStateAction<boolean>>;

  getUpdatedStatus: (subtasks: Subtask[]) => string;

  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;

  setTask: React.Dispatch<React.SetStateAction<Board[]>>;

  Board: Board | undefined;
};

type DeleteTaskProps = {
  handleDeleteTask: () => void;
  showDeleteTask: boolean;
  setShowDeleteTask: React.Dispatch<React.SetStateAction<boolean>>;
  dark: boolean;
  selectedTask: Task | null;
};

type EditTaskProps = {
  showEditTask: boolean;
  setShowEditTask: React.Dispatch<React.SetStateAction<boolean>>;
  dark: boolean;
  activeTask: Task | null;
  setActiveTask: React.Dispatch<React.SetStateAction<Task | null>>;
  Board: Board | undefined;
  handleEditTask: (updatedTask: Task) => void;
};

type SelectedTask = {
  title: string;
  description: string;
  subtasks: string | number;
  filter: string;
};

type Subtask = {
  title: string;
  isCompleted: boolean;
};

type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
};



type Column = {
  name: string;
  tasks: Task[];
};

type Board = {
  name: string;
  columns: Column[];
};



interface NewTaskState {
  title: string;
  description: string;
  subtasks: string[];
  status: string;
}

interface NewProps {
  showNew: boolean;

  setShowNew: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  dark: boolean;

  newTask: NewTaskState;

  setNewTask: React.Dispatch<
    React.SetStateAction<NewTaskState>
  >;

  Board: Board | undefined;

  addNewTask: () => void;
}

interface NewBoardState {
  name: string;
  columns: string[];
}

interface NewBoardProps {
  showNewBoard: boolean;

  setShowNewBoard: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  dark: boolean;

  newBoard: NewBoardState;

  setNewBoard: React.Dispatch<
    React.SetStateAction<NewBoardState>
  >;

  addNewBoard: () => void;
}

interface EditBoardState {
  name: string;
  columns: string[];
}

interface EditBoardProps {
  showEditBoard: boolean;

  setShowEditBoard: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  dark: boolean;

  editBoard: EditBoardState;

  setEditBoard: React.Dispatch<
    React.SetStateAction<EditBoardState>
  >;

  editBoardFunction: () => void;
}

interface DeleteBoardProps {
  showDelete: boolean;

  setShowDelete: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  dark: boolean;

  board: string;

  deleteBoardFunction: () => void;
}

interface KanbanProps {
  Board: Board | undefined;

  setSelectedTask: React.Dispatch<
    React.SetStateAction<Task | null>
  >;

  setShowDetails: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  dark: boolean;

  addNewColumnToBoard: () => void;
}