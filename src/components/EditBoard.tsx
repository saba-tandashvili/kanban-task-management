import Delete from "../assets/icon-cross.svg";

export default function EditBoard({
  showEditBoard,
  setShowEditBoard,
  dark,
  editBoard,
  setEditBoard,
  editBoardFunction,
}: EditBoardProps) {
  return (
    <div>
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
    </div>
  );
}
