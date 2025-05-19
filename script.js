let timer;
let timeLeft = 600; // 10 minutes in seconds
let isRunning = false;
const audio = document.getElementById('audio');
const musicSelect = document.getElementById('music-select');

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.querySelector('.time-display').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  const progress = ((600 - timeLeft) / 600) * 100;
  document.querySelector('.progress-bar').style.background = `conic-gradient(#4caf50 ${progress}%, #e0e0e0 ${progress}%)`;
  if (timeLeft === 0) {
    clearInterval(timer);
    isRunning = false;
    alert('Meditation session complete!');
    audio.pause();
  }
  timeLeft--;
}

document.getElementById('start-btn').addEventListener('click', () => {
  if (!isRunning) {
    timer = setInterval(updateTimer, 1000);
    isRunning = true;
    if (musicSelect.value !== 'none') {
      audio.src = `${musicSelect.value}.mp3`;
      audio.play();
    }
  }
});

document.getElementById('pause-btn').addEventListener('click', () => {
  clearInterval(timer);
  isRunning = false;
  audio.pause();
});

document.getElementById('reset-btn').addEventListener('click', () => {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 600;
  updateTimer();
  audio.pause();
});

musicSelect.addEventListener('change', () => {
  if (musicSelect.value !== 'none' && isRunning) {
    audio.src = `${musicSelect.value}.mp3`;
    audio.play();
  } else {
    audio.pause();
  }
});