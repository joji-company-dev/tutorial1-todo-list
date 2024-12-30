"use client";

import EasilyPosts from "@/app/easily-posts/project/page";
import TodoList from "../project/page";

const CompanyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#f97316] text-white py-6">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold">Easily</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="hover:underline">
                  홈
                </a>
              </li>
              <li>
                <a href="/company" className="hover:underline">
                  회사소개
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  문의하기
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">이즐리란?</h2>
          <p className="text-lg text-gray-600">
            저희 Easily는 혁신적인 솔루션을 제공하며, 고객의 성공을 최우선으로
            생각합니다.
          </p>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow rounded">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">미션</h3>
            <p className="text-gray-700">
              우리는 고객의 목표를 달성하도록 돕는 데 집중합니다.
            </p>
          </div>
          <div className="p-6 bg-white shadow rounded">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">비전</h3>
            <p className="text-gray-700">
              지속 가능한 성장을 통해 업계를 선도하는 기업이 되겠습니다.
            </p>
          </div>
          <div className="p-6 bg-white shadow rounded">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">가치</h3>
            <p className="text-gray-700">
              정직, 혁신, 그리고 고객 중심의 가치를 지향합니다.
            </p>
          </div>
        </section>
        <section className="flex ">
          <TodoList />
          <EasilyPosts />
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} Easily. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CompanyPage;
