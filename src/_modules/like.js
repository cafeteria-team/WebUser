// action type
const LIKESTORE = "like/LIKESOTRE";

// action creator
export const setLikeStore = (store) => ({
  type: LIKESTORE,
  store,
});

// set initial state
const initialState = {
  store: "",
};

// reducer
export default function setLikedStore(state = initialState, action) {
  switch (action.type) {
    case LIKESTORE:
      return {
        store: action.store,
      };
    default:
      return state;
  }
}
