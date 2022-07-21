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

const MenuPart = memo(({ onMenu, onClickMenu, menu, scrollRef }) => {
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
});

const CardTodayMenu = ({ menu, loading, index, setMenuOpen, cache, list }) => {
  const scrollRef = useRef(null);

  // menu lists state
  const [onMenu, setOnMenu] = useState(false);

  const onClickMenu = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    setOnMenu((prev) => !prev);
    setMenuOpen((prev) => !prev);

    cache.clear(index);
    // list.recomputeRowHeights();
    // console.log(list);
    list.recomputeRowHeights();
    list.forceUpdate();
  }, []);

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
      />
    </>
  );
};

export default memo(CardTodayMenu);
