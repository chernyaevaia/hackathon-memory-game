import { SingleCard } from "../SingleCard/SingleCard";
import styles from "./GameField.module.css";
import cx from "classnames";

export function GameField({
  cards,
  choiceOne,
  choiceTwo,
  handleСardChoice,
  startAnimation,
  isGameOn,
  cardsDisabled,
  fieldSize,
  turns,
  maxTurnsNumber,
  counter,
  onGameStart,
}) {
  const secondsLeft = counter % 60 < 10 ? `0${counter % 60}` : counter % 60;
  return (
    <div className={styles.fieldContainer}>
      <div
        className={cx(
          styles.gameTopbar,
          fieldSize === "16"
            ? styles.width16
            : fieldSize === "20"
            ? styles.width20
            : styles.width36
        )}
      >
        <div className={styles.showSettingsContainer}>
          <button className={styles.startBtn} onClick={onGameStart}>
            {isGameOn ? "Начать заново" : "Начать"}
          </button>
          {isGameOn && (
            <button
              className={styles.startBtn}
              onClick={() => window.location.reload()}
            >
              Сбросить настройки
            </button>
          )}
        </div>

        <div className={styles.showSettingsContainer}>
          <div className={styles.turnsCounter}>
            Ходы: {turns}
            {(maxTurnsNumber === "20" || maxTurnsNumber === "40") &&
              ` из ${maxTurnsNumber}`}
          </div>
          {counter !== 0 && isGameOn && (
            <div className={styles.timeCounter}>
              Оставшееся время: {Math.floor(counter / 60)}:{secondsLeft}
            </div>
          )}
        </div>
      </div>

      <div
        className={cx(
          styles.cardsField,
          fieldSize === "16"
            ? styles.grid16
            : fieldSize === "20"
            ? styles.grid20
            : styles.grid36
        )}
      >
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            startAnimation={startAnimation}
            card={card}
            handleChoice={handleСardChoice}
            flipped={
              (card === choiceOne || card === choiceTwo || card.matched) &&
              isGameOn
            }
            disabled={cardsDisabled}
            fieldSize={fieldSize}
          />
        ))}
      </div>
    </div>
  );
}
