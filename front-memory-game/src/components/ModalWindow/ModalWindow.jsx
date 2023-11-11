import ReactDom from "react-dom";
import styles from "./ModalWindow.module.css";

export default function ModalWindow({ open, onClose }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p>Поздравляем! Вы выиграли!</p>
        <button onClick={onClose}>Close Modal</button>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
