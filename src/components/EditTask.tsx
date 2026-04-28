
import Delete from "../assets/icon-cross.svg";

export default function EditTask({
  showEditTask,
  setShowEditTask,
  dark,
  activeTask,
  setActiveTask,
  Board,
  handleEditTask,
}: EditTaskProps) {
  
  return (
    <div>
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
                onChange={(e) => {
                  setActiveTask({ ...activeTask, title: e.target.value });
                  setShowEditTask(true);
                }}
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
                <option key={col.name} value={col.name}>
                  <h3>{col.name}</h3>
                </option>
              ))}
            </select>

            <button onClick={() => handleEditTask(activeTask)}>
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
