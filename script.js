document.addEventListener("DOMContentLoaded", () => {
  console.log("Quiz skeleton loaded successfully");
});

// Filter questions in use
const visibleQuestions = questions.filter(q => q.meta?.inUse !== false);

// Track user answers and current question index
let currentIndex = 0;
const userAnswers = {};

// DOM element references
const intro = document.getElementById("intro");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const questionContainer = document.getElementById("questionContainer");
const startBtn = document.getElementById("startBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const restartBtn = document.getElementById("restartBtn");
const resultText = document.getElementById("scoreText");
const genreSpan = document.getElementById("genreResult");

// Helper: show only one section at a time
function showSection(section) {
  intro.classList.add("hidden");
  quiz.classList.add("hidden");
  result.classList.add("hidden");
  section.classList.remove("hidden");
}

// -----------------------------
// renderQuestion function
// -----------------------------
function renderQuestion(index) {
  const q = visibleQuestions[index];
  if (!q) return;

  let html = `
    <h3 class="text-lg font-semibold mb-2">${index + 1}. ${q.text}</h3>
    <div class="grid gap-3 ${q.type === "image" ? "grid-cols-3" : "grid-cols-1"}">
  `;

  q.options.forEach(opt => {
    const inputName = `q${q.id}`;
    const isChecked = userAnswers[q.id] === opt.id ? "checked" : "";

    if (q.type === "radio") {
      html += `
        <label class="option-label flex items-center space-x-3 p-3 border rounded-md border-white/30 transition transform duration-300 hover:scale-105 hover:shadow-lg hover:border-white/50 hover:bg-white/20 cursor-pointer">
          <input type="radio" class="invisible-radio" name="${inputName}" value="${opt.id}" ${isChecked} />
          <span>${opt.text}</span>
        </label>
      `;
    } else if (q.type === "image") {
      html += `
        <label class="option-label flex flex-col items-center p-2 border rounded-md border-white/30 transition transform duration-300 hover:scale-105 hover:shadow-lg hover:border-white/50 hover:bg-white/20 cursor-pointer">
          <input type="radio" class="invisible-radio" name="${inputName}" value="${opt.id}" ${isChecked} />
          <img src="${opt.img}" alt="Option ${opt.id}" class="option-img ${isChecked ? "option-selected" : ""} rounded-lg" />
        </label>
      `;
    }
  });

  html += "</div>";
  questionContainer.innerHTML = html;

  // Event listeners for selecting options
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

  // Navigation buttons
  prevBtn.disabled = index === 0;
  nextBtn.classList.toggle("hidden", index === visibleQuestions.length - 1);
  submitBtn.classList.toggle("hidden", index !== visibleQuestions.length - 1);
}

// -----------------------------
// Event Listeners
// -----------------------------
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

restartBtn.addEventListener("click", () => {
  for (const key in userAnswers) delete userAnswers[key];
  currentIndex = 0;
  showSection(intro);
});

// -----------------------------
// Genre calculation logic
// -----------------------------
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

  return topGenres;
}

// -----------------------------
// Submit button - animated result
// -----------------------------
submitBtn.addEventListener("click", () => {
  const topGenres = calculateGenreResult();
  genreSpan.innerHTML = "";

  topGenres.forEach((g, i) => {
    const span = document.createElement("span");
    span.textContent = g;
    span.className = "inline-block px-3 py-1 rounded bg-indigo-500 text-white mr-2 transform transition-transform duration-500";
    
    // Animate with slight delay
    setTimeout(() => {
      span.classList.add("scale-110");
      setTimeout(() => span.classList.remove("scale-110"), 500);
    }, i * 300);

    genreSpan.appendChild(span);
  });

  showSection(result);
});

console.log(" Full genre quiz script loaded with hover effects and frosted borders");
