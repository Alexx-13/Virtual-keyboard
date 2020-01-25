const localeGetter = (locales) => {
  let currentIndex = 0;

  return () => {
    if (currentIndex + 1 === locales.length) {
      currentIndex = 0;
      return locales[currentIndex];
    }
    currentIndex++;
    return locales[currentIndex];
  };
};

const keyLayout = [
  {
    value: '1',
    eventCode: 'Digit1',
  },
  {
    value: '2',
    eventCode: 'Digit2',
  },
  {
    value: '3',
    eventCode: 'Digit3',
  },
  {
    value: '4',
    eventCode: 'Digit4',
  },
  {
    value: '5',
    eventCode: 'Digit5',
  },
  {
    value: '6',
    eventCode: 'Digit6',
  },
  {
    value: '7',
    eventCode: 'Digit7',
  },
  {
    value: '8',
    eventCode: 'Digit8',
  },
  {
    value: '9',
    eventCode: 'Digit9',
  },
  {
    value: '0',
    eventCode: 'Digit0',
  },
  {
    value: 'backspace',
    eventCode: 'Backspace',
  },
  {
    value: { en: 'q', ru: 'й' },
    eventCode: 'KeyQ',
  },
  {
    value: { en: 'w', ru: 'ц' },
    eventCode: 'KeyW',
  },
  {
    value: { en: 'e', ru: 'у' },
    eventCode: 'KeyE',
  },
  {
    value: { en: 'r', ru: 'к' },
    eventCode: 'KeyR',
  },
  {
    value: { en: 't', ru: 'е' },
    eventCode: 'KeyT',
  },
  {
    value: { en: 'y', ru: 'н' },
    eventCode: 'KeyY',
  },
  {
    value: { en: 'u', ru: 'г' },
    eventCode: 'KeyU',
  },
  {
    value: { en: 'i', ru: 'ш' },
    eventCode: 'KeyI',
  },
  {
    value: { en: 'o', ru: 'щ' },
    eventCode: 'KeyO',
  },
  {
    value: { en: 'p', ru: 'з' },
    eventCode: 'KeyP',
  },
  {
    value: { en: '[', ru: 'х' },
    eventCode: 'BracketLeft',
  },
  {
    value: { en: ']', ru: 'ъ' },
    eventCode: 'BracketRight',
  },
  {
    value: 'caps',
    eventCode: 'CapsLock',
  },
  {
    value: { en: 'a', ru: 'ф' },
    eventCode: 'KeyA',
  },
  {
    value: { en: 's', ru: 'ы' },
    eventCode: 'KeyS',
  },
  {
    value: { en: 'd', ru: 'в' },
    eventCode: 'KeyD',
  },
  {
    value: { en: 'f', ru: 'а' },
    eventCode: 'KeyF',
  },
  {
    value: { en: 'g', ru: 'п' },
    eventCode: 'KeyG',
  },
  {
    value: { en: 'h', ru: 'р' },
    eventCode: 'KeyH',
  },
  {
    value: { en: 'j', ru: 'о' },
    eventCode: 'KeyJ',
  },
  {
    value: { en: 'k', ru: 'л' },
    eventCode: 'KeyK',
  },
  {
    value: { en: 'l', ru: 'д' },
    eventCode: 'KeyL',
  },
  {
    value: { en: ';', ru: 'ж' },
    eventCode: 'Semicolon',
  },
  {
    value: { en: "''", ru: 'э' },
    eventCode: 'Quote',
  },
  {
    value: 'enter',
    eventCode: 'Enter',
  },
  {
    value: 'shift',
    eventCode: 'ShiftLeft',
  },
  {
    value: { en: 'z', ru: 'я' },
    eventCode: 'KeyZ',
  },
  {
    value: { en: 'x', ru: 'ч' },
    eventCode: 'KeyX',
  },
  {
    value: { en: 'c', ru: 'с' },
    eventCode: 'KeyC',
  },
  {
    value: { en: 'v', ru: 'м' },
    eventCode: 'KeyV',
  },
  {
    value: { en: 'b', ru: 'и' },
    eventCode: 'KeyB',
  },
  {
    value: { en: 'n', ru: 'т' },
    eventCode: 'KeyN',
  },
  {
    value: { en: 'm', ru: 'ь' },
    eventCode: 'KeyM',
  },
  {
    value: { en: ',', ru: 'б' },
    eventCode: 'Comma',
  },
  {
    value: { en: '.', ru: 'ю' },
    eventCode: 'Period',
  },
  {
    value: { en: '/', ru: '.' },
    eventCode: 'Slash',
  },
  {
    value: 'ctrl',
    eventCode: 'ControlLeft',
  },
  {
    value: 'alt',
    eventCode: 'AltLeft',
  },
  {
    value: 'space',
    eventCode: 'Space',
  },
];

