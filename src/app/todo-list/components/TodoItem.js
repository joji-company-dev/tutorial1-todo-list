"use client";
import { useState, useEffect } from "react";

export default function TodoItem({ id, text, onDelete, onUpdate }) {

  const [isChecked, setIsChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(text);

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

  const handleEdit = () =>{
    setIsEditing(true);
  }

  const handleSave = () =>{
    setIsEditing(false);
    onUpdate(id, updatedText);
  }

  const handleCancel = () =>{
    setIsEditing(false);
    setUpdatedText(text);  
  };

  return (
    <li className="flex justify-between items-center border-b p-2">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChecked}
      />
      {isEditing ? (
        <input 
        type="text"
        value={updatedText}
        onChange={(e)=> setUpdatedText(e.target.value)}
          className="border p-1 flex-1 rounded"/>
        
      ) :  (
        <span className={isChecked ? "line-through text-gray-500" : ""}>{text}</span>
      )}
      <div className="flex gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="text-green-500 hover:underline"
            >저장</button>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:underline"
            >
              취소
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="text-blue-500 hover:underline"
            >
              수정
            </button>
            <button
              onClick={() => onDelete(id)}
              className="text-red-500 hover:underline"
            >
              삭제
            </button>
          </>
        )}
      </div>
      {/* <button
        onClick={() => onDelete(id)}
        className="text-red-500 hover:underline"
      >
        삭제
      </button> */}
    </li>
  );
}
