import { AddAPhoto } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import useUpload from "../../helpers/useUpload";
import Upload from "../Upload/Upload";
import "./PhotoAdder.css";
import UploadModal from "./UploadModal";

const PhotoAdder = ({ text, className, typeOfPhoto, userId }) => {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const { user, dispatch } = useContext(AuthContext);

  const updatePhoto = (photoURL, photoType) => {
    fetch(`http://localhost:8800/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        [photoType]: photoURL,
      }),
    });
    setFile(null);
    // setRerender();
  };

  const updateImg = (photoType) => (fileURL) => {
    if (photoType === "profilePicture") {
      dispatch({ type: "AVATAR_UPDATE", payload: fileURL });
    }
    if (photoType === "coverPicture") {
      dispatch({ type: "COVER_UPDATE", payload: fileURL });
    }

    return updatePhoto(fileURL, photoType);
  };

  const [percentage, uploadPictureToBE] = useUpload(file, updateImg);

  return (
    <>
      <Upload
        name={typeOfPhoto}
        onChange={(event) => {
          setFile(event.target.files[0]);
          setOpen(true);
        }}
      >
        <div className={className}>
          <AddAPhoto />
          <span>{text}</span>
        </div>
      </Upload>
      {percentage !== null && percentage < 100 && (
        <>
          <div className="blackBgr" />
          <div className="photoAdderPopup">
            <p>{`${percentage}%`}</p>
          </div>
        </>
      )}
      {open && (
        <>
          <UploadModal
            type={typeOfPhoto}
            closeAction={() => {
              setOpen(false);
              setFile(null);
            }}
            doAction={() => {
              uploadPictureToBE(typeOfPhoto);
              setOpen(false);
            }}
          />
        </>
      )}
    </>
  );
};

export default PhotoAdder;
