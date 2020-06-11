//TODO: terms must have their own placeholders/hint (in db table also).. so they can be autocompleted

class Term {
  #content;
  #position;
  #hint;

  constructor(content, position, hint) {
    this.#content = content;
    this.#position = position;
    this.#hint = hint;
  }

  get position() {
    return this.#position;
  }

  get hint() {
    return this.#hint;
  }

  set hint(hint) {
    this.#hint = hint;
  }

  get content() {
    return this.#content;
  }

  set content(content) {
    this.#content = content;
  }
}

export default Term;
