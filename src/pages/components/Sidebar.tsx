import Board from "../../assets/icon-board.svg";
import BoardP from "../../assets/icon-board-purple.svg";
import BoardW from "../../assets/icon-board-white.svg";
import Light from "../../assets/icon-light-theme.svg";
import Dark from "../../assets/icon-dark-theme.svg";
import Hide from "../../assets/icon-hide-sidebar.svg";
import Open from "../../assets/icon-show-sidebar.svg";

export default function Sidebar({
  dark,
  setDark,
  setSidebar,
  sidebar,
  board,
  setBoard,
  setShowNewBoard,
  task,
}: SideProps) {
  return (
    <>
      <div className="sidebar-div">
        <div
          className={`sidebar ${dark ? "dark" : ""} ${!sidebar ? "close-sidebar" : "open-sidebar"}`}
          style={{
            borderRight: dark ? "solid 1px #3E3F4E" : "solid 1px #E4EBFA",
          }}
        >
          <div className="sidebar-top">
            <h3>ALL BOARDS {task.length}</h3>

            <div className="boards">
              {task.map((b) => (
                <div
                  key={b.name}
                  className={`board ${board === b.name ? "active" : ""}`}
                  onClick={() => setBoard(b.name)}
                >
                  <img src={board === b.name ? BoardW : Board} alt="" />
                  <p>{b.name}</p>
                </div>
              ))}
              <div
                className={`board board-new`}
                onClick={() => {
                  setShowNewBoard(true);
                }}
              >
                <img src={BoardP} alt="" />
                <p>+ Create New Board</p>
              </div>
            </div>
          </div>

          <div className="sidebar-bottom">
            <div className={dark ? "light-dark very-dark" : "light-dark"}>
              <img src={Light} alt="" />
              <label className="toggle">
                <input
                  type="checkbox"
                  onClick={() => {
                    setDark(!dark);
                  }}
                />
                <span className="slider"></span>
              </label>
              <img src={Dark} alt="" />
            </div>

            <div
              className="close"
              onClick={() => {
                setSidebar(!sidebar);
              }}
            >
              <img src={Hide} alt="" />
              <p>Hide Sidebar</p>
            </div>
          </div>
        </div>
        <div
          className="open"
          onClick={() => {
            setSidebar(!sidebar);
          }}
        >
          <img src={Open} alt="" />
        </div>
      </div>
    </>
  );
}
