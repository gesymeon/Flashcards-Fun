//Could not be saved in indexDB as it is an ES6 class
//TODO: terms must have their own placeholders (in db table also).. so they can be autocompleted

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
