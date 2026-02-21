
document.getElementById("close-btn").addEventListener('click', () => {
    window.close();
});

document.getElementById("timed-radio").addEventListener("click", () => {
    document.getElementById('duration-row').style.visibility = 'visible';
});

document.getElementById("untimed-radio").addEventListener('click', () => {
    document.getElementById('duration-row').style.visibility = 'hidden';
});

document.getElementById('start-btn').addEventListener('click', () => {
    const data = {
        mode: document.querySelector('input[name="mode"]:checked').value,
        duration: parseInt(document.getElementById('duration-input').value)
    };
    window.focusAPI.startSession(data);
});

window.focusAPI.getHistory().then((sessions) => {
    const listEl = document.getElementById('history-list');
    if (sessions.length === 0) return;
    listEl.innerHTML = sessions.slice().reverse().map(s => {
        const mins = s.mode === 'timed' ? Math.round(s.duration / 60000) + ' min' : 'untimed';
        const elapsed = Math.round((s.endTime - s.startTime) / 60000);
        const completed = s.mode === 'timed' && (s.endTime - s.startTime) >= s.duration;
        return `<div class="history-entry">${s.date} — ${mins} — ${elapsed}m elapsed — ${completed ? '✓' : 'cancelled'}</div>`;
    }).join('');
});