import React, { useEffect, useState } from "react";
import { Button } from "../../components";
import {
  StyledMapContainer,
  SlideIconWrap,
  StyledButtonMapWrap,
} from "../../styles/styledElements";
import { MapView } from "../../views";
import { CloseCircle } from "../../assets/icons";
import styled from "styled-components";
import { Title, AlertModal } from "../../components";
import { setCurrentLocation } from "../../_modules/location";
// redux
import { useDispatch } from "react-redux";

const { kakao } = window;

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justyfi-content: center;
  flex-direction: column;
  width: 100%;
  border-radius: ${(props) => props.radii || props.theme.radii.rounded};
  background: ${(props) => props.background || "#fff"};
`;

const CurrentMapContainer = ({ onClickCurrentLocation }) => {
  // useDispatch : call dispatch in store
  const dispatch = useDispatch();

  const [coordinate, setCoordinate] = useState({
    // 지도의 초기 위치
    center: { lat: 37.49676871972202, lng: 127.02474726969814 },
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
  });

  //failed modal
  const [onModal, setOnModal] = useState(false);

  // address modal show up
  const onClickModal = () => {
    setOnModal((prev) => !prev);
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
    setCoordinate((prev) => ({
      ...prev,
      center: { lat: pos.coords.latitude, lng: pos.coords.longitude },
    }));
  };

  //   if failed to find location
  const locationLoadError = (pos) => {
    setOnModal(true);
  };

  // find region
  const searchAddressFromCode = () => {
    const geocoder = new kakao.maps.services.Geocoder();

    let callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = result[0];
        _setLocation(
          `${newSearch.region_2depth_name} ${newSearch.region_3depth_name}`
        );
        onClickCurrentLocation();
      } else {
        alert("정확한 주소를 입력해주세요. 예)강남구, 은평구, 갈현동");
      }
    };
    geocoder.coord2RegionCode(
      coordinate.center.lng,
      coordinate.center.lat,
      callback
    );
  };

  // save region to session storage
  const _setLocation = (region) => {
    dispatch(setCurrentLocation(region));
  };

  //   on rendering this component, find location
  useEffect(() => {
    getCurrentPos();

    return () => {
      setOnModal(false);
    };
  }, []);

  return (
    <ModalContainer>
      {/* alert modal */}
      <AlertModal
        onModal={onModal}
        onClickModal={onClickModal}
        color="#FF4842"
        title="위치정보 오류!"
        body="위치정보를 사용할 수 없습니다."
        secondBody="브라우저의 위치사용을 허용해주신후, 새로고침해주세요."
      />
      {/* close btn */}
      <SlideIconWrap margin="0">
        <CloseCircle color="#637381" onClick={onClickCurrentLocation} />
      </SlideIconWrap>
      {/* title */}
      <Title width="100%" margin="0 0 20px 0">
        현재위치로 위치선정
      </Title>
      {/* map */}
      <StyledMapContainer>
        <MapView // 지도를 표시할 Container
          location={coordinate}
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
            onClick={searchAddressFromCode}
          >
            설정완료
          </Button>
        </StyledButtonMapWrap>
      </StyledMapContainer>
    </ModalContainer>
  );
};

export default CurrentMapContainer;
