// Completion.jsx
import React from 'react';

const Completion = ({ drink, onRestart }) => {
  return (
    <div className="completion">
      <h1>Ваш {drink.name} готов!</h1>
      <p>Приятного аппетита!</p>
      <button onClick={onRestart}>Заказать еще</button>
    </div>
  );
};

export default Completion;