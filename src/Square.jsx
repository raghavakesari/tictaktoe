// Square.jsx
import './Square.css';

function Square({ value, onSquareClick, isWinning, disabled }) {
  return (
    <button
      className={`square${isWinning ? ' winning' : ''}${disabled ? ' disabled' : ''}`}
      onClick={onSquareClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
}

export default Square;