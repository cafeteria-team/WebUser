import React from "react";
import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <NavLink to="/">
      <svg
        version="1.1"
        id="레이어_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="66"
        height="30"
        viewBox="0 0 66 30"
        fill="#FF9030"
        cursor="pointer"
      >
        <g>
          <path
            d="M1,11.5V7.8c2.9,0,4.7-0.2,5.5-0.8H1V4.8C1,4.4,1.4,4,1.8,4h18.4C20.6,4,21,4.4,21,4.8V7h-5.5
		c0.8,0.6,2.6,0.8,5.5,0.8v3.7c-2.5,0-4.4-0.1-6-0.3V12h6v3H1v-3h6v-0.8C5.2,11.4,3.3,11.5,1,11.5z M1,19v-4h6v1h7v-1h7v4h-1.1
		c0.3,0.8,0.4,1.2,0.4,1.7c0,2.2-2.4,3.2-9.4,3.2s-9.4-1-9.4-3.2c0-0.5,0.1-0.9,0.3-1.7H1z M8.4,19.5l-0.3,0.7
		c1.8,0.6,4,0.8,5.8,0.8v-0.7C12.2,20.3,10.2,20,8.4,19.5z M8.9,8.7L8.5,9.4c1.5,0.9,3.1,1.6,4.8,1.9l0.1-0.7
		C11.7,10.2,10.3,9.6,8.9,8.7z"
          />
          <path
            d="M43,18h-6v5.2c0,0.4-0.4,0.8-0.8,0.8h-6.4c-0.4,0-0.8-0.4-0.8-0.8V18h-6v-6h14V9H23V4.8C23,4.4,23.4,4,23.8,4
		h18.4C42.6,4,43,4.4,43,4.8V18z"
          />
          <path
            d="M45,19.5V4.8C45,4.4,45.4,4,45.8,4H51v12.5c0,0.6,0.4,0.8,1.1,0.8c0.5,0,1.2-0.1,1.9-0.3V4h5v7h1V4h5v19h-5v-7
		h-1v7h-5v-0.9c-1.3,0.5-2.9,0.8-4.4,0.8C46.3,23,45,22,45,19.5z"
          />
        </g>
      </svg>
    </NavLink>
  );
};

export default Logo;
