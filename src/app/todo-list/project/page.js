"use client";

import { useEffect, useState } from "react";
import TodoItem from "../components/TodoItem";
import { useStateWithLocalStorage } from "../components/useStateWithLocalStorage";

export default function TodoList() {
  const [todoList, setTodoList] = useStateWithLocalStorage("todos", []);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    event.preventDefault();
    if (input.trim() === "") return;
    setTodoList([...todoList, { id: Date.now(), text: input }]);
    setInput("");
  };

  const handleDelete = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  const handleUpdate = (id, newText) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodoList(updatedTodoList);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
      <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>
      <form className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="할 일을 입력하세요"
          className="border p-2 flex-1 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="p-4 border rounded-3xl bg-blue-500 text-white"
          onClick={handleAdd}
        >
          추가
        </button>
      </form>
      <ul>
        {todoList.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </ul>
    </div>
  );
}
