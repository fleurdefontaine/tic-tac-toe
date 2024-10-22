import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [timer, setTimer] = useState(null);
  const winner = calculateWinner(squares);
  const isDraw = squares.every((square) => square !== null) && !winner;

  useEffect(() => {
    if (winner || isDraw) {
      setTimer(3);
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      const resetGame = setTimeout(() => {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
        setTimer(null);
      }, 3000);

      return () => {
        clearInterval(countdown);
        clearTimeout(resetGame);
      };
    }
  }, [winner, isDraw]);

  const handleClick = (index) => {
    if (squares[index] || winner || isDraw) return;
    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? `Draw!`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-400">
      <h1 className="text-4xl font-bold text-white mb-8">Tic Tac Toe</h1>
      <motion.div
        className="mb-4 text-2xl text-white"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
      >
        {status}
      </motion.div>

      <motion.div
        className="grid grid-cols-3 gap-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </motion.div>

      {timer !== null && (
        <motion.div
          className="mt-4 text-2xl text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Resetting in {timer}...
        </motion.div>
      )}
    </div>
  );
};

const Square = ({ value, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="w-24 h-24 bg-white text-3xl font-bold border-4 border-teal-500 text-teal-600 flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      {value}
    </motion.button>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default App;