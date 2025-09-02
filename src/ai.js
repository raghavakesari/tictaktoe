// ai.js
export function getAIMove(difficulty, board, aiSymbol) {
  switch (difficulty) {
    case 'easy':
      return getRandomMove(board);
    case 'medium':
      return getMediumMove(board, aiSymbol);
    case 'hard':
      return getBestMove(board, aiSymbol);
    default:
      return getRandomMove(board);
  }
}

function getRandomMove(board) {
  const availableMoves = board.map((cell, index) => cell === null ? index : null).filter(val => val !== null);
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
}

function getMediumMove(board, aiSymbol) {
  // First, try to block opponent or win
  const winMove = getWinningMove(board, aiSymbol);
  if (winMove !== -1) return winMove;

  const blockMove = getWinningMove(board, aiSymbol === 'X' ? 'O' : 'X');
  if (blockMove !== -1) return blockMove;

  // Otherwise, random move
  return getRandomMove(board);
}

function getWinningMove(board, symbol) {
  // Check rows, columns, diagonals for winning opportunities
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] === symbol && board[b] === symbol && board[c] === null) return c;
    if (board[a] === symbol && board[c] === symbol && board[b] === null) return b;
    if (board[b] === symbol && board[c] === symbol && board[a] === null) return a;
  }
  return -1;
}

function getBestMove(board, aiSymbol) {
  const opponent = aiSymbol === 'X' ? 'O' : 'X';
  let bestScore = -Infinity;
  let move;

  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = aiSymbol;
      const score = minimax(board, 0, false, aiSymbol, opponent);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function minimax(board, depth, isMaximizing, aiSymbol, opponent) {
  const result = checkWinnerLocal(board);
  if (result !== null) {
    if (result === aiSymbol) return 10 - depth;
    if (result === opponent) return depth - 10;
    return 0; // draw
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = aiSymbol;
        const score = minimax(board, depth + 1, false, aiSymbol, opponent);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = opponent;
        const score = minimax(board, depth + 1, true, aiSymbol, opponent);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

// Helper function for minimax, assumes null for empty
function checkWinnerLocal(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (board.every(cell => cell !== null)) return 'draw';
  return null;
}