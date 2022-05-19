// action type
const CURRENTADDRESS = "address/CURRENTADDRESS";

// action creator
export const setCurrentLocation = (location) => ({
  type: CURRENTADDRESS,
  location,
});

// set initial state
const initialState = {
  location: "",
};

// reducer
export default function setLocation(state = initialState, action) {
  switch (action.type) {
    case CURRENTADDRESS:
      return {
        location: action.location,
      };
    default:
      return state;
  }
}
