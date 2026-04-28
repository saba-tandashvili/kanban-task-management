import Ellipsis from "../assets/icon-vertical-ellipsis.svg";

export default function Details({
  dark,
  updateSubtask,
  showDetails,
  taskOptions,
  setTaskOptions,
  setShowDetails,
  selectedTask,
  setActiveTask,
  setShowEditTask,
  setShowDeleteTask,
  getUpdatedStatus,
  setSelectedTask,
  setTask,
  Board,
}: DetailsProps) {
  return (
    <div>
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
                  {selectedTask.subtasks.filter((st) => st.isCompleted).length}{" "}
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
    </div>
  );
}
