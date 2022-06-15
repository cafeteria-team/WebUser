import React from "react";

const Home = ({ onClick }) => {
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
        id="vuesax_bold_home-2"
        data-name="vuesax/bold/home-2"
        transform="translate(-620 -188)"
      >
        <g id="home-2">
          <path
            id="Vector"
            d="M18.05,4.818,12.29.788A4.853,4.853,0,0,0,6.8.918L1.79,4.828A5.153,5.153,0,0,0,0,8.468v6.9A4.631,4.631,0,0,0,4.62,20H15.4a4.622,4.622,0,0,0,4.62-4.62V8.6A5.1,5.1,0,0,0,18.05,4.818ZM10.76,16a.75.75,0,0,1-1.5,0V13a.75.75,0,0,1,1.5,0Z"
            transform="translate(621.99 190.002)"
            fill="rgb(33, 43, 54)"
          />
          <path
            id="Vector-2"
            data-name="Vector"
            d="M0,0H24V24H0Z"
            transform="translate(644 212) rotate(180)"
            fill="none"
            opacity="0"
          />
        </g>
      </g>
    </svg>
  );
};

export default Home;
