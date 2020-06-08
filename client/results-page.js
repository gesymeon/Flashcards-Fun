import { loadContent } from "./index.js";

export function updateScore() {
  $("h2").html(
    "Your score is: " +
      window.history.state.correctAnswers +
      "/" +
      window.history.state.length
  );
}

$("center").on("click", "#toMainPage", () => {
  window.history.pushState({}, "insertion form", "/insertion-form.html");
  loadContent("guestplay");
});

$("center").on("click", "#replay", () => {
  window.history.pushState({}, "start play", "/start-play.html");
  loadContent("start-play");
});
