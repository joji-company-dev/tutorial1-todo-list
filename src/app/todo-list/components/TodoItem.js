"use client"
import { useState } from "react";

export default function TodoItem({ 
    id, 
    text, 
    onDelete 
}) {

    const [isChecked, setIsChecked] = useState(false);

    const handleChecked = () =>{
        setIsChecked(!isChecked)
    }
    return (
      <li className="flex justify-between items-center border-b p-2">
        <input
            type="checkbox"
            checked={isChecked}
            onChange={handleChecked}
        />
        <span>{text}</span>
        <button
          onClick={() => onDelete(id)}
          className="text-red-500 hover:underline"
        >
          삭제
        </button>
      </li>
    );
  }
  