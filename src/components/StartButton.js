const StartButton = ({onClick}) => {

    const reStart = () => {
        if (true === window.confirm("Press 'OK' to erase the board and restart the game.")) {
            onClick();
        }
    };

  return (
    <div className="StartButton">
        <button onClick={reStart} style={{cursor: 'pointer'}}>Start New Game</button>
    </div>
  )
}

export default StartButton
