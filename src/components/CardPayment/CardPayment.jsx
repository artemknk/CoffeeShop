// CardPayment.jsx
import style from './CardPayment.module.css';
import React, { useState, useEffect } from 'react';
import { emulator } from '../../emulator';
const CardPayment = ({ drink, onComplete, onBack }) => {
  console.log('Для эмуляции оплаты нажмите Ctrl+4');
  console.log('Для отмены операции нажмите Ctrl+5');

  const [status, setStatus] = useState('Приложите карту к терминалу');
  
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === '4') {
        emulator.BankCardPurchase(
          drink.price,
          (result) => {
            if (result) {
              setStatus('Оплата успешна');
              setTimeout(() => onComplete(), 2000);
            } else {
              setStatus('Ошибка оплаты');
            }
          },
          (message) => setStatus(message)
        );
      }
      if (e.ctrlKey && e.key === '5') {
        emulator.BankCardCancel();
        setStatus('Операция отменена');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [drink.price, onComplete]);

  return (
    <div className={style.cardPayment}>
      <h1>Оплата картой</h1>
      <p>Сумма к оплате: {drink.price} ₽</p>
      <img className={style.cardImg} src="./src/assets/icons/card-icon.svg" alt="" />
      <div className={style.status}>{status}</div>
      <button className={style.backButton} onClick={onBack}>Отмена</button>
    </div>
  );
};

export default CardPayment;