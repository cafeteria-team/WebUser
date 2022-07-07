import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { CardTodayMenu, CardImage, CardTitle } from "./index";

const CardContainer = styled(NavLink)`
display: block;
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
pointer-events:${(props) => (props.loading ? "none" : "unset")};
`;

const CardMenu = ({
  menu,
  name,
  images,
  storeId,
  loading,
  onLoad,
  setSelectedIndex,
  index,
  setMenuOpen,
  menuOpen,
  list,
}) => {
  // console.log("카드메뉴 호출");
  return (
    <CardContainer to={`${storeId}`} loading={loading}>
      {/* image */}
      <CardImage
        loading={loading}
        images={images}
        onLoad={onLoad}
        storeId={storeId}
      />
      {/* title */}
      <CardTitle loading={loading} name={name} />
      {/* menu */}
      <CardTodayMenu
        loading={loading}
        menu={menu}
        setSelectedIndex={setSelectedIndex}
        index={index}
        setMenuOpen={setMenuOpen}
        menuOpen={menuOpen}
        list={list}
      />
    </CardContainer>
  );
};

export default CardMenu;
