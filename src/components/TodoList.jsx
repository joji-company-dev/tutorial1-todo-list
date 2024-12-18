import { useState } from "react";

/**
 * @typedef {Object} Todo
 * @property {string} id
 * @property {string} title
 * @property {boolean} isDone
 */

export function TodoList() {
  /**
   * @type {[Todo[], (todoList: Todo[]) => void]}
   */
  const [todoList, setTodoList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    if (!title) return;
    setTodoList([...todoList, { id: Date.now(), title, isDone: false }]);
    e.target.title.value = "";
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input name="title" type="text" className="border text-black" />
        <button className="border p-2">추가</button>
      </form>

      <ul className="flex flex-col gap-2">
        {todoList.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
