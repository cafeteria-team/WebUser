import React from "react";

const Milk = ({ color }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 15.9983V18.9983C18 20.6483 16.65 21.9983 15 21.9983H9C7.35 21.9983 6 20.6483 6 18.9983V14.9883C6 14.4383 6.45 13.9883 7.01 13.9883L9.89 13.9983C10.58 13.9983 11.26 14.1483 11.89 14.4483C12.58 14.7683 13.31 14.9983 14.08 14.9983H17C17.55 14.9983 18 15.4483 18 15.9983Z"
        fill={color}
      />
      <path
        d="M17.41 9.41L15.29 7.29C15.1 7.1 15 6.85 15 6.59V4.91C15.58 4.71 16 4.15 16 3.5C16 2.67 15.33 2 14.5 2H9.5C8.67 2 8 2.67 8 3.5C8 4.15 8.42 4.71 9 4.91V6.59C9 6.85 8.9 7.1 8.71 7.29L6.59 9.41C6.27 9.73 6 10.38 6 10.83V11.48C6 12.03 6.44 12.48 6.99 12.48L9.9 12.5C10.88 12.5 11.87 12.74 12.75 13.2C13.17 13.42 13.65 13.5 14.12 13.5H17C17.55 13.5 18 13.05 18 12.5V10.83C18 10.38 17.73 9.73 17.41 9.41Z"
        fill={color}
      />
    </svg>
  );
};

export default Milk;
