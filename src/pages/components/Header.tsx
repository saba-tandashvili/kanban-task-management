import { useState } from "react";
import LogoD from "../../assets/logo-dark.svg";
import LogoL from "../../assets/logo-light.svg";
import LogoMobile from "../../assets/logo-mobile.svg";
import Ellipsis from "../../assets/icon-vertical-ellipsis.svg";
import ArrowDown from "../../assets/icon-chevron-down.svg"
import Board from "../../assets/icon-board.svg";
import BoardW from "../../assets/icon-board-white.svg";
import BoardP from "../../assets/icon-board-purple.svg";
import Light from "../../assets/icon-light-theme.svg";
import Dark from "../../assets/icon-dark-theme.svg";

export default function Header({
  dark,
  board,
  setShowNew,
  setShowEditBoard,
  setShowDelete,
  width,
  task,
  setBoard,
  setShowNewBoard,
  setDark
}: HeaderProps) {
  const [options, setOptions] = useState(false);
  const [miniSidebar, setMiniSidebar] = useState(false)

  let open
  if (width <= 530) {
    open = () => {
      setMiniSidebar(!miniSidebar)
    }
  } else {
    open = () => {}
  }
  return (
    <div className="header">
      <div className={miniSidebar ? "black-mini" : "close-black-mini black-mini"} onClick={() => {setMiniSidebar(false)}}></div>
      <header className={dark ? "dark" : ""}>
        <div className="left">
          <img src={width <= 800 ? LogoMobile : dark ? LogoL : LogoD} alt="" />
          <h3 style={{ color: dark ? "white" : "" }} onClick={() => {open()}}>{board}</h3>
          <img src={ArrowDown} alt="" style={{display: width <= 530 ? "" : "none"}}/>
          <div style={{ backgroundColor: dark ? "#3E3F4E" : "#E4EBFA" }} className="line"></div>

          <div className={miniSidebar ? "mini-sidebar" : "close-mini-sidebar mini-sidebar"} style={{backgroundColor: dark ? "#2b2c37" : ""}}>
            <div className="mini-sidebar-top">
            <h3>ALL BOARDS {task.length}</h3>

            <div className="boards">
              {task.map((b) => (
                <div
                  key={b.name}
                  className={`board ${board === b.name ? "active" : ""}`}
                  onClick={() => setBoard(b.name)}
                >
                  <img src={board === b.name ? BoardW : Board} alt="" />
                  <p style={{color: dark ? "white" : ""}}>{b.name}</p>
                </div>
              ))}
              <div
                className={`board board-new`}
                onClick={() => {
                  setShowNewBoard(true);
                }}
              >
                <img src={BoardP} alt="" />
                <p style={{color: dark ? "white" : ""}}>+ Create New Board</p>
              </div>
            </div>
          </div>

          <div className="mini-sidebar-bottom">
            <div className={dark ? "light-dark very-dark" : "light-dark"} style={{backgroundColor: dark ? "#20212c" : ""}}>
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
          </div>
          </div>
        </div>

        <div className="right">
          <button
            onClick={() => {
              setShowNew(true);
            }}
          >
            <p>{width <= 530 ? "+" : "+ Add New Task"}</p>
          </button>
          <img
            src={Ellipsis}
            alt=""
            onClick={() => {
              setOptions(!options);
            }}
          />
          <div
            className="options"
            style={{
              display: options ? "" : "none",
              backgroundColor: dark ? "#20212c" : "",
              boxShadow: dark ? "none" : "",
            }}
          >
            <p
              onClick={() => {
                setShowEditBoard(true);
              }}
            >
              Edit Board
            </p>
            <span
              onClick={() => {
                setShowDelete((prev) => !prev);
              }}
            >
              Delete Board
            </span>
          </div>
        </div>
      </header>
    </div>
  );
}
