import Character from "./Character";
import { useState, useEffect, useCallback } from "react";

function Guess({ word, guess, submitted, onWin }) {
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
    setEntry(formatGuess());
  }, [guess]);

  //runs when submitted changes
  useEffect(() => {
    if (submitted) {
      for (let index = 0; index < entry.length; index++) {
        // Use a regular for loop
        if (word.includes(entry[index])) {
          if (word[index] === entry[index]) {
            updateCharTypes(index, "correct");
          } else {
            updateCharTypes(index, "present");
          }
        } else {
          updateCharTypes(index, "wrong");
        }
        // console.log(charTypes);
      }

      if (entry.join("").toString().toUpperCase() === word.toUpperCase()) {
        onWin();
        setTimeout(() => {
          window.alert("Great! you won!");
        }, 1000);
      }
      // console.log(charTypes);
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
