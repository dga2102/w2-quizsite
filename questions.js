const questions = [
  {
    id: 1,
    text: "Would you class yourself as an extroverted person?",
    type: "radio",
    options: [
      { id: "a", text: "Yes", genre: "Co-op Campaigns" },
      { id: "b", text: "No", genre: "Single Player Story Modes" },
      { id: "c", text: "It depends on the day..", genre: "Survival Games" },
    ]
  },
  {
    id: 2,
    text: "How much time do you want to invest into a new game?",
    type: "radio",
    options: [
      { id: "a", text: "The Majority of My Time ", genre: "Survival Games" },
      { id: "b", text: "Whenever My Friends Are Online", genre: "Co-op Campaigns" },
      { id: "c", text: "Just on Occasions", genre: "Single Player Story Modes" },
    ]
  },
  {
    id: 3,
    text: "Choose the type of challenge you prefer:",
    type: "radio",
    options: [
      { id: "a", text: "Survival and Gathering", genre: "Survival Games" },
      { id: "b", text: "Long solo grinding with saveable progress", genre: "Single Player Story Modes" },
      { id: "c", text: "Team missions with friends", genre: "Co-op Campaigns" },
    ]
  },
  {
    id: 4,
    text: "Choose Your Preferred Mode:",
    type: "radio",
    options: [
      { id: "a", text: "PvPvE", genre: "Survival Games" },
      { id: "b", text: "PvE", genre: "Single Player Story Modes" },
      { id: "c", text: "PvP", genre: "Co-op Campaigns" },
    ]
  },
  //
  {
    id: 5,
    text: "Select the photo of the game you think looks like the most fun:",
    type: "image",
    options: [
      { id: "a", img: "https://i.guim.co.uk/img/media/0f5405ee8f4b174822506b1a4c0011e1a0ca9706/0_0_3840_2160/master/3840.jpg?width=445&dpr=1&s=none&crop=none", genre: "Single Player Story Modes" },
      { id: "b", img: "https://static0.polygonimages.com/wordpress/wp-content/uploads/2025/11/arc-raiders-best-skills-header.jpg?w=1600&h=900&fit=crop", genre: "Survival Games" },
      { id: "c", img: "https://images.squarespace-cdn.com/content/v1/5ce942caecdee600012bbbb3/1ab78d0e-6245-4f4f-b18d-d57078bffd34/It+Takes+Two_20210521202630.jpg", genre: "Co-op Campaigns" },
    ]
  }
];
