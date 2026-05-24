let currentWord = "";
let timerInterval = null;
let timeLeft = 60;

const timerDisplay = document.getElementById('timer');
const wordInput = document.getElementById('wordInput');
const wordDisplay = document.getElementById('wordDisplay');

const inputBlock = document.getElementById('inputBlock');
const actionGroup = document.getElementById('actionGroup');

const setWordBtn = document.getElementById('setWordBtn');
const showBtn = document.getElementById('showBtn');
const hideBtn = document.getElementById('hideBtn');
const resetBtn = document.getElementById('resetBtn');

// Функция таймера
function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 60;
    timerDisplay.textContent = timeLeft;
    timerDisplay.classList.remove('danger');

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 10) {
            timerDisplay.classList.add('danger');
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            wordDisplay.textContent = "⏱️ ВРЕМЯ ВЫШЛО!";
            wordDisplay.style.color = "#ff0055";
            showBtn.style.display = "none";
            hideBtn.style.display = "none";
        }
    }, 1000);
}

// Кнопка: Загадать (🎲)
setWordBtn.addEventListener('click', () => {
    const text = wordInput.value.trim();
    if (!text) return alert("Сначала введи слово!");

    currentWord = text;
    
    // Переключаем экраны
    inputBlock.style.display = "none";
    wordDisplay.style.display = "flex";
    actionGroup.style.display = "flex";
    
    // Показываем кнопки "Показать/Скрыть" на случай, если они были скрыты таймаутом
    showBtn.style.display = "block";
    hideBtn.style.display = "block";

    wordDisplay.textContent = "???";
    wordDisplay.style.color = "#ffffff";

    startTimer();
});

// Кнопка: Показать семье (👁️)
showBtn.addEventListener('click', () => {
    if (timeLeft > 0) {
        wordDisplay.textContent = currentWord;
        wordDisplay.style.color = "#00f2fe";
    }
});

// Кнопка: Скрыть от игрока (🙈)
hideBtn.addEventListener('click', () => {
    if (timeLeft > 0) {
        wordDisplay.textContent = "???";
        wordDisplay.style.color = "#ffffff";
    }
});

// Кнопка: Новое слово / Сброс (🔄)
resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    currentWord = "";
    wordInput.value = "";
    timerDisplay.textContent = "60";
    timerDisplay.classList.remove('danger');

    // Возвращаем экран ввода
    inputBlock.style.style.display = "flex"; // Fix double style typo dynamically
    inputBlock.style.display = "flex";
    wordDisplay.style.display = "none";
    actionGroup.style.display = "none";
});
