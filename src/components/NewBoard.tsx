import Delete from "../assets/icon-cross.svg";

export default function NewBoard({
  showNewBoard,
  setShowNewBoard,
  dark,
  newBoard,
  setNewBoard,
  addNewBoard,
}: NewBoardProps) {
  return (
    <div>
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
    </div>
  );
}
