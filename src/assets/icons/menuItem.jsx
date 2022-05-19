import React from "react";

const MenuItem = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <g
        id="vuesax_bold_barcode"
        data-name="vuesax/bold/barcode"
        transform="translate(-252 260) rotate(-90)"
      >
        <g id="barcode">
          <path
            id="Vector"
            d="M0,0H24V24H0Z"
            transform="translate(236 252)"
            fill="none"
            opacity="0"
          />
          <path
            id="Vector-2"
            data-name="Vector"
            d="M15,0H5C2,0,0,1.5,0,5v7c0,3.5,2,5,5,5H15c3,0,5-1.5,5-5V5C20,1.5,18,0,15,0ZM4.75,12.5a.75.75,0,0,1-1.5,0v-8a.75.75,0,0,1,1.5,0Zm3,0a.75.75,0,0,1-1.5,0v-1a.75.75,0,0,1,1.5,0Zm0-4a.75.75,0,0,1-1.5,0v-4a.75.75,0,0,1,1.5,0Zm3,4a.75.75,0,0,1-1.5,0v-8a.75.75,0,0,1,1.5,0Zm3,0a.75.75,0,0,1-1.5,0v-4a.75.75,0,0,1,1.5,0Zm0-7a.75.75,0,0,1-1.5,0v-1a.75.75,0,0,1,1.5,0Zm3,7a.75.75,0,0,1-1.5,0v-8a.75.75,0,0,1,1.5,0Z"
            transform="translate(238 255.5)"
            fill={color}
          />
        </g>
      </g>
    </svg>
  );
};

export default MenuItem;
