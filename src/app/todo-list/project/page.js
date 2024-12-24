"use client";

import { useState } from "react";
import TodoItem from "../components/TodoItem";
import { useStateWithLocalStorage } from "../components/useStateWithLocalStorage";

export default function TodoList() {
  const [todoList, setTodoList] = useStateWithLocalStorage("todos", []);
  const [input, setInput] = useState("");
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleAdd = (event) => {
    event.preventDefault();
    if (input.trim() === "") return;
    setTodoList([...todoList, { id: Date.now(), text: input, check: false }]);
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

  const handleCheck = (id) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, check: !todo.check } : todo
      )
    );
  };

  // 드래그 시작 핸들러
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  // 드롭 핸들러
  const handleDrop = (index) => {
    if (draggedIndex === null) return;

    // 기존 목록을 복사하고 드래그된 항목과 드롭된 항목의 위치를 교환
    const updatedTodoList = [...todoList];

    [updatedTodoList[draggedIndex], updatedTodoList[index]] = [
      updatedTodoList[index],
      updatedTodoList[draggedIndex],
    ];

    // 상태 업데이트 및 초기화
    setTodoList(updatedTodoList);
    setDraggedIndex(null);
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
        {todoList.map((todo, index) => (
          <li
            key={todo.id}
            className="p-4 border rounded my-2 bg-gray-100"
            draggable
            onDragStart={() => handleDragStart(index)} // 드래그 시작
            onDragOver={(e) => e.preventDefault()} // 드롭 가능하게 처리
            onDrop={() => handleDrop(index)} // 드롭 시 처리
          >
            <TodoItem
              id={todo.id}
              text={todo.text}
              check={todo.check}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              onToggle={handleCheck}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
