document.addEventListener("DOMContentLoaded", () => {
  console.log("Quiz skeleton loaded successfully");
});

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
const resultText = document.getElementById("scoreText"); // reuse this element
const restartBtn = document.getElementById("restartBtn");

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

  let html = `
    <h3 class="text-lg font-semibold mb-2">Question ${index + 1} of ${visibleQuestions.length}</h3>
    <p class="mb-4">${q.text}</p>
    <div class="grid gap-3 ${q.type === "image" ? "grid-cols-3" : "grid-cols-1"}">
  `;

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

  // Add event listeners
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

// Start quiz
startBtn.addEventListener("click", () => {
  currentIndex = 0;
  showSection(quiz);
  renderQuestion(currentIndex);
});

// Navigation buttons
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

// Restart quiz
restartBtn.addEventListener("click", () => {
  for (const key in userAnswers) delete userAnswers[key];
  currentIndex = 0;
  showSection(intro);
});

// Calculate top genre (with tie-handling)
function calculateGenreResult() {
  const genreCounts = {};

  visibleQuestions.forEach(q => {
    const selectedOptionId = userAnswers[q.id];
    const selectedOption = q.options.find(opt => opt.id === selectedOptionId);
    if (selectedOption) {
      const genre = selectedOption.genre;
      if (!genreCounts[genre]) genreCounts[genre] = 0;
      genreCounts[genre]++;
    }
  });

  let maxCount = 0;
  for (const count of Object.values(genreCounts)) {
    if (count > maxCount) maxCount = count;
  }

  const topGenres = Object.entries(genreCounts)
    .filter(([_, count]) => count === maxCount)
    .map(([genre]) => genre);

  return topGenres.length === 1 ? topGenres[0] : topGenres.join(" and ");
}

// Submit button
submitBtn.addEventListener("click", () => {
  const topGenre = calculateGenreResult();
  resultText.textContent = `Your ideal game genre is: ${topGenre} games!`;
  showSection(result);
});

console.log(" Genre-based quiz logic loaded");
