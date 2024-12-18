"use client";

import {useState} from 'react'


export default function App() {
    const [todo, setTodo] = useState([]);
    const Header = () => {
        return (
            <div className="Header">
                <h1 className="text-2xl bottom-0 text-blue-500">{new Date().toDateString()}</h1>
            </div>
        );
    };
    const TodoEditor = () => {
        return (
            <div className="TodoEditor">
                <h4>새로운 Todo 작성</h4>
                <div className="editor_wrapper w-full flex gap-10">
                    <input placeholder="일정을 입력하세요" className="flex-1 box-border border border-red-300 rounded-none"/>
                    <button className="border p-2 rounded">추가</button>
                </div>
            </div>
        );
    };
    const TodoList = () => {
        return (
            <div className="TodoList">
                <h4>Todo List</h4>
                <input className="searchbar" placeholder="검색어를 입력하세요" />
                <div className="list_wrapper">
                    <TodoItem />
                    <TodoItem />
                    <TodoItem />
                </div>
            </div>
        );
    };
    const TodoItem = () => {
        return (
            <div className="TodoItem">
                <div className="checkbox_col">
                    <input type="checkbox" />
                </div>
                <div className="title_col">할 일</div>
                <div className="date_col">{new Date().toLocaleDateString()}</div>
                <div className="btn_col">
                    <button className=" rounded">삭제</button>
                </div>
            </div>
        );
    };
    return (
        <div className="App">
            <Header/>
            <TodoEditor/>
            <TodoList/>
        </div>
    );
};