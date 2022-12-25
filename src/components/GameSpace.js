import BoardGame from "./BoardGame"
import CurrentPlayer from './CurrentPlayer'
import EndOfGame from './EndOfGame'

const GameSpace = ({Game, turn, updateGame, status, Progress }) => {

    return (
    <div className='GameSpace'>
        <CurrentPlayer turn={turn} />
        <BoardGame Game={Game} updateGame={updateGame} />
        <EndOfGame status={status} inProgress={Progress} />
    </div>
  )
}

export default GameSpace
