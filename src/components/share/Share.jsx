import {
  // EmojiEmotions,
  // Label,
  // Room,
  PermMedia,
  Cancel,
} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Share.css";
import Upload from "../Upload/Upload";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { storage } from "../../firebase";
import useUpload from "../../helpers/useUpload";

function Share({ setRerender }) {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const sendNewPost = (body) => {
    fetch(`http://localhost:8800/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    desc.current.value = "";
    setFile(null);
    setRerender();
  };

  const sendNewPostWithFile = (body) => (fileURL) => {
    console.log({ fileURL });
    console.log({ body });
    return sendNewPost({ ...body, img: fileURL });
  };

  const [percentage, uploadImg] = useUpload(file, sendNewPostWithFile);

  const submitHandler = (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      img: "",
    };

    if (!file) {
      return sendNewPost(newPost);
    }

    try {
      uploadImg(newPost);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfilePicture"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={`Whats on your mind ${user.username}?`}
            type="text"
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancel" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <Upload
              onChange={(event) => {
                console.log(event.target.files[0]);
                setFile(event.target.files[0]);
              }}
            >
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or video</span>
            </Upload>
          </div>
          <button
            disabled={percentage !== null && percentage < 100}
            className="shareButton"
            type="submit"
          >
            Share
          </button>
        </form>
      </div>
    </div>
  );
}

export default Share;
