"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

export default function EasilyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setPosts(Array.isArray(json.data) ? json.data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  console.log(posts);

  return (
    <div className="mx-auto mt-10 p-5 border rounded shadow">
      <h1 className="text-3xl font-bold text-left mb-4 text-orange-400">
        📁공지사항📁
      </h1>
      <h3>공지사항을 확인할 수 있습니다</h3>
      {posts.map((post) => (
        <Table key={post.id}>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">Title</TableHead>
              <TableHead className="w-1/5">Category</TableHead>
              <TableHead className="w-1/5">Author</TableHead>
              <TableHead className="w-2/5">Created At</TableHead>
              <TableHead className="w-1/7">Views</TableHead>
              <TableHead className="w-1/7">Comments</TableHead>
            </TableRow>
          </TableHeader>
          <line className="border"></line>
          <TableBody>
            <TableRow>
              <TableCell className="w-1/3">{post.title}</TableCell>
              <TableCell className="w-1/5">{post.category}</TableCell>
              <TableCell className="w-1/5">
                {post.author.name}({post.author.email})
              </TableCell>
              <TableCell className="2/5">{post.createdAt}</TableCell>
              <TableCell className="1/7">{post.views}</TableCell>
              <TableCell className="1/7">{post.commentCount}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </div>
  );
}
