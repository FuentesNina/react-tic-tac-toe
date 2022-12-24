import BoardGame from "./BoardGame"
import CurrentPlayer from './CurrentPlayer'

const GameSpace = ({Game, turn, updateGame }) => {

    return (
    <div>
        <BoardGame Game={Game} updateGame={updateGame} />
        <CurrentPlayer turn={turn}/>
    </div>
  )
}

export default GameSpace
