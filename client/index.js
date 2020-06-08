import { loadFlashcards as loadToTest } from "./start-play.js";
import { loadFlashcards } from "./stored-flashcards.js";
import { updateScore } from "./results-page.js";

$(document).ready(function () {
  window.history.pushState(
    { id: "landing-page" },
    "landing page",
    "/landing-page.html"
  );

  loadContent("landing-page");
});

//TODO: its in global scope, find out how to hide it
//callback is used to load resources (async) after dom parsing is completed
export function loadContent(id) {
  switch (id) {
    case "guestplay":
      $(".js-router").load("/insertion-form.html");
      break;
    case "start-play":
      $(".js-router").load("/start-play.html", loadToTest);
      break;
    case "stored-flashcards":
      $(".js-router").load("/stored-flashcards.html", loadFlashcards);
      break;
    case "results-page":
      $(".js-router").load("/results-page.html", updateScore);
      break;
    case "landing-page":
    default:
      $(".js-router").load("/landing-page.html");
  }
}

window.onpopstate = function (event) {
  console.log("history changed to: " + document.location.href);

  loadContent(event.state.id);
};
