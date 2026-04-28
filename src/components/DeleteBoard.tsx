export default function DeleteBoard({
  showDelete,
  setShowDelete,
  dark,
  board,
  deleteBoardFunction,
}: DeleteBoardProps) {
  return (
    <div>
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
    </div>
  )
}
