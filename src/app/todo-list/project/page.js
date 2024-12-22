"use client";

import { useEffect, useState } from "react";
import TodoItem from "../components/TodoItem";

export default function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState("");

  
  // 로컬스토리지에서 데이터를 가져오는 useEffect
  useEffect(() => {
    const todos = localStorage.getItem("todos");
    if (todos) {
      try {
        setTodoList(JSON.parse(todos));
      } catch (error) {
        console.error("Error parsing todos from localStorage:", error);
        setTodoList([]); // 에러가 발생할 경우 빈 배열로 초기화
      }
    } else {
      setTodoList([]); // null일 경우 빈 배열로 초기화
    }
  }, []);
  
  const setTodoListWithPersistence = (todoList) => {
    localStorage.setItem('todos', JSON.stringify(todoList));
    setTodoList(todoList);
  }
   //useEffect(()=> {...},[] )
   //여기서 []는 컴포넌트가 마운트될때 무한루프를 방지한다. 
   //처음에 오류가 난이유는 의존성배열[]를 넣지않았기에 무한루프가 돌아 오류가난것

   // todoList에 할일목록이 추가될때마다, 로컬스토리지에 저장하는 useEffect
  //  useEffect(() => {
  //   if(todoList.length > 0){
  //       localStorage.setItem("todos", JSON.stringify(todoList));
  //   } 
  //  },[todoList]);

  const handleAdd = () => {
    if(input.trim() === "") return;
    setTodoListWithPersistence([
      ...todoList,
      { id: Date.now(), text: input },
    ]);
   setInput("");
  };

  const handleDelete = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoListWithPersistence(updatedTodoList);
  };

//   const handleCheck =() =>{
    //TodoItem 
//   }

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
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}
