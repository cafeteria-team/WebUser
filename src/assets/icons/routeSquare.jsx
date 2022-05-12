import React from "react";

const RouteSquare = ({ color }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM17.35 9.05L15.01 16.59C14.45 18.38 11.94 18.41 11.35 16.63L10.65 14.56C10.46 13.99 10.01 13.53 9.44 13.35L7.36 12.65C5.6 12.06 5.62 9.53 7.41 8.99L14.95 6.64C16.43 6.19 17.82 7.58 17.35 9.05Z"
        fill={color}
      />
    </svg>
  );
};

export default RouteSquare;
