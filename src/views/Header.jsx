import React, { useState, memo, useEffect } from "react";
import {
  StyledHeaderContainer,
  StyledHeaderWrap,
  LocationContentWrap,
  LocationContent,
  MyLocationWrap,
  MyLocation,
  SpaceHeader,
  MenuWrap,
} from "../styles/styledElements";
import { Menu, Location, Logo, Home, LeftArrow } from "../assets/icons";
import { Title, MoreBtn, ModalAddress } from "../components";
import { MapContainer, CurrentMapContainer } from "../pages";
import Modal from "react-modal";
import { useSelector, shallowEqual } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ModalStyle, FindModalStyle } from "../styles/headerModalStyle";

// modal style
const Header = ({ onClickMenu }) => {
  //address content
  const [area, setArea] = useState(false);

  //address modal
  const [onModal, setOnModal] = useState(false);

  // Open map
  const [currentMap, setCurrentMap] = useState(false);
  const [findLocation, setFindLocation] = useState(false);

  // header address content show up
  const onClickLocation = () => {
    setArea((prev) => !prev);
  };

  // address modal show up
  const onClickModal = () => {
    setOnModal((prev) => !prev);
  };

  // clicked address btn
  const openCurrentLocation = () => {
    setOnModal(false);
    onClickCurrentLocation();
  };
  const openFindLocation = () => {
    setOnModal(false);
    onClickFindLocation();
  };

  // find location show up
  const onClickCurrentLocation = () => {
    setCurrentMap((prev) => !prev);
  };
  const onClickFindLocation = () => {
    setFindLocation((prev) => !prev);
  };

  const history = useLocation();
  const navigate = useNavigate();

  // go back to previous page
  const goBack = () => {
    navigate(-1);
  };
  // go to main page
  const goMain = () => {
    navigate("/");
  };

  const location = useSelector((state) => state.setLocation, shallowEqual);

  useEffect(() => {
    if (onModal || currentMap || findLocation) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [onModal, currentMap, findLocation]);

  return (
    <>
      {/* modal */}
      <Modal
        isOpen={onModal}
        contentLabel="phone check"
        onRequestClose={onClickModal}
        style={ModalStyle}
        className="Modal"
        overlayClassName="Overlay"
        ariaHideApp={false}
        closeTimeoutMS={200}
      >
        <ModalAddress
          onClickModal={onClickModal}
          openFindLocation={openFindLocation}
          openCurrentLocation={openCurrentLocation}
        />
      </Modal>

      {/* Cureent map modal */}
      <Modal
        isOpen={currentMap}
        contentLabel="phone check"
        onRequestClose={onClickCurrentLocation}
        style={FindModalStyle}
        className="Modal"
        overlayClassName="Overlay"
        ariaHideApp={false}
        closeTimeoutMS={200}
      >
        <CurrentMapContainer onClickCurrentLocation={onClickCurrentLocation} />
      </Modal>

      {/* map modal */}
      <Modal
        isOpen={findLocation}
        contentLabel="phone check"
        onRequestClose={onClickFindLocation}
        style={FindModalStyle}
        className="Modal"
        overlayClassName="Overlay"
        ariaHideApp={false}
        closeTimeoutMS={200}
      >
        <MapContainer onClickFindLocation={onClickFindLocation} />
      </Modal>

      {/* header */}
      <StyledHeaderContainer>
        <StyledHeaderWrap>
          <>
            {history.pathname !== "/" ? (
              <MenuWrap>
                <LeftArrow onClick={goBack} />
                <Home onClick={goMain} />
              </MenuWrap>
            ) : (
              <Menu color="#212B36" onClickMenu={onClickMenu} />
            )}
          </>
          <Logo />
          <Location
            color="#212B36"
            OnClickLocation={onClickLocation}
            padding="5px"
          />
        </StyledHeaderWrap>
      </StyledHeaderContainer>
      <SpaceHeader />
      {/* location content */}
      <LocationContentWrap area={area}>
        <LocationContent>
          <Title margin="0 0 16px 0">내주변</Title>
          <MyLocationWrap>
            <MyLocation>
              {location?.location ? location?.location : "서초구 서초동"}
            </MyLocation>
            <MoreBtn
              padding="6px 8px"
              background="#F9FAFB"
              radii="8px"
              color="#637381"
              onClick={onClickModal}
            >
              위치 재설정
            </MoreBtn>
          </MyLocationWrap>
        </LocationContent>
      </LocationContentWrap>
    </>
  );
};

export default memo(Header);
