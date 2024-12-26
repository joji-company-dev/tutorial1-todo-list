"use client";

import React, { useState } from "react";

export default function DnDList() {
  const [items, setItems] = useState([
    "Item1",
    "Item2",
    "Item3",
    "Item4",
    "Item5",
  ]);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index); // 드래그 시작 위치 저장
  };

  const handleDrop = (index) => {
    if (draggedIndex === null) return;

    // 현재 아이템 리스트 복사
    const updatedItems = [...items];

    // 드래그된 아이템과 드롭된 아이템의 위치 교환
    [updatedItems[draggedIndex], updatedItems[index]] = [
      updatedItems[index],
      updatedItems[draggedIndex],
    ];

    // 새로운 리스트 상태 업데이트
    setItems(updatedItems);

    // 드래그 상태 초기화
    setDraggedIndex(null);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
      <h1 className="text-2xl font-bold text-center mb-4">Drag and Drop</h1>
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            className="p-4 border rounded my-2 bg-gray-100"
            draggable
            onDragStart={() => handleDragStart(index)} // 드래그 시작
            onDragOver={(e) => e.preventDefault()} // 드롭 허용
            onDrop={() => handleDrop(index)} // 드롭 시 처리
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
