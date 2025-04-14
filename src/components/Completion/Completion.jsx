// Completion.jsx
import style from './Completion.module.css';
import React from 'react';
import complete from '../../../public/assets/icons/complete.svg';
const Completion = ({ onRestart }) => {
  return (
    <div className={style.completion}>
      <img src={complete} alt="Drink is ready" />
      <h1>Напиток готов!</h1>
      <p>вы можете забрать его</p>
      <button className={style.restart} onClick={onRestart}>Заказать еще</button>
    </div>
  );
};

export default Completion;