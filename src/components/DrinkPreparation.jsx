// DrinkPreparation.jsx
import React, { useState, useEffect } from 'react';
import { emulator } from '../emulator';
const DrinkPreparation = ({ drink, onComplete }) => {
  const [status, setStatus] = useState('Начало приготовления...');

  useEffect(() => {
    const steps = [
      'Нагреваем воду...',
      'Помол кофе...',
      'Приготовление напитка...',
      'Добавление ингредиентов...',
      'Завершение...'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setStatus(steps[currentStep]);
        currentStep++;
      } else {
        clearInterval(interval);
        emulator.Vend(drink.id, (result) => {
          if (result) {
            setTimeout(() => onComplete(), 1000);
          } else {
            setStatus('Ошибка приготовления');
          }
        });
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [drink.id, onComplete]);

  return (
    <div className="preparation">
      <h1>Приготовление {drink.name}</h1>
      <div className="status">{status}</div>
      <div className="progress-bar">
        <div className="progress"></div>
      </div>
    </div>
  );
};

export default DrinkPreparation;