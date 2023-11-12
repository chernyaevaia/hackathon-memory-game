import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard/SingleCard";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import SettingsPanel from "./components/SettingsPanel/SettingsPanel";

const cardImages = [
  {
    src: "src/img/family2.jpg",
    matched: false,
  },
  {
    src: "src/img/family1.jpg",
    matched: false,
  },
  {
    src: "src/img/family3.jpg",
    matched: false,
  },
  {
    src: "src/img/family4.jpg",
    matched: false,
  },
  {
    src: "src/img/family5.jpg",
    matched: false,
  },
  {
    src: "src/img/family6.jpg",
    matched: false,
  },
  {
    src: "src/img/family7.jpg",
    matched: false,
  },
  {
    src: "src/img/family8.jpg",
    matched: false,
  },
  {
    src: "src/img/family9.jpg",
    matched: false,
  },
  {
    src: "src/img/family10.jpg",
    matched: false,
  },
  {
    src: "src/img/family11.jpg",
    matched: false,
  },
  {
    src: "src/img/family12.jpg",
    matched: false,
  },
  {
    src: "src/img/family13.jpg",
    matched: false,
  },
  {
    src: "src/img/family14.jpg",
    matched: false,
  },
  {
    src: "src/img/family15.jpg",
    matched: false,
  },
  {
    src: "src/img/family16.jpg",
    matched: false,
  },
  {
    src: "src/img/family17.jpg",
    matched: false,
  },
  {
    src: "src/img/family18.jpg",
    matched: false,
  },
];

function App() {
  const [isGameOn, setIsGameOn] = useState(false);

  const [cards, setCards] = useState([]);
  const [cardsDisabled, setCardsDisabled] = useState(true);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [turns, setTurns] = useState(0);

  const [timeControl, setTimeControl] = useState(0);
  const [counter, setCounter] = useState(0);

  const [isWinModalOpen, setIsWinModalOpen] = useState(false);
  const [isFailModalOpen, setIsFailModalOpen] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleСardChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const onChangeTimeControl = ({ target: { value } }) => {
    setTimeControl(value);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (isGameOn && counter === 0) {
      setIsFailModalOpen(true);
    }
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setCardsDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          const matchedCards = prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
          const hasUnmatched = matchedCards.filter(
            (card) => !card.matched
          ).length;
          if (hasUnmatched === 0) {
            setIsWinModalOpen(true);
          }
          return matchedCards;
        });
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
    setCardsDisabled(false);
  };

  return (
    <>
      <div className="App">
        <h1>Family Match</h1>
        <SettingsPanel
          onChangeTimeControl={onChangeTimeControl}
          timeControl={timeControl}
          disableChoice={isGameOn}
        />
        <div className="game-topbar">
          <p>Turns: {turns}</p>
          <button
            onClick={() => {
              shuffleCards();
              setIsGameOn(true);
              setCounter(timeControl * 60);
              setCardsDisabled(false);
            }}
          >
            {isGameOn ? "Начать заново" : "Начать"}
          </button>

          {counter !== 0 && isGameOn && (
            <div>
              Оставшееся время: {Math.floor(counter / 60)}:{counter % 60}
            </div>
          )}
        </div>
        <div className="card-grid">
          {cards.map((card) => (
            <SingleCard
              key={card.id}
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
      </div>

      <ModalWindow
        text="Поздравляем! Вы выиграли!"
        open={isWinModalOpen}
        onClose={() => {
          setTurns(0);
          setIsWinModalOpen(false);
          setCardsDisabled(true);
          setIsGameOn(false);
        }}
      />

      <ModalWindow
        text="Игра закончилась - удачи в следующий раз!"
        open={isFailModalOpen}
        onClose={() => {
          setTurns(0);
          setIsFailModalOpen(false);
          setCardsDisabled(true);
          setIsGameOn(false);
        }}
      />
    </>
  );
}

export default App;
