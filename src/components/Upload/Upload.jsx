import React from "react";
import { PermMedia } from "@material-ui/icons";
import "./Upload.css";

function Upload({ onChange }) {
  return (
    <label htmlFor="file" className="shareOption">
      <PermMedia htmlColor="tomato" className="shareIcon" />
      <span className="shareOptionText">Photo or video</span>
      <input
        style={{ display: "none" }}
        type="file"
        id="file"
        accept=".png,.jpeg,.jpg"
        onChange={onChange}
      />
    </label>
  );
}

export default Upload;
