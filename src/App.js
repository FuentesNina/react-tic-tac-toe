import Header from './components/Header'
import StartButton from './components/StartButton'
import GameSpace from './components/GameSpace'
import { useState, useEffect } from 'react'

let turn = undefined;
let inProgress = true;
let solutions = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]];

function App() {

  const emptyGame = () => {
    let tiles = [];
    for (let i = 0; i < 9; i++) {
      let tile = {id: i, play: null}
      tiles.push(tile)
    }
    return tiles;
  };

  const [tiles, setTiles] = useState(emptyGame);

  // re-start game
  const reStart = () => {
    setTiles(emptyGame);
    turn = undefined;
    inProgress = true;
  }

  // Define Who's Turn it is
  const changeTurn = () => {
    if (turn === 0) {
      turn = 1;
    } else if (turn === 1) {
      turn = 0;
    } else if (turn === undefined) {
      turn = 0;
    }
  }

  // Change the tiles set after a play
  const updateGame = (i) => {
    if (inProgress === true) {

      changeTurn()

      setTiles(() => {
        return tiles.map(el => {
          return el.id === i ? {id: i, play: turn} : el;
        })
      })

    }
  }

  useEffect(() => setWinner())

  // End Game (winning or draw)
  const setWinner = () => {

    for (let i = 0; i < solutions.length; i++) {
      let solution = solutions[i];
      let index1 = solution[0];
      let index2 = solution[1];
      let index3 = solution[2];

      if (tiles[index1].play === tiles[index2].play && tiles[index2].play === tiles[index3].play) {
        if (tiles[index1].play === 1) {
          turn = null;
          inProgress = false;
          return console.log('X Wins!');
        } else if (tiles[index1].play === 0) {
          turn = null;
          inProgress = false;
          return console.log('O Wins!');
        }
      }
    }

    let remaining = tiles.filter(tile => tile.play === null);

    if (remaining.length === 0) {
      turn = null;
      inProgress = false;
      return console.log('End of Game');

    }
  }


  return (
    <div className="App">
      <Header />
      <StartButton onClick={reStart} />
      <GameSpace  Game={tiles} turn={turn} updateGame={updateGame} />
    </div>
  );
}

export default App;
