import "./App.css";
import Guess from "./Components/Guess";
import { useState, useEffect, useCallback } from "react";
import Submit from "./Components/Submit";

function App() {
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatedCharIndex, setUpdatedCharIndex] = useState(-1);

  const url =
    "https://random-word-by-api-ninjas.p.rapidapi.com/v1/randomword?type=verb";

  useEffect(() => {
    const maxAttempts = 10;
    let attempts = 0;

    setLoading(true);

    const fetchWord = async (attempts) => {
      if (attempts >= maxAttempts) {
        console.log("attempts execeed 10!");
        return;
      }

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "59f99a53b4msh38753797affb843p116dc4jsn317d1aebcd78",
            "x-rapidapi-host": "random-word-by-api-ninjas.p.rapidapi.com",
          },
        });
        const result = await response.json();
        console.log(result.word[0]);
        let requestedWord = result.word[0];
        if (requestedWord && requestedWord.length === 5) {
          setWord(result.word[0]);
          setLoading(false);
          console.log("five letter word found!");
        } else {
          fetchWord(attempts + 1);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchWord(attempts);
  }, [url]);

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
    }
  };

  const onWin = () => {
    setGuessNum(7);
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
          // eslint-disable-next-line
          setUpdatedCharIndex(guesses[guessNum].value.length);
        } else if (event.key === "Backspace") {
          // eslint-disable-next-line
          setUpdatedCharIndex(-1);
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
        {!loading ? (
          guesses.map((guess, index) => (
            <Guess
              index={index}
              guessNum={guessNum}
              key={guess.id}
              word={word}
              guess={guess.value}
              submitted={submits[index].value}
              onWin={onWin}
              updatedCharIndex={updatedCharIndex}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Submit onSubmit={onSubmit} />
    </>
  );
}

export default App;
