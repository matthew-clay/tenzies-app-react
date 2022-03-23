import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

import "./App.css";
import Die from "./Die";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  // console.log("component rendered...");

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function generateDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const numOfDice = 10;
    const newDiceArr = [];
    for (let i = 0; i < numOfDice; i++) {
      newDiceArr.push(generateDie());
    }
    return newDiceArr;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => (!die.isHeld ? generateDie() : die))
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main className="container">
      {tenzies && <Confetti />}
      <div className="tenzies-info">
        <h1 className="title">Tenzies App</h1>
        <p className="description">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="dice-container">{diceElements}</div>
      <button className="btn" onClick={rollDice}>
        {!tenzies ? "Roll" : "New Game"}
      </button>
    </main>
  );
}

export default App;
