const CurrentPlayer = ({ turn }) => {

  let currentPlayer = () => {

    if (turn === undefined) {
      return 'Click anywhere on the board to start.'
    } else if (turn === 1) {
      return `It's X's turn.`;
    } else if (turn === 0) {
      return `It's O's turn.`;
    } else if (turn === null) {
      return 'End of Game.'
    }

  }

    return (
    <div className="CurrentPlayer">
        <p>{currentPlayer()}</p>
    </div>
  )
}

export default CurrentPlayer
