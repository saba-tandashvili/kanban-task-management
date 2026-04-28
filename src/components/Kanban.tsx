export default function Kanban({
  Board,
  setSelectedTask,
  setShowDetails,
  dark,
  addNewColumnToBoard,
}: KanbanProps) {
  return (
    <div>
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
  )
}
