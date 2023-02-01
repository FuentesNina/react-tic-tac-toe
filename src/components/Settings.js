import React from 'react';
import { useState } from 'react';

const Settings = ({showSettings, handleShowSettings}) => {

    const [gameType, setGameType] = useState('0');
    const [level, setLevel] = useState('0');

    const handleGameType = (e) => {
        setGameType(e.target.value);
    }

    const handleLevel = (e) => {
        setLevel(e.target.value);
    }

  return (
    <div className='Settings'>
        {showSettings === false ?
        <button className='showSettings' onClick={handleShowSettings}>Game Settings</button>
        :
        <>
        <button className='showSettings' onClick={handleShowSettings}>Close Game Settings</button>
        <div className='buttonGroup'>
            <button className={`buttonGroupStart ${gameType === '0' && ' active'}`} name='soloGame' value={0} onClick={handleGameType}>Solo game (vs. AI)</button>
            <button className={`buttonGroupEnd ${gameType === '1' && ' active'}`} name='2players' value={1} onClick={handleGameType}>2-Player game</button>
        </div>
        {gameType === '0' &&
            <div className='buttonGroup'>
                <button className={`buttonGroupStart ${level === '0' && ' active'}`} name='easyGame' value={0} onClick={handleLevel}>Easy</button>
                <button className={`buttonGroupMiddle ${level === '1' && ' active'}`} name='mediumGame' value={1} onClick={handleLevel}>Medium</button>
                <button className={`buttonGroupEnd ${level === '2' && ' active'}`} name='hardGame' value={2} onClick={handleLevel}>Unbeatable</button>
            </div>
        }
        </>
        }



    </div>
  )
}

export default Settings
