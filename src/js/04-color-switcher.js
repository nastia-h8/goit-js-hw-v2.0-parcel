const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const INTERVAL_TIME = 1000;
let timerId = null;

startBtn.addEventListener('click', onStartBtnClick)
stopBtn.addEventListener('click', onStopBtnClick)

stopBtn.disabled = true;

function onStartBtnClick() {
    changeBgColorByTime();

    startBtn.disabled = true;
    stopBtn.disabled = false;
}

function onStopBtnClick() {
    clearInterval(timerId);

    startBtn.disabled = false;
    stopBtn.disabled = true;
}

function changeBgColorByTime() {
    timerId = setInterval(() => {
            document.body.style.backgroundColor = getRandomHexColor();
    }, INTERVAL_TIME)
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}