import React, { useEffect, useState } from "react";
import { Button } from "../../components";
import {
  StyledMapContainer,
  SlideIconWrap,
  StyledButtonMapWrap,
  Paragraph,
  CardWrap,
} from "../../styles/styledElements";
import { MapView } from "../../views";
import { CloseCircle } from "../../assets/icons";
import styled from "styled-components";
import { Title } from "../../components";
import Modal from "react-modal";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setCurrentLocation } from "../../_modules/location";

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
    maxWidth: "400px",
    height: "220px",
    display: "flex",
    borderRadius: "16px",
    border: "unset",
    padding: "20px 20px",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
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

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justyfi-content: center;
  flex-direction: column;
  width: 100%;
  border-radius: ${(props) => props.radii || props.theme.radii.rounded};
  background: ${(props) => props.background || "#fff"};
`;

const CurrentMapContainer = ({ OnClickCurrentLocation }) => {
  const [Location, SetLocation] = useState({
    // 지도의 초기 위치
    center: { lat: 37.49676871972202, lng: 127.02474726969814 },
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
  });

  //failed modal
  const [OnModal, SetOnModal] = useState(false);

  // address modal show up
  const OnClickModal = () => {
    SetOnModal((prev) => !prev);
  };

  //   find current location
  const getCurrentPos = () => {
    navigator.geolocation.getCurrentPosition(
      locationLoadSuccess,
      locationLoadError
    );
  };

  //   if find location,
  const locationLoadSuccess = (pos) => {
    SetLocation((prev) => ({
      ...prev,
      center: { lat: pos.coords.latitude, lng: pos.coords.longitude },
    }));
  };

  //   if failed to find location
  const locationLoadError = (pos) => {
    SetOnModal(true);
  };

  //   on rendering this component, find location
  useEffect(() => {
    getCurrentPos();

    return () => {
      SetOnModal(false);
    };
  }, []);

  // redux
  // useSelector는 : check store's state
  // state === store.getState()
  //   const { location } = useSelector((state) => ({
  //     location: state.setLocation.location,
  //   }));
  const location = useSelector((state) => state.location, shallowEqual);

  console.log(location);

  // useDispatch : call dispatch in store
  const dispatch = useDispatch();

  const _setLocation = (location) => {
    dispatch(setCurrentLocation(location));
  };

  return (
    <ModalContainer>
      <Modal
        isOpen={OnModal}
        contentLabel="phone check"
        onRequestClose={OnClickModal}
        style={ModalStyle}
        className="Modal"
        overlayClassName="Overlay"
        ariaHideApp={false}
      >
        <CardWrap flexDirection="column" align="center" margin="0 0 20px 0">
          <Title margin="20px 0" color="#FF4842">
            위치정보 오류!
          </Title>
          <Paragraph margin="0 0 6px 0">
            위치정보를 사용할 수 없습니다.
          </Paragraph>
          <Paragraph> 브라우저의 위치사용을 허용해 주세요.</Paragraph>
        </CardWrap>
        <Button
          background="#FF4842"
          color="#fff"
          width="100%"
          height="56px"
          onClick={OnClickModal}
        >
          확인
        </Button>
      </Modal>
      <SlideIconWrap margin="0">
        <CloseCircle color="#637381" onClick={OnClickCurrentLocation} />
      </SlideIconWrap>
      <Title width="100%" margin="0 0 20px 0">
        현재위치로 위치선정
      </Title>
      <StyledMapContainer>
        <MapView // 지도를 표시할 Container
          location={Location}
        ></MapView>
        <StyledButtonMapWrap>
          <Button
            type="submit"
            width="100px"
            height="56px"
            background="#ff9030"
            color="#fff"
            radii="8px"
            shadow
            onClick={() => _setLocation(Location)}
          >
            설정완료
          </Button>
        </StyledButtonMapWrap>
      </StyledMapContainer>
    </ModalContainer>
  );
};

export default CurrentMapContainer;
