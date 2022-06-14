import React, { useState, memo, useRef } from "react";
import {
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
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const CardContainer = styled(NavLink)`
display: flex;
flex-direction: column;
max-width: 600px;
width: 100%;
background: #fff;
box-shadow: ${({ theme }) => theme.shadow.content}};
border-radius:${({ theme }) => theme.radii.rounded};
padding:${({ theme }) => theme.space.large};
margin-top:${({ theme }) => theme.space.large};
text-decoration:unset;
color:${({ theme }) => theme.colors.text}};
`;

const ImagePart = memo(({ Liked, onClickLike }) => {
  return (
    <CardImageContainer>
      <CardImageIconWrap>
        <Heart
          color={Liked ? "#FF4842" : "#fff"}
          onClcik={(e) => onClickLike(e)}
        />
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

const MenuPart = ({ OnMenu, onClickMenu, scrollRef }) => {
  return (
    <CardMenuContainer height="100%" ref={scrollRef}>
      <CardMenuTitleContainer>
        <CardMenuTitleWrap>
          <MenuItem color="#637381" />
          <Paragraph margin="0 0 0 6px" fontWeight="bold">
            오늘의 메뉴
          </Paragraph>
        </CardMenuTitleWrap>
        <MoreBtn
          background="unset"
          color="#637381"
          onClick={(e) => onClickMenu(e)}
          padding="10px 0"
        >
          {OnMenu ? "간략히 보기" : "더보기"}
        </MoreBtn>
      </CardMenuTitleContainer>
      <CardMenuListsWrap maxHeight={OnMenu ? "1000px" : null}>
        <CardMenuLists padding="20px 0 10px">흰밥</CardMenuLists>
        <CardMenuLists>미역국</CardMenuLists>
        <CardMenuLists>돈까스</CardMenuLists>
        <CardMenuLists>김치찌개</CardMenuLists>
        <CardMenuLists border padding="10px 0 0">
          오징어볶음
        </CardMenuLists>
      </CardMenuListsWrap>
    </CardMenuContainer>
  );
};

const CardMenu = ({ storeId }) => {
  // scroll ref
  const scrollRef = useRef();

  // menu lists state
  const [OnMenu, SetOnMenu] = useState(false);
  // like state
  const [Liked, SetLiked] = useState(false);

  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  };

  const onClickMenu = (e) => {
    e.preventDefault();
    SetOnMenu((prev) => !prev);
    if (!OnMenu) {
      scrollToBottom();
    }
  };

  const onClickLike = (e) => {
    e.preventDefault();
    SetLiked((prev) => !prev);
  };

  return (
    <CardContainer to={`${storeId}`}>
      {/* image */}
      <ImagePart onClickLike={onClickLike} Liked={Liked} />
      {/* title */}
      <TitlePart />
      {/* menu */}
      <MenuPart
        onClickMenu={onClickMenu}
        OnMenu={OnMenu}
        scrollRef={scrollRef}
      />
    </CardContainer>
  );
};

export default CardMenu;
