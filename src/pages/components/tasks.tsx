import { useState, useEffect } from "react";
import Ellipsis from "../../assets/icon-vertical-ellipsis.svg";
import Delete from "../../assets/icon-cross.svg";

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

    const formattedTask = {
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
    if (!activeTask) return;

    setTask((prev) =>
      prev.map((b) => {
        if (b.name !== Board?.name) return b;

        const cleanedColumns = b.columns.map((col) => ({
          ...col,
          tasks: col.tasks.filter((t) => t.title !== activeTask.title),
        }));

        const targetColumn = cleanedColumns.find(
          (col) => col.name === updatedTask.status,
        );

        if (targetColumn) {
          targetColumn.tasks.push(updatedTask);
        }

        return {
          ...b,
          columns: cleanedColumns,
        };
      }),
    );

    // update UI immediately
    setSelectedTask(updatedTask);
    setActiveTask(updatedTask);
    setShowEditTask(false);
  }

  return (
    <>
      <div className="kanban">
        <div className="details-div">
          <div
            className={`${showDetails ? "black" : "close-black black"}`}
            onClick={() => {
              setShowDetails(false);
            }}
          ></div>
          <div
            className={`${showDetails ? "details" : "close-details details"} ${dark ? "dark" : ""}`}
          >
            {selectedTask && (
              <>
                <div className="title">
                  <h1 style={{ color: dark ? "white" : "" }}>
                    {selectedTask.title}
                  </h1>
                  <img
                    src={Ellipsis}
                    alt=""
                    onClick={() => {
                      setTaskOptions((prev) => !prev);
                      setActiveTask(selectedTask);
                    }}
                  />
                  <div
                    className="options"
                    style={{
                      display: taskOptions ? "" : "none",
                      backgroundColor: dark ? "#20212c" : "white",
                      boxShadow: dark ? "none" : "",
                    }}
                  >
                    <p
                      onClick={() => {
                        setShowEditTask(true);
                        setTaskOptions(false);
                        setShowDetails(false);
                      }}
                    >
                      Edit Task
                    </p>

                    <span
                      onClick={() => {
                        setShowDeleteTask(true);
                        setTaskOptions(false);
                        setShowDetails(false);
                      }}
                    >
                      Delete Task
                    </span>
                  </div>
                </div>
                <p className="desc">{selectedTask.description}</p>

                <div className="subtasks">
                  <p>
                    Subtasks (
                    {
                      selectedTask.subtasks.filter((st) => st.isCompleted)
                        .length
                    }{" "}
                    of {selectedTask.subtasks.length})
                  </p>

                  {selectedTask.subtasks.map((st, i) => (
                    <div
                      key={i}
                      style={{ backgroundColor: dark ? "#20212c" : "" }}
                    >
                      <input
                        type="checkbox"
                        checked={st.isCompleted}
                        onChange={() => {
                          updateSubtask(selectedTask.title, i);

                          const updated = {
                            ...selectedTask,
                            subtasks: selectedTask.subtasks.map((sub, index) =>
                              index === i
                                ? { ...sub, isCompleted: !sub.isCompleted }
                                : sub,
                            ),
                          };

                          updated.status = getUpdatedStatus(updated.subtasks);

                          setSelectedTask(updated);
                        }}
                        className="custom-checkbox"
                      />
                      <span
                        className={st.isCompleted ? "completed" : ""}
                        style={{ color: dark ? "white" : "" }}
                      >
                        {st.title}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="status">
                  <h3>Current Status</h3>

                  <select
                    value={selectedTask.status}
                    onChange={(e) => {
                      const newStatus = e.target.value;

                      const updatedTask = {
                        ...selectedTask,
                        status: newStatus,
                      };

                      setSelectedTask(updatedTask);

                      setTask((prev) =>
                        prev.map((b) => {
                          const updatedColumns = b.columns.map((col) => {
                            const filteredTasks = col.tasks.filter(
                              (t) => t.title !== selectedTask.title,
                            );

                            if (col.name === newStatus) {
                              return {
                                ...col,
                                tasks: [...filteredTasks, updatedTask],
                              };
                            }

                            return {
                              ...col,
                              tasks: filteredTasks,
                            };
                          });

                          return { ...b, columns: updatedColumns };
                        }),
                      );
                    }}
                    style={{
                      backgroundColor: dark ? "#20212c" : "white",
                      color: dark ? "white" : "black",
                      padding: "8px",
                      borderRadius: "6px",
                    }}
                  >
                    {Board?.columns.map((col) => (
                      <option key={col.name} value={col.name}>
                        <p>{col.name}</p>
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="delete-task-div">
          <div
            className={`${showDeleteTask ? "black" : "close-black black"}`}
            onClick={() => {
              setShowDeleteTask(false);
            }}
          ></div>
          <div
            className={`${showDeleteTask ? "delete-task" : "close-delete-task delete-task"} ${dark ? "dark" : ""}`}
          >
            <h1>Delete this task?</h1>
            <p>
              Are you sure you want to delete the ‘{selectedTask?.title}’ task
              and its subtasks? This action cannot be reversed.
            </p>
            <div className="buttons">
              <button onClick={handleDeleteTask} className="delete">
                Delete
              </button>
              <button
                onClick={() => setShowDeleteTask(false)}
                className="cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {activeTask && (
          <div className="edit-task-div">
            <div
              className={`${showEditTask ? "black" : "close-black black"}`}
              onClick={() => {
                setShowEditTask(false);
              }}
            ></div>
            <div
              className={`${showEditTask ? "edit-task" : "close-edit-task edit-task"} ${dark ? "dark" : ""}`}
            >
              <h2 style={{ color: dark ? "white" : "" }}>Edit Task</h2>

              <div className="info">
                <h3 style={{ color: dark ? "white" : "" }}>Title</h3>
                <input
                  type="text"
                  value={activeTask.title}
                  onChange={(e) =>
                    setActiveTask({ ...activeTask, title: e.target.value })
                  }
                  placeholder="Title"
                  style={{ color: dark ? "white" : "" }}
                />
              </div>

              <div className="info">
                <h3 style={{ color: dark ? "white" : "" }}>Description</h3>
                <textarea
                  value={activeTask.description}
                  onChange={(e) =>
                    setActiveTask({
                      ...activeTask,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description"
                  style={{ color: dark ? "white" : "" }}
                />
              </div>

              <div className="create-subtasks">
                <p>Subtasks</p>

                {activeTask.subtasks.map((sub, i) => (
                  <div key={i}>
                    <input
                      type="text"
                      value={sub.title}
                      onChange={(e) => {
                        const updated = [...activeTask.subtasks];
                        updated[i].title = e.target.value;
                        setActiveTask({ ...activeTask, subtasks: updated });
                      }}
                      style={{ color: dark ? "white" : "" }}
                    />

                    <img
                      src={Delete}
                      alt=""
                      onClick={() => {
                        const updated = activeTask.subtasks.filter(
                          (_, index) => index !== i,
                        );
                        setActiveTask({ ...activeTask, subtasks: updated });
                      }}
                    />
                  </div>
                ))}

                <button
                  onClick={() =>
                    setActiveTask({
                      ...activeTask,
                      subtasks: [
                        ...activeTask.subtasks,
                        { title: "", isCompleted: false },
                      ],
                    })
                  }
                  style={{ backgroundColor: dark ? "white" : "" }}
                >
                  + Add Subtask
                </button>
              </div>

              <select
                value={activeTask.status}
                onChange={(e) =>
                  setActiveTask({ ...activeTask, status: e.target.value })
                }
                className="status"
                
              >
                {Board?.columns.map((col) => (
                  <option key={col.name} value={col.name} >
                    <h3 >{col.name}</h3>
                  </option>
                ))}
              </select>

              <button onClick={() => handleEditTask(activeTask)}>
                Save Changes
              </button>
            </div>
          </div>
        )}
        <div className="new-div">
          <div
            className={`${showNew ? "black" : "close-black black"}`}
            onClick={() => {
              setShowNew(false);
            }}
          ></div>
          <div
            className={`${showNew ? "new" : "close-new new"} ${dark ? "dark" : ""}`}
          >
            <h1 style={{ color: dark ? "white" : "" }}>Add New Task</h1>
            <div className="info">
              <h3>Title</h3>
              <input
                type="text"
                placeholder="e.g. Take coffee break"
                style={{ color: dark ? "white" : "" }}
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
            </div>

            <div className="info">
              <h3>Description</h3>
              <textarea
                placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
                style={{ color: dark ? "white" : "" }}
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              ></textarea>
            </div>

            <div className="create-subtasks">
              <h3>Subtasks</h3>
              {newTask.subtasks.map((sub, i) => (
                <div key={i} className="subtask-subtask">
                  <input
                    type="text"
                    value={sub}
                    onChange={(e) => {
                      const updated = [...newTask.subtasks];
                      updated[i] = e.target.value;
                      setNewTask({ ...newTask, subtasks: updated });
                    }}
                    style={{ color: dark ? "white" : "" }}
                  />
                  <img
                    src={Delete}
                    alt=""
                    onClick={() => {
                      const updated = newTask.subtasks.filter(
                        (_, index) => index !== i,
                      );
                      setNewTask({ ...newTask, subtasks: updated });
                    }}
                  />
                </div>
              ))}

              <button
                style={{ backgroundColor: dark ? "white" : "" }}
                onClick={() =>
                  setNewTask({
                    ...newTask,
                    subtasks: [...newTask.subtasks, ""],
                  })
                }
              >
                + Add New Subtask
              </button>
            </div>

            <div className="info">
              <h3>Status</h3>
              <select
                value={newTask.status}
                onChange={(e) =>
                  setNewTask({ ...newTask, status: e.target.value })
                }
                style={{
                  backgroundColor: dark ? "#20212c" : "white",
                  color: dark ? "white" : "black",
                  padding: "8px",
                  borderRadius: "6px",
                }}
              >
                {Board?.columns.map((col) => (
                  <option key={col.name} value={col.name}>
                    {col.name}
                  </option>
                ))}
              </select>
            </div>

            <button className="create" onClick={addNewTask}>
              Create Task
            </button>
          </div>
        </div>

        <div className="new-board-div">
          <div
            className={`${showNewBoard ? "black" : "close-black black"}`}
            onClick={() => {
              setShowNewBoard(false);
            }}
          ></div>
          <div
            className={`${showNewBoard ? "new-board" : "close-new-board new-board"} ${dark ? "dark" : ""}`}
          >
            <h1 style={{ color: dark ? "white" : "" }}>Add New Board</h1>
            <div className="info">
              <h3>Board Name</h3>
              <input
                type="text"
                placeholder="e.g. Web Design"
                value={newBoard.name}
                onChange={(e) =>
                  setNewBoard({ ...newBoard, name: e.target.value })
                }
                style={{ color: dark ? "white" : "" }}
              />
            </div>

            <div className="board-columns">
              <h3>Board Columns</h3>
              {newBoard.columns.map((col, i) => (
                <div key={i}>
                  <input
                    type="text"
                    value={col}
                    onChange={(e) => {
                      const updated = [...newBoard.columns];
                      updated[i] = e.target.value;
                      setNewBoard({ ...newBoard, columns: updated });
                    }}
                    style={{ color: dark ? "white" : "" }}
                  />
                  <img
                    src={Delete}
                    alt=""
                    onClick={() => {
                      const updated = newBoard.columns.filter(
                        (_, index) => index !== i,
                      );
                      setNewBoard({ ...newBoard, columns: updated });
                    }}
                  />
                </div>
              ))}
              <button
                style={{ backgroundColor: dark ? "white" : "" }}
                onClick={() =>
                  setNewBoard({
                    ...newBoard,
                    columns: [...newBoard.columns, ""],
                  })
                }
              >
                + Add New Column
              </button>
            </div>
            <button className="create" onClick={addNewBoard}>
              Create New Board
            </button>
          </div>
        </div>

        <div className="edit-board-div">
          <div
            className={`${showEditBoard ? "black" : "close-black black"}`}
            onClick={() => setShowEditBoard(false)}
          ></div>

          <div
            className={`${showEditBoard ? "edit-board" : "close-edit-board edit-board"} ${
              dark ? "dark" : ""
            }`}
          >
            <h1 style={{ color: dark ? "white" : "" }}>Edit Board</h1>

            <div className="info">
              <h3>Board Name</h3>
              <input
                type="text"
                value={editBoard.name}
                onChange={(e) =>
                  setEditBoard({ ...editBoard, name: e.target.value })
                }
                style={{ color: dark ? "white" : "" }}
              />
            </div>

            <div className="board-columns">
              <h3>Board Columns</h3>

              {editBoard.columns.map((col, i) => (
                <div key={i}>
                  <input
                    type="text"
                    value={col}
                    onChange={(e) => {
                      const updated = [...editBoard.columns];
                      updated[i] = e.target.value;
                      setEditBoard({ ...editBoard, columns: updated });
                    }}
                    style={{ color: dark ? "white" : "" }}
                  />

                  <img
                    src={Delete}
                    alt=""
                    onClick={() => {
                      const updated = editBoard.columns.filter(
                        (_, idx) => idx !== i,
                      );
                      setEditBoard({ ...editBoard, columns: updated });
                    }}
                  />
                </div>
              ))}

              <button
                style={{ backgroundColor: dark ? "white" : "" }}
                onClick={() =>
                  setEditBoard({
                    ...editBoard,
                    columns: [...editBoard.columns, ""],
                  })
                }
              >
                + Add New Column
              </button>
            </div>

            <button className="create" onClick={editBoardFunction}>
              Save Changes
            </button>
          </div>
        </div>

        <div className="delete-board-div">
          <div
            className={`${showDelete ? "black" : "close-black black"}`}
            onClick={() => {
              setShowDelete(false);
            }}
          ></div>
          <div
            className={`${showDelete ? "delete-board" : "close-delete-board delete-board"} ${dark ? "dark" : ""}`}
          >
            <h1>Delete This Board?</h1>
            <p>
              Are you sure you want to delete the {board} board? This action
              will remove all columns and tasks and cannot be reversed.
            </p>
            <div className="buttons">
              <button className="delete" onClick={deleteBoardFunction}>
                Delete
              </button>
              <button className="cancel" onClick={() => setShowDelete(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div className="kanban-columns-divs">
          {Board?.columns.map((column, index) => (
            <div key={column.name} className="tasks-div">
              <div className="title">
                <div className={`color${index} color`}></div>
                <h3>
                  {column.name} {`(${column.tasks.length})`}
                </h3>
              </div>

              {column.tasks.map((task) => {
                const completed = task.subtasks.filter(
                  (st) => st.isCompleted,
                ).length;
                const total = task.subtasks.length;

                return (
                  <div
                    key={task.title}
                    className="task"
                    onClick={() => {
                      setSelectedTask(task);
                      setShowDetails(true);
                    }}
                    style={{ backgroundColor: dark ? "#2B2C37" : "white" }}
                  >
                    <p className={`${dark ? "whiteP" : ""}`}>{task.title}</p>

                    <span>
                      {completed} of {total} subtasks
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
          <div
            className={`new-column ${!dark ? "column-white" : ""}`}
            onClick={addNewColumnToBoard}
          >
            <h1>+ New Column</h1>
          </div>
        </div>
      </div>
    </>
  );
}
