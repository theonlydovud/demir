// Прокачанная база эпичных персонажей и предметов (разные поколения, чтобы бате было весело)
const words = [
    "Терминатор", "Шрек", "Гарри Поттер", "Чебурашка", 
    "Илон Маск", "Граф Дракула", "Человек-Паук", "Губка Боб", 
    "Капитан Джек Воробей", "Майк Тайсон", "Индиана Джонс", "Кот в сапогах",
    "Царь Иван Грозный", "Динозавр T-Rex", "Космонавт", "Стив Джобс",
    "Джеймс Бонд", "Шерлок Холмс", "Миньон", "Робокоп"
];

let currentWord = "";
let score = 0;
let timerInterval = null;
let timeLeft = 60;

const wordDisplay = document.getElementById('wordDisplay');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');

const startBtn = document.getElementById('startBtn');
const showBtn = document.getElementById('showBtn');
const hideBtn = document.getElementById('hideBtn');

// Запуск таймера обратного отсчета
function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 60;
    timerDisplay.textContent = timeLeft;
    timerDisplay.classList.remove('danger');

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        // Эффект паники, если осталось меньше 10 секунд
        if (timeLeft <= 10) {
            timerDisplay.classList.add('danger');
        }

        // Время вышло
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            wordDisplay.innerHTML = "⏱️ ВРЕМЯ ВЫШЛО!";
            wordDisplay.style.color = "#ff0055";
            showBtn.disabled = true;
            hideBtn.disabled = true;
        }
    }, 1000);
}

// Кнопка: Следующее слово (🎲)
startBtn.addEventListener('click', () => {
    // Если игра уже шла, засчитываем очко за предыдущее угаданное слово
    if (currentWord && wordDisplay.textContent !== "???" && timeLeft > 0) {
        score++;
        scoreDisplay.textContent = score;
    }

    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex];
    
    // Сбрасываем цвет текста на стандартный белый
    wordDisplay.style.color = "#ffffff";
    wordDisplay.textContent = "???";
    
    // Включаем кнопки управления
    showBtn.disabled = false;
    hideBtn.disabled = false;

    // Перезапускаем таймер
    startTimer();
});

// Кнопка: Показать семье (👁️)
showBtn.addEventListener('click', () => {
    if (currentWord && timeLeft > 0) {
        wordDisplay.textContent = currentWord;
        wordDisplay.style.color = "#00f2fe"; // Подсвечиваем слово неоном
    }
});

// Кнопка: Скрыть от игрока (🙈)
hideBtn.addEventListener('click', () => {
    if (currentWord && timeLeft > 0) {
        wordDisplay.textContent = "???";
        wordDisplay.style.color = "#ffffff";
    }
});
