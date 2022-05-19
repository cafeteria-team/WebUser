import React from "react";
import styled from "styled-components";
import Title from "./title";
import { Paragraph, SlideIconWrap } from "../styles/styledElements";
import { CloseCircle, Location, LeftSquare } from "../assets/icons";
import Button from "./button";

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justyfi-content: center;
  flex-direction: column;
  width: 100%;
  border-radius: ${(props) => props.radii || props.theme.radii.rounded};
  background: ${(props) => props.background || "#fff"};
`;

const ModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 454px;
`;

const ModalAddress = ({
  children,
  onClick,
  OnClickModal,
  OpenFindLocation,
  OpenCurrentLocation,
  ...props
}) => {
  return (
    <ModalContainer {...props}>
      <SlideIconWrap margin="0">
        <CloseCircle color="#637381" onClick={OnClickModal} />
      </SlideIconWrap>
      <ModalWrap>
        <Title margin="0 0 12px 0">위치 재설정</Title>
        <Paragraph margin="0 0 26px 0">
          현재 위치 재검색 또는 지도로 위치설정이 가능합니다.
        </Paragraph>
        <Button
          background="#F9FAFB"
          height="56px"
          margin="0 0 20px 0"
          onClick={OpenCurrentLocation}
        >
          <LeftSquare color="#ff9030" />
          <Paragraph margin="0 0 0 6px">현재 위치로 재검색</Paragraph>
        </Button>
        <Button background="#F9FAFB" height="56px" onClick={OpenFindLocation}>
          <Location color="#ff9030" />
          <Paragraph margin="0 0 0 6px">지도 주소로 위치 설정</Paragraph>
        </Button>
      </ModalWrap>
    </ModalContainer>
  );
};

export default ModalAddress;
