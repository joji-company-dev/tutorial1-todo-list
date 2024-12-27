"use client";

import { useEffect, useState } from "react";

export default function EasilyApp() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("api/posts/route.js")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border roudned shadow">
      <h1 className="text-2xl font-bold text-center mb-4">
        Easily 게시물 목록
      </h1>
      <PostList posts={posts} />
    </div>
  );
}

const PostList = ({ posts }) => {
  return (
    <div className="PostList">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

const PostItem = ({ post }) => {
  return (
    <div className="PostItem border p-4 mb-4">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-gray-700">{post.body}</p>
    </div>
  );
};
