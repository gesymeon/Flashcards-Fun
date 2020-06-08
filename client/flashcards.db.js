const DB_NAME = "flashcards_database";
const DB_VERSION = 1; // Use a long long for this value (don't use a float)
const DB_STORE_NAME = "flashcards";

var db = {};

openDb();

function openDb() {
  let req = indexedDB.open(DB_NAME, DB_VERSION);
  req.onsuccess = function (evt) {
    // Equal to: db = this.result;
    db = req.result;
  };
  req.onerror = function (evt) {
    console.error("openDb:", evt.target.errorCode);
  };

  req.onupgradeneeded = function (evt) {
    let store = evt.currentTarget.result.createObjectStore(DB_STORE_NAME, {
      keyPath: "id",
      autoIncrement: true,
    });

    store.createIndex("category", "category", { unique: false });
  };
}

/**
 * @param {string} store_name
 * @param {string} mode either "readonly" or "readwrite"
 */
function getObjectStore(store_name, mode) {
  let tx = db.transaction(store_name, mode);
  return tx.objectStore(store_name);
}

db.getAll = async function getAll() {
  let store = getObjectStore(DB_STORE_NAME, "readonly");
  let request;
  try {
    request = store.getAll();
  } catch (e) {
    return Promise.reject(e);
  }
  return new Promise((resolve, reject) => {
    request.onsuccess = function () {
      resolve(request.result);
    };
    request.onerror = function () {
      reject();
    };
  });
};

db.addFlashcard = async function addFlashcard(obj) {
  let store = getObjectStore(DB_STORE_NAME, "readwrite");
  let request;
  try {
    request = store.add(obj);
  } catch (e) {
    return Promise.reject(e);
  }
  return new Promise((resolve, reject) => {
    request.onsuccess = function () {
      resolve(request.result);
    };
    request.onerror = function () {
      reject();
    };
  });
};

db.getByCategory = async function getByCategory(category) {
  return new Promise((resolve, reject) => {
    let store = getObjectStore(DB_STORE_NAME, "readonly");
    let index = store.index("category");
    let result = [];
    index.openCursor().onsuccess = (evt) => {
      let cursor = evt.target.result;
      if (cursor) {
        if (!cursor.value.category.localeCompare(category))
          result.push(cursor.value);

        cursor.continue();
      } else return resolve(result);
    };
    index.openCursor().onerror = (e) => {
      reject("Failed to open a cursor on database store");
    };
  });
};

//at most one flashcard can exist with the same category and source target pair, so after one
//is found and updated the updateFlashcard is designed to exit
db.updateFlashcard = async function updateFlashcard(category, source, target) {
  return new Promise((resolve, reject) => {
    let store = getObjectStore(DB_STORE_NAME, "readwrite");
    let index = store.index("category");
    let request;

    async function onUpdate(request) {
      return new Promise((resolve) => {
        request.onsuccess = function () {
          resolve(true);
        };
        request.onerror = function () {
          resolve(false);
        };
      });
    }

    index.openCursor().onsuccess = async (evt) => {
      let cursor = evt.target.result;
      if (cursor) {
        if (
          !cursor.value.category.localeCompare(category) &&
          !cursor.value.terms[0].content.localeCompare(source) &&
          cursor.value.terms[1].content.localeCompare(target)
        ) {
          //same source different target
          const updatedData = cursor.value;
          updatedData.terms[1].content = target;
          request = cursor.update(updatedData);
        }
        if (
          !cursor.value.category.localeCompare(category) &&
          cursor.value.terms[0].content.localeCompare(source) &&
          !cursor.value.terms[1].content.localeCompare(target)
        ) {
          //same target different source
          const updatedData = cursor.value;
          updatedData.terms[0].content = source;
          request = cursor.update(updatedData);
        }
        if (request) {
          const result = await onUpdate(request);
          if (result) return resolve("the update was successful");
          else
            return reject("An error was encountered when updating the record");
        }

        cursor.continue();
      } else return reject("the update was unsuccessful");
    };

    index.openCursor().onerror = (e) => {
      reject("whopsieeee!");
    };
  });
};

//category and source work as a composite primary key for the time being ..
db.deleteFlashcard = async function deleteFlashcard(category, source) {
  return new Promise((resolve, reject) => {
    let store = getObjectStore(DB_STORE_NAME, "readwrite");
    let index = store.index("category");
    let found = false;

    index.openCursor().onsuccess = (evt) => {
      let cursor = evt.target.result;
      if (found) return;
      if (cursor) {
        if (
          !cursor.value.category.localeCompare(category) &&
          !cursor.value.terms[0].content.localeCompare(source)
        ) {
          let request = cursor.delete();
          request.onsuccess = function () {
            resolve("Delete was successful");
            found = true;
          };
          request.onerror = function () {
            reject("Delete was unsuccessful");
            found = true;
          };
        }
        cursor.continue();
      } else reject("No matching flashcards found");
    };
    index.openCursor().onerror = (e) => {
      reject("Failed to open a cursor on the provided category");
    };
  });
};

export default db;
