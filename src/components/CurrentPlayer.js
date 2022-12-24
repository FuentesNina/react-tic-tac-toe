const CurrentPlayer = ({ turn }) => {

  let currentPlayer = () => {

    if (turn === null) {
      console.log(turn)
      return 'End of Game.';
    } else if (turn === undefined) {
      console.log(turn)
      return 'Click anywhere on the board to start.'
    } else if (turn === 0) {
      console.log(turn)
      return `It's X's turn.`;
    } else if (turn === 1) {
      console.log(turn)
      return `It's O's turn.`;
    }

  }

  // console.log(turn)

    return (
    <div className="CurrentPlayer">
        <p>{currentPlayer()}</p>
    </div>
  )
}

export default CurrentPlayer
