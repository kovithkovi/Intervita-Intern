const questions = [
  {
    question: "Which vitamin is produced when a person is exposed to sunlight?",
    answers: [
      { text: "Vitamin A", correct: false },
      { text: "B12", correct: false },
      { text: "Vitamin C", correct: false },
      { text: "Vitamin D", correct: true },
    ],
  },
  {
    question: "What does 'HTTP' stand for in website addresses?",
    answers: [
      { text: "HyperText Transfer Protocol", correct: true },
      { text: "HyperText Transmission Protocol", correct: false },
      { text: "HyperText Transfer Program", correct: false },
      { text: "HyperText Transmission Program", correct: false },
    ],
  },
  {
    question: "What is the longest river in the world?",
    answers: [
      { text: "Amazon River", correct: false },
      { text: "Nile River", correct: true },
      { text: "Yangtze River", correct: false },
      { text: "Mississippi River", correct: false },
    ],
  },
  {
    question: "Which planet is known as the 'Morning Star' or 'Evening Star'?",
    answers: [
      { text: "Mars", correct: false },
      { text: "Jupiter", correct: false },
      { text: "Venus", correct: true },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "Which company is known for its 'Just Do It' slogan?",
    answers: [
      { text: "Adidas", correct: false },
      { text: "Nike", correct: true },
      { text: "Puma", correct: false },
      { text: "Reebok", correct: false },
    ],
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    answers: [
      { text: "Harper Lee", correct: true },
      { text: "Jane Austen", correct: false },
      { text: "Mark Twain", correct: false },
      { text: "Ernest Hemingway", correct: false },
    ],
  },
  {
    question: "What is the capital of Japan?",
    answers: [
      { text: "Beijing", correct: false },
      { text: "Seoul", correct: false },
      { text: "Tokyo", correct: true },
      { text: "Bangkok", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for Gold?",
    answers: [
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
    ],
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Vincent van Gogh", correct: false },
      { text: "Pablo Picasso", correct: false },
      { text: "Claude Monet", correct: false },
      { text: "Leonardo da Vinci", correct: true },
    ],
  },
  {
    question: "What is the smallest country in the world?",
    answers: [
      { text: "Monaco", correct: false },
      { text: "Nauru", correct: false },
      { text: "Vatican City", correct: true },
      { text: "San Marino", correct: false },
    ],
  },
];

const question = document.getElementById("question");
const options = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  nextBtn.style.display = "none";
  shuffledQuestions = selectRandomQuestions(questions, 5);
  showQuestions();
}

function selectRandomQuestions(array, num) {
  const shuffled = shuffleArray([...array]);
  return shuffled.slice(0, num);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function showQuestions() {
  restartState();
  let currentQuestion = shuffledQuestions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  question.innerHTML = questionNumber + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    options.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function restartState() {
  nextBtn.style.display = "none";
  while (options.firstChild) {
    options.removeChild(options.firstChild);
  }
}

function selectAnswer(e) {
  let selectedBtn = e.target;
  let isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(options.children).forEach((button) => {
    if (button.dataset.correct) {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < shuffledQuestions.length - 1) {
    handleNextButton();
  } else {
    showScore();
  }
});

function handleNextButton() {
  currentQuestionIndex++;
  showQuestions();
}

function showScore() {
  restartState();
  question.innerHTML = `Your score is ${score} out of ${shuffledQuestions.length}!`;
  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";
  nextBtn.removeEventListener("click", handleNextButton);
  nextBtn.addEventListener("click", startQuiz);
}

startQuiz();
