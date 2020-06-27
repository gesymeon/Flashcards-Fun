class Flashcard {
  #terms;
  #category;

  constructor(category, terms = []) {
    let position = 0;
    this.#terms = new Array();
    this.#category = category;

    for (const term of terms)
      this.#terms.push({
        //term is an object when read from the database and a string when the flashcards is first created
        content: term.content || term,
        position: position++,
        hint: "hint",
      });
  }

  get category() {
    return this.#category;
  }

  get terms() {
    return this.#terms;
  }
}

export default Flashcard;
