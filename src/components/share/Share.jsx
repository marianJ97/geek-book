import { EmojiEmotions, Label, Room, Cancel } from "@material-ui/icons";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./Share.css";
import Upload from "../Upload/Upload";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
// import { send } from "process";

function Share({ setRerender }) {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [percentage, setPercentage] = useState(null);

  // useEffect(() => {
  //   if (file) {
  //     imageUpload(file);
  //   }
  // }, [file]);

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
      imageUpload(file, sendNewPostWithFile(newPost));
    } catch (error) {
      console.log(error);
    }
  };

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

  // function sendNewPostWithFileAlt(body) {

  //   return function(fileURL) {

  //   }
  // }

  const sendNewPostWithFile = (body) => (fileURL) => {
    console.log({ fileURL });
    console.log({ body });
    return sendNewPost({ ...body, img: fileURL });
  };

  const imageUpload = (file, onImageUploadFinished) => {
    const name = new Date().getTime() + file?.name;
    console.log(name);
    const storageRef = ref(storage, name);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setPercentage(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          onImageUploadFinished(downloadURL);
          setFileURL(downloadURL);
        });
      }
    );
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
            <Upload onChange={(event) => setFile(event.target.files[0])} />
            {/* <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Reactions</span>
            </div> */}
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
