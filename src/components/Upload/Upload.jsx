import React from "react";
import "./Upload.css";

function Upload({ onChange, children, name }) {
  return (
    <label htmlFor={name || "file"} className="shareOption">
      {children}
      <input
        style={{ display: "none" }}
        type="file"
        id={name || "file"}
        accept=".png,.jpeg,.jpg"
        onChange={onChange}
      />
    </label>
  );
}

export default Upload;
