import style from './CardPayment.module.css';
import React, { useState, useEffect } from 'react';
import Card from '../../../public/assets/icons/card-icon.svg';
import { emulator } from '../../emulator';
import FailTransaction from '../FailTransaction/FailTransaction'

const CardPayment = ({ drink, onComplete, onBack }) => {
  const [status, setStatus] = useState('Приложите карту к терминалу');
  const [paymentFailed, setPaymentFailed] = useState(false);
  
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
              setPaymentFailed(true);
            }
          },
          (message) => setStatus(message)
        );
      }
      if (e.ctrlKey && e.key === '5') {
        emulator.BankCardCancel();
        setStatus('Операция отменена');
        setPaymentFailed(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [drink.price, onComplete]);

  if (paymentFailed) {
    return (
      <FailTransaction 
        onRestart={() => setPaymentFailed(false)} 
        onBack={onBack}
      />
    );
  }

  return (
    <div className={style.cardPayment}>
      <p>Сумма к оплате: {drink.price} ₽</p>
      <div className={style.card}>
        <img className={style.cardImg} src={Card} alt="card" />
        <div className={style.status}>{status}</div>
      </div>
      <button className={style.backButton} onClick={onBack}>Отмена</button>
      <div className={style.instructions}>
        <p>Для эмуляции оплаты нажмите Ctrl+4</p>
        <p>Для отмены операции нажмите Ctrl+5</p>
        <p>Эмуляция ошибки оплаты. После старта оплаты нажмите Ctrl+Ecs</p>
      </div>
    </div>
  );
};

export default CardPayment;