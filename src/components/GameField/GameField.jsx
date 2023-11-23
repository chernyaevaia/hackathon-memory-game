import { SingleCard } from "../SingleCard/SingleCard";
import "./GameField.css"

export function GameField({
  cards,
  choiceOne,
  choiceTwo,
  handleСardChoice,
  startAnimation,
  isGameOn,
  cardsDisabled,
  fieldSize,
}) {
  const gridStyle =
    fieldSize == 16
      ? "card-grid-16"
      : fieldSize === "20"
      ? "card-grid-20"
      : "card-grid-36";

  return (
    <div className={gridStyle}>
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
        />
      ))}
    </div>
  );
}
