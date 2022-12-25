const EndOfGame = ({ status, inProgress }) => {
   let show = inProgress ? 'none' : 'flex';

    let result = () => {
        if (inProgress.includes('\n')){
            return inProgress.split('\n').map(str => <p>{str}</p>);
        } else {
            return inProgress;
        }
    }

   return (
    <div style={{display: show}} className='EndOfGame' >
        <h1>{status}</h1>
    </div>
  )
}

export default EndOfGame
