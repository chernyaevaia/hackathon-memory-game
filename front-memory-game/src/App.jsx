import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard/SingleCard";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import SettingsPanel from "./components/SettingsPanel/SettingsPanel";

const cardImages = [
  {
    src: "src/img/free-icon-family-3900396.png",
    matched: false,
  },
  {
    src: "src/img/free-icon-family-3961230.png",
    matched: false,
  },
  {
    src: "src/img/free-icon-family-6163184.png",
    matched: false,
  },
  // {
  //   src: "src/img/free-icon-family-6385186.png",
  //   matched: false,
  // },
  // {
  //   src: "src/img/free-icon-parenting-11777542.png",
  //   matched: false,
  // },
  // {
  //   src: "src/img/free-icon-family-life-3452380.png",
  //   matched: false,
  // },
  // {
  //   src: "src/img/free-icon-family-6589348.png",
  //   matched: false,
  // },
  // {
  //   src: "src/img/free-icon-family-11009818.png",
  //   matched: false,
  // },
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
