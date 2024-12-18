"use client"

export default function TodoList() {
    return (
      <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            id="newTodo"
            placeholder="할 일을 입력하세요"
            className="border p-2 flex-1 rounded"
          />
          <button className="p-4 border rounded-3xl">
              +
          </button>
        </div>
      </div>
    );
  }