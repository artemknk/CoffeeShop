import style from './CashPayment.module.css';
import React, { useState, useEffect } from 'react';
import { emulator } from '../../emulator';

const CashPayment = ({ drink, onComplete, onBack }) => {
  const [paidAmount, setPaidAmount] = useState(0);
  const [change, setChange] = useState(0);
  const [isPaymentEnabled, setIsPaymentEnabled] = useState(false);

  useEffect(() => {
    // Активируем прием денег при монтировании
    emulator.StartCashin((amount) => {
      setPaidAmount(prev => {
        const newAmount = prev + amount;
        const newChange = newAmount - drink.price;
        setChange(Math.max(0, newChange));
        
        // Разрешаем оплату если внесено достаточно средств
        setIsPaymentEnabled(newAmount >= drink.price);
        
        return newAmount;
      });
    });

    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && ['1','2','3','4','5','6'].includes(e.key)) {
        // Номиналы обрабатываются эмулятором
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      emulator.StopCashin();
    };
  }, [drink.price]);

  const handlePayment = () => {
    if (paidAmount >= drink.price) {
      emulator.StopCashin();
      onComplete();
    }
  };

  const handleCancel = () => {
    emulator.StopCashin();
    onBack();
  };

  return (
    <div className={style.cashPayment}>
      <h1>Оплата наличными</h1>
      <p>Сумма к оплате: {drink.price} ₽</p>
      <p>Внесено: {paidAmount} ₽</p>
      {change > 0 && <p>Сдача: {change} ₽</p>}
      
      <div className={style.paymentControls}>
        <button 
          onClick={handlePayment}
          disabled={!isPaymentEnabled}
          className={isPaymentEnabled ? `${style.active}` : ''}
        >
          Оплатить
        </button>
        <button className={style.cancelButton} onClick={handleCancel}>Отмена</button>
      </div>

      <div className="instructions">
        <p>Для внесения денег используйте:</p>
        <ul>
          <li>Ctrl+Shift+1 - 5 рублей</li>
          <li>Ctrl+Shift+2 - 10 рублей</li>
          <li>Ctrl+Shift+3 - 100 рублей</li>
          <li>Ctrl+Shift+4 - 200 рублей</li>
          <li>Ctrl+Shift+5 - 500 рублей</li>
          <li>Ctrl+Shift+6 - 1000 рублей</li>
        </ul>
        <p>Кнопка "Оплатить" станет активной при внесении достаточной суммы</p>
      </div>
    </div>
  );
};

export default CashPayment;