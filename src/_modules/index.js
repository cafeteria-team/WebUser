//to combine redux modules
import { combineReducers } from "redux";
import setLocation from "./location";
import setLikedStore from "./like";
// reducer persists
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import storage from "redux-persist/lib/storage";

// save data into session storage
const persistConfig = {
  key: "location",
  storage,
  whitelist: ["setLocation"],
};

const rootReducer = combineReducers({
  setLocation,
  setLikedStore,
});

export default persistReducer(persistConfig, rootReducer);
