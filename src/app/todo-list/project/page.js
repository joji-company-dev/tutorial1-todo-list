"use client";

import { useRef, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import TodoEditor from "../components/TodoEditor.js";
import TodoList from "../components/TodoList.js";

export default function App() {
  const [todo, setTodo] = useState(() => {
    // 컴포넌트 마운트 시에 로컬 스토리지에서 저장된 todo 목록을 가져와 초기 상태로 설정
    const savedTodo = JSON.parse(localStorage.getItem("todo"));
    return savedTodo || [];
  });

  const idRef = useRef(0);

  useEffect(() => {
    // idRef.current 값을 최신 상태로 업데이트
    if (todo.length > 0) {
      idRef.current = todo[todo.length - 1].id + 1;
    }
  }, [todo]);

  useEffect(() => {
    // todo 상태가 변경할 때마다 localStorage에 저장
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  // 새로운 todo 항목을 생성하는 함수
  const onCreate = (content) => {
    const newItem = {
      id: nanoid(), // 고유 ID 설정
      content, // content 값 설정
      isDone: false, // 초기 완료 상태 설정정
      createDate: new Date().getTime(), // 생성 날짜 설정
    };
    setTodo([newItem, ...todo]); // 새로운 항목을 todo 목록의 맨 앞에 추가
    idRef.current += 1; // idRef 값을 1 증가
  };

  return (
    <div className="App bg-green-400 max-w-lg w-full mx-auto p-5 box-border flex flex-col gap-8">
      <TodoEditor onCreate={onCreate} />
      <TodoList todo={todo} setTodo={setTodo} />
    </div>
  );
}
