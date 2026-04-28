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
