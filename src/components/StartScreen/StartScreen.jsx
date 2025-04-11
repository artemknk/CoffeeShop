import React from 'react';
import style from './StartScreen.module.css';
import coffeeCup from '@/assets/start-screen/cup.png';
import coffeeCup2 from '@/assets/start-screen/cup2.png';
import bean from '@/assets/start-screen/coffee.png';
const StartScreen = ({ onStart }) => {
  const handleClick = () => {
    onStart();
  };

  return (
    <div className={style.splash} onClick={handleClick}>
      <div className={style.splashContent}>
      <div className={style.coffeeBeans}>
  <img src={bean} className={`${style.bean} ${style.bean1}`} />
  <img src={bean} className={`${style.bean} ${style.bean2}`} />
  <img src={bean} className={`${style.bean} ${style.bean3}`} />
  <img src={bean} className={`${style.bean} ${style.bean4}`} />
  <img src={bean} className={`${style.bean} ${style.bean5}`} />
  <img src={bean} className={`${style.bean} ${style.bean6}`} />
</div>
      <img className={style.coffeeCup} src={coffeeCup} alt="Coffee cup" />
        <div className={style.splashText}>
          <span className={style.splashTextLine}>ЭТО</span>
          <span className={style.splashTextLine}>ТВОЙ</span>
          <span className={style.splashTextLine}>КОФЕ</span>
        </div>
        <img className={style.coffeeCup2} src={coffeeCup2} alt="Coffee cup" />
        <div className={style.splashTouch}>
          <span className={style.touchText}>Коснитесь экрана</span>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;