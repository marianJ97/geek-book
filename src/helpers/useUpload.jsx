import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { storage } from "../firebase";

const useUpload = (file, onImageUploadFinished) => {
  const [percentage, setPercentage] = useState(null);

  // const sendNewPostWithFile = (body) => (fileURL) => {
  //   console.log({ fileURL });
  //   console.log({ body });
  //   return sendNewPost({ ...body, img: fileURL });
  // };

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
        });
      }
    );
  };

  return [percentage, (body) => imageUpload(file, onImageUploadFinished(body))];
};

export default useUpload;
