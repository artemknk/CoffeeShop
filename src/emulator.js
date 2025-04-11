// emulator.js
export const emulator = {
  StartCashin: function (cb) {
    console.log('Купюроприемник активирован. Готов к приему денег.');
    this.cashinCallback = cb;
    this.isCashinActive = true;

    // Добавляем обработчик клавиш для эмуляции приема денег
    this.cashKeyHandler = (e) => {
      if (!this.isCashinActive) return;

      // Сочетания клавиш для разных номиналов
      const keyMap = {
        '1': 5,     // Ctrl+Shift+1 - 5 рублей
        '2': 10,    // Ctrl+Shift+2 - 10 рублей
        '3': 100,   // Ctrl+Shift+3 - 100 рублей
        '4': 200,   // Ctrl+Shift+4 - 200 рублей
        '5': 500,   // Ctrl+Shift+5 - 500 рублей
        '6': 1000   // Ctrl+Shift+6 - 1000 рублей
      };

      if (e.ctrlKey && e.shiftKey && keyMap[e.key]) {
        const amount = keyMap[e.key];
        console.log(`Принята купюра/монета: ${amount} руб.`);
        this.cashinCallback(amount);
      }
    };

    window.addEventListener('keydown', this.cashKeyHandler);
  },

  StopCashin: function () {
    console.log('Купюроприемник деактивирован');
    this.isCashinActive = false;
    if (this.cashKeyHandler) {
      window.removeEventListener('keydown', this.cashKeyHandler);
      delete this.cashKeyHandler;
    }
    delete this.cashinCallback;
  },

  BankCardPurchase: function (amount, cb, display_cb) {
    console.log(`Инициирована оплата картой на сумму ${amount} руб.`);
    this.cardCallback = cb;
    this.displayCallback = display_cb;
    this.isCardPaymentActive = true;

    // Эмуляция процесса оплаты
    const steps = [
      { delay: 500, message: 'Приложите карту' },
      { delay: 2000, message: 'Обработка карты...' },
      { delay: 3500, message: 'Связь с банком...' },
      { delay: 5000, message: 'Ожидание подтверждения...' },
      { delay: 8000, message: 'Оплата успешна', action: () => this.simulateCardSuccess() }
    ];

    steps.forEach(step => {
      setTimeout(() => {
        if (!this.isCardPaymentActive) return;
        this.displayCallback(step.message);
        if (step.action) step.action();
      }, step.delay);
    });

    // Добавляем обработчик клавиш для управления оплатой
    this.cardKeyHandler = (e) => {
      if (!this.isCardPaymentActive) return;

      if (e.ctrlKey && e.key === 'Enter') {
        // Успешная оплата
        this.displayCallback('Оплата подтверждена');
        this.simulateCardSuccess();
      } else if (e.ctrlKey && e.key === 'Escape') {
        // Отмена оплаты
        this.BankCardCancel();
      }
    };

    window.addEventListener('keydown', this.cardKeyHandler);
  },

  BankCardCancel: function () {
    console.log('Отмена оплаты картой');
    if (this.isCardPaymentActive) {
      this.isCardPaymentActive = false;
      setTimeout(() => {
        this.displayCallback('Операция отменена');
        this.cardCallback(false);
      }, 1000);

      if (this.cardKeyHandler) {
        window.removeEventListener('keydown', this.cardKeyHandler);
        delete this.cardKeyHandler;
      }
    }
  },

  Vend: function (product_idx, cb) {
    console.log(`Начало выдачи продукта с индексом ${product_idx}`);
    this.isVendingActive = true;

    // Эмуляция процесса выдачи
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% успешных выдач
      console.log(`Выдача ${success ? 'успешна' : 'не удалась'}`);
      cb(success);
      this.isVendingActive = false;
    }, 3000);

    // Добавляем обработчик клавиш для управления выдачей
    this.vendKeyHandler = (e) => {
      if (!this.isVendingActive) return;

      if (e.ctrlKey && e.key === 'v') {
        // Принудительная успешная выдача
        cb(true);
        this.isVendingActive = false;
        window.removeEventListener('keydown', this.vendKeyHandler);
      } else if (e.ctrlKey && e.key === 'x') {
        // Принудительная ошибка выдачи
        cb(false);
        this.isVendingActive = false;
        window.removeEventListener('keydown', this.vendKeyHandler);
      }
    };

    window.addEventListener('keydown', this.vendKeyHandler);
  },

  // Вспомогательные методы для тестирования
  simulateCashInsert: function (amount) {
    if (this.isCashinActive && this.cashinCallback) {
      console.log(`[Тест] Внесение ${amount} руб.`);
      this.cashinCallback(amount);
    }
  },

  simulateCardSuccess: function () {
    if (this.isCardPaymentActive && this.cardCallback) {
      console.log('[Тест] Успешная оплата картой');
      this.cardCallback(true);
      this.isCardPaymentActive = false;
      if (this.cardKeyHandler) {
        window.removeEventListener('keydown', this.cardKeyHandler);
        delete this.cardKeyHandler;
      }
    }
  },

  simulateCardFailure: function () {
    if (this.isCardPaymentActive && this.cardCallback) {
      console.log('[Тест] Ошибка оплаты картой');
      this.cardCallback(false);
      this.isCardPaymentActive = false;
      if (this.cardKeyHandler) {
        window.removeEventListener('keydown', this.cardKeyHandler);
        delete this.cardKeyHandler;
      }
    }
  }
};

// Инициализация глобального объекта
window.emulator = emulator;