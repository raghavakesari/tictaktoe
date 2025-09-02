// Board.jsx
import Square from './Square';
import './Board.css';

function Board({ squares, onSquareClick, winningSquares, gameOver, mode, currentPlayer, winner }) {
  const renderSquare = (i) => (
    <Square
      key={i}
      value={squares[i]}
      onSquareClick={() => onSquareClick(i)}
      isWinning={winningSquares && winningSquares.includes(i)}
      disabled={gameOver || winner || squares[i] !== null || (mode === 'ai' && currentPlayer === 'O')}
    />
  );

  const boardRows = [];
  for (let row = 0; row < 3; row++) {
    const rowSquares = [];
    for (let col = 0; col < 3; col++) {
      const index = row * 3 + col;
      rowSquares.push(renderSquare(index));
    }
    boardRows.push(
      <div key={row} className="board-row">
        {rowSquares}
      </div>
    );
  }

  return <div className="board">{boardRows}</div>;
}

export default Board;