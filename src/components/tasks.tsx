import { useState, useEffect } from "react";
import Details from "./Details";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";
import New from "./New";
import NewBoard from "./NewBoard";
import EditBoard from "./EditBoard";
import DeleteBoard from "./DeleteBoard";
import Kanban from "./Kanban";

export default function Tasks({
  dark,
  task,
  setTask,
  board,
  setBoard,
  showNew,
  setShowNew,
  showNewBoard,
  setShowNewBoard,
  showEditBoard,
  setShowEditBoard,
  showDelete,
  setShowDelete,
}: TaskProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [taskOptions, setTaskOptions] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [showEditTask, setShowEditTask] = useState(false);
  const [showDeleteTask, setShowDeleteTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    subtasks: ["", ""],
    status: "Todo",
  });

  const [editBoard, setEditBoard] = useState({
    name: "",
    columns: ["Todo", "Doing", "Done"],
  });

  const [newBoard, setNewBoard] = useState({
    name: "",
    columns: ["Todo", "Doing"],
  });
  const Board = task.find((b) => b.name === board);
  useEffect(() => {
    if (!showEditBoard || !Board) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEditBoard({
      name: Board.name,
      columns: Board.columns.map((c) => c.name),
    });
  }, [showEditBoard, Board]);

  const updateSubtask = (taskTitle: string, subIndex: number) => {
    setTask((prev) =>
      prev.map((b) => {
        let movedTask: Task | null = null;

        const updatedColumns = b.columns.map((col) => {
          const newTasks = col.tasks
            .map((t) => {
              if (t.title !== taskTitle) return t;

              const updatedSubtasks = t.subtasks.map((sub, i) =>
                i === subIndex
                  ? { ...sub, isCompleted: !sub.isCompleted }
                  : sub,
              );

              const newStatus = getUpdatedStatus(updatedSubtasks);

              movedTask = {
                ...t,
                subtasks: updatedSubtasks,
                status: newStatus,
              };

              return null;
            })
            .filter(Boolean) as Task[];

          return { ...col, tasks: newTasks };
        });

        if (movedTask) {
          const targetColumn = updatedColumns.find(
            (col) => col.name === movedTask!.status,
          );

          if (targetColumn) {
            targetColumn.tasks.push(movedTask);
          }
        }

        return { ...b, columns: updatedColumns };
      }),
    );
  };

  const getUpdatedStatus = (subtasks: Subtask[]) => {
    const completed = subtasks.filter((st) => st.isCompleted).length;

    if (completed === 0) return "Todo";
    if (completed === subtasks.length) return "Done";
    return "Doing";
  };

  const addNewTask = () => {
    if (!newTask.title.trim()) return;

    const formattedTask: Task = {
      id: crypto.randomUUID(),
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      subtasks: newTask.subtasks.map((st) => ({
        title: st,
        isCompleted: false,
      })),
    };

    setTask((prev) =>
      prev.map((b) => {
        if (b.name !== Board?.name) return b;

        const updatedColumns = b.columns.map((col) => {
          if (col.name === newTask.status) {
            return {
              ...col,
              tasks: [...col.tasks, formattedTask],
            };
          }
          return col;
        });

        return { ...b, columns: updatedColumns };
      }),
    );

    setNewTask({
      title: "",
      description: "",
      subtasks: ["", ""],
      status: "Todo",
    });

    setShowNew(false);
  };

  const addNewBoard = () => {
    const trimmedName = newBoard.name.trim();

    if (!trimmedName) return;

    const boardExists = task.some(
      (b) => b.name.toLowerCase() === trimmedName.toLowerCase(),
    );

    if (boardExists) {
      alert("A board with this name already exists.");
      return;
    }

    const formattedBoard = {
      name: trimmedName,
      columns: newBoard.columns.map((col) => ({
        name: col,
        tasks: [],
      })),
    };

    setTask((prev) => [...prev, formattedBoard]);

    setBoard(trimmedName);

    setNewBoard({
      name: "",
      columns: ["Todo", "Doing"],
    });

    setShowNewBoard(false);
  };

  const editBoardFunction = () => {
    if (!editBoard.name.trim()) return;

    setTask((prev) =>
      prev.map((b) => {
        if (b.name !== Board?.name) return b;

        const oldColumns = b.columns;

        const newColumns = editBoard.columns
          .filter((name) => name.trim() !== "")
          .map((colName) => {
            const existingColumn = oldColumns.find((c) => c.name === colName);

            return {
              name: colName,
              tasks: existingColumn ? existingColumn.tasks : [],
            };
          });

        return {
          ...b,
          name: editBoard.name,
          columns: newColumns,
        };
      }),
    );

    setBoard(editBoard.name);
    setShowEditBoard(false);
  };

  const addNewColumnToBoard = () => {
    setTask((prev) =>
      prev.map((b) => {
        if (b.name !== Board?.name) return b;

        return {
          ...b,
          columns: [
            ...b.columns,
            {
              name: `Column ${b.columns.length + 1}`,
              tasks: [],
            },
          ],
        };
      }),
    );
  };

  const deleteBoardFunction = () => {
    setTask((prev) => {
      const updatedBoards = prev.filter((b) => b.name !== board);

      if (updatedBoards.length > 0) {
        setBoard(updatedBoards[0].name);
      } else {
        setBoard("");
      }

      return updatedBoards;
    });

    setShowDelete(false);
  };

  function handleDeleteTask() {
    if (!activeTask) return;

    setTask((prev) =>
      prev.map((b) => {
        if (b.name !== Board?.name) return b;

        return {
          ...b,
          columns: b.columns.map((col) => ({
            ...col,
            tasks: col.tasks.filter((t) => t.title !== activeTask.title),
          })),
        };
      }),
    );

    setSelectedTask(null);
    setShowDetails(false);
    setShowDeleteTask(false);
  }

  function handleEditTask(updatedTask: Task) {
    setTask((prev) =>
      prev.map((board) => {
        if (board.name !== Board?.name) return board;

        return {
          ...board,
          columns: board.columns.map((column) => {
            const filteredTasks = column.tasks.filter(
              (task) => task.id !== updatedTask.id,
            );

            if (column.name === updatedTask.status) {
              return {
                ...column,
                tasks: [...filteredTasks, updatedTask],
              };
            }

            return {
              ...column,
              tasks: filteredTasks,
            };
          }),
        };
      }),
    );

    setSelectedTask(updatedTask);
    setActiveTask(updatedTask);
    setShowEditTask(false);
  }

  return (
    <>
      <div className="kanban">
        <Details
          updateSubtask={updateSubtask}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
          taskOptions={taskOptions}
          setTaskOptions={setTaskOptions}
          dark={dark}
          selectedTask={selectedTask}
          setActiveTask={setActiveTask}
          setShowEditTask={setShowEditTask}
          setShowDeleteTask={setShowDeleteTask}
          getUpdatedStatus={getUpdatedStatus}
          setSelectedTask={setSelectedTask}
          setTask={setTask}
          Board={Board}
        />

        <DeleteTask
          handleDeleteTask={handleDeleteTask}
          showDeleteTask={showDeleteTask}
          setShowDeleteTask={setShowDeleteTask}
          dark={dark}
          selectedTask={selectedTask}
        />

        <EditTask
          showEditTask={showEditTask}
          setShowEditTask={setShowEditTask}
          dark={dark}
          handleEditTask={handleEditTask}
          activeTask={activeTask}
          setActiveTask={setActiveTask}
          Board={Board}
        />

        <New
          showNew={showNew}
          setShowNew={setShowNew}
          dark={dark}
          newTask={newTask}
          setNewTask={setNewTask}
          Board={Board}
          addNewTask={addNewTask}
        />

        <NewBoard
          showNewBoard={showNewBoard}
          setShowNewBoard={setShowNewBoard}
          dark={dark}
          newBoard={newBoard}
          setNewBoard={setNewBoard}
          addNewBoard={addNewBoard}
        />

        <EditBoard
          showEditBoard={showEditBoard}
          setShowEditBoard={setShowEditBoard}
          dark={dark}
          editBoard={editBoard}
          setEditBoard={setEditBoard}
          editBoardFunction={editBoardFunction}
        />

        <DeleteBoard
          showDelete={showDelete}
          setShowDelete={setShowDelete}
          dark={dark}
          board={board}
          deleteBoardFunction={deleteBoardFunction}
        />

        <Kanban
          Board={Board}
          setSelectedTask={setSelectedTask}
          setShowDetails={setShowDetails}
          dark={dark}
          addNewColumnToBoard={addNewColumnToBoard}
        />
      </div>
    </>
  );
}
