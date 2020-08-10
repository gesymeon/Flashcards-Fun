$(document).ready(function () {
  window.history.pushState(
    { id: "landing-page" },
    "landing page",
    "/landing-page.html"
  );
  loadContent("landing-page");
});

export function loadContent(id, callback, args) {
  switch (id) {
    case "guestplay":
      $(".js-router").load("/insertion-form.html");
      break;
    case "start-play":
      $(".js-router").load("/start-play.html", callback.bind(null, [args]));
      break;
    case "stored-flashcards":
      $(".js-router").load("/stored-flashcards.html", callback);
      break;
    case "results-page":
      $(".js-router").load("/results-page.html", callback.bind(null, args));
      break;
    case "landing-page":
    default:
      $(".js-router").load("/landing-page.html");
  }
}

window.onpopstate = function (event) {
  let state = event.state;
  if (state?.avoidOnBack) {
    window.history.pushState(
      { id: "guestplay" },
      "insertion form",
      "/insertion-form.html"
    );
    loadContent("guestplay");
  } else loadContent(state.id);
};
