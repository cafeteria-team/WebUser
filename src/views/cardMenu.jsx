import React, { useCallback, useState } from "react";
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
  index,
  cache,
  measure,
  onMenu,
  setOnMenu,
}) => {
  return (
    <>
      <CardContainer to={`${storeId}`} loading={loading}>
        {/* image */}
        <CardImage
          loading={loading}
          images={images}
          storeId={storeId}
          measure={measure}
        />
        {/* title */}
        <CardTitle loading={loading} name={name} />
        {/* menu */}
        <CardTodayMenu
          loading={loading}
          menu={menu}
          index={index}
          cache={cache}
          setOnMenu={setOnMenu}
          onMenu={onMenu}
        />
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

export default CardMenu;
