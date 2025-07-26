// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Five quiz questions
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;


totalQuestionsSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;
    currentQuestionSpan.textContent = 1;
    resultScreen.classList.remove("active");
    quizScreen.classList.add("active");
    startScreen.classList.remove("active");
    showQuestion();
}
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;
    currentQuestionSpan.textContent = 1;
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    resultScreen.classList.remove("active");
    showQuestion();

}

function showQuestion(question) {
    const questionObj = quizQuestions[currentQuestionIndex];
    questionText.textContent = questionObj.question;
    answersContainer.innerHTML = "";
    questionObj.answers.forEach((answer) => {
        const btn = document.createElement("button");
        btn.textContent = answer.text;
        btn.classList.add("answer-btn");
        btn.onclick = () => handleAnswer(answer.correct);
        answersContainer.appendChild(btn);
        progressBar.style.width = `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`;


        
    });

}

function handleAnswer(isCorrect) {
    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        currentQuestionSpan.textContent = currentQuestionIndex + 1;
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    finalScoreSpan.textContent = score;
    maxScoreSpan.textContent = quizQuestions.length;
    if (score === quizQuestions.length) {
        resultMessage.textContent = "Perfect!";
    } else if (score === 0 || score === 1 || score === 2) {
        resultMessage.textContent = "Keep learning hard, this is basic knowledge.";
    } else {
        resultMessage.textContent = "Good job!";
    }
}

