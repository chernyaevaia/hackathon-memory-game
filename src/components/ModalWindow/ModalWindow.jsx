import ReactDom from "react-dom";
import styles from "./ModalWindow.module.css";

export default function ModalWindow({ text, open, onClose, turns, timeSpent }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p>{text}</p>
        <div>Количество ходов: {turns}</div>
        <div>Время игры: {timeSpent}</div>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
