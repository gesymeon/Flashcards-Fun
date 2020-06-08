// $("#guestplay").on("click", () => {
//   let id = event.target.id;
//   window.history.pushState({ id }, "insertion form", "/insertion-form.html");

//   loadContent(id);
// });

import { loadContent } from "./index.js";

$("center").on("click", "#guestplay", (e) => {
  let id = event.target.id;
  window.history.pushState({ id }, "insertion form", "/insertion-form.html");

  loadContent(id);
});
