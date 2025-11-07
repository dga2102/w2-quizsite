const questions = [
  {
    id: 1,
    text: "What kind of game worlds do you enjoy?",
    type: "radio",
    options: [
      { id: "a", text: "Expansive, story-driven worlds", genre: "RPG" },
      { id: "b", text: "Fast-paced, action-packed arenas", genre: "FPS" },
      { id: "c", text: "Mind-bending puzzles and challenges", genre: "Puzzle" },
    ]
  },
  {
    id: 2,
    text: "Which gameplay style excites you the most?",
    type: "radio",
    options: [
      { id: "a", text: "Strategic planning and leveling up", genre: "RPG" },
      { id: "b", text: "Quick reflexes and aiming skills", genre: "FPS" },
      { id: "c", text: "Solving riddles and logic problems", genre: "Puzzle" },
    ]
  },
  {
    id: 3,
    text: "Choose the type of challenge you prefer:",
    type: "radio",
    options: [
      { id: "a", text: "Character customization and story choices", genre: "RPG" },
      { id: "b", text: "Competitive matches and leaderboards", genre: "FPS" },
      { id: "c", text: "Brain teasers and critical thinking", genre: "Puzzle" },
    ]
  },
  // Optional: image-based question example
  {
    id: 4,
    text: "Pick the environment you like best:",
    type: "image",
    options: [
      { id: "a", img: "images/fantasy.jpg", genre: "RPG" },
      { id: "b", img: "images/shooter.jpg", genre: "FPS" },
      { id: "c", img: "images/puzzle.jpg", genre: "Puzzle" },
    ]
  }
];
