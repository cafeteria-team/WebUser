import React, { useState, memo, useRef, useCallback } from "react";
import {
  CardMenuContainer,
  CardMenuTitleContainer,
  CardMenuTitleWrap,
  CardMenuListsWrap,
  CardMenuLists,
  Paragraph,
} from "../styles/styledElements";
import { MoreBtn } from "../components";
import { MenuItem } from "../assets/icons";
import { v4 as uuidv4 } from "uuid";
import withLoading from "../hoc/withSkeleton";

const MenuPart = ({ onMenu, onClickMenu, menu, index }) => {
  return (
    <CardMenuContainer height="100%">
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
          onClick={(e) => onClickMenu(e, index)}
          padding="10px 0"
        >
          {onMenu?.includes(index) ? "간략히 보기" : "더보기"}
        </MoreBtn>
      </CardMenuTitleContainer>
      <CardMenuListsWrap maxHeight={onMenu?.includes(index) ? "1000px" : null}>
        {menu.map((item, index, arr) => {
          if (index === 0) {
            return (
              <CardMenuLists padding="20px 0 10px" key={uuidv4()}>
                {item}
              </CardMenuLists>
            );
          } else if (index === arr.length - 1) {
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

const CardTodayMenu = ({ menu, loading, index, cache, onMenu, setOnMenu }) => {
  const scrollRef = useRef(null);

  const onClickMenu = (e, index) => {
    e.preventDefault();
    e.stopPropagation();

    if (onMenu.includes(index)) {
      const newIndex = onMenu.filter((menu) => menu !== index);
      setOnMenu(newIndex);
    } else {
      setOnMenu((prev) => [...prev, index]);
    }
    cache.clear(index);
  };

  const WIthMenuLoading = withLoading(MenuPart);

  return (
    <>
      <WIthMenuLoading
        loading={loading}
        onClickMenu={onClickMenu}
        onMenu={onMenu}
        scrollRef={scrollRef}
        menu={menu}
        height={80}
        width="100%"
        index={index}
      />
    </>
  );
};

export default memo(CardTodayMenu);
