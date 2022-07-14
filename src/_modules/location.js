// action type
const CURRENTADDRESS = "address/CURRENTADDRESS";

// action creator
export const setCurrentLocation = (location, lat, lon) => ({
  type: CURRENTADDRESS,
  location,
  lat,
  lon,
});

// set initial state
const initialState = {
  location: "",
  lat: 37.49676871972202,
  lon: 127.02474726969814,
};

// reducer
export default function setLocation(state = initialState, action) {
  switch (action.type) {
    case CURRENTADDRESS:
      return {
        location: action.location,
        lat: action.lat,
        lon: action.lon,
      };
    default:
      return state;
  }
}
