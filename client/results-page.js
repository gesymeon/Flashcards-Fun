import { loadContent } from "./router.js";

import { loadFlashcards as loadToTest } from "./start-play.js";

let testedCategory;

export function updateScore(args) {
  const [correctAnswers, numOfFlashcards, flashcardsCategory] = args;
  testedCategory = flashcardsCategory;
  $("h2").html("Your score is: " + correctAnswers + "/" + numOfFlashcards);
}

$("center").on("click", "#toMainPage", () => {
  window.history.pushState({}, "insertion form", "/insertion-form.html");
  loadContent("guestplay");
});

$("center").on("click", "#replay", () => {
  window.history.pushState({}, "start play", "/start-play.html");
  loadContent("start-play", loadToTest, testedCategory);
});
