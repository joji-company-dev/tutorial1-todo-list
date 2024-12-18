"use client";

import { useState } from "react";
import TodoItem from "../components/TodoItem";

export default function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    setTodoList([
      ...todoList,
      { id: Date.now(), text: input },
    ]);
    setInput("");
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
      <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="할 일을 입력하세요"
          className="border p-2 flex-1 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="p-4 border rounded-3xl bg-blue-500 text-white"
          onClick={handleAdd}
        >
          추가
        </button>
      </div>
      <ul>
        {todoList.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
          />
        ))}
      </ul>
    </div>
  );
}
