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
import { CardImage, CardTitle } from "./index";

const CardContainer = styled(NavLink)`
display: flex;
flex-direction: column;
max-width: 600px;
width: 100%;
background: #fff;
box-shadow: ${({ theme }) => theme.shadow.content}};
border-radius:${({ theme }) => theme.radii.rounded};
padding:${({ theme, like }) => (like ? "20px 20px 26px" : theme.space.large)};
margin-top:${({ theme }) => theme.space.large};
text-decoration:unset;
color:${({ theme }) => theme.colors.text}};
`;

const CardLike = ({ name, images, storeId, loading, index }) => {
  // like state
  const [Liked, SetLiked] = useState(true);

  const onClickLike = (e) => {
    e.preventDefault();
    SetLiked((prev) => !prev);
  };

  return (
    <>
      <CardContainer to={`${storeId}`} like="true">
        {/* image */}
        <CardImage loading={loading} images={images} storeId={storeId} />
        {/* title */}
        <CardTitle loading={loading} name={name} />
      </CardContainer>
      <div
        style={{
          height: "1px",
          width: "100%",
          padding: "5px 0",
        }}
      ></div>
    </>
  );
};

export default CardLike;
