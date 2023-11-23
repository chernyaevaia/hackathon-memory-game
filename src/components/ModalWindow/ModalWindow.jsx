import ReactDom from "react-dom";
import "./ModalWindow.css";

export default function ModalWindow({ text, open, onClose, turns, timeSpent }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <div className="overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="content-container">
          <div className="heading">{text}</div>
          <div>Количество ходов: {turns}</div>
          <div>Время игры: {timeSpent}</div>
          <button className="closeBtn" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
