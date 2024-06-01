import React from "react";
import "../modal/modal.scss";

const Modal = ({ open, onClose, children }) => {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className={`overlay ${open && "animated fadeIn"}`}
        >
          <div className="modalContainer" onClick={stopPropagation}>
            <div className="modalRight">
              <p onClick={onClose} className="closeBtn">
                X
              </p>
              <div className="content">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
