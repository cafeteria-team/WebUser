// action type
const LIKESTORE = "like/LIKESOTRE";

// action creator
export const setLikeStore = (store) => ({
  type: LIKESTORE,
  store: {
    store,
  },
});

// set initial state
const initialState = [];

// reducer
export default function setLikedStore(state = initialState, action) {
  switch (action.type) {
    case LIKESTORE:
      return state.concat(action.store);
    default:
      return state;
  }
}
