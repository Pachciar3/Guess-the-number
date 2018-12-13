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
const reset=()=>{
  randomNumber = Math.floor(Math.random() * (to - from + 1) + from);
  mainCntWr.textContent = "";
  addInput();
}
const addInput = () => {
  const formNumber = document.createElement('form');
  formNumber.className = "number-form";
  formNumber.innerHTML = `<label for="number" class="number-form__label">Wpisz liczbę:</label><input type="number" class="number-form__input" id="number">`
  mainCntWr.appendChild(formNumber);
  formNumber.querySelector('.number-form__input').focus();
  formNumber.addEventListener('submit', e => {
    e.preventDefault();
    const label = e.target.querySelector('.number-form__label');
    const input = e.target.querySelector('.number-form__input');
    const value = Number(input.value);
    input.id = "";
    label.removeAttribute('for');
    input.setAttribute('disabled', 'disabled');
    console.log(e.target.querySelector('.number-form__label'));
    if (value === randomNumber) {
      console.log('Tak to ta liczba');
      addResult('#cddc39', 'result--yellow', 'Brawo to ta liczba !!');
      window.scrollTo(0, document.body.scrollHeight);
      setTimeout(()=>{
        const div=document.createElement('div');
        div.className="text";
        div.textContent="Grasz ponownie ?";
        const btn=document.createElement('button');
        btn.className="btn";
        btn.textContent="Tak";
        btn.addEventListener('click',reset);
        mainCntWr.appendChild(div);
        mainCntWr.appendChild(btn);
        window.scrollTo(0, document.body.scrollHeight);
      }, 800)
    } else {
      if (value === 1998) {
        console.log('Ty oszuście', randomNumber);
        addResult('#f44336', 'result--red', `Ty oszuście: ${randomNumber}`);
      } else if ((value < from) || ((value > to))) {
        console.log('Poza zakresem');
        addResult('#9e9e9e', 'result--darkGrey', 'Poza zakresem');
      } else if (value > randomNumber) {
        console.log('Za dużo');
        addResult('#2196f3', 'result--blue', 'Za duża liczba');
      } else if (value < randomNumber) {
        console.log('Za mało');
        addResult('#03a9f4', 'result--lightBlue', 'Za mała liczba');
      } else {
        console.log('Zła wartość');
        addResult('#9e9e9e', 'result--darkGrey', 'Zła wartość');
      }
      window.scrollTo(0, document.body.scrollHeight);
      setTimeout(() => {
        addInput();
        window.scrollTo(0, document.body.scrollHeight);
      }, 800)
    }
  })
}
const chooseRange = e => {
  e.preventDefault();
  fromIn = Number(e.target.querySelector('#from').value);
  toIn = Number(e.target.querySelector('#to').value);
  if ((fromIn && toIn) && (toIn > fromIn)) {
    from=fromIn;to=toIn;
    mainHeaderSpan.textContent=`${from}-${to}`
    randomNumber = Math.floor(Math.random() * (to - from + 1) + from);
    toogleOptions();
    mainCntWr.textContent = "";
    addInput();
  } else {
    alert('Podaj prawidłowe liczby !!')
  }
}

const addResult = (color, className, text) => {
  const result = document.createElement('div');
  mainCnt.style.backgroundColor = color;
  result.className = `result ${className}`;
  result.innerHTML = text;
  mainCntWr.appendChild(result);
  setTimeout(() => {
    result.classList.add('is-active')
  }, 500)
  setTimeout(() => {
    mainCnt.style.backgroundColor = '#FFF';
  }, 1000)
}
toogleOptions();
formRange.addEventListener('submit', chooseRange);
optionsBtn.addEventListener('click', toogleOptions);