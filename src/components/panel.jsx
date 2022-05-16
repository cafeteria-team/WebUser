import React from "react";
import styled from "styled-components";

export const CardImageWrap = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  display: block;
  border-radius: 16px;
  background: #fff;
  text-align: center;
  width: 100%;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.1);
  }
`;

export const CardImage = styled.img`
  top: -100%;
  bottom: -100%;
  margin: auto;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  width: auto;
  height: 100%;
`;

export default React.forwardRef(({ index, src }, ref) => (
  <CardImageWrap ref={ref}>
    <CardImage src={src} alt="store_img" />
  </CardImageWrap>
));
