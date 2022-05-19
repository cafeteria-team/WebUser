import React, { memo } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: ${({ width }) => width || "300px"};
  height: ${({ height }) => height || "300px"};
  padding: ${({ padding }) => padding || "14px 20px"};
  margin: ${({ margin }) => margin || ""};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ radii }) => radii || ""};
  outline: unset;
  transition: border 0.3s linear;
  position: ${({ position }) => position || ""};
  &:focus {
    border-color: ${({ theme }) => theme.colors.main};
  }
  ::placeholder {
    color: "#ccc";
  }
`;

const Input = memo(
  ({ placeholder, type, value, id, disabled, onChange, ...props }) => {
    return (
      <StyledInput
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value || ""}
        id={id || ""}
        disabled={disabled}
        {...props}
      ></StyledInput>
    );
  }
);
export default Input;
