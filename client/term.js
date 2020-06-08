//TODO: terms must have their own placeholders.. these do not get autocompleted

class Term {
  #content;
  #position;

  constructor(content, position) {
    this.#content = content;
    this.#position = position;
  }

  get position() {
    return this.#position;
  }

  get content() {
    return this.#content;
  }

  set content(content) {
    this.#content = content;
  }
}

export default Term;
