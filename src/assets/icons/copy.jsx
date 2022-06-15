import React from "react";

const Copy = ({ color, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      onClick={onClick}
      style={{
        cursor: "pointer",
        marginRight: "10px",
        padding: "10px",
        boxSizing: "content-box",
      }}
    >
      <g
        id="vuesax_bold_document-copy"
        data-name="vuesax/bold/document-copy"
        transform="translate(-684 -188)"
      >
        <g id="document-copy">
          <path
            id="Vector"
            d="M13.5,6.15H11.33A3.229,3.229,0,0,1,8.1,2.92V.75A.749.749,0,0,0,7.35,0H4.18A3.96,3.96,0,0,0,0,4.18v6.64A3.96,3.96,0,0,0,4.18,15h5.89a3.96,3.96,0,0,0,4.18-4.18V6.9A.749.749,0,0,0,13.5,6.15Z"
            transform="translate(686 195)"
            fill={color}
          />
          <path
            id="Vector-2"
            data-name="Vector"
            d="M10.06,0H4.17A3.946,3.946,0,0,0,0,4.01C.06,4.01.11,4,.17,4H6.06a3.96,3.96,0,0,1,4.18,4.18v6.65c0,.06-.01.11-.01.16a3.932,3.932,0,0,0,4.01-4.16V4.18A3.96,3.96,0,0,0,10.06,0Z"
            transform="translate(691.76 190)"
            fill={color}
          />
          <path
            id="Vector-3"
            data-name="Vector"
            d="M.84.148A.489.489,0,0,0,0,.478V3.1a2.041,2.041,0,0,0,2.07,2c.71.01,1.7.01,2.55.01a.47.47,0,0,0,.35-.8C3.88,3.218,1.94,1.268.84.148Z"
            transform="translate(695.14 195.002)"
            fill={color}
          />
          <path
            id="Vector-4"
            data-name="Vector"
            d="M0,0H24V24H0Z"
            transform="translate(708 212) rotate(180)"
            fill="none"
            opacity="0"
          />
        </g>
      </g>
    </svg>
  );
};

export default Copy;
