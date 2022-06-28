import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { CardTodayMenu, CardImage, CardTitle } from "./index";

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

const CardMenu = ({ menu, name, images, storeId, isLoading, onLoad }) => {
  console.log("카드메뉴 호출");
  return (
    <CardContainer to={`${storeId}`}>
      {/* image */}
      <CardImage isLoading={isLoading} images={images} onLoad={onLoad} />
      {/* title */}
      <CardTitle isLoading={isLoading} name={name} />
      {/* menu */}
      <CardTodayMenu isLoading={isLoading} menu={menu} />
    </CardContainer>
  );
};

export default CardMenu;
