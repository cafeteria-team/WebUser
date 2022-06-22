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
import { v4 as uuidv4 } from "uuid";

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

const ImagePart = memo(({ Liked, onClickLike, images }) => {
  return (
    <CardImageContainer>
      <CardImageIconWrap>
        <Heart
          color={Liked ? "#FF4842" : "#fff"}
          onClcik={(e) => onClickLike(e)}
        />
      </CardImageIconWrap>
      <ImageBox images={images} />
    </CardImageContainer>
  );
});

const TitlePart = memo(({ name }) => {
  return (
    <CardTitleContainer>
      <Title>{name}</Title>
      <CardStorePriceContainer>
        <CardStorePriceDes>식권</CardStorePriceDes>
        <CardStorePrice>￦ 5,500원</CardStorePrice>
      </CardStorePriceContainer>
    </CardTitleContainer>
  );
});

const MenuPart = ({ OnMenu, onClickMenu, scrollRef, menu }) => {
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
        {menu.map((item, index) => {
          if (index === 0) {
            return (
              <CardMenuLists padding="20px 0 10px" key={uuidv4()}>
                {item}
              </CardMenuLists>
            );
          } else if (index === item.length - 1) {
            return (
              <CardMenuLists border padding="10px 0 0" key={uuidv4()}>
                {item}
              </CardMenuLists>
            );
          } else {
            return <CardMenuLists key={uuidv4()}>{item}</CardMenuLists>;
          }
        })}
      </CardMenuListsWrap>
    </CardMenuContainer>
  );
};

const CardMenu = ({ menu, name, images, storeId }) => {
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
      <ImagePart onClickLike={onClickLike} Liked={Liked} images={images} />
      {/* title */}
      <TitlePart name={name} />
      {/* menu */}
      <MenuPart
        onClickMenu={onClickMenu}
        OnMenu={OnMenu}
        scrollRef={scrollRef}
        menu={menu}
      />
    </CardContainer>
  );
};

export default CardMenu;
