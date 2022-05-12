import React from "react";
import {
  StyledHeaderContainer,
  StyledHeaderWrap,
} from "../styles/styledElements";
import { Menu, Location, Logo } from "../assets/icons";

const Header = () => {
  return (
    <StyledHeaderContainer>
      <StyledHeaderWrap>
        <Menu color="#212B36" />
        <Logo />
        <Location color="#212B36" />
      </StyledHeaderWrap>
    </StyledHeaderContainer>
  );
};

export default Header;
