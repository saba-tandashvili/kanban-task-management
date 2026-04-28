import "./platform.css";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Tasks from "../components/tasks";
import Header from "../components/Header";

export default function Main({ dark, setDark, task, setTask }: MainProps) {
  const [sidebar, setSidebar] = useState(false);
  const [board, setBoard] = useState<string>("Platform Launch");
  const [showNew, setShowNew] = useState(false);
  const [showNewBoard, setShowNewBoard] = useState(false);
  const [showEditBoard, setShowEditBoard] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={dark ? "whole very-dark whole-dark" : "whole"}>
      <Sidebar
        dark={dark}
        setDark={setDark}
        sidebar={sidebar}
        setSidebar={setSidebar}
        board={board}
        setBoard={setBoard}
        setShowNewBoard={setShowNewBoard}
        task={task}
      />

      <Header
        dark={dark}
        board={board}
        setShowNew={setShowNew}
        setShowEditBoard={setShowEditBoard}
        setShowDelete={setShowDelete}
        width={width}
        task={task}
        setBoard={setBoard}
        setShowNewBoard={setShowNewBoard}
        setDark={setDark}
      />

      <Tasks
        task={task}
        dark={dark}
        board={board}
        setBoard={setBoard}
        setTask={setTask}
        setShowNew={setShowNew}
        showNew={showNew}
        showNewBoard={showNewBoard}
        setShowNewBoard={setShowNewBoard}
        setShowEditBoard={setShowEditBoard}
        showEditBoard={showEditBoard}
        showDelete={showDelete}
        setShowDelete={setShowDelete}
      />
    </div>
  );
}
