import React, { memo } from "react";

const Right = ({ color, onClick, disabled }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      style={{ cursor: disabled ? "" : "pointer" }}
      onClick={disabled ? () => {} : onClick}
    >
      <g id="arrow-circle-right" transform="translate(0 0)">
        <path
          id="Vector"
          d="M13.332,0A13.332,13.332,0,1,0,26.664,13.332,13.354,13.354,0,0,0,13.332,0Zm3.72,14.039-4.706,4.706a1,1,0,0,1-1.413,0,1.006,1.006,0,0,1,0-1.413l4-4-4-4a1,1,0,0,1,1.413-1.413l4.706,4.706A.982.982,0,0,1,17.052,14.039Z"
          transform="translate(2.666 2.666)"
          fill={color}
        />
        <path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H32V32H0Z"
          transform="translate(31.997 31.997) rotate(180)"
          fill="none"
          opacity="0"
        />
      </g>
    </svg>
  );
};

export default memo(Right);
