import styles from "./SingleCard.module.css";
import cx from "classnames";
import logo from "/src/img/nko-logo.svg"

export function SingleCard({
  card,
  handleChoice,
  flipped,
  disabled,
  startAnimation,
}) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className={styles.card}>
      <div className={flipped ? styles.flipped : ""}>
        <img className={styles.front} src={card.src} alt="card front" />
        <img
          className={
            startAnimation ? cx(styles.back, styles.callGradient) : styles.back
          }
          src={logo}
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
