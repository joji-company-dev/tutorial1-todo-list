"use client";

import { ProjectSpecification } from "@/guide/ProjectSpecification";

export default function EasilyPostsSpecificationPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <ProjectSpecification
          projectName="이즐리 게시글 목록 불러오기"
          projectPurpose="이즐리 게시글 목록을 불러와서 화면에 표시해보세요."
          referenceLinks={[
            {
              label: "프로젝트 예시",
              href: "https://easily-dashboard.jojicompany.com/dashboard/community/notice",
            },
            {
              label: "API 명세서",
              href: "https://easily-api.jojicompany.com/api",
            },
          ]}
          assignmentList={[
            {
              title: "게시글 목록 표시",
              description: `GET /api/posts 엔드포인트를 호출해서 게시글 목록을 불러와서 화면에 표시해보세요.
                 이때 해당 엔드포인트의 schema는 실제 이즐리 API 명세서의 GET /posts 엔드포인트의 schema와 동일합니다.`,
            },
            {
              title: "심화: shadcn/ui 사용해서 디자인 적용하기",
              description: `현재 이즐리 대시보드는 shadcn/ui 라이브러리를 사용해서 디자인되어 있습니다. 이를 참고해서 본 프로젝트에 shadcn/ui 라이브러리를 적용시켜 보세요. 이를 이용해서
                게시글 목록 페이지를 디자인해보세요.`,
            },
          ]}
        />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
