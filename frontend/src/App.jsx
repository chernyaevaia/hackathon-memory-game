import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard/SingleCard";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import { Radio } from "antd";
import axios from 'axios'

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
  {
    src: "src/img/free-icon-family-6385186.png",
    matched: false,
  },
  {
    src: "src/img/free-icon-parenting-11777542.png",
    matched: false,
  },
  {
    src: "src/img/free-icon-family-life-3452380.png",
    matched: false,
  },
  {
    src: "src/img/free-icon-family-6589348.png",
    matched: false,
  },
  {
    src: "src/img/free-icon-family-11009818.png",
    matched: false,
  },
];

const timeControlOptions = [
  { label: "без таймера", value: 0 },
  { label: "3 минуты", value: 3 },
  { label: "5 минут", value: 5 },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeControl, setTimeControl] = useState(0);
  const [counter, setCounter] = useState(0);

  // NICKS CODE
  const [players, setPlayers] = useState([])

  const [result, setResult] = useState({name: ''})


// NICKS CODE
  const fetchPlayers = async () => {
    const res = await fetch('http://127.0.0.1:8000/players/')
    const data = await res.json()
    setPlayers(data)
  }

//NICKS CODE
  useEffect(()=>{
    fetchPlayers()
  })
  console.log(players);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const onChangeTimeControl = ({ target: { value } }) => {
    console.log(value);
    setTimeControl(value);
    setCounter(value * 60);
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

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return (
    <>
      <div className="App">
        <h1>Family Match</h1>
        <div className="">
          <p>Установить таймер:</p>
          <Radio.Group
            options={timeControlOptions}
            onChange={onChangeTimeControl}
            value={timeControl}
            optionType="button"
          />
        </div>
        <button
          onClick={() => {
            setDisabled(false);
          }}
        >
          Начать
        </button>
        <button
          onClick={() => {
            shuffleCards();
          }}
        >
          Начать заново
        </button>
        <p>Turns: {turns}</p>
        {counter !== 0 && (
          <div>
            {" "}
            Оставшееся время: {Math.floor(counter / 60)}:{counter % 60}
          </div>
        )}
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

      <h2>Top players</h2>
      <table>
        <tr>
          <th>Place</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
        {players.map((player)=>{
          return <tr key={player.id}>
            <td>{player.id}</td>
            <td>{player.name}</td>
            <td>{player.record}</td>
          </tr>
        })}
      </table>

      <h3>отправить свои результаты</h3>
      <div>
      <input className="call-back-input" type="text" placeholder="Ваше имя"
                   name="name" value={result.name} onChange={e=>{
                    e.preventDefault()
                    setResult(s=>({...s, name: e.target.value}))}}/>
      <button type="submit" onClick={()=>{
        axios.post('http://127.0.0.1:8000/players/', {
          name: `${result.name}`,
          record: `${turns}`
        }).then(function (response){
          console.log(response);}).catch(function (error){
          console.log(error);
      })
      }}>Send data</button>
      </div>

    </>
  );
}

export default App;
