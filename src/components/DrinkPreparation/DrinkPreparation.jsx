import style from './DrinkPreparation.module.css';
import React, { useState, useEffect } from 'react';
import { emulator } from '../../emulator';

const DrinkPreparation = ({ drink, onComplete }) => {
  const [status, setStatus] = useState('Начало приготовления...');
  const [progress, setProgress] = useState(0);

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
        setProgress((currentStep + 1) / steps.length);
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

  const radius = 190;
  const stroke = 2;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = 2 * Math.PI * normalizedRadius;
  
  // Ограничиваем прогресс до 99.99%
  const adjustedProgress = Math.min(progress, 0.9999);
  const strokeDashoffset = circumference - adjustedProgress * circumference;
  
  // Вычисляем угол для точки
  const angle = 2 * Math.PI * adjustedProgress - Math.PI / 2;
  const dotRadius = 6;
  const dotCx = radius + normalizedRadius * Math.cos(angle);
  const dotCy = radius + normalizedRadius * Math.sin(angle);
  
  return (
    <div className={style.drinkPreparation}>
      <h1>Приготовление {drink.name}</h1>
      <div className={style.progressWrapper}>
        <svg
          height={radius * 2}
          width={radius * 2}
          className={style.progressCircle}
        >
          <circle
            stroke="#eee"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="#E8C300"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            transform={`rotate(-90 ${radius} ${radius})`}
          />
          <circle
            className={style.dot}
            r={dotRadius}
            fill="#E8C300"
            cx={dotCx}
            cy={dotCy}
          />
        </svg>
        <div className={style.statusInside}>{status}</div>
      </div>
    </div>
  );
};

export default DrinkPreparation;