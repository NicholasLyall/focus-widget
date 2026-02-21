const timerEl = document.getElementById('timer');

window.focusAPI.onUpdate((data) => {
  timerEl.textContent = formatTime(data.remaining);
});

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
}
