import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Post from "../post/Post";

function PostList({ username, rerender }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const postFetch = async () => {
      const res = username
        ? await fetch(`http://localhost:8800/api/posts/profile/${username}`)
        : await fetch(`http://localhost:8800/api/posts/timeline/${user._id}`);
      const data = await res.json();
      setPosts(
        data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      );
    };
    postFetch();
  }, [username, user?._id, rerender]);
  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
