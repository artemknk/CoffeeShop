import style from './FailTransaction.module.css';
import fail from '../../../public/assets/icons/fail.svg';
import React from 'react';

const FailTransaction = ({ onRestart, onBack }) => {
  return (
    <div className={style.failTransaction}>
      <div className={style.failContent}>
        <img className={style.failIcon} src={fail} alt="fail"/>
        <h1>Оплата не прошла</h1>
      </div>
      <div className={style.buttons}>
        <button onClick={onRestart} className={style.restart}>Попробовать ещё раз</button>
        <button onClick={onBack} className={style.back}>Отмена</button>
      </div>
    </div>
  );
};

export default FailTransaction;