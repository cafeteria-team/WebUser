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
import { useEffect } from "react";

const MenuPart = memo(
  ({ onMenu, onClickMenu, menu, index, selectedIndex, selected }) => {
    // console.log(selected, index);
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
            onClick={(e) => onClickMenu(e)}
            padding="10px 0"
          >
            {onMenu ? "간략히 보기" : "더보기"}
          </MoreBtn>
        </CardMenuTitleContainer>
        <CardMenuListsWrap maxHeight={onMenu ? "1000px" : null}>
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
  }
);

const CardTodayMenu = ({
  menu,
  loading,
  setSelectedIndex,
  index,
  // onMenu,
  // setOnMenu,
  selectedIndex,
  setMenuOpen,
}) => {
  // const scrollRef = useRef();
  // const scrollToBottom = () => {
  //   console.log("스크롤이벤트", scrollRef.current);
  //   scrollRef.current.scrollIntoView({
  //     behavior: "smooth",
  //     block: "center",
  //     inline: "nearest",
  //   });
  // };

  // menu lists state
  const [onMenu, setOnMenu] = useState(false);

  const [selected, setSelected] = useState(false);

  const onClickMenu = useCallback((e) => {
    e.preventDefault();
    // e.stopPropagation();
    setOnMenu((prev) => !prev);
    setMenuOpen((prev) => !prev);
    setSelectedIndex(index);
    // setSelected((prev) => !prev);

    // setSelectedIndex((prev) => (prev === -1 ? index : -1));
  }, []);

  const WIthMenuLoading = withLoading(MenuPart);

  return (
    <>
      <WIthMenuLoading
        loading={loading}
        onClickMenu={onClickMenu}
        onMenu={onMenu}
        // scrollRef={scrollRef}
        menu={menu}
        height={80}
        width="100%"
        index={index}
        selectedIndex={selectedIndex}
        selected={selected}
      />
    </>
  );
};

export default memo(CardTodayMenu);
