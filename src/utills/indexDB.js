const idxedDB = window.indexedDB;

if (!idxedDB) {
  window.alert("해당 브라우저에서는 indexedDB를 지원하지 않습니다.");
}

let db;

const dbReq = indexedDB.open("likedStore", 1);

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
  }
  // if (oldVersion < 2) {
  //   db.createObjectStore("likedv2", {
  //     keyPath: "store",
  //     autoIncrement: true,
  //   });
  // }
};

export const addIndexDB = (storeId) => {
  let request = db //
    .transaction("liked", "readwrite")
    .objectStore("liked")
    .add({
      store: Number(storeId),
    });

  request.onerror = (e) => {
    console.log(e.target.error);
  };

  request.onsuccess = (e) => {
    return e.target.result;
  };
};

export const getIndexDB = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("likedStore", 1);
    request.onerror = (e) => {
      console.log(e.target.error);
    };

    request.onsuccess = (e) => {
      const db = request.result;
      const transaction = db.transaction("liked");

      transaction.onerror = (e) => {
        console.log(e.target.error);
      };
      transaction.oncomplete = (e) => {};

      const objStore = transaction.objectStore("liked");
      const objstoreRequest = objStore.getAll();
      objstoreRequest.onsuccess = (e) => {
        const result = e.target.result;
        resolve(result);
      };
      objstoreRequest.onerror = (e) => {
        reject(e.target.error);
      };
    };

    // let request = db //
    //   .transaction("liked", "readonly")
    //   .objectStore("liked")
    //   .getAll();
    // // //   .openCursor();

    // request.onerror = (e) => {
    //   console.log(e.target.error);
    //   reject(new Error(e.target.error));
    // };

    // request.onsuccess = (e) => {
    //   let cursor = e.target.result;
    //   resolve(cursor);
    // };
  });
};

export const deleteIndexDB = (storeId) => {
  let request = db
    .transaction("liked", "readwrite")
    .objectStore("liked")
    .delete(Number(storeId));

  request.onerror = (e) => {
    console.log(e.target.error);
  };

  request.onsuccess = (e) => {
    return;
  };
};
