class editFormFlashCard extends HTMLDivElement {
  static get observedAttributes() {
    return ["data-source", "data-target"];
  }

  //On the first execution the constructor takes care of the correct classes, this is why oldvalue is used in if
  attributeChangedCallback(name, oldValue, newValue) {
    if (!oldValue || oldValue === newValue) return;
    this.firstTermUpdated = false;
    this.secondTermUpdated = false;
    this.updateTermsView();
  }

  firstTermUpdated = false;
  secondTermUpdated = false;
  buttonDelete;
  buttonUpdate;

  constructor() {
    self = super();

    self.setAttribute("class", "input-group mb-4");

    let firstTerm = document.createElement("input");

    firstTerm.setAttribute("type", "text");
    firstTerm.setAttribute("class", "form-control mr-2");

    firstTerm.setAttribute("aria-label", "Source Term");
    firstTerm.setAttribute("value", this.getAttribute("data-source"));

    firstTerm.addEventListener("change", (e) => {
      let input = e.target.value;

      if (input.trim() === "") {
        firstTerm.setAttribute("value", this.getAttribute("data-source"));
        input = this.getAttribute("data-source");
        e.target.value = input;
      }

      if (input !== this.getAttribute("data-source")) {
        this.firstTermUpdated = true;
      } else {
        this.firstTermUpdated = false;
      }

      this.updateTermsView();
    });

    let secondTerm = document.createElement("input");

    secondTerm.setAttribute("type", "text");
    secondTerm.setAttribute("class", "form-control ml-2 mr-1");
    secondTerm.setAttribute("aria-label", "Target Term");
    secondTerm.setAttribute("value", this.getAttribute("data-target"));

    secondTerm.addEventListener("change", (e) => {
      let input = e.target.value;

      if (input.trim() === "") {
        secondTerm.setAttribute("value", this.getAttribute("data-target"));
        input = this.getAttribute("data-target");
        //TODO: find out why this is needed and secondTerm.setAttribute is not enough
        e.target.value = input;
      }

      if (input !== this.getAttribute("data-target")) {
        this.secondTermUpdated = true;
      } else {
        this.secondTermUpdated = false;
      }

      this.updateTermsView();
    });

    let equalsIcon = document.createElement("i");
    equalsIcon.setAttribute("class", "fas fa-equals fa-2x");

    self.appendChild(firstTerm);
    self.appendChild(equalsIcon);
    self.appendChild(secondTerm);

    let groupAppend = document.createElement("div");
    groupAppend.setAttribute("class", "input-group-append");

    this.buttonUpdate = document.createElement("button");

    this.buttonUpdate.setAttribute("type", "button");
    this.buttonUpdate.textContent = "Update";

    this.buttonDelete = document.createElement("button");

    this.buttonDelete.setAttribute("type", "button");
    this.buttonDelete.textContent = "Delete";

    groupAppend.appendChild(this.buttonUpdate);
    groupAppend.appendChild(this.buttonDelete);

    self.appendChild(groupAppend);

    this.updateTermsView();
  }

  updateTermsView() {
    if (this.firstTermUpdated && this.secondTermUpdated) {
      this.buttonUpdate.setAttribute(
        "class",
        "btn btn-outline-secondary js-update-btn"
      );
      this.buttonDelete.setAttribute(
        "class",
        "btn btn-outline-secondary js-delete-btn"
      );
      this.buttonUpdate.setAttribute("disabled", "true");
      this.buttonDelete.setAttribute("disabled", "true");
    } else if (
      (this.firstTermUpdated && !this.secondTermUpdated) ||
      (!this.firstTermUpdated && this.secondTermUpdated)
    ) {
      this.buttonDelete.setAttribute("disabled", "true");
      this.buttonDelete.setAttribute(
        "class",
        "btn btn-outline-secondary js-delete-btn"
      );
      this.buttonUpdate.removeAttribute("disabled");
      this.buttonUpdate.setAttribute("class", "btn btn-primary js-update-btn");
    } else {
      this.buttonUpdate.setAttribute(
        "class",
        "btn btn-outline-secondary js-update-btn"
      );
      this.buttonUpdate.setAttribute("disabled", "true");
      this.buttonDelete.removeAttribute("disabled");
      this.buttonDelete.setAttribute("class", "btn btn-primary js-delete-btn");
    }
  }
}

customElements.define("edit-form-div", editFormFlashCard, {
  extends: "div",
});

export default editFormFlashCard;
