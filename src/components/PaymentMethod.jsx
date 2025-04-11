import React from 'react';

const PaymentMethod = ({ drink, onPaymentMethodSelect, onBack }) => {
  return (
    <div className="payment-method-modal">
      <div className="modal-content">
        <div className="header">
          <h1>Выбор напитка</h1>
          <button className="auth-btn">Вход / регистрация</button>
        </div>

        <div className="drink-details">
          <h2>{drink.name}</h2>
          
          <div className="size-options">
            <h3>Объем:</h3>
            <div className="sizes">
              <button className="active">200 мл</button>
              <button>300 мл</button>
              <button>400 мл</button>
            </div>
          </div>

          <div className="payment-section">
            <div className="total-price">
              <span>Итого:</span>
              <span className="price">{drink.price} ₽</span>
            </div>
            
            <div className="payment-buttons">
              <div className="payment-options">
                <button onClick={() => onPaymentMethodSelect('cash')}>Наличными</button>
                <button onClick={() => onPaymentMethodSelect('card')}>Банковской картой</button>
              </div>
              <button 
                className="back-btn"
                onClick={onBack}
              >
                Назад
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;