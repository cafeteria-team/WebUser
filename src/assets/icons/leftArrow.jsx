import React from "react";

const LeftArrow = ({ onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      onClick={onClick}
      style={{
        cursor: "pointer",
        padding: "5px",
        boxSizing: "content-box",
      }}
    >
      <g
        id="vuesax_bold_arrow-left"
        data-name="vuesax/bold/arrow-left"
        transform="translate(-364 -252)"
      >
        <g id="arrow-left">
          <path
            id="Vector"
            d="M5.8.319l-3.21,3.21L.623,5.489a2.131,2.131,0,0,0,0,3.01l5.18,5.18a1.079,1.079,0,0,0,1.84-.76V1.079A1.077,1.077,0,0,0,5.8.319Z"
            transform="translate(372.177 257.001)"
            fill="rgb(33, 43, 54)"
          />
          <path
            id="Vector-2"
            data-name="Vector"
            d="M0,0H24V24H0Z"
            transform="translate(388 276) rotate(180)"
            fill="none"
            opacity="0"
          />
        </g>
      </g>
    </svg>
  );
};

export default LeftArrow;
