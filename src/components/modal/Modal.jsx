import React from "react";
import "./Modal.css";

const Modal = ({ children, setOpen }) => {
  return (
    <div className="modal">
      <div className="blackBgr" onClick={() => setOpen(false)} />
      <div className="modalWindow">{children}</div>
    </div>
  );
};

export default Modal;
