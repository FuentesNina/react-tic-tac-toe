import BoardGame from "./BoardGame"
import CurrentPlayer from './CurrentPlayer'

const GameSpace = ({Game, turn, updateGame }) => {

    return (
    <div>
        <CurrentPlayer turn={turn}/>
        <BoardGame Game={Game} updateGame={updateGame} />
    </div>
  )
}

export default GameSpace
