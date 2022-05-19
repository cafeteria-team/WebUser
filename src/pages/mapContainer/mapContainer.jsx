import React, { useState } from "react";
import { Input, Button } from "../../components";
import {
  StyledMapContainer,
  StyledMapWrap,
  SlideIconWrap,
  StyledButtonMapWrap,
} from "../../styles/styledElements";
import { MapView } from "../../views";
import { CloseCircle } from "../../assets/icons";
import styled from "styled-components";
import { Title } from "../../components";

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

const MapContainer = ({ OnClickFindLocation }) => {
  const [InputText, SetInputText] = useState("");
  const [Location, SetLocation] = useState({
    // 지도의 초기 위치
    center: { lat: 37.49676871972202, lng: 127.02474726969814 },
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
  });

  const OnChange = (e) => {
    SetInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (InputText === "") {
      alert("주소를 입력해주세요.");
    } else {
      SearchMap();
      SetInputText("");
    }
  };

  // 주소 입력후 검색 클릭 시 원하는 주소로 이동
  const SearchMap = () => {
    const geocoder = new kakao.maps.services.Geocoder();

    let callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = result[0];
        SetLocation({
          center: { lat: newSearch.y, lng: newSearch.x },
        });
      } else {
        alert("정확한 주소를 입력해주세요. 예)강남구, 은평구, 갈현동");
      }
    };
    geocoder.addressSearch(`${InputText}`, callback);
  };

  return (
    <ModalContainer>
      <SlideIconWrap margin="0">
        <CloseCircle color="#637381" onClick={OnClickFindLocation} />
      </SlideIconWrap>
      <Title width="100%" margin="0 0 20px 0">
        지도주소로 위치선정
      </Title>
      <StyledMapContainer>
        <StyledMapWrap onSubmit={handleSubmit}>
          <Input
            placeholder="정확한 주소를 입력해주세요. 예) 강남구, 은평구, 갈현동"
            value={InputText}
            type="text"
            onChange={(e) => OnChange(e)}
            width="100%"
            height="56px"
            radii="8px 0 0 0"
          />
          <Button
            type="submit"
            width="100px"
            height="56px"
            background="#637381"
            color="#fff"
            radii="0 8px 0 0"
          >
            검색
          </Button>
        </StyledMapWrap>
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
          >
            설정완료
          </Button>
        </StyledButtonMapWrap>
      </StyledMapContainer>
    </ModalContainer>
  );
};

export default MapContainer;
