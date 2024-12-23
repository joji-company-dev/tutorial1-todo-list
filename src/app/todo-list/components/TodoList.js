import { useState } from "react";

export default function TodoList({ todo, setTodo }) {
  const handelUpdate = (targetId) => {
    setTodo(
      todo.map((TodoItem) =>
        TodoItem.id === targetId
          ? { ...TodoItem, isDone: !TodoItem.isDone }
          : TodoItem
      )
    );
  };
  const handelDelete = (targetId) => {
    setTodo(todo.filter((TodoItem) => TodoItem.id !== targetId));
  };
  const handelEdit = (targetId, newContent) => {
    setTodo(
      todo.map((TodoItem) =>
        TodoItem.id === targetId
          ? { ...TodoItem, content: newContent }
          : TodoItem
      )
    );
  };

  return (
    <div className="TodoList">
      <h3 className="text-2xl p-2">Todo List</h3>
      <div className="list_wrapper flex flex-col gap-5">
        {todo.map((item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            content={item.content}
            isDone={item.isDone}
            createDate={item.createDate}
            handelUpdate={handelUpdate}
            handelDelete={handelDelete}
            onEdit={handelEdit}
          />
        ))}
      </div>
    </div>
  );
}

const TodoItem = ({
  id,
  content,
  isDone,
  createDate,
  handelUpdate,
  handelDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSaveEdit = () => {
    onEdit(id, editContent);
    setIsEditing(false);
  };

  const onCancelEdit = () => {
    setEditContent(content);
    setIsEditing(false);
  };

  return (
    <div
      className={`TodoItem ${isDone ? "done" : ""} flex items-center gap-6 py-5 border-b border-gray-500`}
    >
      <div className="checkbox_col w-5">
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => handelUpdate(id)}
        />
      </div>
      <div className="date_col text-sm text-gray-900">
        {new Date(createDate).toLocaleDateString()}
      </div>
      {isEditing ? (
        <div className="edit_col flex gap-2">
          <input
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="border border-gray-400 rounded-lg px-4 py-3"
          />
          <button
            onClick={onSaveEdit}
            className="btn btn-save bg-pink-200 text-black rounded-lg px-4 py-3"
          >
            저장
          </button>
          <button
            onClick={onCancelEdit}
            className="btn btn-cancel bg-pink-100 text-black rounded-lg px-4 py-3"
          >
            취소
          </button>
        </div>
      ) : (
        <div className="title_col flex-1 flex items-center justify-between">
          {content}
          <div className="flex gap-2">
            <button
              onClick={toggleEdit}
              className="btn btn-edit bg-red-200 text-black rounded-lg px-4 py-3"
            >
              수정
            </button>
            <button
              onClick={() => handelDelete(id)}
              className="btn btn-save bg-green-100 text-black rounded-lg px-4 py-3"
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
