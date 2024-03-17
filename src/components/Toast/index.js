import React from "react";
import "./toast.scss";

export default function Toast({ message, type, title, close }) {
  return (
    <>
      <div
        id="toast__background"
        onClick={() => {
          close();
        }}
      ></div>
      <aside id={"toast_message"} className={`toast__container ${type}`}>
        <button
          type="button"
          className="toast__close"
          onClick={close}
          aria-label="Close"
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="toast__icon">
          {type === "success" && <i className="fas fa-check"></i>}
          {type === "error" && <i className="fas fa-exclamation-triangle"></i>}
          {type === "warning" && <i className="fas fa-exclamation"></i>}
        </div>
        <strong className="toast__title">{title}</strong>
        <div className="toast__message">
          <p>{message}</p>
        </div>
      </aside>
    </>
  );
}
