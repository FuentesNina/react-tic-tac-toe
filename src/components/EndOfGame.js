const EndOfGame = ({ status, inProgress }) => {
   let show = inProgress ? 'none' : 'flex';

   return (
    <div style={{display: show}} className='EndOfGame' >
        <h1>{status}</h1>
    </div>
  )
}

export default EndOfGame
