import Flashcard from "./flashcard.js";
import DAO from "./flashcards.dao.js";

//TODO: util functions => create flashcard ... + getinputsiblings

//TODO: make forward browser button not working for this page, as loadflashcards cannot be called from
// history api because function cannot be seiralized yet and thus cant be put inside the state object

//TODO: autocomplete the stored terms , removes the need to remember everything

export async function loadFlashcards() {
  let storedFlashcards = await DAO.getAllFlashcards();
  for (let flashcard of storedFlashcards)
    $("center").append(
      $(
        `<div is='edit-form-div' data-source='${flashcard.terms[0].content.content}' data-target='${flashcard.terms[1].content.content}'>`
      )
    );
}

$("center").on("click", ".js-delete-btn", async (e) => {
  let terms = getInputSiblings(e.target.parentNode.parentNode);
  let flashcard = new Flashcard("German", terms);
  let result = await DAO.deleteFlashcard(flashcard);
  if (result) {
    $(".modal-content").html("Flashcard removed successfully!");
    $(".modal-content").css("background-color", "green");
    e.currentTarget.parentElement.parentElement.remove();
  } else {
    $(".modal-content").html("An error occured during deletion");
    $(".modal-content").css("background-color", "red");
  }
  $(".modal").modal("show");
});

$("center").on("click", ".js-update-btn", async (e) => {
  let terms = getInputSiblings(e.target.parentNode.parentNode);
  let flashcard = new Flashcard("German", terms);
  let result = await DAO.updateFlashcard(flashcard);
  if (result) {
    $(".modal-content").html("Flashcard updated successfully!");
    $(".modal-content").css("background-color", "green");
    e.target.parentElement.parentElement.setAttribute("data-source", terms[0]);
    e.target.parentElement.parentElement.setAttribute("data-target", terms[1]);
  } else {
    $(".modal-content").html("An error occured during the update");
    $(".modal-content").css("background-color", "red");
  }
  $(".modal").modal("show");
});

function getInputSiblings(parent) {
  let result = [];
  const siblings = parent.childNodes;
  for (let i = 0; i < siblings.length; ++i)
    if (siblings[i].nodeName.toLowerCase() === "input")
      result.push(siblings[i].value);
  return result;
}
