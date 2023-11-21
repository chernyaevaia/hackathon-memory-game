import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard/SingleCard";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import SettingsPanel from "./components/SettingsPanel/SettingsPanel";

const cardImages = [
  {
    src: "src/img/family1.jpg",
    matched: false,
  },
  {
    src: "src/img/family2.jpg",
    matched: false,
  },
  {
    src: "src/img/family3.jpg",
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
    src: "src/img/family17.jpg",
    matched: false,
  },
  {
    src: "src/img/family18.jpg",
    matched: false,
  },
  {
    src: "src/img/family19.png",
    matched: false,
  },
  {
    src: "src/img/family20.png",
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

  const [fieldSize, setFieldSize] = useState(16);
  const [userName, setUserName] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);

  const [timeControl, setTimeControl] = useState(0);
  const [counter, setCounter] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);

  const [maxTurnsNumber, setMaxTurnsNumber] = useState(10000000000000000);

  const [isWinModalOpen, setIsWinModalOpen] = useState(false);
  const [isFailModalOpen, setIsFailModalOpen] = useState(false);

  const shuffleCards = () => {
    const createUniqueCardsArray = (allCards, endNumber) => {
      return allCards.sort(() => Math.random() - 0.5).slice(0, endNumber);
    };

    const createPairedCardsArray = (uniqueCards) => {
      return [...uniqueCards, ...uniqueCards].sort(() => Math.random() - 0.5).map((card) => ({
        ...card,
        id: Math.random(),
      }));
    };

    const reset = (shuffledCards) => {
      setChoiceOne(null);
      setChoiceTwo(null);
      setCards(shuffledCards);
      setTurns(0);
    };

    if (fieldSize === 16) {
      const cardsForGame = createUniqueCardsArray(cardImages, 8);
      const shuffledCards = createPairedCardsArray(cardsForGame);
      reset(shuffledCards);
    }
    if (fieldSize === 20) {
      const cardsForGame = createUniqueCardsArray(cardImages, 10);
      const shuffledCards = createPairedCardsArray(cardsForGame);
      reset(shuffledCards);
    }
    if (fieldSize === 36) {
      const cardsForGame = createUniqueCardsArray(cardImages, 18);
      const shuffledCards = createPairedCardsArray(cardsForGame);
      reset(shuffledCards);
    }
  };

  const handleСardChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const onChangeTimeControl = ({ target: { value } }) => {
    setTimeControl(value);
  };

  const onChangeFieldSize = ({ target: { value } }) => {
    setFieldSize(value);
  };

  const onChangeTurnsNumber = ({ target: { value } }) => {
    setMaxTurnsNumber(value);
  };

  const onChangeUserName = ({ target: { value } }) => {
    setUserName(value);
  };

  const onSubmitName = () => {
    setShowWelcome(true);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    shuffleCards();
  }, [fieldSize]);

  useEffect(() => {
    if (isGameOn && counter === 0) {
      setIsFailModalOpen(true);
      setIsGameOn(false);
    }
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    const timer =
      isGameOn && setInterval(() => setTimeSpent(timeSpent + 1), 1000);
    return () => clearInterval(timer);
  }, [timeSpent, isGameOn]);

  useEffect(() => {
    if (turns > maxTurnsNumber) {
      setIsFailModalOpen(true);
      setIsGameOn(false);
    }
  }, [turns]);

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
            setIsGameOn(false);
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

  const gridStyle =
    fieldSize === 16
      ? "card-grid-16"
      : fieldSize === 20
      ? "card-grid-20"
      : "card-grid-36";

  const gameTime = Math.floor(timeSpent / 60) + ":" + (timeSpent % 60);

  return (
    <>
      <div className="App">
        <h1>Найди Семью Memory Game</h1>
        <SettingsPanel
          onChangeTimeControl={onChangeTimeControl}
          timeControl={timeControl}
          fieldSize={fieldSize}
          disableChoice={isGameOn}
          onChangeFieldSize={onChangeFieldSize}
          onChangeName={onChangeUserName}
          userName={userName}
          onSubmitName={onSubmitName}
          showWelcome={showWelcome}
          onChangeTurnsNumber={onChangeTurnsNumber}
          turnsNumber={maxTurnsNumber}
        />
        <div className="game-topbar">
          <p>
            Turns: {turns}
            {(maxTurnsNumber === 20 || maxTurnsNumber === 40) &&
              ` из ${maxTurnsNumber}`}
          </p>
          <button
            onClick={() => {
              shuffleCards();
              setIsGameOn(true);
              setCounter(timeControl * 60);
              setTimeSpent(0);
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
        <div className={gridStyle}>
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
        turns={turns}
        timeSpent={gameTime}
        open={isWinModalOpen}
        onClose={() => {
          setTurns(0);
          setIsWinModalOpen(false);
          setCardsDisabled(true);
        }}
      />

      <ModalWindow
        text={
          turns > maxTurnsNumber
            ? "Количество ходов закончилось - удачи в следующий раз!"
            : "Время истекло - удачи в следующий раз!"
        }
        turns={turns}
        timeSpent={gameTime}
        open={isFailModalOpen}
        onClose={() => {
          setTurns(0);
          setIsFailModalOpen(false);
          setCardsDisabled(true);
        }}
      />
    </>
  );
}

export default App;
