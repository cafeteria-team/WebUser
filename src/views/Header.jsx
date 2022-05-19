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
import { MapContainer } from "../pages";
import Modal from "react-modal";

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
  const [OnAddress, SetOnAddress] = useState(false);

  //address modal
  const [OnModal, SetOnModal] = useState(false);

  // Open map
  const [FindLocation, SetFindLocation] = useState(false);

  // header address content show up
  const OnClickLocation = () => {
    SetOnAddress((prev) => !prev);
  };

  // address modal show up
  const OnClickModal = () => {
    SetOnModal((prev) => !prev);
  };

  // clicked address btn
  const OpenFindLocation = () => {
    SetOnModal(false);
    OnClickFindLocation();
  };

  // find location show up
  const OnClickFindLocation = () => {
    SetFindLocation((prev) => !prev);
  };

  return (
    <>
      {/* modal */}
      <Modal
        isOpen={OnModal}
        contentLabel="phone check"
        onRequestClose={OnClickModal}
        style={ModalStyle}
        className="Modal"
        overlayClassName="Overlay"
        ariaHideApp={false}
      >
        <ModalAddress
          OnClickModal={OnClickModal}
          OpenFindLocation={OpenFindLocation}
        />
      </Modal>

      {/* map modal */}
      <Modal
        isOpen={FindLocation}
        contentLabel="phone check"
        onRequestClose={OnClickFindLocation}
        style={FindModalStyle}
        className="Modal"
        overlayClassName="Overlay"
        ariaHideApp={false}
      >
        <MapContainer OnClickFindLocation={OnClickFindLocation} />
      </Modal>

      {/* header */}
      <StyledHeaderContainer>
        <StyledHeaderWrap>
          <Menu color="#212B36" onClickMenu={onClickMenu} />
          <Logo />
          <Location color="#212B36" OnClickLocation={OnClickLocation} />
        </StyledHeaderWrap>
      </StyledHeaderContainer>
      {/* location content */}
      <LocationContentWrap OnAddress={OnAddress}>
        <LocationContent>
          <Title margin="0 0 16px 0">내주변</Title>
          <MyLocationWrap>
            <MyLocation>중구 태평로 1가</MyLocation>
            <MoreBtn
              padding="6px 8px"
              background="#F9FAFB"
              radii="8px"
              color="#637381"
              onClick={OnClickModal}
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
