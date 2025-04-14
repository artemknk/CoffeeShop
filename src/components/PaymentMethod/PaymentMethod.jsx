import style from './PaymentMethod.module.css';
import React from 'react';

const PaymentMethod = ({ drink, onPaymentMethodSelect, onBack }) => {
  return (
    <div className={style.paymentMethodModal}>
                <button 
            className={style.backButton}
            onClick={onBack}
            >
              <p>
                +
              </p>
          </button>
      <div className={style.paymentMethodContent}>
        <div className={style.drinkDetails}>
          <h2>{drink.name}</h2>
            <img src={drink.image} alt={drink.name} />
            {/* <div className="size-options">
              <h3>Объем:</h3>
              <div className="sizes">
                <button className="active">200 мл</button>
                <button>300 мл</button>
                <button>400 мл</button>
              </div>
            </div> */}
              <div className={style.totalPrice}>
                <span>Итого: </span>
                <span className={style.price}>{drink.price}₽</span>
              </div> 

          </div>
          <div className={style.paymentButtons}>
            <button onClick={() => onPaymentMethodSelect('cash')}>Наличными</button>
            <button onClick={() => onPaymentMethodSelect('card')}>Банковской картой</button>
          </div>
      </div>
    </div>
  );
};

export default PaymentMethod;