const tabsContainer = document.querySelector('.tabs-container');
const tabs = document.querySelectorAll('.tablink');
const tabsContent = document.querySelectorAll('.tabcontent');

const encriptionKey = document.querySelector('#encriptionKey');
const decriptionKey = document.querySelector('#decriptionKey');
const encriptionValue = document.querySelector('#encriptionValue');
const decriptionValue = document.querySelector('#decriptionValue');
const encriptionSubmit = document.querySelector('#encriptionSubmit');
const decriptionSubmit = document.querySelector('#decriptionSubmit');
const encriptionOutput = document.querySelector('#output1');
const decriptionOutput = document.querySelector('#output2');

const state = {
  currentEncriptionKey: 1,
  currentDecriptionKey: 1,
  currentEncriptionValue: '',
  currentDecriptionValue: ''
};

const clear = () => {
  state.currentEncriptionKey = 1;
  state.currentDecriptionKey = 1;
  state.currentEncriptionValue = '';
  state.currentDecriptionValue = '';
  encriptionOutput.textContent = '';
  decriptionOutput.textContent = '';
};

tabsContainer.addEventListener('click', event => {
  const elClickedTab = event.target;

  if (![...elClickedTab.classList].includes('active')) {
    tabs.forEach(tab => {
      tab.classList.toggle('active');
    });

    tabsContent.forEach(tabContent => {
      tabContent.dataset.tab === elClickedTab.dataset.tab
        ? tabContent.classList.replace('hidden', 'visible')
        : tabContent.classList.replace('visible', 'hidden');
    });

    clear();
  }
});

encriptionKey.onchange = event => {
  state.currentEncriptionKey = +event.target.value;
};

decryptionKey.onchange = event => {
  state.currentDecriptionKey = +event.target.value;
};

encriptionValue.onchange = event => {
  state.currentEncriptionValue = event.target.value;
};

decriptionValue.onchange = event => {
  state.currentDecriptionValue = event.target.value;
};

encriptionSubmit.onclick = () => {
  encriptionOutput.textContent = encrypt(state.currentEncriptionValue, state.currentEncriptionKey);
  encriptionValue.value = '';
};

decriptionSubmit.onclick = () => {
  decriptionOutput.textContent = decrypt(state.currentDecriptionValue, state.currentDecriptionKey);
  decriptionValue.value = '';
};

const encrypt = (value, key) => {
  return [...value]
    .map(char => {
      let currChar = char.charCodeAt(0);

      if (currChar >= 97 && currChar <= 122) {
        return String.fromCharCode(((currChar - 97 + key) % 26) + 97);
      } else if (currChar >= 65 && currChar <= 90) {
        return String.fromCharCode(((currChar - 65 + key) % 26) + 65);
      } else {
        return char;
      }
    })
    .join('');
};

const decrypt = (value, key) => {
  key = (26 - key) % 26;
  return encrypt(value, key);
};
