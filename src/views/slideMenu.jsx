import React from "react";
import {
  SlideMenuContainer,
  SlideMenuWrap,
  SlideMenuBg,
  SlideIconWrap,
  SlideSurveyWrap,
  SlideMenuListWrap,
} from "../styles/styledElements";
import { CloseCircle, Edit } from "../assets/icons";
import { Title } from "../components";

const SlideMenu = ({ OnMenu }) => {
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
        <SlideMenuListWrap></SlideMenuListWrap>
      </SlideMenuWrap>
      <SlideMenuBg />
    </SlideMenuContainer>
  ) : null;
};

export default SlideMenu;
