import React, { useState } from "react";
import {
  CardContainer,
  CardImageContainer,
  CardImageWrap,
  CardImage,
  CardTitleContainer,
  CardStorePriceContainer,
  CardStorePriceDes,
  CardStorePrice,
  CardMenuContainer,
  CardMenuTitleContainer,
  CardMenuTitleWrap,
  CardMenuButton,
  CardMenuListsWrap,
  CardMenuLists,
} from "../../styles/styledElements";
import { Header, SlideMenu } from "../../views";
import { ImageBox } from "../../components";

const MainPage = () => {
  const [OnMenu, SetOnMenu] = useState(false);

  const onClickMenu = () => {
    SetOnMenu((prev) => !prev);
  };

  return (
    <CardContainer>
      <CardImageContainer>
        <ImageBox />
        {/* <CardImageWrap>
          <ImageBox />
          <CardImage></CardImage>
        </CardImageWrap> */}
      </CardImageContainer>
      <CardTitleContainer>
        <h1>행복식당</h1>
        <CardStorePriceContainer>
          <CardStorePriceDes>식권</CardStorePriceDes>
          <CardStorePrice>5,500원</CardStorePrice>
        </CardStorePriceContainer>
      </CardTitleContainer>
      <CardMenuContainer>
        <CardMenuTitleContainer>
          <CardMenuTitleWrap>오늘의메뉴</CardMenuTitleWrap>
          <CardMenuButton>더보기</CardMenuButton>
        </CardMenuTitleContainer>
      </CardMenuContainer>
    </CardContainer>
  );
};

export default MainPage;
