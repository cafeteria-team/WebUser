import React, { Children } from "react";
import styled from "styled-components";

const StyledMoreBtn = styled.button`
  cursor: pointer;
  outline: unset;
  background: ${(props) => props.background || ""};
  border-radius: ${(props) => props.radii || ""};
  border: ${(props) => props.border || "unset"};
  color: ${(props) => props.color || ""};
  font-size: ${({ theme }) => theme.fontSizes.detail};
  margin: ${(props) => props.margin || ""};
  padding: ${(props) => props.padding || ""};
  line-height: ${({ lineHeight }) => lineHeight};
  height: ${({ height }) => height};
`;

const MoreBtn = ({ children, onClick, ...props }) => {
  return (
    <StyledMoreBtn onClick={onClick} {...props}>
      {children}
    </StyledMoreBtn>
  );
};

export default MoreBtn;
