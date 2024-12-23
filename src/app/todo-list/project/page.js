"use client";

import { useRef, useState } from "react";

// 초기 데이터
const mockTodo = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    createDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "Next 공부하기",
    createDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "JSP 공부하기",
    createDate: new Date().getTime(),
  },
];

export default function App() {
  const [todo, setTodo] = useState(mockTodo);
  const idRef = useRef(3);

  const onCreate = (content) => {
    const newItem = {
      id: idRef.current,
      content,
      isDone: false,
      createDate: new Date().getTime(),
    };
    setTodo([newItem, ...todo]);
    idRef.current += 1;
  };

  const onUpdate = (targetId) => {
    setTodo(
      todo.map((it) =>
        it.id === targetId ? { ...it, isDone: !it.isDone } : it
      )
    );
  };

  const onDelete = (targetId) => {
    setTodo(todo.filter((it) => it.id !== targetId));
  };

  const onEdit = (targetId, newContent) => {
    setTodo(
      todo.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  const Header = () => {
    return (
      <div className="Header">
        <h1 className="text-3xl my-3 text-purple-600">
          오늘은 {new Date().toDateString()}
        </h1>
      </div>
    );
  };

  const TodoEditor = ({ onCreate }) => {
    const [content, setContent] = useState("");

    const inputRef = useRef();

    const onChangeContent = (e) => {
      setContent(e.target.value);
    };

    const onSubmit = () => {
      if (!content) {
        inputRef.current.focus();
        return;
      }
      onCreate(content);
      setContent("");
    };

    return (
      <div className="TodoEditor">
        <h4 className="text-2xl p-2">새로운 Todo 작성하기</h4>
        <div className="editor_wrapper flex gap-2">
          <input
            ref={inputRef}
            value={content}
            onChange={onChangeContent}
            placeholder="새로운 Todo..."
            className="flex-1 text-xl border border-gray-500 rounded-lg px-4 py-3"
          />
          <button
            onClick={onSubmit}
            className="bg-yellow-300 text-black rounded-lg px-4 py-3"
          >
            추가
          </button>
        </div>
      </div>
    );
  };

  const TodoItem = ({
    id,
    content,
    isDone,
    createDate,
    onUpdate,
    onDelete,
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
            onChange={() => onUpdate(id)}
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
                onClick={() => onDelete(id)}
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

  const TodoList = ({ todo }) => {
    const [search, setSearch] = useState("");
    const onChangeSearch = (e) => {
      setSearch(e.target.value);
    };

    const getSearchResult = () => {
      return search === ""
        ? todo
        : todo.filter((it) =>
            it.content.toLowerCase().includes(search.toLowerCase())
          );
    };

    return (
      <div className="TodoList">
        <h3 className="text-2xl p-2">Todo List</h3>
        <input
          value={search}
          onChange={onChangeSearch}
          className="searchbar text-xl border rounded-lg p-2 w-full border-b border-gray-700 p-3 mb-5 focus:outline-none focus:border-blue-700"
          placeholder="검색어를 입력하세요"
        />
        <div className="list_wrapper flex flex-col gap-5">
          {getSearchResult().map((it) => (
            <TodoItem
              key={it.id}
              {...it}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="App bg-green-400 max-w-lg w-full mx-auto p-5 box-border flex flex-col gap-8">
      <Header />
      <TodoEditor onCreate={onCreate} />
      <TodoList todo={todo} />
    </div>
  );
}
