"use client";
import { useState, useEffect } from "react";

export default function TodoItem({ id, text, onDelete }) {

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 해당 항목의 체크 상태를 불러옴
    const storedCheckState = localStorage.getItem(`todo-${id}`);
    if (storedCheckState === "true") {
      setIsChecked(true);
    }
  }, [id]);

  const handleChecked = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    localStorage.setItem(`todo-${id}`, newCheckedState.toString());
  };

  return (
    <li className="flex justify-between items-center border-b p-2">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChecked}
      />
      <span className={isChecked ? "line-through text-gray-500" : ""}>
        {text}
      </span>
      <button
        onClick={() => onDelete(id)}
        className="text-red-500 hover:underline"
      >
        삭제
      </button>
    </li>
  );
}
