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
import { Title, MoreBtn, ModalAddress } from "../components";
import { MapContainer, CurrentMapContainer } from "../pages";
import Modal from "react-modal";
import { useSelector, shallowEqual } from "react-redux";

// modal style

const ModalStyle = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "50%",
    bottom: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#fff",
    zIndex: "999",
    width: "100%",
    maxWidth: "600px",
    height: "313px",
    display: "flex",
    borderRadius: "16px",
    border: "unset",
    padding: "20px 20px 50px",
  },
  overlay: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: "999",
  },
};
const FindModalStyle = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "50%",
    bottom: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#fff",
    zIndex: "999",
    width: "100%",
    maxWidth: "600px",
    height: "580px",
    display: "flex",
    borderRadius: "16px",
    border: "unset",
    padding: "20px 20px 50px",
  },
  overlay: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: "999",
  },
};

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

  const location = useSelector((state) => state.setLocation, shallowEqual);

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
      >
        <MapContainer onClickFindLocation={onClickFindLocation} />
      </Modal>

      {/* header */}
      <StyledHeaderContainer>
        <StyledHeaderWrap>
          <Menu color="#212B36" onClickMenu={onClickMenu} />
          <Logo />
          <Location color="#212B36" OnClickLocation={onClickLocation} />
        </StyledHeaderWrap>
      </StyledHeaderContainer>
      {/* location content */}
      <LocationContentWrap area={area}>
        <LocationContent>
          <Title margin="0 0 16px 0">내주변</Title>
          <MyLocationWrap>
            <MyLocation>
              {location.location ? location.location : "서초구 서초동"}
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

export default Header;
