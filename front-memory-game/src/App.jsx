import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard/SingleCard";
import ModalWindow from "./components/ModalWindow/ModalWindow";

const cardImages = [
  {
    src: "front-memory-game/src/img/free-icon-family-3900396.png",
    matched: false,
  },
  {
    src: "front-memory-game/src/img/free-icon-family-3961230.png",
    matched: false,
  },
  {
    src: "front-memory-game/src/img/free-icon-family-6163184.png",
    matched: false,
  },
  {
    src: "front-memory-game/src/img/free-icon-family-6385186.png",
    matched: false,
  },
  {
    src: "front-memory-game/src/img/free-icon-parenting-11777542.png",
    matched: false,
  },
  {
    src: "front-memory-game/src/img/free-icon-family-life-3452380.png",
    matched: false,
  },
  {
    src: "front-memory-game/src/img/free-icon-family-6589348.png",
    matched: false,
  },
  {
    src: "front-memory-game/src/img/free-icon-family-11009818.png",
    matched: false,
  },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        const hasUnmatchedCards = cards.find((card) => !card.matched);
        console.log(hasUnmatchedCards);
        if (!hasUnmatchedCards) {
          setIsModalOpen(true);
        }
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <>
      <div className="App">
        <h1>Family Match</h1>
        <button
          onClick={() => {
            shuffleCards();
          }}
        >
          Restart the Game
        </button>
        <p>Turns: {turns}</p>
        <div className="card-grid">
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
      <ModalWindow open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default App;
