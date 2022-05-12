import React from "react";
import "./Upload.css";

function Upload({ onChange, children }) {
  return (
    <label htmlFor="file" className="shareOption">
      {children}
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
