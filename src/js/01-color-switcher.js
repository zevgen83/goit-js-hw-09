function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;

const refs = {
    startBtn: document.querySelector('[data-start]'),
    closeBtn: document.querySelector('[data-stop]'),
    body: document.querySelector('body'),
}

document.querySelector('[data-stop]').disabled = true;

refs.startBtn.addEventListener('click', onStartBtn);
refs.closeBtn.addEventListener('click', onCloseBtn);

function onStartBtn (e) {
    onDisabledBtn(e);
    document.querySelector('[data-stop]').disabled = false;
    timerId = setInterval(() => {
        makeChangeColor();
      }, 1000);
}

function onCloseBtn (e) {
    onDisabledBtn(e);
    document.querySelector('[data-start]').disabled = false;
    clearInterval(timerId);
}

function onDisabledBtn (e) {
    e.target.disabled = true;    
}

function makeChangeColor() {
    const hexColor = getRandomHexColor();
    refs.body.style.backgroundColor = `${hexColor}`;
}
