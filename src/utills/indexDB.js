const dbReq = indexedDB.open("likedStore", 1);

let db;

dbReq.addEventListener("success", (e) => {
  db = e.target.result;
});

dbReq.addEventListener("error", (e) => {
  const error = e.target.error;
  console.log("error는?", error);
});

dbReq.addEventListener("upgradeneeded", (e) => {
  let oldVersion = e.oldVersion;

  db = e.target.result;
  if (oldVersion < 1) {
    db.createObjectStore("liked", {
      keyPath: "id",
      autoIncrement: true,
    });
  }
});

export const addIndexDB = (storeId) => {
  let store = db.transaction("liked", "readwrite").objectStore("liked");

  let addReq = store.add({
    storeId: storeId,
  });

  addReq.onerror = (e) => {
    console.log(e.target.error);
  };

  addReq.onsuccess = (e) => {
    console.log(e.target.result);
  };
};

export const getIndexDB = () => {
  let store = db.transaction("liked").objectStore("liked");
  let getAllReq = store.openCursor();

  getAllReq.onerror = (e) => {
    console.log(e.target.error);
  };

  getAllReq.onsuccess = (e) => {
    let cursor = e.target.result;
    console.log(cursor);
  };
};
