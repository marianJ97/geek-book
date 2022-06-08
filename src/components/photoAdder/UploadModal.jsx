import React from "react";

const UploadModal = ({ doAction, closeAction, type }) => {
  return (
    <div>
      <div className="blackBgr" />
      <div className="photoAdderPopup">
        <p>Do you want to update photo?</p>
        <div>
          <button onClick={doAction}>yes</button>
          <button onClick={closeAction}>no</button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
