"use client";

import { AssignmentListItem } from "../guide/AssignmentListItem";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="text-2xl">온보딩 과제 프로젝트!</h1>

        <ul className="flex flex-col gap-4">
          <AssignmentListItem
            title="1.Todo List"
            description="첫 시작은 역시 Todo List!"
            projectHref="todo-list/project"
            specificationHref="todo-list/specification"
          />
          <AssignmentListItem
            title="2.이즐리 게시글 목록 불러오기"
            description="이즐리 게시글 목록을 불러와서 화면에 표시해보세요."
            projectHref="easily-posts/project"
            specificationHref="easily-posts/specification"
          />
        </ul>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
