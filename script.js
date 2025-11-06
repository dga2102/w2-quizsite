// script.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Quiz skeleton loaded successfully");
});

// TEMP: sample questions to prevent script crash
const questions = [
  {
    id: 1,
    text: "What’s your favorite game type?",
    type: "radio",
    options: [
      { id: "a", text: "Action", correct: true },
      { id: "b", text: "Puzzle" },
      { id: "c", text: "Simulation" },
      { id: "d", text: "Adventure" }
    ],
    meta: { inUse: true }
  }
];

// TEMP: sample questions to prevent script crash
const questions = [
  {
    id: 1,
    text: "What’s your favorite game type?",
    type: "radio",
    options: [
      { id: "a", text: "Action", correct: true },
      { id: "b", text: "Puzzle" },
      { id: "c", text: "Simulation" },
      { id: "d", text: "Adventure" }
    ],
    meta: { inUse: true }
  }
];

const visibleQuestions = questions.filter(q => q.meta?.inUse !== false);

// Track user answers and current question index
let currentIndex = 0;
const userAnswers = {}; // { [questionId]: selectedOptionId }

// Get references to DOM elements
const intro = document.getElementById("intro");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const questionContainer = document.getElementById("questionContainer");
const startBtn = document.getElementById("startBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

// Helper: show only one section at a time
function showSection(section) {
  intro.classList.add("hidden");
  quiz.classList.add("hidden");
  result.classList.add("hidden");
  section.classList.remove("hidden");
}

// Function to render a question
function renderQuestion(index) {
  const q = visibleQuestions[index];
  if (!q) return;

  // Question header
  let html = `
    <h3 class="text-lg font-semibold mb-2">Question ${index + 1} of ${visibleQuestions.length}</h3>
    <p class="mb-4">${q.text}</p>
    <div class="grid gap-3 ${q.type === "image" ? "grid-cols-3" : "grid-cols-1"}">
  `;

  // Build options dynamically
  q.options.forEach(opt => {
    const inputName = `q${q.id}`;
    const isChecked = userAnswers[q.id] === opt.id ? "checked" : "";

    if (q.type === "radio") {
      html += `
        <label class="option-label flex items-center space-x-3 p-3 border rounded-md">
          <input type="radio" class="invisible-radio" name="${inputName}" value="${opt.id}" ${isChecked} />
          <span>${opt.text}</span>
        </label>
      `;
    } else if (q.type === "image") {
      html += `
        <label class="option-label flex flex-col items-center">
          <input type="radio" class="invisible-radio" name="${inputName}" value="${opt.id}" ${isChecked} />
          <img src="${opt.img}" alt="Option ${opt.id}" 
               class="option-img ${isChecked ? "option-selected" : ""}" />
        </label>
      `;
    }
  });

  html += "</div>";
  questionContainer.innerHTML = html;


  const radios = questionContainer.querySelectorAll('input[type="radio"]');
  radios.forEach(radio => {
    radio.addEventListener("change", e => {
      userAnswers[q.id] = e.target.value;

      if (q.type === "image") {
        questionContainer
          .querySelectorAll(".option-img")
          .forEach(img => img.classList.remove("option-selected"));
        const selectedImg = e.target.closest("label").querySelector("img");
        if (selectedImg) selectedImg.classList.add("option-selected");
      }
    });
  });

  prevBtn.disabled = index === 0;
  nextBtn.classList.toggle("hidden", index === visibleQuestions.length - 1);
  submitBtn.classList.toggle("hidden", index !== visibleQuestions.length - 1);
}

startBtn.addEventListener("click", () => {
  currentIndex = 0;
  showSection(quiz);
  renderQuestion(currentIndex);
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < visibleQuestions.length - 1) {
    currentIndex++;
    renderQuestion(currentIndex);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion(currentIndex);
  }
});

console.log("✅ Quiz rendering logic loaded");

const scoreText = document.getElementById("scoreText");
const restartBtn = document.getElementById("restartBtn");

// Calculate and show the score
function calculateScore() {
  let score = 0;

  visibleQuestions.forEach(q => {
    const selected = userAnswers[q.id];
    const correctAnswers = q.options
      .filter(opt => opt.correct)
      .map(opt => opt.id);

    // Handle multiple correct answers
    if (correctAnswers.includes(selected)) {
      score++;
    }
  });

  return score;
}

// Submit event
submitBtn.addEventListener("click", () => {
  const total = visibleQuestions.length;
  const score = calculateScore();

  scoreText.textContent = `You got ${score} out of ${total} correct! 🎉`;
  showSection(result);
});

// Restart quiz
restartBtn.addEventListener("click", () => {
  // Clear answers
  for (const key in userAnswers) delete userAnswers[key];
  currentIndex = 0;

  // Show intro again
  showSection(intro);
});

