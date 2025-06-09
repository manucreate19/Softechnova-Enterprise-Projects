// script.js

const questions = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which HTML tag is used for the largest heading?",
    options: ["<heading>", "<h6>", "<h1>", "<head>"],
    answer: "<h1>"
  }
];

let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const feedbackEl = document.getElementById("feedback");
const scoreBox = document.getElementById("scoreBox");

function loadQuestion() {
  const current = questions[currentIndex];
  questionEl.textContent = current.question;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.disabled = true;

  current.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.addEventListener("click", () => handleSelect(li, option));
    optionsEl.appendChild(li);
  });

  scoreBox.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
}

function handleSelect(selectedEl, selectedOption) {
  const current = questions[currentIndex];

  // Disable all options
  document.querySelectorAll("#options li").forEach(li => {
    li.style.pointerEvents = "none";
  });

  selectedEl.classList.add("selected");

  if (selectedOption === current.answer) {
    selectedEl.classList.add("correct");
    feedbackEl.textContent = "✅ Correct!";
    score++;
  } else {
    selectedEl.classList.add("incorrect");
    feedbackEl.textContent = `❌ Wrong! Correct answer: ${current.answer}`;
  }

  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
});

function endQuiz() {
  questionEl.textContent = "Quiz Completed 🎉";
  optionsEl.innerHTML = "";
  feedbackEl.textContent = `You scored ${score} out of ${questions.length}`;
  nextBtn.style.display = "none";
  scoreBox.style.display = "none";
}

loadQuestion();
