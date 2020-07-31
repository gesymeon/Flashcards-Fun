import Flashcard from "./flashcard.js";
import db from "./flashcards.db.js";

// TODO: External data object data model to specify what the database accepts and produces
// TODO: Internal error logging for database failures ..

class DAO {
  static fromObject(objectFlashcard) {
    return new Flashcard(objectFlashcard.category, objectFlashcard.terms);
  }

  static toObject(flashcard) {
    return { terms: [...flashcard.terms], category: flashcard.category };
  }

  static async retrieveFlashcardsByCategory(category) {
    let flashcards = [];
    let objectFlashcards = await db.getByCategory(category);
    for (let objectFlashcard of objectFlashcards) {
      flashcards.push(DAO.fromObject(objectFlashcard));
    }
    return flashcards;
  }

  static async getAllFlashcards() {
    let flashcards = [];
    try {
      let objectFlashcards = await db.getAll();
      for (let objectFlashcard of objectFlashcards) {
        flashcards.push(DAO.fromObject(objectFlashcard));
      }
    } catch (e) {
      console.log(e);
    }
    return flashcards;
  }

  static async saveFlashcard(flashcard) {
    let toSave = DAO.toObject(flashcard);
    let result;
    try {
      result = await db.addFlashcard(toSave);
    } catch (e) {
      console.log(e);
    }
    return result;
  }

  static async deleteFlashcard(flashcard) {
    let result;
    try {
      let objectFlashcard = DAO.toObject(flashcard);
      let source = objectFlashcard.terms[0].content;
      result = await db.deleteFlashcard(objectFlashcard.category, source);
    } catch (e) {
      console.log(e);
    }
    return result;
  }

  static async updateFlashcard(flashcard) {
    let result;
    try {
      let objectFlashcard = DAO.toObject(flashcard);
      let source = objectFlashcard.terms[0].content;
      let target = objectFlashcard.terms[1].content;

      result = await db.updateFlashcard(
        objectFlashcard.category,
        source,
        target
      );
    } catch (e) {
      console.log(e);
    }
    return result;
  }
}

export default DAO;
