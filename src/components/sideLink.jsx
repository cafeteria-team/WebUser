import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const SideLink = ({ children, props, pathName }) => {
  const StyledLink = styled(NavLink)`
    color: ${({ theme }) => theme.colors.text};
  `;

  return (
    <StyledLink {...props} to={`${pathName}`}>
      {children}
    </StyledLink>
  );
};

export default SideLink;
