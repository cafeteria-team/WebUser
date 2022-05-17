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
} from "../styles/styledElements";
import { ImageBox, Title, MoreBtn } from "../components";
import { MenuItem, Heart } from "../assets/icons";

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

const MenuPart = ({ OnMenu, onClickMenu }) => {
  return (
    <CardMenuContainer height={OnMenu ? "100%" : null}>
      <CardMenuTitleContainer>
        <CardMenuTitleWrap>
          <MenuItem color="#637381" />
          <Paragraph margin="0 0 0 6px" fontWeight="bold">
            오늘의 메뉴
          </Paragraph>
        </CardMenuTitleWrap>
        <MoreBtn background="unset" color="#637381" onClick={onClickMenu}>
          더보기
        </MoreBtn>
      </CardMenuTitleContainer>
      <CardMenuListsWrap
        maxHeight={OnMenu ? "1000px" : null}
        marginTop={OnMenu ? "26px" : null}
      >
        <CardMenuLists>흰밥</CardMenuLists>
        <CardMenuLists>미역국</CardMenuLists>
        <CardMenuLists>돈까스</CardMenuLists>
        <CardMenuLists>김치찌개</CardMenuLists>
        <CardMenuLists>오징어볶음</CardMenuLists>
      </CardMenuListsWrap>
    </CardMenuContainer>
  );
};

const CardMenu = () => {
  // menu lists state
  const [OnMenu, SetOnMenu] = useState(false);
  // like state
  const [Liked, SetLiked] = useState(false);

  const onClickMenu = () => {
    SetOnMenu((prev) => !prev);
  };

  const onClickLike = () => {
    SetLiked((prev) => !prev);
  };

  return (
    <CardContainer>
      {/* image */}
      <ImagePart onClickLike={onClickLike} Liked={Liked} />
      {/* title */}
      <TitlePart />
      {/* menu */}
      <MenuPart onClickMenu={onClickMenu} OnMenu={OnMenu} />
    </CardContainer>
  );
};

export default CardMenu;
