function onScroll() {
  const { scrollTop } = document.getElementsByTagName('html')[0];
  const header = document.getElementsByTagName('header')[0];
  if (scrollTop > 0) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
}

const body = document.getElementsByTagName('body')[0];
body.onscroll = onScroll;

const startSound = new Audio('./assets/start.mp3');
const restSound = new Audio('./assets/rest.mp3');
let pomodoroTime = 1500;
let restTime = 300;
let pause = false;
let pomodoroInterval;
let restInterval;

const timer = document.getElementById('timer');

function displayCountdown(time) {
  timer.innerHTML = time;
}

function pomodoroClock() {
  pomodoroInterval = setInterval(function () {
    let menit = Math.floor(pomodoroTime / 60);
    let detik = pomodoroTime % 60;
    let time = `${String(menit).padStart(2, 0)}:${String(detik).padStart(
      2,
      0
    )}`;
    displayCountdown(time);
    pomodoroTime--;
    if (pomodoroTime < 0) {
      restSound.play();
      timer.innerHTML = 'REST!';
      restTime = 300;
      restClock();
      clearInterval(pomodoroInterval);
    }
  }, 1000);
}

function restClock() {
  restInterval = setInterval(function () {
    let menit = Math.floor(restTime / 60);
    let detik = restTime % 60;
    let time = `${String(menit).padStart(2, 0)}:${String(detik).padStart(
      2,
      0
    )}`;
    displayCountdown(time);
    restTime--;
    if (restTime < 0) {
      timer.innerHTML = 'WORK!';
      pomodoroTime = 1500;
      pomodoroClock();
      clearInterval(restInterval);
    }
  }, 1000);
}

const startButton = document.getElementById('btn-start');
const stopButton = document.getElementById('btn-stop');
const pauseButton = document.getElementById('btn-pause');

startButton.addEventListener('click', function () {
  pomodoroClock();
  startSound.play();
  startButton.style.display = 'none';
  pauseButton.style.display = 'flex';
  stopButton.attributes;
});

stopButton.addEventListener('click', function () {
  pomodoroTime = 1500;
  restTime = 300;
  clearInterval(pomodoroInterval);
  clearInterval(restInterval);
  timer.innerHTML = '25:00';
  pauseButton.style.display = 'none';
  startButton.style.display = 'flex';
});

pauseButton.addEventListener('click', function () {
  if (pomodoroTime > 0) {
    clearInterval(pomodoroInterval);
  } else {
    clearInterval(restInterval);
  }
  pauseButton.style.display = 'none';
  startButton.style.display = 'flex';
});

const mobileBtn = document.getElementById('btn-mobile');
const mobileNav = document.getElementsByClassName('mobile-nav')[0];
const menuIcon = document.getElementById('menu-icon');

mobileBtn.addEventListener('click', function () {
  const isActive = mobileNav.classList.contains('active');
  if (isActive) {
    menuIcon.src = './assets/open-menu.svg';
    mobileNav.classList.remove('active');
  } else {
    menuIcon.src = './assets/close.svg';
    mobileNav.classList.add('active');
  }
});
