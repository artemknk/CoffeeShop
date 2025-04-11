import './App.css';
import React, { useState } from 'react';
import StartScreen from './components/StartScreen/StartScreen';
import DrinkSelection from './components/DrinksSelection/DrinkSelection';
import PaymentMethod from './components/PaymentMethod';
import CashPayment from './components/CashPayment/CashPayment';
import CardPayment from './components/CardPayment/CardPayment';
import DrinkPreparation from './components/DrinkPreparation';
import Completion from './components/Completion';

const App = () => {
  const [currentStep, setCurrentStep] = useState('start'); // Начинаем с экрана приветствия
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleStart = () => {
    setCurrentStep('selection');
  };

  const handleDrinkSelect = (drink) => {
    setSelectedDrink(drink);
    setCurrentStep('payment-method');
  };

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    setCurrentStep(method);
  };

  const handlePaymentComplete = () => {
    setCurrentStep('preparation');
  };

  const handlePreparationComplete = () => {
    setCurrentStep('completion');
  };

  const handleRestart = () => {
    setCurrentStep('start');
    setSelectedDrink(null);
    setPaymentMethod(null);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'start':
        return <StartScreen onStart={handleStart} />;
      case 'selection':
        return <DrinkSelection onSelect={handleDrinkSelect} />;
      case 'payment-method':
        return (
          <PaymentMethod
            drink={selectedDrink}
            onPaymentMethodSelect={handlePaymentMethodSelect}
            onBack={() => setCurrentStep('selection')}
          />
        );
      case 'cash':
        return (
          <CashPayment
            drink={selectedDrink}
            onComplete={handlePaymentComplete}
            onBack={() => setCurrentStep('payment-method')}
          />
        );
      case 'card':
        return (
          <CardPayment
            drink={selectedDrink}
            onComplete={handlePaymentComplete}
            onBack={() => setCurrentStep('payment-method')}
          />
        );
      case 'preparation':
        return (
          <DrinkPreparation
            drink={selectedDrink}
            onComplete={handlePreparationComplete}
          />
        );
      case 'completion':
        return <Completion drink={selectedDrink} onRestart={handleRestart} />;
      default:
        return <StartScreen onStart={handleStart} />;
    }
  };

  return <div className="app">{renderStep()}</div>;
};

export default App;