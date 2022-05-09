import { useState } from "react";
import PostList from "../PostList/PostList";
import Share from "../share/Share";

import "./Feed.css";

function Feed({ currentUser, username }) {
  const [rerender, setRerender] = useState(false);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {username && username !== currentUser.username ? null : (
          <Share setRerender={() => setRerender(!rerender)} />
        )}
        <PostList username={username} rerender={rerender} />
      </div>
    </div>
  );
}

export default Feed;
