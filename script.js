

const quizData = [
    { question: "Which of the following is used to store a value in variable", 
        options: ["print", "if", "=", "=="], 
        correct: 2 },
    { question: "what does a loop do", 
        options: ["repeats a block of code", "stops the program", "compares two values", "stores data"], 
        correct: 0 },
    { question: "which data type is used to store text", 
        options: ["int", "string", "float", "boolean"],
         correct: 1 },
    { question: "what doees'=='do in coding", 
        options: ["assings a value", "cmpares two values", "ends the program", "takes input"], 
        correct: 2 },
    { question: "Which language is for web development?",
         options: ["Python", "JavaScript", "C++", "Java"], 
         correct: 1 }
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById('quiz-container');
const resultsScreen = document.getElementById('results-screen');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const restartBtn = document.getElementById('restart-btn');

function loadQuestion() {
    const q = quizData[currentQuestion];
    const html = `
        <div class="question">
            <p class="question-text">${q.question}</p>
            <div class="options">
                ${q.options.map((option, idx) => `
                    <button class="option" onclick="selectAnswer(${idx}, ${q.correct})">${option}</button>
                `).join('')}
            </div>
        </div>
    `;
    quizContainer.innerHTML = html;
    document.getElementById('current-question').textContent = currentQuestion + 1;
    updateProgressBar();
    updateButtons();
}

function selectAnswer(selected, correct) {
    if (selected === correct) score++;
    
    const buttons = document.querySelectorAll('.option');
    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === correct) btn.classList.add('correct');
        if (idx === selected && idx !== correct) btn.classList.add('incorrect');
    });
    nextBtn.disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function showResults() {
    quizContainer.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    document.getElementById('final-score').textContent = score;
    document.getElementById('total-score').textContent = quizData.length;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    quizContainer.classList.remove('hidden');
    resultsScreen.classList.add('hidden');
    loadQuestion();
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
}

function updateButtons() {
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = true;
}

nextBtn.onclick = nextQuestion;
prevBtn.onclick = prevQuestion;
restartBtn.onclick = restartQuiz;

loadQuestion();
