"use client";

import { useEffect, useState } from "react";
/**
 * Assignment 객체
 * @typedef {Object} Assignment
 * @property {string} title - 과제 이름
 * @property {string} description - 과제 설명
 */

/**
 * Reference 객체
 * @typedef {Object} Reference
 * @property {string} label - 참고 링크 라벨
 * @property {string} href - 참고 링크
 */

/**
 * 프로젝트 스펙 컴포넌트
 * @param {string} projectName - 프로젝트 이름
 * @param {string} projectPurpose - 프로젝트 목적
 * @param {Assignment[]} assignmentList - 과제 목록
 * @param {Reference[]} referenceLinks - 참고할만한 링크
 * @returns {JSX.Element} - 프로젝트 스펙 컴포넌트
 */
export function ProjectSpecification({
  projectName,
  projectPurpose,
  assignmentList,
  referenceLinks,
}) {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheck = (title) => {
    const newCheckedItems = {
      ...checkedItems,
      [title]: !checkedItems[title],
    };

    setCheckedItems(newCheckedItems);
    localStorage.setItem(
      `${projectName}-checked-items`,
      JSON.stringify(newCheckedItems)
    );
  };

  useEffect(() => {
    const saved = localStorage.getItem(`${projectName}-checked-items`);
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl">프로젝트명: {projectName}</h3>
      <p className="text-base">{projectPurpose}</p>
      <div className="flex flex-col gap-2 border-2 border-gray-300 rounded-md p-4">
        <h4 className="text-xl">요구사항 목록</h4>
        <ul className="flex flex-col gap-2">
          {assignmentList.map((assignment) => (
            <li
              className="flex flex-col gap-2"
              key={assignment.title}
              data-checked={checkedItems[assignment.title] ?? false}
            >
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={checkedItems[assignment.title] ?? false}
                  onChange={() => handleCheck(assignment.title)}
                />
                <h4 className="text-lg">{assignment.title}</h4>
              </div>
              <p className="text-base">{assignment.description}</p>
            </li>
          ))}
        </ul>
      </div>
      {referenceLinks && (
        <div className="flex flex-col gap-2 border-2 border-gray-300 rounded-md p-4">
          <h4 className="text-xl">참고 링크</h4>
          <ul className="flex flex-col gap-2">
            {referenceLinks.map((reference) => (
              <li key={reference.href}>
                <a
                  className="text-blue-500 hover:underline"
                  href={reference.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {reference.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
