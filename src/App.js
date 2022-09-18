import "./App.css";
import React from "react";
import Dice from "./components/dice.js";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
//import useWindowSize from 'react-use/lib/useWindowSize'

export default function App() {
  /**
   * function for create a new dice
   */
  let allNewDice = () => {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      let randNumber = Math.ceil(Math.random() * 5);
      arr.push({
        value: randNumber,
        isHeld: false,
        id: nanoid()
      });
    }
    return arr;
  };

  /**
   * state of the app
   */
  const [tenzies, setTenzies] = React.useState(false);
  const [state, setState] = React.useState(allNewDice());

  /**
   *  function that hold the state of each number that is clicked by the user
   */
  function hold(id) {
    setState(prevData => {
      let newArr = prevData.map(item => {
        return item.id === id ? { ...item, isHeld: !item.isHeld } : { ...item };
      });
      // let newArr = [];
      // for (let i = 0; i < prevData.length; i++) {
      //   if (prevData[i].id === id) {
      //     newArr.push({
      //       ...prevData[i],
      //       isHeld: !prevData[i].isHeld
      //     });
      //   } else {
      //     newArr.push({
      //       ...prevData[i]
      //     });
      //   }
      // }
      return newArr;
    });
  }

  /**
 * mapping the dice element
 */

  let diceElement = state.map(item => {
    return (
      <Dice
        tenzies={tenzies}
        handleHold={hold}
        key={item.id}
        id={item.id}
        value={item.value}
        isHeld={item.isHeld}
      />
    );
  });

  /**
   * function that roll the dice
   */
  let handleClick = () => {
    if (tenzies) {
      setState(allNewDice());
    } else {
      let arr = [];

      setState(prevData => {
        let arr = prevData.map(item => {
          let randNumber = Math.ceil(Math.random() * 6);
          return item.isHeld ? { ...item } : { ...item, value: randNumber };
        });
        return arr;
      });
    }
  };

  /**
   * this function is called when the state is changed
   */
  React.useEffect(() => {
    let numbers = state.map(item => item.value);
    let equal = numbers.every(item => item === numbers[0]);
    let bool = state.map(item => item.isHeld);
    let isHeld = bool.every(item => item === true);
    if (equal && isHeld) {
      setTenzies(true);
      console.log("You win");
    } else {
      setTenzies(false);
      console.log("You lose");
    }
  }, state);

  /**
   * this section will rendered on the page
   */
  return (
    <React.Fragment>
      <main>
        <div className="details">
          {tenzies && (
            <Confetti height={window.innerHeight} width="450px" />
          )}
          <h1>Tenzies</h1>
          <h4>
            Roll until all dice are the same,click each die to freeze it at its
            current value between rolls.
          </h4>
        </div>
        <div className="diceContainer">{diceElement}</div>
        <button onClick={handleClick} className="rollButton">
          {tenzies ? "New Game" : "Roll"}
        </button>
        <p className="author">Hasanzadeh</p>
      </main>
    </React.Fragment>
  );
}
