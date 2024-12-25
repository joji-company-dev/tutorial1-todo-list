import { useState } from "react";

export default function TodoList({ todo, setTodo }) {
  // 특정 항목의 완료 상태를 토글하는 함수
  const handleUpdate = (targetId) => {
    setTodo(
      todo.map((TodoItem) =>
        TodoItem.id === targetId
          ? { ...TodoItem, isDone: !TodoItem.isDone } // 완료 상태를 토글
          : TodoItem
      )
    );
  };

  const handleDelete = (targetId) => {
    setTodo(todo.filter((TodoItem) => TodoItem.id !== targetId)); // targetId와 일치하지 않는 항목만 남김
  };

  const handleEdit = (targetId, newContent) => {
    console.log(targetId, newContent); // targetId와 새로운 내용을 콘솔에 출력
    setTodo(
      todo.map((TodoItem) =>
        TodoItem.id === targetId
          ? { ...TodoItem, content: newContent } // 항목의 내용을 새로운 내용으로 변경
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
            key={item.id} // 각 항목에 고유한 키를 할당
            id={item.id}
            content={item.content}
            isDone={item.isDone}
            createDate={item.createDate}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}

// 개별 Todo 항목을 렌더링하는 컴포넌트
const TodoItem = ({
  id,
  content,
  isDone,
  createDate,
  handleUpdate,
  handleDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false); // 항목이 편집 모드인지 여부를 관리하는 상태
  const [editContent, setEditContent] = useState(content); // 편집 중인 내용을 관리하는 상태

  const toggleEdit = () => {
    setIsEditing(!isEditing); // 편집 모드 토글
  };

  const onSaveEdit = (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지
    onEdit(id, editContent); // 편집된 내용 저장
    setIsEditing(false); // 편집 모드 종료
  };

  const onCancelEdit = () => {
    setEditContent(content); // 편집 중인 내용을 원래 내용으로 되돌림
    setIsEditing(false); // 편집 모드 종료
  };

  return (
    <div
      className={
        "TodoItem flex items-center gap-6 py-5 border-b border-gray-500"
      }
    >
      <div className="checkbox_col w-5">
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => handleUpdate(id)} // 완료 상태 토글
        />
      </div>
      <div className="date_col text-sm text-gray-900">
        {new Date(createDate).toLocaleDateString()}{" "}
        {/* 생성 날짜를 로컬 날짜 형식으로 표시 */}
      </div>
      {isEditing ? (
        <form onSubmit={onSaveEdit}>
          <div className="edit_col flex gap-2">
            <input
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)} // 입력 내용 변경
              className="border border-gray-400 rounded-lg px-4 py-3"
            />
            <button
              type="submit"
              className="btn btn-save bg-pink-200 text-black rounded-lg px-4 py-3"
            >
              저장
            </button>
            <button
              type="button"
              onClick={onCancelEdit}
              className="btn btn-cancel bg-pink-100 text-black rounded-lg px-4 py-3"
            >
              취소
            </button>
          </div>
        </form>
      ) : (
        <div className="title_col flex-1 flex items-center justify-between">
          <span className={`${isDone ? "line-through text-gray-500" : ""}`}>
            {content}
          </span>
          {/* 변경된 부분: 체크박스 상태에 따라 클래스 적용 */}
          <div className="flex gap-2">
            <button
              onClick={toggleEdit}
              className="btn btn-edit bg-red-200 text-black rounded-lg px-4 py-3"
            >
              수정
            </button>
            <button
              onClick={() => handleDelete(id)} // 항목 삭제
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
