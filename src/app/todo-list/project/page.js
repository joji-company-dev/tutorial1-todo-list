"use client";

import { useRef, useState } from "react";
import TodoEditor from "../components/TodoEditor.js";
import TodoList from "../components/TodoList.js";

export default function App() {
  const [todo, setTodo] = useState([]);
  const idRef = useRef();

  const onCreate = (content) => {
    const newItem = {
      id: idRef.current,
      content,
      isDone: false,
      createDate: new Date().getTime(),
    };
    setTodo([newItem, ...todo]);
    idRef.current += 1;
  };

  return (
    <div className="App bg-green-400 max-w-lg w-full mx-auto p-5 box-border flex flex-col gap-8">
      <TodoEditor onCreate={onCreate} />
      <TodoList todo={todo} setTodo={setTodo} />
    </div>
  );
}
