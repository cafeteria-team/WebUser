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

const SlideMenu = ({ OnMenu }) => {
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

  return OnMenu ? (
    <SlideMenuContainer>
      <SlideMenuWrap>
        <SlideIconWrap>
          <CloseCircle color="#637381" />
        </SlideIconWrap>
        <SlideSurveyWrap>
          <Title color="#ff9030">
            좋구내는 <br />
            여러분의 이야기가 필요해요!
          </Title>
          <Edit color="#ff9030" />
        </SlideSurveyWrap>
        <SlideMenuListWrap>
          {MenuLists.map((item) => (
            <SideLink
              pathName={`/${item.path}`}
              key={uuid()}
              padding="0 0 20px 0"
              border="1px solid #ECEFF1"
            >
              {item.name}
            </SideLink>
          ))}
        </SlideMenuListWrap>
      </SlideMenuWrap>
      <SlideMenuBg />
    </SlideMenuContainer>
  ) : null;
};

export default SlideMenu;
