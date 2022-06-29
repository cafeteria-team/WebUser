//to combine redux modules
import { combineReducers } from "redux";
import location from "./location";
import like from "./like";
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
  location,
  like,
});

export default persistReducer(persistConfig, rootReducer);
