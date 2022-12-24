import Tile from './Tile'

const BoardGame = ({Game, updateGame}) => {

    const tiles = [];

    for (let i = 0; i < 9; i++) {
        tiles.push(<Tile key={Game[i].id} id={Game[i].id} play={Game[i].play} updateGame={updateGame} />);
    }

    return (
        <div className='BoardGame'>
            {tiles}
        </div>
  )
}

export default BoardGame
