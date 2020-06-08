import Flashcard from "./flashcard.js";
import DAO from "./flashcards.dao.js";
import { loadFlashcards } from "./stored-flashcards.js";
import { loadFlashcards as loadToTest } from "./start-play.js";

import { loadContent } from "./index.js";

$("center").on("click", "#start-play", () => {
  let id = event.target.id;
  window.history.pushState({ id }, "start play", "/start-play.html");
  loadContent(id, loadToTest);
});

$("center").on("click", "#stored-flashcards", () => {
  let id = event.target.id;
  window.history.pushState(
    { id },
    "Stored flashcards",
    "/stored-flashcards.html"
  );
  loadContent(id, loadFlashcards);
});

$("center").on("click", ".js-add-btn", () => {
  $("<div is='insertion-form-div'>").insertAfter("hr");
});

$("center").on("click", ".js-remove-btn", (e) => {
  e.currentTarget.parentElement.parentElement.remove();
});

$("center").on("click", ".js-save-btn", async (e) => {
  let inputTerms = getInputSiblings(e.target.parentNode.parentNode);
  if (inputTerms[0] === "" || inputTerms[1] === "") {
    $(".modal-content").html("Please fill all the term fields");
    $(".modal-content").css("background-color", "red");
    $(".modal").modal("show");
    return;
  }

  let flashcard = new Flashcard("German", inputTerms);
  let result = await DAO.saveFlashcard(flashcard);

  if (result > 0) {
    $(".modal-content").html("Flashcard added successfully!");
    $(".modal-content").css("background-color", "green");
    e.currentTarget.parentElement.parentElement.remove();
  } else {
    $(".modal-content").html("Flashcard could not be stored");
    $(".modal-content").css("background-color", "red");
  }
  $(".modal").modal("show");
});

function getInputSiblings(node) {
  let result = [];
  const siblings = node.childNodes;
  for (let i = 0; i < siblings.length; ++i)
    if (siblings[i].nodeName.toLowerCase() === "input")
      result.push(siblings[i].value);
  return result;
}
