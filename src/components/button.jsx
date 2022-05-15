import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  align-items: ${(props) => props.align || "center"};
  justify-content: ${(props) => props.just || "center"};
  background: ${(props) => props.background || ""};
  border-radius: ${(props) => props.align || props.theme.radii.button};
  cursor: pointer;
  outline: unset;
  border: ${(props) => props.border || "unset"};
  margin: ${(props) => props.margin || ""};
`;

const Button = ({ onClick, children, ...props }) => {
  return (
    <StyledButton {...props} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
