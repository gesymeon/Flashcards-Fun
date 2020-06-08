import Flashcard from "./flashcard.js";
import db from "./flashcards.db.js";

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
    let objectFlashcards = await db.getAll();
    for (let objectFlashcard of objectFlashcards) {
      flashcards.push(DAO.fromObject(objectFlashcard));
    }
    return flashcards;
  }

  static async saveFlashcard(flashcard) {
    let toSave = DAO.toObject(flashcard);
    let result = await db.addFlashcard(toSave);
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

  static canBeCloned(val) {
    if (Object(val) !== val)
      // Primitive value
      return true;
    switch (
      {}.toString.call(val).slice(8, -1) // Class
    ) {
      case "Boolean":
      case "Number":
      case "String":
      case "Date":
      case "RegExp":
      case "Blob":
      case "FileList":
      case "ImageData":
      case "ImageBitmap":
      case "ArrayBuffer":
        return true;
      case "Array":
      case "Object":
        return Object.keys(val).every((prop) => DAO.canBeCloned(val[prop]));
      case "Map":
        return (
          [...val.keys()].every(DAO.canBeCloned) &&
          [...val.values()].every(DAO.canBeCloned)
        );
      case "Set":
        return [...val.keys()].every(DAO.canBeCloned);
      default:
        return false;
    }
  }
}

export default DAO;
