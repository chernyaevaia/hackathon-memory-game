import { useEffect, useState } from "react";
import "./App.css";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import SettingsPanel from "./components/SettingsPanel/SettingsPanel";
import { GameField } from "./components/GameField/GameField";
import { CardImages } from "./utils";

function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [cardsDisabled, setCardsDisabled] = useState(true);

  const [cards, setCards] = useState([]);
  const [startAnimation, setStartAnimation] = useState(false);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [turns, setTurns] = useState(0);

  const [fieldSize, setFieldSize] = useState("16");
  const [userName, setUserName] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);

  const [timeControl, setTimeControl] = useState("0");
  const [counter, setCounter] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);

  const [maxTurnsNumber, setMaxTurnsNumber] = useState("10000000000000000");

  const [isWinModalOpen, setIsWinModalOpen] = useState(false);
  const [isFailModalOpen, setIsFailModalOpen] = useState(false);

  const shuffleCards = () => {
    const createUniqueCardsArray = (allCards, endNumber) => {
      return allCards.sort(() => Math.random() - 0.5).slice(0, endNumber);
    };

    const createPairedCardsArray = (uniqueCards) => {
      return [...uniqueCards, ...uniqueCards]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({
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

    if (fieldSize === "16") {
      const cardsForGame = createUniqueCardsArray(CardImages, 8);
      const shuffledCards = createPairedCardsArray(cardsForGame);
      reset(shuffledCards);
    }
    if (fieldSize === "20") {
      const cardsForGame = createUniqueCardsArray(CardImages, 10);
      const shuffledCards = createPairedCardsArray(cardsForGame);
      reset(shuffledCards);
    }
    if (fieldSize === "36") {
      const cardsForGame = createUniqueCardsArray(CardImages, 18);
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

  const onGameStart = () => {
    shuffleCards();
    setIsGameOn(true);
    setCounter(+timeControl * 60);
    setTimeSpent(0);
    setCardsDisabled(false);
    setStartAnimation(true);
  };

  const gameTime =
    Math.floor(timeSpent / 60) +
    ":" +
    (timeSpent % 60 < 10 ? "0" + (timeSpent % 60) : timeSpent % 60);

  return (
    <>
      <div className="App">
        <h1 className="heading">Найди Семью Memory Game</h1>
        <div className="settings-container">
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
        </div>
        <GameField
          cards={cards}
          choiceOne={choiceOne}
          choiceTwo={choiceTwo}
          turns={turns}
          maxTurnsNumber={maxTurnsNumber}
          counter={counter}
          onGameStart={onGameStart}
          handleСardChoice={handleСardChoice}
          startAnimation={startAnimation}
          isGameOn={isGameOn}
          cardsDisabled={cardsDisabled}
          fieldSize={fieldSize}
        />
      </div>

      <ModalWindow
        text="Поздравляем, Вы выиграли!"
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
