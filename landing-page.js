import { loadContent } from "./router.js";

$("center").on("click", "#guestplay", (e) => {
  let id = event.target.id;
  window.history.pushState({ id }, "insertion form", "/insertion-form.html");
  loadContent(id);
});
