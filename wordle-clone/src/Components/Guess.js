import Character from "./Character";
import { useState, useEffect, useCallback } from "react";

function Guess({
  index,
  guessNum,
  word,
  guess,
  submitted,
  onWin,
  updatedCharIndex,
}) {
  const [charTypes, setCharTypes] = useState(["", "", "", "", ""]);

  const [entry, setEntry] = useState([" ", " ", " ", " ", " "]);

  const updateCharTypes = useCallback((index, type) => {
    setCharTypes((prevCharTypes) => {
      let updatedCharTypes = [...prevCharTypes];
      updatedCharTypes[index] = type; // Correct assignment here
      return updatedCharTypes;
    });
  }, []);

  // runs when guess changes
  useEffect(() => {
    // Update characters whenever guess changes
    const updatedCharacters = guess.split("").map((char, index) => ({
      id: index + 1,
      value: char,
    }));

    const formatGuess = () => {
      let values = [];

      for (let i = 0; i < 5; i++) {
        if (updatedCharacters.length > i) {
          values.push(updatedCharacters[i].value);
        } else {
          values.push(" ");
        }
      }
      return values;
    };
    // eslint-disable-next-line
    updateCharTypes(updatedCharIndex, "pop");
    setTimeout(() => {
      // eslint-disable-next-line
      updateCharTypes(updatedCharIndex, "");
    }, 200);
    setEntry(formatGuess());
  }, [guess, updateCharTypes]); // eslint-disable-line react-hooks/exhaustive-deps

  //runs when submitted changes
  useEffect(() => {
    const animateCharacters = (index, type) => {
      updateCharTypes(index, "flip");
      setTimeout(() => {
        updateCharTypes(index, type);
      }, 490);
    };

    if (submitted) {
      for (let index = 0; index < entry.length; index++) {
        setTimeout(() => {
          // Use a regular for loop
          if (word.includes(entry[index])) {
            if (word[index] === entry[index]) {
              animateCharacters(index, "correct");
            } else {
              animateCharacters(index, "present");
            }
          } else {
            //updateCharTypes(index, "flip");
            animateCharacters(index, "wrong");
          }
        }, 100 * index);
      }

      if (entry.join("").toString().toUpperCase() === word.toUpperCase()) {
        onWin();
        setTimeout(() => {
          window.alert("Great! you won!");
        }, 1000);
      } else if (guessNum === 5 && guessNum === index) {
        onWin();
        setTimeout(() => {
          window.alert("You lose! the word was " + word);
        }, 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted, updateCharTypes]); // Only `submitted` in the dependency array

  return (
    <div className="guess">
      {entry.map((char, index) => (
        <Character key={index} char={char} type={charTypes[index]} />
      ))}
    </div>
  );
}

export default Guess;
