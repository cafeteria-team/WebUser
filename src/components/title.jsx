import React, { memo } from "react";
import styled from "styled-components";

const StyledTitle = styled.h1`
  color: ${(props) => props.color || props.theme.colors.text};
  line-height: ${(props) => props.lineHegiht || props.theme.lineHeights.title};
  margin: ${(props) => props.margin || ""};
  width: ${(props) => props.width || "auto"};
  font-family: ${(props) => props.font || "Pretendard"};
`;

const Title = ({ children, ...props }) => {
  return <StyledTitle {...props}>{children}</StyledTitle>;
};

export default memo(Title);
