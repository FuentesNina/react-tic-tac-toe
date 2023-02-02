const EndOfGame = ({ status, inProgress }) => {
   let show = inProgress || status === undefined ? 'none' : 'flex';
   console.log(status)

   return (
    <div style={{display: show}} className='EndOfGame' >
        <h1>{status}</h1>
    </div>
  )
}

export default EndOfGame
