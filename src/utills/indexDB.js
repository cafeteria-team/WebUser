const idxedDB = window.indexedDB;

if (!idxedDB) {
  window.alert("해당 브라우저에서는 indexedDB를 지원하지 않습니다.");
}

const dbReq = indexedDB.open("likedStore", 1);

let db;

dbReq.onsuccess = (e) => {
  db = e.target.result;
};

dbReq.onerror = (e) => {
  const error = e.target.error;
  console.log("error는?", error);
};

dbReq.onupgradeneeded = (e) => {
  let oldVersion = e.oldVersion;

  db = e.target.result;
  if (oldVersion < 1) {
    db.createObjectStore("liked", {
      keyPath: "store",
      autoIncrement: true,
    });

    // db.createIndex("store", "store", { unique: true });
  }
};

export const addIndexDB = (storeId) => {
  let request = db //
    .transaction("liked", "readwrite")
    .objectStore("liked")
    .add({
      store: storeId,
    });

  request.onerror = (e) => {
    console.log(e.target.error);
  };

  request.onsuccess = (e) => {
    return e.target.result;
  };
};

export const getIndexDB = () => {
  let request = db //
    .transaction("liked")
    .objectStore("liked")
    .openCursor();

  request.onerror = (e) => {
    console.log(e.target.error);
  };

  request.onsuccess = (e) => {
    let cursor = e.target.result.key;
    console.log(cursor);
    return cursor;
  };
};

export const deleteIndexDB = (storeId) => {
  let request = db
    .transaction("liked", "readwrite")
    .objectStore("liked")
    .delete(storeId);

  request.onerror = (e) => {
    console.log(e.target.error);
  };

  request.onsuccess = (e) => {
    console.log(e.target.result);
  };
};
