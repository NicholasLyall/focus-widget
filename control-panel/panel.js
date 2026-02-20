
document.getElementById("close-btn").addEventListener('click', () => {
    window.close();
});

document.getElementById("timed-radio").addEventListener("click", () => {
    document.getElementById('duration-row').style.visibility = 'visible';
});

document.getElementById("untimed-radio").addEventListener('click', () => {
    document.getElementById('duration-row').style.visibility = 'hidden';
});