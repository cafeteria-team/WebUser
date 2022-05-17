import React, { useState, memo } from "react";
import {
  CardImageContainer,
  CardImageIconWrap,
  CardTitleContainer,
  CardStorePriceContainer,
  CardStorePriceDes,
  CardStorePrice,
} from "../styles/styledElements";
import { ImageBox, Title } from "../components";
import { Heart } from "../assets/icons";
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
        <Heart color={Liked ? "#FF4842" : "#fff"} onClcik={onClickLike} />
      </CardImageIconWrap>
      <ImageBox />
    </CardImageContainer>
  );
});

const TitlePart = memo(() => {
  return (
    <CardTitleContainer margin="12px 0 0 0">
      <Title>행복식당</Title>
      <CardStorePriceContainer>
        <CardStorePriceDes>식권</CardStorePriceDes>
        <CardStorePrice>￦ 5,500원</CardStorePrice>
      </CardStorePriceContainer>
    </CardTitleContainer>
  );
});

const CardLike = ({ storeId }) => {
  // like state
  const [Liked, SetLiked] = useState(true);

  const onClickLike = () => {
    SetLiked((prev) => !prev);
  };

  return (
    <CardContainer to={`${storeId}`}>
      {/* image */}
      <ImagePart onClickLike={onClickLike} Liked={Liked} />
      {/* title */}
      <TitlePart />
    </CardContainer>
  );
};

export default CardLike;
