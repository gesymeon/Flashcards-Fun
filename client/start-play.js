import DAO from "./flashcards.dao.js";
import { loadContent } from "./router.js";
import { updateScore } from "./results-page.js";

let answer, currentFlashcard, initialNumberOfFlashcards;
let correctAnswers = 0;
let flashcards = [];

$("center").on("keyup", "#givenAnswer", (e) => {
  if (e.keyCode === 13) {
    answer = $("input").val();
    if (!answer) return;
    compareAnswer(answer);
  }
});

export async function loadFlashcards() {
  correctAnswers = 0;

  flashcards = await DAO.retrieveFlashcardsByCategory("General");
  if (!flashcards.length) {
    $("h1").html("Please create some flashcards first!");
    $("h2").html("No flashcards found").css("color", "red");
    $(".input-group").css("display", "none");
    return;
  }

  initialNumberOfFlashcards = flashcards.length;
  currentFlashcard = getRandomFlashcard();
  updateView(currentFlashcard);
}

function updateView(flashcard) {
  $("h2").html("Category: " + flashcard.category);
  $("h1").html(flashcard.terms[0].content);
  $("input").css("background-color", "white");
  $("input").val("");
}

function compareAnswer(answer) {
  if (!answer.localeCompare(currentFlashcard.terms[1].content)) {
    correctAnswers++;
    $("input").css("background-color", "green");
  } else {
    $("input").css("background-color", "red");
  }
  setTimeout(nextFlashcard, 2000);
}

function nextFlashcard() {
  $(".js-correct-answers").html(
    correctAnswers + "/" + initialNumberOfFlashcards
  );
  $(".js-correct-answers").css("font-weight", "bold");
  if (flashcards.length) {
    currentFlashcard = getRandomFlashcard();
    updateView(currentFlashcard);
  } else {
    navigateToResults();
  }
}

function getRandomFlashcard() {
  let random = Math.floor(Math.random() * flashcards.length);
  return flashcards.splice(random, 1)[0];
}

function navigateToResults() {
  window.history.pushState(
    { avoidOnBack: true },
    "results page",
    "/results-page.html"
  );
  loadContent("results-page", updateScore, [
    correctAnswers,
    initialNumberOfFlashcards,
    "General",
  ]);
}
