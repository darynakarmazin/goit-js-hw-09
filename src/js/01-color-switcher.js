function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const bodyEl = document.querySelector('body');

const buttonStart = document.querySelector('button[data-start]');

const buttonStop = document.querySelector('button[data-stop]');

buttonStart.addEventListener('click', onChangeColorBody);
buttonStop.addEventListener('click', offChangeColorBody);
let timerId = null;

function onChangeColorBody(event) {
  timerId = setInterval(changeColor, 1000);

  buttonStart.setAttribute('disabled', 'disabled');
  buttonStop.removeAttribute('disabled', 'disabled');
}

function offChangeColorBody(event) {
  clearInterval(timerId);
  buttonStop.setAttribute('disabled', 'disabled');
  buttonStart.removeAttribute('disabled', 'disabled');
}

function changeColor(event) {
  let RandomHexColor = getRandomHexColor();
  bodyEl.style.backgroundColor = RandomHexColor;
}
