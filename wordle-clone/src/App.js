import "./App.css";
import Guess from "./Components/Guess";
import { useState, useEffect, useCallback } from "react";
import Submit from "./Components/Submit";

function App() {
  const word = "hello";

  const [won, setWon] = useState(false);

  const [guesses, setGuesses] = useState([
    { id: 1, value: "" },
    { id: 2, value: "" },
    { id: 3, value: "" },
    { id: 4, value: "" },
    { id: 5, value: "" },
    { id: 6, value: "" },
  ]);

  const [submits, setSubmits] = useState([
    { id: 1, value: false },
    { id: 2, value: false },
    { id: 3, value: false },
    { id: 4, value: false },
    { id: 5, value: false },
    { id: 6, value: false },
  ]);

  const [guessNum, setGuessNum] = useState(0);

  function isAlphabetic(input) {
    return /^[a-zA-Z]+$/.test(input);
  }

  const onSubmit = () => {
    let updatedSubmits = [...submits];
    updatedSubmits[guessNum] = { ...submits[guessNum], value: true };
    setSubmits(updatedSubmits);
    if (guessNum < 5) {
      const updatedGuessNum = guessNum + 1;
      setGuessNum(updatedGuessNum);
    } else {
      if (!won) {
        setTimeout(() => {
          window.alert("Unlucky! The word was " + word);
        }, 100);
      }
    }
  };

  const onWin = () => {
    setGuessNum(7);
    setWon(true);
  };

  const updateGuess = useCallback((input, index) => {
    setGuesses((prevGuesses) => {
      const newGuesses = [...prevGuesses];
      newGuesses[index] = { ...newGuesses[index], value: input };
      return newGuesses;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (guessNum < 6) {
        if (
          event.key.length === 1 &&
          guesses[guessNum].value.length < 5 &&
          isAlphabetic(event.key)
        ) {
          updateGuess(guesses[guessNum].value + event.key, guessNum);
        } else if (event.key === "Backspace") {
          if (guesses[guessNum].value.length > 1) {
            let updatedGuess = guesses[guessNum].value.slice(0, -1);

            updateGuess(updatedGuess, guessNum);
          } else {
            updateGuess("", guessNum);
          }
        }
      }
    };

    // Attach the event listener
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [guesses, updateGuess, guessNum]);

  return (
    <>
      <h1>Wordle</h1>
      <div className="wordle-grid">
        {guesses.map((guess, index) => (
          <Guess
            key={guess.id}
            word={word}
            guess={guess.value}
            submitted={submits[index].value}
            onWin={onWin}
          />
        ))}
      </div>
      <Submit onSubmit={onSubmit} />
    </>
  );
}

export default App;
