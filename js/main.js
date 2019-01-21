const formRange = document.querySelector('.form-range');
const optionsCnt = document.querySelector('.options__content');
const optionsBtn = document.querySelector('.options__button');
const mainCntWr = document.querySelector('.main-content__wrapper');
const mainCnt = document.querySelector('.main-content');
const mainHeaderSpan = document.querySelector('.main-header span');
let randomNumber = null;
let from = null;
let to = null;
let toogleOptionsFlag = true;
let countGuess = 0;

const toogleOptions = () => {
  optionsBtn.classList.toggle('is-active')
  if (toogleOptionsFlag) {
    toogleOptionsFlag = !toogleOptionsFlag
    optionsCnt.style.height = `${formRange.offsetHeight}px`;
  } else {
    toogleOptionsFlag = !toogleOptionsFlag
    optionsCnt.style.height = '0px';
  }
}
const reset = () => {
  countGuess = 0;
  randomNumber = Math.floor(Math.random() * (to - from + 1) + from);
  mainCntWr.textContent = "";
  addInput();
}
const addInput = (animated = false) => {
  const formNumber = document.createElement('form');
  formNumber.className = animated ? "number-form is-animated" : "number-form";
  formNumber.innerHTML = `<label for="number" class="number-form__label">Wpisz liczbę:</label><input type="number" class="number-form__input" id="number">`
  mainCntWr.appendChild(formNumber);
  document.getElementById('number').focus();
  formNumber.addEventListener('submit', e => {
    e.preventDefault();
    const label = e.target.querySelector('.number-form__label');
    const input = e.target.querySelector('.number-form__input');
    if (input.value !== "") {
      value = Number(input.value);
      input.id = "";
      label.removeAttribute('for');
      input.setAttribute('disabled', 'disabled');
      if (value === randomNumber) {
        countGuess++
        addResult('#cddc39', 'result--yellow', 'Brawo to ta liczba !!');
        const div = document.createElement('div');
        div.className = "text is-animated";
        div.innerHTML = `<strong>Zgadłeś za ${countGuess} próbą</strong>. Grasz ponownie ?`;
        const btn = document.createElement('button');
        btn.className = "btn is-animated";
        btn.textContent = "Tak";
        btn.addEventListener('click', reset);
        mainCntWr.appendChild(div);
        mainCntWr.appendChild(btn);
        btn.focus();
      } else {
        if (value === 1998) {
          addResult('#f44336', 'result--red', `Ty oszuście: ${randomNumber}`);
        } else if ((value < from) || ((value > to))) {
          addResult('#9e9e9e', 'result--darkGrey', 'Poza zakresem');
        } else if (value > randomNumber) {
          addResult('#2196f3', 'result--blue', 'Za duża liczba');
          countGuess++
        } else if (value < randomNumber) {
          addResult('#03a9f4', 'result--lightBlue', 'Za mała liczba');
          countGuess++
        } else {
          addResult('#9e9e9e', 'result--darkGrey', 'Zła wartość');
        }
        addInput(true);
      }
      window.scrollTo(0, document.body.scrollHeight);
    }
  })
}
const chooseRange = e => {
  e.preventDefault();
  fromIn = Number(e.target.querySelector('#from').value);
  toIn = Number(e.target.querySelector('#to').value);
  if (((fromIn && toIn) && (toIn > fromIn)) || ((toIn > fromIn) && (toIn === 0 || fromIn === 0))) {
    from = fromIn;
    to = toIn;
    mainHeaderSpan.textContent = `${from}-${to}`
    toogleOptions();
    reset();
  } else {
    alert('Podaj prawidłowe liczby !!')
  }
}

const addResult = (color, className, text) => {
  const result = document.createElement('div');
  mainCnt.style.backgroundColor = color;
  result.className = `result ${className} is-animated`;
  result.innerHTML = text;
  mainCntWr.appendChild(result);
  setTimeout(() => {
    mainCnt.style.backgroundColor = '#FFF';
  }, 1000)
}
toogleOptions();
formRange.addEventListener('submit', chooseRange);
optionsBtn.addEventListener('click', toogleOptions);