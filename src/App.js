import Header from './components/Header'
import StartButton from './components/StartButton'
import Settings from './components/Settings'
import GameSpace from './components/GameSpace'
import computerPlay from './utilities/gameLogic'
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
  const [gameType, setGameType] = useState('0');
  const [level, setLevel] = useState('1');
  const [gameSettings, setGameSettings] = useState({gameType: gameType, level: level});

  //Game settings
  const handleShowSettings = () => {
    setShowSettings(!showSettings);
  }
  const handleGameType = (e) => {
    setGameType(e.target.value);
  }
  const handleLevel = (e) => {
    setLevel(e.target.value);
  }

  // re-start game
  const reStart = () => {
    setTiles(emptyGame);
    setTurn(undefined);
    setProgress (true);
    setStatus(undefined);
    setShowSettings(false);
    setGameSettings(gameSettings => ({
      ...gameSettings,
      level: level,
      gameType: gameType
    }));
  }

  // Define Who's Turn it is
  const changeTurn = () => {
    if (turn === 0 || turn === undefined) {
      setTurn(1);
    } else if (turn === 1) {
      setTurn(0)
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

  // Generate and Place computer Move (if applicable)
  const cpuMove = () => {
    if (gameSettings.gameType === '0' && turn === 1) {
      const cpuMoveIndex = computerPlay(tiles, gameSettings.level);

      //freeze game board
      setProgress(false);

      //delay to simulate computer "thinking")
      setTimeout(() => {
        setTiles(() => {
          return tiles.map(el => {
              return el.id === cpuMoveIndex ? {id: cpuMoveIndex, play: 1} : el;
            })
        })

        changeTurn();

        //unfreeze game board
        setProgress(true);
      }, 500);

    }
  };

  // monitors game - set winner/loser & add computer play if applicable
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
    } else {
      cpuMove();
    }
  }

  return (
    <div className="App">
      <Header />
      <Settings showSettings={showSettings}
          handleShowSettings={handleShowSettings}
          gameType={gameType}
          level={level}
          handleGameType={handleGameType}
          handleLevel={handleLevel} />
      <StartButton onClick={reStart} />
      <GameSpace  Game={tiles} turn={turn} updateGame={updateGame} status={status} Progress={progress} />
    </div>
  );
}

export default App;
