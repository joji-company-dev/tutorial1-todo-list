import { useState, useRef } from "react";

export default function TodoEditor(props) {
  // content 상태를 관리하기 위한 useState 훅
  const [content, setContent] = useState("");
  // 입력 요소에 접근하기 위한 useRef 훅
  const inputRef = useRef("");

  // 입력 내용이 변경될 때 호출되는 함수수
  const onChangeContent = (e) => {
    setContent(e.target.value); // 입력된 값을 content 상태로 설정
  };

  // 폼 제출 시 호출되는 함수
  const onsubmit = () => {
    if (!content) {
      inputRef.current.focus(); // content가 비어있으면 입력 요소에 포커스를 맞춤
      return;
    }
    props.onCreate(content); // 부모 컴포넌트로부터 전달받은 onCreate 함수를 호출하여 새로운 todo 항목을 생성

    setContent(""); // 입력 필드를 초기화화
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // 폼 제줄 시 페이지가 리로드 되는 기본 동작을 방지
        onsubmit(); // onSubmit 함수 호출출
      }}
    >
      <div className="TodoEditor">
        <h4 className="text-2xl p-2">새로운 Todo 작성하기</h4>
        <div className="editor_wrapper flex gap-2">
          <input
            ref={inputRef} // inputRef를 입력 요소에 연결하여 나중에 포커스를 맞출 수 있음
            value={content} // content 상태를 값으로 설정
            onChange={onChangeContent} // 입력 내용이 변경될 떄 onChangeContent 함수 호출출
            placeholder="새로운 Todo..." // 입력 필드에 플레이스홀더 텍스트 설정
            className="flex-1 text-xl border border-gray-500 rounded-lg px-4 py-3" // 입력 필드
          />
          <button
            type="submit" // 버튼 타입을 submit으로 설정하여 폼 제출 가능능
            className="bg-yellow-300 text-black rounded-lg px-4 py-3" // 버튼 스타일 설정
          >
            추가
          </button>
        </div>
      </div>
    </form>
  );
}
