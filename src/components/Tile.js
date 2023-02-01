import { FaTimes } from 'react-icons/fa'
import { FaRegCircle } from "react-icons/fa"

let icon = null;

const Tile = ({id, play, updateGame}) => {

    const onClick = () => {
        if (play === null) {
            updateGame(id);
        }
    }


    if (play === 1) {
        icon = <FaTimes />;
    } else if (play === 0) {
        icon = <FaRegCircle />;
    } else {
        icon = play;
    };

    return (
    <div className='Tile' onClick={onClick}>
        {icon}
    </div>
  )
}

export default Tile
