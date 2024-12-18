"use client";

import { ProjectSpecification } from "@/guide/ProjectSpecification";

export default function TodoListSpecificationPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <ProjectSpecification
          projectName="Todo List"
          projectPurpose="우선 첫번째 과제로는 간단하지만 다양한 기능들을 다뤄볼수 있는 Todo List를 만들어봅시다."
          referenceLinks={[
            {
              label: "프로젝트 예시",
              href: "https://velog.io/@seong-dodo/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-Todo-List-%EB%A7%8C%EB%93%A4%EA%B8%B0",
            },
          ]}
          assignmentList={[
            {
              title: "할일 목록 표시",
              description:
                "현재의 할일들을 나타내는 목록을 보여줄 수 있어야 한다.",
            },
            {
              title: "할일 추가",
              description: "새로운 할일을 추가할 수 있어야 한다.",
            },
            {
              title: "할일 삭제",
              description: "할일을 삭제할 수 있어야 한다.",
            },
            {
              title: "할일 완료",
              description: "할일을 완료할 수 있어야 한다.",
            },
            {
              title: "할일 수정",
              description: "할일을 수정할 수 있어야 한다.",
            },
            {
              title: "할일 완료 취소",
              description: "완료한 할일을 취소할 수 있어야 한다.",
            },
            {
              title: "심화: 할일 정렬",
              description:
                "드래그앤드랍을 이용해서 할일 목록들을 정렬할 수 있어야 한다.",
            },
          ]}
        />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
