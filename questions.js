// questions.js
const questions = [
  {
    id: 1,
    text: "Do you prefer fiction or non fiction movies/series?",
    type: "radio",
    options: [
      { id: "a", text: "Fiction", correct: true },
      { id: "b", text: "Non-fiction" },
      
    ],
    meta: { inUse: true }
  },
  {
    id: 2,
    text: "How do you usually play games?",
    type: "radio",
    options: [
      { id: "a", text: "Solo" },
      { id: "b", text: "With friends online", correct: true },
      { id: "c", text: "Local co-op" },
      { id: "d", text: "I mostly watch others play" }
    ],
    meta: { inUse: true }
  },
  {
    id: 3,
    text: "Pick an image that matches your vibe:",
    type: "image",
    options: [
      { id: "a", img: "https://via.placeholder.com/100x100/4f46e5/ffffff?text=Action" },
      { id: "b", img: "https://via.placeholder.com/100x100/f59e0b/ffffff?text=RPG", correct: true },
      { id: "c", img: "https://via.placeholder.com/100x100/10b981/ffffff?text=Strategy" }
    ],
    meta: { inUse: true }
  },
  {
    id: 4,
    text: "What do you value most in a game?",
    type: "radio",
    options: [
      { id: "a", text: "Storytelling" },
      { id: "b", text: "Competition", correct: true },
      { id: "c", text: "Creativity and building" },
      { id: "d", text: "Chill and relaxing vibes" }
    ],
    meta: { inUse: true }
  },
  {
    id: 5,
    text: "Which platform do you prefer?",
    type: "radio",
    options: [
      { id: "a", text: "PC" },
      { id: "b", text: "Console" },
      { id: "c", text: "Mobile", correct: true },
      { id: "d", text: "" }
    ],
    meta: { inUse: true }
  }
];
