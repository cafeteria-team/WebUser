import React from "react";
import styled from "styled-components";

// export const Panel = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   max-width: 100%;
//   height: auto;
// `;

export default React.forwardRef(({ index }, ref) => (
  <div ref={ref}>
    <img
      src={require("../assets/images/default_img.png")}
      style={{ width: "300px", height: "300px" }}
    />
  </div>
));
