import Delete from "../assets/icon-cross.svg"

export default function New({
  showNew,
  setShowNew,
  dark,
  newTask,
  setNewTask,
  Board,
  addNewTask,
}: NewProps) {
  return (
    <div>
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
    </div>
  );
}
