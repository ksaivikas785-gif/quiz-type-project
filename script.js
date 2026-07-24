// ---------- Question Bank ----------
const QUESTIONS = [
  {
    category: "Geography",
    question: "Which country has the largest population in the world as of 2024?",
    options: ["China", "India", "United States", "Indonesia"],
    answer: 1,
  },
  {
    category: "Science",
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Au", "Gd", "Go"],
    answer: 1,
  },
  {
    category: "History",
    question: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    answer: 2,
  },
  {
    category: "Art & Literature",
    question: "Who painted the Mona Lisa?",
    options: ["Michelangelo", "Raphael", "Leonardo da Vinci", "Donatello"],
    answer: 2,
  },
  {
    category: "Geography",
    question: "What is the longest river in the world?",
    options: ["Amazon River", "Yangtze River", "Mississippi River", "Nile River"],
    answer: 3,
  },
  {
    category: "Science",
    question: "How many bones are in the adult human body?",
    options: ["196", "206", "216", "226"],
    answer: 1,
  },
  {
    category: "Sports",
    question: "How many players are on a standard soccer team on the field?",
    options: ["9", "10", "11", "12"],
    answer: 2,
  },
  {
    category: "History",
    question: "Who was the first President of the United States?",
    options: ["Thomas Jefferson", "John Adams", "Benjamin Franklin", "George Washington"],
    answer: 3,
  },
  {
    category: "Geography",
    question: "Which is the smallest country in the world by area?",
    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    answer: 1,
  },
  {
    category: "Science",
    question: "What planet is known as the Red Planet?",
    options: ["Venus", "Jupiter", "Mars", "Saturn"],
    answer: 2,
  },
  {
    category: "Art & Literature",
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
    answer: 1,
  },
  {
    category: "General",
    question: "What is the capital city of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    answer: 2,
  },
  {
    category: "Science",
    question: "What gas do plants primarily absorb from the atmosphere for photosynthesis?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: 2,
  },
  {
    category: "Music",
    question: "Which composer went deaf later in life yet continued composing?",
    options: ["Wolfgang Amadeus Mozart", "Ludwig van Beethoven", "Johann Sebastian Bach", "Franz Schubert"],
    answer: 1,
  },
  {
    category: "Geography",
    question: "Mount Everest is located on the border of Nepal and which other country?",
    options: ["Bhutan", "Pakistan", "China", "India"],
    answer: 2,
  },
  {
    category: "History",
    question: "The ancient pyramids of Giza were built primarily during which civilization's rule?",
    options: ["Roman Empire", "Ancient Egypt", "Persian Empire", "Ancient Greece"],
    answer: 1,
  },
  {
    category: "Science",
    question: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"],
    answer: 2,
  },
  {
    category: "General",
    question: "Which language has the most native speakers worldwide?",
    options: ["English", "Spanish", "Hindi", "Mandarin Chinese"],
    answer: 3,
  },
];

// ---------- State ----------
let currentIndex = 0;
let score = 0;
let answered = false;

// ---------- DOM refs ----------
const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultsScreen = document.getElementById("resultsScreen");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const nextBtnLabel = document.getElementById("nextBtnLabel");
const retryBtn = document.getElementById("retryBtn");

const categoryTag = document.getElementById("categoryTag");
const questionText = document.getElementById("questionText");
const optionsGrid = document.getElementById("optionsGrid");
const feedback = document.getElementById("feedback");
const trackFill = document.getElementById("trackFill");

const scoreDigits = document.getElementById("scoreDigits");
const questionDigits = document.getElementById("questionDigits");

const finalScore = document.getElementById("finalScore");
const resultsTitle = document.getElementById("resultsTitle");
const resultsCopy = document.getElementById("resultsCopy");

const LETTERS = ["A", "B", "C", "D"];

// ---------- Helpers ----------
function showScreen(screen) {
  [startScreen, quizScreen, resultsScreen].forEach((s) => s.classList.remove("active"));
  screen.classList.add("active");
}

function setDigits(el, num) {
  const str = String(num).padStart(2, "0");
  const digits = el.querySelectorAll(".flip-digit");
  digits[0].textContent = str[0];
  digits[1].textContent = str[1];
  digits.forEach((d) => {
    d.classList.remove("pulse");
    void d.offsetWidth;
    d.classList.add("pulse");
  });
}

function updateScoreboard() {
  setDigits(scoreDigits, score);
  setDigits(questionDigits, currentIndex + 1);
}

function renderQuestion() {
  answered = false;
  const q = QUESTIONS[currentIndex];

  categoryTag.textContent = q.category;
  categoryTag.setAttribute("data-cat", q.category);
  questionText.closest(".question-card").setAttribute("data-cat", q.category);
  questionText.textContent = q.question;
  optionsGrid.innerHTML = "";
  feedback.textContent = "";
  feedback.className = "feedback";
  nextBtn.disabled = true;
  nextBtnLabel.textContent = currentIndex === QUESTIONS.length - 1 ? "See Results" : "Next Question";

  trackFill.style.width = `${(currentIndex / QUESTIONS.length) * 100}%`;

  q.options.forEach((optionText, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.innerHTML = `<span class="letter">${LETTERS[i]}</span><span>${optionText}</span>`;
    btn.addEventListener("click", () => selectOption(i, btn));
    optionsGrid.appendChild(btn);
  });

  updateScoreboard();
}

function selectOption(selectedIndex, btnEl) {
  if (answered) return;
  answered = true;

  const q = QUESTIONS[currentIndex];
  const allOptionEls = optionsGrid.querySelectorAll(".option");
  allOptionEls.forEach((el) => (el.disabled = true));

  if (selectedIndex === q.answer) {
    btnEl.classList.add("correct");
    feedback.textContent = "Correct!";
    feedback.classList.add("correct");
    score += 1;
    setDigits(scoreDigits, score);
  } else {
    btnEl.classList.add("wrong");
    allOptionEls[q.answer].classList.add("correct");
    feedback.textContent = `Not quite — the correct answer is "${q.options[q.answer]}".`;
    feedback.classList.add("wrong");
  }

  nextBtn.disabled = false;
}

function nextQuestion() {
  currentIndex += 1;
  if (currentIndex >= QUESTIONS.length) {
    showResults();
  } else {
    renderQuestion();
  }
}

function showResults() {
  trackFill.style.width = "100%";
  finalScore.textContent = score;
  document.querySelector(".big-score-of").textContent = `/${QUESTIONS.length}`;

  const pct = score / QUESTIONS.length;
  let title, copy;
  if (pct === 1) {
    title = "Perfect round.";
    copy = "Every single question, nailed. That's a genuine know-it-all performance.";
  } else if (pct >= 0.75) {
    title = "Strong showing.";
    copy = "You held your own against a broad spread of categories — well played.";
  } else if (pct >= 0.5) {
    title = "Solid effort.";
    copy = "A respectable tally. A few categories to brush up on before the next round.";
  } else {
    title = "Room to grow.";
    copy = "Every trivia champion starts somewhere. Run it back and chase a better score.";
  }
  resultsTitle.textContent = title;
  resultsCopy.textContent = copy;

  showScreen(resultsScreen);
}

function resetQuiz() {
  currentIndex = 0;
  score = 0;
  answered = false;
  showScreen(quizScreen);
  renderQuestion();
}

// ---------- Event listeners ----------
startBtn.addEventListener("click", resetQuiz);
nextBtn.addEventListener("click", nextQuestion);
retryBtn.addEventListener("click", resetQuiz);
