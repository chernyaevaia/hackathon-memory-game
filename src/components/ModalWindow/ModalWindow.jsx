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
        <div className={styles.contentContainer}>
          <div className={styles.heading}>{text}</div>
          <div>Количество ходов: {turns}</div>
          <div>Время игры: {timeSpent}</div>
          <button className={styles.closeBtn} onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
