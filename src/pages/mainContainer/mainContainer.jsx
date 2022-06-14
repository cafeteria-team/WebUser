import React, { useState } from "react";
import { Header, SlideMenu } from "../../views";
import { RootStyle, Container, Wrap } from "../../styles/styledElements";
import { Outlet } from "react-router-dom";

const MainContainer = () => {
  const [OnMenu, SetOnMenu] = useState(false);

  const onClickMenu = () => {
    SetOnMenu((prev) => !prev);
  };

  const onClickBg = () => {
    SetOnMenu((prev) => !prev);
  };

  return (
    <RootStyle>
      <SlideMenu
        OnMenu={OnMenu}
        onClickMenu={onClickMenu}
        onClickBg={onClickBg}
      />
      <Header onClickMenu={onClickMenu} />
      <Container>
        <Wrap>
          <Outlet />
        </Wrap>
      </Container>
    </RootStyle>
  );
};

export default MainContainer;
