import React from "react";
import styled from "styled-components";

const Title = ({ children, ...props }) => {
  const StyledTitle = styled.h1`
    color: ${(props) => props.color || props.theme.colors.text};
    line-height: ${(props) =>
      props.lineHegiht || props.theme.lineHeights.title};
  `;
  return <StyledTitle {...props}>{children}</StyledTitle>;
};

export default Title;
