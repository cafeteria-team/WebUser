import React, { memo } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: unset;
  margin: ${(props) => props.margin || ""};
  border-bottom: ${(props) => props.border || ""};
  padding: ${(props) => props.padding || ""};
`;

const SideLink = ({ children, pathName, onClickMenu, ...props }) => {
  return (
    <StyledLink {...props} to={`${pathName}`} onClick={onClickMenu}>
      {children}
    </StyledLink>
  );
};

export default memo(SideLink);
