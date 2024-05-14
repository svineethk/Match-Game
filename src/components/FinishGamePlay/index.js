import './index.css'

const FinishGamePlay = props => {
  const {score, playRematch} = props

  const playAgainMatch = () => {
    playRematch()
  }

  return (
    <div className="end-game-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
        alt="trophy"
        className="trophy"
      />
      <p>YOUR SCORE</p>
      <h1>{score}</h1>
      <button
        type="button"
        className="play-again-button"
        onClick={playAgainMatch}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
          alt="reset"
          className="reset-image"
        />
        Play Again
      </button>
    </div>
  )
}

export default FinishGamePlay
