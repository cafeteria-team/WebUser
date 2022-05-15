import React, { useState } from "react";
import {
  StyledHeaderContainer,
  StyledHeaderWrap,
  LocationContentWrap,
  LocationContent,
  MyLocationWrap,
  MyLocation,
} from "../styles/styledElements";
import { Menu, Location, Logo } from "../assets/icons";
import { Title, MoreBtn } from "../components";
import Modal from "react-modal";

const Header = ({ onClickMenu }) => {
  //address content
  const [OnAddress, SetOnAddress] = useState(false);

  //address modal
  const []

  const OnClickLocation = () => {
    SetOnAddress((prev) => !prev);
  };

  return (
    <>
      <StyledHeaderContainer>
        <StyledHeaderWrap>
          <Menu color="#212B36" onClickMenu={onClickMenu} />
          <Logo />
          <Location color="#212B36" OnClickLocation={OnClickLocation} />
        </StyledHeaderWrap>
      </StyledHeaderContainer>
      {OnAddress && (
        <LocationContentWrap>
          <LocationContent>
            <Title margin="0 0 16px 0">내주변</Title>
            <MyLocationWrap>
              <MyLocation>중구 태평로 1가</MyLocation>
              <MoreBtn
                padding="6px 8px"
                background="#F9FAFB"
                radii="8px"
                color="#637381"
              >
                위치 재설정
              </MoreBtn>
            </MyLocationWrap>
          </LocationContent>
        </LocationContentWrap>
      )}
    </>
  );
};

export default Header;