class Keyboard {
  constructor() {
    this.elements = {
      main: null,
      keysContainer: null,
      input: null,
      keys: [],
    };

    this.eventHandlers = {
      oninput: null,
      onclose: null,
    };

    this.properties = {
      value: ' ',
      capsLock: false,
      locale: '',
    };

    this.capslockCode = 'CapsLock';
  }

  init() {
    this._getNextLocale = localeGetter(['en', 'ru']);
    this.properties.locale = this._getNextLocale();
    // Create main elements
    this.elements.input = document.createElement('textarea');
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // Setup main elements
    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.input);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll('.use-keyboard-input').forEach((element) => {
      element.addEventListener('focus', () => {
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
        });
      });
    });

    this._initKeyboardEventListeners();
  }

  _getNextLocale() {}

  _initKeyboardEventListeners() {
    window.addEventListener('keydown', (event) => {
      const pressedKey = document.querySelector(`#${event.code}`);
      if (!pressedKey) return;

      this._manageKeyCombinations(event);
      pressedKey.classList.add('keyboard__key--active');
    });

    window.addEventListener('keyup', (event) => {
      const pressedKey = document.querySelector(`#${event.code}`);
      if (!pressedKey) return;

      event.preventDefault();

      if (event.code === this.capslockCode) {
        this._toggleCapsLock();
        pressedKey.classList.toggle('keyboard__key--active', this.properties.capsLock);
      } else {
        pressedKey.classList.remove('keyboard__key--active');
      }
    });
  }

  _manageKeyCombinations(event) {
    if (event.altKey && event.shiftKey) {
      this._toggleLocaleChange();
    }
  }


  _createKeys() {
    const fragment = document.createDocumentFragment();

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const keyValue = (typeof key.value) === 'object' ? key.value[this.properties.locale] : key.value;

      const insertLineBreak = ['backspace', 'ъ', 'enter', '/'].indexOf(keyValue) !== -1;

      // Add attributes/classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');
      keyElement.setAttribute('id', key.eventCode);

      switch (keyValue) {
        case 'backspace':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = keyValue;

          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this._triggerEvent('oninput');
          });

          break;

        case 'caps':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          keyElement.innerHTML = keyValue;

          keyElement.addEventListener('click', () => {
            this._toggleCapsLock();
            keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);
          });

          break;

        case 'enter':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = keyValue;

          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this._triggerEvent('oninput');
          });

          break;

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.innerHTML = keyValue;

          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this._triggerEvent('oninput');
          });

          break;

        case 'shift':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = keyValue;

          break;

        case 'alt':
          keyElement.classList.add('keyboard__key');
          keyElement.innerHTML = keyValue;

          break;

        default:
          keyElement.textContent = keyValue.toLowerCase();

          keyElement.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock ? keyValue.toUpperCase() : keyValue.toLowerCase();
            this._triggerEvent('oninput');
          });

          break;
      }


      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  }


  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  }

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  }

  _toggleLocaleChange() {
    this.properties.locale = this._getNextLocale();

    for (const key of this.elements.keys) {
      const foundKey = keyLayout.find((keyData) => (keyData.eventCode === key.id));

      key.textContent = (typeof foundKey.value) === 'object' ? foundKey.value[this.properties.locale] : foundKey.value;
    }
  }

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
  }

  close() {
    this.properties.value = '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const virtualKeyboard = new Keyboard();
  virtualKeyboard.init();
});
