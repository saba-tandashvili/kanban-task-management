import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import "./index.css";
import Data from "./data.json"
import Main from "./pages/Platform";

export function AppWrapper() {
  const [dark, setDark] = useState(true)
const boardsWithIds: Board[] = Data.boards.map((board) => ({
  ...board,
  columns: board.columns.map((column) => ({
    ...column,
    tasks: column.tasks.map((task) => ({
      ...task,
      id: crypto.randomUUID(),
    })),
  })),
}));
  const [task, setTask] = useState(boardsWithIds);

  const router = createBrowserRouter([

    {
      path: "/",
      element: <Main dark={dark} setDark={setDark} task={task} setTask={setTask}/>,
    },
  ]);

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")!).render(<AppWrapper />);
