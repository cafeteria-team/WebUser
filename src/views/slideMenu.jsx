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

const SlideMenu = ({ OnMenu }) => {
  const [MenuLists, SetMenuLists] = useState([
    "관심식당 목록",
    "공지사항",
    "고객센터",
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
          <SideLink pathName="/like">관심식당 목록</SideLink>
          <SideLink pathName="/like">공지사항</SideLink>
          <SideLink pathName="/like">고객센터</SideLink>
        </SlideMenuListWrap>
      </SlideMenuWrap>
      <SlideMenuBg />
    </SlideMenuContainer>
  ) : null;
};

export default SlideMenu;
