// action type
const LIKESTORE = "like/LIKESOTRE";

// action creator
let nextId = 1;
export const setLikeStore = (store) => ({
  type: LIKESTORE,
  store: {
    id: nextId++,
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
