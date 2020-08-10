class insertionFormInputFlashCard extends HTMLDivElement {
  constructor() {
    // Always call super first in constructor
    self = super();
    self.setAttribute("class", "input-group mb-4");

    let firstTerm = document.createElement("input");

    firstTerm.setAttribute("type", "text");
    firstTerm.setAttribute("class", "form-control mr-2");
    firstTerm.setAttribute("placeholder", "Source Term");
    firstTerm.setAttribute("aria-label", "Source Term");

    let secondTerm = document.createElement("input");

    secondTerm.setAttribute("type", "text");
    secondTerm.setAttribute("class", "form-control ml-2 mr-1");
    secondTerm.setAttribute("placeholder", "Target Term");
    secondTerm.setAttribute("aria-label", "Target Term");

    let equalsIcon = document.createElement("i");
    equalsIcon.setAttribute("class", "fas fa-equals fa-2x");

    self.appendChild(firstTerm);
    self.appendChild(equalsIcon);
    self.appendChild(secondTerm);

    let groupAppend = document.createElement("div");
    groupAppend.setAttribute("class", "input-group-append");

    let buttonSave = document.createElement("button");
    buttonSave.setAttribute("class", "btn btn-primary js-save-btn");
    buttonSave.setAttribute("type", "button");
    buttonSave.textContent = "Save";

    let buttonRemove = document.createElement("button");
    buttonRemove.setAttribute(
      "class",
      "btn btn-outline-secondary js-remove-btn"
    );
    buttonRemove.setAttribute("type", "button");
    buttonRemove.textContent = "Remove";

    groupAppend.appendChild(buttonSave);
    groupAppend.appendChild(buttonRemove);

    self.appendChild(groupAppend);
  }
}

customElements.define("insertion-form-div", insertionFormInputFlashCard, {
  extends: "div",
});

export default insertionFormInputFlashCard;
