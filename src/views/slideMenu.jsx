import React, { useState } from "react";
import {
  SlideMenuContainer,
  SlideMenuWrap,
  SlideMenuBg,
  SlideIconWrap,
  SlideSurveyWrap,
  SlideMenuListWrap,
} from "../styles/styledElements";
import { CloseCircle, Edit } from "../assets/icons";
import { Title, SideLink } from "../components";
import uuid from "react-uuid";

const SlideMenu = ({ OnMenu, onClickMenu }) => {
  const [MenuLists, SetMenuLists] = useState([
    {
      path: "/like",
      name: "관심식당 목록",
    },
    {
      path: "/notice",
      name: "공지사항",
    },
    {
      path: "/service",
      name: "고객센터",
    },
  ]);

  return (
    <SlideMenuContainer OnMenu={OnMenu}>
      <SlideMenuWrap OnMenu={OnMenu}>
        {/* close btn */}
        <SlideIconWrap>
          <CloseCircle color="#637381" onClick={onClickMenu} />
        </SlideIconWrap>
        {/* survey */}
        <SlideSurveyWrap>
          <Title color="#ff9030">
            좋구내는 <br />
            여러분의 이야기가 필요해요!
          </Title>
          <Edit color="#ff9030" />
        </SlideSurveyWrap>
        {/* link lists */}
        <SlideMenuListWrap>
          {MenuLists.map((item, index, arr) => (
            <SideLink
              pathName={`${item.path}`}
              key={uuid()}
              padding={arr.length - 1 === index ? "20px 0 0" : "20px 0"}
              border={arr.length - 1 === index ? "unset" : "1px solid #ECEFF1"}
              onClickMenu={onClickMenu}
            >
              {item.name}
            </SideLink>
          ))}
        </SlideMenuListWrap>
      </SlideMenuWrap>
      {/* bg */}
      <SlideMenuBg OnMenu={OnMenu} />
    </SlideMenuContainer>
  );
};

export default SlideMenu;
