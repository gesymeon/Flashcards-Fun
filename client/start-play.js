import DAO from "./flashcards.dao.js";
import { loadContent } from "./router.js";
import { updateScore } from "./results-page.js";

let answer, currentFlashcard;
let correctAnswers = 0;
let index = 0;
let flashcards = [];

$("center").on("keyup", "input", (e) => {
  if (e.keyCode === 13) {
    answer = $("input").val();
    if (!answer) return;
    compareAnswer(answer);
  }
});

export async function loadFlashcards() {
  index = 0;
  correctAnswers = 0;

  flashcards = await DAO.retrieveFlashcardsByCategory("General");
  if (!flashcards.length) {
    $("h1").html("Please create some flashcards first!");
    $("h2").html("No flashcards found").css("color", "red");
    $(".input-group").css("display", "none");
    return;
  }

  currentFlashcard = flashcards[0];
  updateView(currentFlashcard);
}

function updateView(flashcard) {
  $("h2").html("Category: " + flashcard.category);
  $("h1").html(flashcard.terms[0].content.content);
  $("input").css("background-color", "white");
  $("input").val("");
}

function compareAnswer(answer) {
  if (!answer.localeCompare(currentFlashcard.terms[1].content.content)) {
    correctAnswers++;
    $("input").css("background-color", "green");
  } else {
    $("input").css("background-color", "red");
  }
  setTimeout(nextFlashcard, 2000);
}

function nextFlashcard() {
  $(".js-correct-answers").html(correctAnswers + "/" + flashcards.length);
  $(".js-correct-answers").css("font-weight", "bold");
  if (index < flashcards.length - 1) {
    currentFlashcard = flashcards[++index];
    updateView(currentFlashcard);
  } else {
    navigateToResults();
  }
}

function navigateToResults() {
  window.history.pushState(
    { avoidOnBack: true },
    "results page",
    "/results-page.html"
  );
  loadContent("results-page", updateScore, [
    correctAnswers,
    flashcards.length,
    "General",
  ]);
}
