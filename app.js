const startBtn = document.querySelector('#start'),
      screens = document.querySelectorAll('.screen'),
      timeList = document.querySelector('.time-list'),
      timeGame = document.querySelector('#time'),
      board = document.querySelector('#board'),
      boardWidth = window.getComputedStyle(board).width,
      boardHeight = window.getComputedStyle(board).height,
      colors = [
        'rgb(120,28,129)',
        'rgb(64,67,153)',
        'rgb(72,139,194)',
        'rgb(107,178,140)',
        'rgb(159,190,87)',
        'rgb(210,179,63)',
        'rgb(231,126,49)',
        'rgb(217,33,32)'
      ];
let time = 0,
    score = 0,
    timeInterval = '',
    clicks = '';

startBtn.addEventListener('click', (e) => {
    e.preventDefault();

    changeScreen(screens[0]);
});

timeList.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('time-btn')) {
        changeScreen(screens[1]);
        time = e.target.dataset.time;
        timeGame.parentNode.classList.remove('hide');
        board.innerHTML = '';
        gameStart();
    }
});


function changeScreen (screen) {
    screen.classList.add('up');
}

function timer () {
    if (time === 0) {
        clearInterval(timeInterval);
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        timeGame.innerHTML = `00:${current}`;
    }
}

function createCircle () {
    const circle = document.createElement('div'),
          size = getRandomNumber(10, 50),
          {width, height} = board.getBoundingClientRect(),
          color = colors[Math.floor(Math.random() * (colors.length))];

    circle.classList.add('circle');
    circle.style.backgroundColor = color;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${getRandomNumber(0, width - size)}px`;
    circle.style.left = `${getRandomNumber(0, height - size)}px`;

    board.append(circle);
}

function removeCircle () {
    board.innerHTML ='';
}

function gameStart () {
    score = 0;
    clicks = 0;
    timeInterval = setInterval(timer, 1000);
    timeGame.innerHTML = `00:${time}`;
    board.addEventListener('click', clicker);
    createCircle();
}

function clicker (e) {
    if (e.target && e.target.classList.contains('circle')) {
        score++;
        clicks++;
        removeCircle();
        createCircle();
    } else {
        clicks++;
        removeCircle();
        createCircle();
    }
}

function getRandomNumber (min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function finishGame () {
    timeGame.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>
    <h2>Точность: ${(score / clicks).toFixed(2)}</h2>`;

    const newGame = document.createElement('button');
    newGame.classList.add('new-game-btn');
    newGame.textContent = 'Новая игра';
    newGame.style.display = 'block';
    board.append(newGame);

    newGame.addEventListener('click', () => {
        screens[1].classList.remove('up');
    });

    board.removeEventListener('click', clicker);
}


