import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Post from "../post/Post";
import "./PostList.css";

function PostList({ username, rerender }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  // get curretn posts
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;

  useEffect(() => {
    const postFetch = async () => {
      const res = username
        ? await fetch(
            `http://localhost:8800/api/posts/profile/${username}?page=${currentPage}&?limit=${postsPerPage}`
          )
        : await fetch(
            `http://localhost:8800/api/posts/timeline/${user._id}?page=${currentPage}`
          );
      const data = await res.json();

      console.log(data);
      setPosts([...posts, ...data.data]);
      setTotalPages(data.totalPages);
    };
    postFetch();
  }, [username, user?._id, currentPage]);

  useEffect(() => {
    const postFetch = async () => {
      const res = username
        ? await fetch(
            `http://localhost:8800/api/posts/profile/${username}?page=${currentPage}&?limit=${postsPerPage}`
          )
        : await fetch(
            `http://localhost:8800/api/posts/timeline/${user._id}?page=${currentPage}`
          );
      const data = await res.json();

      console.log(data);
      setPosts(data.data);
      setTotalPages(data.totalPages);
    };
    postFetch();
  }, [rerender]);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
      <div className="showMoreButton">
        <button
          disabled={currentPage >= totalPages}
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          Show more
        </button>
      </div>
    </div>
  );
}

export default PostList;
