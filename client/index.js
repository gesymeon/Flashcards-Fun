//import "./router.js";

$("body").on("shown.bs.modal", ".modal", (e) => {
  setTimeout(() => {
    return $(".modal").modal("hide");
  }, 1000);
});
