

export default function DeleteTask({handleDeleteTask, showDeleteTask, dark, selectedTask, setShowDeleteTask}: DeleteTaskProps) {
  return (
    <div>
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
    </div>
  )
}
