import "./SingleCard.css";

export function SingleCard({ card, handleChoice, flipped, disabled, startAnimation }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className={startAnimation ? "back call-gradient" : "back"}
          src="src/img/nko-logo.svg"
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
