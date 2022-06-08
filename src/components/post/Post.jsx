import { MoreVert } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import "./Post.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: loggedUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(loggedUser._id));
  }, [loggedUser._id, post.likes]);

  useEffect(() => {
    const userFetch = async () => {
      const res = await fetch(
        `http://localhost:8800/api/users?userId=${post.userId}`
      );
      const data = await res.json();
      setUser(data);
    };
    userFetch();
  }, [post.userId, loggedUser?.profilePicture]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const likeHandler = () => {
    try {
      fetch(`http://localhost:8800/api/posts/${post._id}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedUser._id }),
      });
      console.log("****", user);
    } catch (error) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
    console.log("user", user);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImage"
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : PF + "/person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            {/* Here add functionality for deleting posts */}
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImage" src={post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={PF + "like.png"}
              alt=""
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            {/* Here add comment section and functionality for commenting */}
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
