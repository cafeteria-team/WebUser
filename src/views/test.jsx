import React, { memo } from "react";
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
import withLoading from "../hoc/withSkeleton";

const ImagePart = memo(({ liked, onClickLike, images, onLoad }) => {
  console.log("1. 이미지파트 렌더링");
  return (
    <CardImageContainer>
      <CardImageIconWrap>
        <Heart
          color={liked ? "#FF4842" : "#fff"}
          onClcik={(e) => onClickLike(e)}
        />
      </CardImageIconWrap>
      <ImageBox images={images} onLoad={onLoad} />
    </CardImageContainer>
  );
});

const TitlePart = memo(({ name }) => {
  console.log("2. 타이틀파트 렌더링");
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

const Test = ({ isLoading, onClickLike, liked, images, onLoad, name }) => {
  const WithImageLoading = withLoading(ImagePart);
  const WithTitleLoading = withLoading(TitlePart);

  return (
    <>
      <WithImageLoading
        isLoading={isLoading}
        onClickLike={onClickLike}
        liked={liked}
        images={images}
        height={350}
        width="100%"
        onLoad={onLoad}
      />
      {/* title */}
      <WithTitleLoading
        isLoading={isLoading}
        name={name}
        height={25}
        width="100%"
      />
    </>
  );
};

export default memo(Test);
