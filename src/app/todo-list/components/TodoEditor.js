import { useState, useRef } from "react";

export default function TodoEditor(props) {
  const [content, setContent] = useState("");
  const inputRef = useRef("");

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = () => {
    if (!content) {
      inputRef.current.focus();
      return;
    }
    props.onCreate(content);
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
}
