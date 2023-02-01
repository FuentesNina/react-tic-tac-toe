import Header from './components/Header'
import StartButton from './components/StartButton'
import Settings from './components/Settings'
import GameSpace from './components/GameSpace'
import { useState, useEffect } from 'react'



function App() {

  const solutions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]];

  const emptyGame = () => {
    let tiles = [];
    for (let i = 0; i < 9; i++) {
      let tile = {id: i, play: null}
      tiles.push(tile)
    }
    return tiles;
  };

  const [tiles, setTiles] = useState(emptyGame);
  const [status, setStatus] = useState();
  const [turn, setTurn] = useState();
  const [progress, setProgress] = useState(true);
  const [showSettings, setShowSettings] = useState(false);


  const handleShowSettings = () => {
    setShowSettings(!showSettings);
  }

  // re-start game
  const reStart = () => {
    setTiles(emptyGame);
    setTurn(() => undefined);
    setProgress (() => true);
    setStatus(() => undefined);
    setShowSettings(false);
  }

  // Define Who's Turn it is
  const changeTurn = () => {
    if (turn === 0) {
      setTurn(() => 1);
    } else if (turn === 1) {
      setTurn(() => 0)
    } else if (turn === undefined) {
      setTurn(() => 1)
    }
  }

  // Change the tiles set after a play
  const updateGame = (i) => {

    if (progress === true) {
      changeTurn()

      setTiles(() => {
        return tiles.map(el => {
          if (turn === undefined) {
            return el.id === i ? {id: i, play: 0} : el;
          } else {
            return el.id === i ? {id: i, play: turn} : el;
          }
        })
      })


    }
  }

  useEffect(() => setWinner());

  // End Game (winning or draw)
  const setWinner = () => {

    for (let i = 0; i < solutions.length; i++) {
      let solution = solutions[i];
      let index1 = solution[0];
      let index2 = solution[1];
      let index3 = solution[2];

      if (tiles[index1].play === tiles[index2].play && tiles[index2].play === tiles[index3].play) {
        if (tiles[index1].play === 1) {
          setProgress (() => false);
          setStatus(() => 'X Wins!');
          setTurn(() => null);
          return () => {};
        } else if (tiles[index1].play === 0) {
          setTurn(() => null)
          setProgress (() => false);
          setStatus(() => 'O Wins!');
          return () => {};
        }
      }
    }

    let remaining = tiles.filter(tile => tile.play === null);

    if (remaining.length === 0) {
      setTurn(() => null)
      setProgress (() => false);
      setStatus(() => `O-X Draw\n-\nEnd of Game`);
      return () => {};
    }
  }

  return (
    <div className="App">
      <Header />
      <Settings showSettings={showSettings} handleShowSettings={handleShowSettings} />
      <StartButton onClick={reStart} />
      <GameSpace  Game={tiles} turn={turn} updateGame={updateGame} status={status} Progress={progress} />
    </div>
  );
}

export default App;
