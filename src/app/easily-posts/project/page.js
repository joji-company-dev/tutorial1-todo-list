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
        const formattedDate = json.data.map((post) => {
          const date = new Date(post.createdAt);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");
          const seconds = String(date.getSeconds()).padStart(2, "0");

          return {
            ...post,
            formattedDate: `${year}/${month}/${day}`,
            formattedTime: `${hours}:${minutes}:${seconds}`,
          };
        });
        setPosts(Array.isArray(json.data) ? formattedDate : []);
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
      <h1 className="text-3xl font-bold text-left mb-4 text-orange-400 p-">
        📁공지사항📁
      </h1>
      <h3>공지사항을 확인할 수 있습니다</h3>
      {posts.map((post) => (
        <Table key={post.id}>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2">Title</TableHead>
              <TableHead className="w-1/3">Category</TableHead>
              <TableHead className="w-1/4">Author</TableHead>
              <TableHead className="w-2/6">FormattedDate</TableHead>
              <TableHead className="w-2/6">FormattedTime</TableHead>
              <TableHead className="w-1/10">Views</TableHead>
              <TableHead className="w-1/10">Comments</TableHead>
            </TableRow>
          </TableHeader>
          <line className="border"></line>
          <TableBody>
            <TableRow>
              <TableCell className="w-1/2">{post.title}</TableCell>
              <TableCell className="w-1/3">{post.category}</TableCell>
              <TableCell className="w-1/4">
                {post.author.name} <br /> ({post.author.email})
              </TableCell>
              <TableCell className="2/6">{post.formattedDate}</TableCell>
              <TableCell className="2/6">{post.formattedTime}</TableCell>
              <TableCell className="1/10">{post.views}</TableCell>
              <TableCell className="1/10">{post.commentCount}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </div>
  );
}
