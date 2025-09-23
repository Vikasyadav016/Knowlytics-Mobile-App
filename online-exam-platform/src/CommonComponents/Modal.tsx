import React, { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
      className="modal-overlay"
      onClick={onClose} 
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} 
        style={{
          backgroundColor: "#fff",
          padding: "1rem",
          borderRadius: 8,
          maxWidth: "600px",
          width: "90%",
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          position: "relative",
        }}
      >
        {title && (
          <h2 id="modal-title" style={{ marginTop: 0, marginBottom: "1rem" }}>
            {title}
          </h2>
        )}
        <button
          aria-label="Close modal"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          &times;
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
