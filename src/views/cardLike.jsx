import React, { useState, memo } from "react";
import {
  CardContainer,
  CardImageContainer,
  CardImageIconWrap,
  CardTitleContainer,
  CardStorePriceContainer,
  CardStorePriceDes,
  CardStorePrice,
} from "../styles/styledElements";
import { ImageBox, Title } from "../components";
import { Heart } from "../assets/icons";

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

const CardLike = () => {
  // like state
  const [Liked, SetLiked] = useState(true);

  const onClickLike = () => {
    SetLiked((prev) => !prev);
  };

  return (
    <CardContainer>
      {/* image */}
      <ImagePart onClickLike={onClickLike} Liked={Liked} />
      {/* title */}
      <TitlePart />
    </CardContainer>
  );
};

export default CardLike;
