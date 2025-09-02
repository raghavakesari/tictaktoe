// GameControls.jsx
import './GameControls.css';
function GameControls({
  mode,
  setMode,
  difficulty,
  setDifficulty,
  scores,
  onResetGame,
  onNewGame,
  onShowHelp,
  gameOver,
  winner,
  currentPlayer,
  isAIThinking
}) {
  return (
    <div className="game-controls">
      <div className="mode-selection">
        <label>
          <input
            type="radio"
            value="passnplay"
            checked={mode === 'passnplay'}
            onChange={(e) => setMode(e.target.value)}
          />
          Pass-and-Play
        </label>
        <label>
          <input
            type="radio"
            value="ai"
            checked={mode === 'ai'}
            onChange={(e) => setMode(e.target.value)}
          />
          Play with Computer
        </label>
      </div>

      {mode === 'ai' && (
        <div className="difficulty-selection">
          <label>Difficulty:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      )}

      <div className="scores">
        <p>Player X Wins: {scores.X}</p>
        <p>Player O Wins: {scores.O}</p>
        <p>Draws: {scores.draws}</p>
      </div>

      <div className={`status ${winner ? 'winner' : ''}`}>
        {winner ? `Winner: ${winner}!` : gameOver ? 'It\'s a draw!' : isAIThinking ? 'Computer is thinking...' : `Current Player: ${currentPlayer}`}
      </div>

      <div className="buttons">
        <button onClick={onResetGame} disabled={!gameOver && !winner}>Reset Game</button>
        <button onClick={onNewGame}>New Game</button>
        <button onClick={onShowHelp}>Help</button>
      </div>
    </div>
  );
}

export default GameControls;