"use client";
import { useState } from "react";

export default function TodoItem({
  id,
  text,
  check,
  onDelete,
  onUpdate,
  onToggle,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    onUpdate(id, updatedText);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedText(text);
  };

  return (
    <li className="flex justify-between items-center border-b p-2">
      <input
        type="checkbox"
        checked={check}
        onChange={() => onToggle(id)}
        className="w-5 h-5"
      />
      {isEditing ? (
        <input
          type="text"
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
          className="border p-1 flex-1 rounded"
        />
      ) : (
        <span className={check ? "line-through text-gray-500" : ""}>
          {text}
        </span>
      )}
      <div className="flex gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="text-green-500 hover:underline"
            >
              저장
            </button>
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
    </li>
  );
}
