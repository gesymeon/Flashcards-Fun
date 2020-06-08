//TODO: When the terms array contains instances of Term it is saved as if it contains empty objects (BLOG about this!!)
import Term from "./term.js";

class Flashcard {
  #terms;
  #category;

  constructor(category, terms = []) {
    let position = 0;
    this.#terms = new Array();
    this.#category = category;
    //TODO: na kanw insert me ton index tou terms gia position ..
    // for (const term of terms) this.#terms.push(new Term(term, i++));
    for (const term of terms)
      this.#terms.push(
        Object.assign({}, { content: term }, { position: position++ })
      );
  }

  get category() {
    return this.#category;
  }

  get terms() {
    return this.#terms;
  }
}

export default Flashcard;
