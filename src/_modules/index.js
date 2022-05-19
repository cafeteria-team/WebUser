//to combine redux modules
import { combineReducers } from "redux";
import setLocation from "./location";
// reducer persists
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

// save data into session storage
const persistConfig = {
  key: "root",
  storage: storageSession,
  // whiteList: ["setLocation"],
  // blackList: [],
  // except for
};

const rootReducer = combineReducers({
  setLocation,
});

export default persistReducer(persistConfig, rootReducer);
