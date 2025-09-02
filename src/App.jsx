// App.jsx
import { useState, useEffect } from 'react';
import Board from './Board';
import GameControls from './GameControls';
import Modal from './Modal';
import { getAIMove } from './ai';
import './App.css';

const WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6] // diagonals
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [mode, setMode] = useState('passnplay');
  const [difficulty, setDifficulty] = useState('easy');
  const [winner, setWinner] = useState(null);
  const [winningSquares, setWinningSquares] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [isAIThinking, setIsAIThinking] = useState(false);

  const checkWinner = (newBoard) => {
    for (let pattern of WIN_PATTERNS) {
      const [a, b, c] = pattern;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return { winner: newBoard[a], winningSquares: pattern };
      }
    }
    if (newBoard.every(cell => cell !== null)) {
      return { winner: 'draw', winningSquares: null };
    }
    return null;
  };

  const handleSquareClick = (index, isAiMove = false) => {
    if (board[index]) return;
    if (!isAiMove && gameOver) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningSquares(result.winningSquares);
      setGameOver(true);
      if (result.winner !== 'draw') {
        setScores(prevScores => ({
          ...prevScores,
          [result.winner]: prevScores[result.winner] + 1
        }));
      } else {
        setScores(prevScores => ({
          ...prevScores,
          draws: prevScores.draws + 1
        }));
      }
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  useEffect(() => {
    if (mode === 'ai' && currentPlayer === 'O' && !winner && !gameOver && !isAIThinking) {
      setIsAIThinking(true);
      setTimeout(() => {
        const aiMove = getAIMove(difficulty, board, 'O');
        if (aiMove !== undefined && board[aiMove] === null) {
          handleSquareClick(aiMove, true);
        }
        setIsAIThinking(false);
      }, 500); // Simulate thinking time
    }
  }, [board, currentPlayer, winner, gameOver, isAIThinking, mode, difficulty]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningSquares(null);
    setGameOver(false);
  };

  const newGame = () => {
    resetGame();
    setScores({ X: 0, O: 0, draws: 0 });
  };

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  return (
    <div className="app">
      <h1>Tic-Tac-Toe</h1>
      <Board
        squares={board}
        onSquareClick={handleSquareClick}
        winningSquares={winningSquares}
        gameOver={gameOver}
        mode={mode}
        currentPlayer={currentPlayer}
        winner={winner}
      />
      <GameControls
        mode={mode}
        setMode={setMode}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        scores={scores}
        onResetGame={resetGame}
        onNewGame={newGame}
        onShowHelp={toggleHelp}
        gameOver={gameOver}
        winner={winner}
        currentPlayer={currentPlayer}
        isAIThinking={isAIThinking}
      />
      <Modal isOpen={showHelp} onClose={toggleHelp}>
        <h2>How to Play Tic-Tac-Toe</h2>
        <p>The goal is to get three of your markers (X or O) in a row - horizontally, vertically, or diagonally.</p>
        <p><strong>Pass-and-Play:</strong> Take turns with another player on the same device.</p>
        <p><strong>Play with Computer:</strong> Play against the AI at different difficulty levels:</p>
        <ul>
          <li><strong>Easy:</strong> Random moves</li>
          <li><strong>Medium:</strong> Blocks winning moves and tries to win</li>
          <li><strong>Hard:</strong> Optimal play using minimax algorithm</li>
        </ul>
        <p>Click the squares to make your move. X always goes first.</p>
      </Modal>
    </div>
  );
}

export default App;
