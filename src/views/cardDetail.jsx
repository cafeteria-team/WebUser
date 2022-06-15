import React, { useState, memo } from "react";
import {
  CardContainer,
  CardImageIconWrap,
  CardImageContainer,
  CardTitleContainer,
  CardStorePriceContainer,
  CardStorePriceDes,
  CardStorePrice,
  CardMenuContainer,
  CardMenuTitleContainer,
  CardMenuTitleWrap,
  CardMenuListsWrap,
  CardMenuLists,
  Paragraph,
  CardAddressWrap,
  CardWrap,
  FacilityIconWrap,
} from "../styles/styledElements";
import { ImageBox, Title, MoreBtn } from "../components";
import {
  MenuItem,
  Heart,
  Location,
  Happy,
  Coffee,
  Notice,
  RouteSquare,
} from "../assets/icons";

const ImagePart = memo(({ Liked, onClickLike }) => {
  return (
    <CardImageContainer>
      <CardImageIconWrap>
        <Heart color={Liked ? "#FF4842" : "#fff"} onClcik={onClickLike} />
      </CardImageIconWrap>
      <ImageBox />
    </CardImageContainer>
  );
});

const TitlePart = memo(() => {
  return (
    <CardTitleContainer>
      <Title>행복식당</Title>
      <CardStorePriceContainer>
        <CardStorePriceDes>식권</CardStorePriceDes>
        <CardStorePrice>￦ 5,500원</CardStorePrice>
      </CardStorePriceContainer>
    </CardTitleContainer>
  );
});

const AddressPart = memo(({ mapOpen }) => {
  return (
    <CardAddressWrap margin="0 0 20px 0">
      <CardAddressWrap margin="0 12px 0 0">
        <Location color="#1A90FF" />
        <Paragraph fontSize="14px" margin="0 0 0 6px">
          서울 금천구 가산동
        </Paragraph>
      </CardAddressWrap>
      <MoreBtn
        color="#1A90FF"
        background="unset"
        fontSize="14px"
        onClick={mapOpen}
      >
        지도보기
      </MoreBtn>
    </CardAddressWrap>
  );
});

const MenuPart = ({ OnMenu, onClickMenu }) => {
  return (
    <CardMenuContainer height="100%">
      <CardMenuTitleContainer>
        <CardMenuTitleWrap>
          <MenuItem color="#ff9030" />
          <Paragraph margin="0 0 0 6px" fontWeight="bold" color="#ff9030">
            오늘의 메뉴
          </Paragraph>
        </CardMenuTitleWrap>
      </CardMenuTitleContainer>
      <CardMenuListsWrap maxHeight="unset" marginTop="26px">
        <CardMenuLists>흰밥</CardMenuLists>
        <CardMenuLists>미역국</CardMenuLists>
        <CardMenuLists>돈까스</CardMenuLists>
        <CardMenuLists>김치찌개</CardMenuLists>
        <CardMenuLists>오징어볶음</CardMenuLists>
      </CardMenuListsWrap>
    </CardMenuContainer>
  );
};

const FacilityPart = () => {
  return (
    <CardWrap
      flexDirection="column"
      margin="26px 0 0"
      border
      padding="0 0 26px 0"
    >
      <CardWrap align="center" margin="0 0 20px 0">
        <Happy color="#E2E6E7" />
        <Paragraph margin="0 0 0 6px" fontSize="14px">
          편의시설 및 서비스
        </Paragraph>
      </CardWrap>
      <FacilityIconWrap>
        <Coffee color="#637381" />
        <Paragraph margin="6px 0 0 0" color="#637381" fontSize="14px">
          커피
        </Paragraph>
      </FacilityIconWrap>
    </CardWrap>
  );
};

const PricePart = () => {
  return (
    <CardWrap
      flexDirection="column"
      margin="26px 0 0"
      border
      padding="0 0 26px 0"
    >
      <CardWrap align="center" margin="0 0 20px 0">
        <Notice color="#E2E6E7" />
        <Paragraph margin="0 0 0 6px" fontSize="14px">
          공지사항
        </Paragraph>
      </CardWrap>
      <CardWrap>
        <Paragraph margin="0 0 0 6px" fontSize="14px">
          맛있습니다 많이 놀러오세요
        </Paragraph>
      </CardWrap>
    </CardWrap>
  );
};

const MapPart = () => {
  return (
    <CardWrap flexDirection="column" margin="26px 0 0" padding="0 0 26px 0">
      <CardWrap align="center" margin="0 0 20px 0">
        <RouteSquare color="#E2E6E7" />
        <Paragraph margin="0 0 0 6px" fontSize="14px">
          찾아오시는길
        </Paragraph>
      </CardWrap>
      <CardWrap>
        {/* 지도들어갈자리 */}
        <CardWrap />
        <AddressPart />
      </CardWrap>
    </CardWrap>
  );
};

const CardDetail = ({ mapOpen }) => {
  // like state
  const [Liked, SetLiked] = useState(false);

  const onClickLike = () => {
    SetLiked((prev) => !prev);
  };

  return (
    <CardContainer>
      {/* image */}
      <ImagePart onClickLike={onClickLike} Liked={Liked} />
      {/* title */}
      <TitlePart />
      {/* address */}
      <AddressPart mapOpen={mapOpen} />
      {/* menu */}
      <MenuPart />
      {/* facility */}
      <FacilityPart />
      {/* price */}
      <PricePart />
      {/* map */}
      <MapPart />
    </CardContainer>
  );
};

export default CardDetail;
