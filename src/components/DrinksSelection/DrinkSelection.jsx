import style from './DrinkSelection.module.css';
import React, { useState } from 'react';
import drinks from '../../data/drinks';
import drinksCategorys from '../../data/drinksCategorys';

const DrinkSelection = ({ onSelect }) => {
  const [selectedDrink, setSelectedDrink] = useState('coffee');

  return (
    <div className={style.drinkSelection}>
      <div className={style.header}>
        <h1>Выбор напитка</h1>
        <div className={style.authSection}>
          <div className={style.iconWrapper}>
            <img className={style.authIcon} src="./src/assets/icons/call-out.svg" alt="call icon" />
          </div>
          <button className={style.authBtn}>Вход / регистрация</button>
        </div>

      </div>
  
      <div className={style.drinkCategories}>
        {drinksCategorys.map((category, index) => (
          <div 
            key={index} 
            className={`${style.drinkCategory} ${selectedDrink === category.id ? style.active : style.inactive}`}
            onClick={() => setSelectedDrink(category.id)}
            >
            <img src={category.image} alt={category.name} />
            <p>{category.name}</p>
          </div>
        ))}
      </div>

      <div className={style.drinkList}>
        <h2 className={style.drinkCategoryName}>{drinksCategorys.find((category) => category.id === selectedDrink).name}</h2>
        <div className={style.cardsGrid}>
          {drinks.map(drink => (
            <div key={drink.id} className={style.card} onClick={() => onSelect(drink)}>
              {drink.label && <div className={style.label}>{drink.label}</div>}
              <img src={drink.image} alt={drink.name} />
              <p className={style.name}>{drink.name}</p>
              <p className={style.price}>от <strong>{drink.price}₽</strong></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrinkSelection;