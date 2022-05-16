import React from "react";
import {
  Paragraph,
  NoticeContentContainer,
  NoticeContentTitleWrap,
  NoticeBody,
} from "../styles/styledElements";
import { Title } from "../components";

const NoticeContent = () => {
  return (
    <NoticeContentContainer>
      <NoticeContentTitleWrap>
        <Title margin="0 0 10px 0">[공지] 공지사항입니다.</Title>
        <Paragraph fontSize="14px" color="rgba(0,0,0,0.3)">
          2022.05.10
        </Paragraph>
      </NoticeContentTitleWrap>
      <NoticeBody>안녕하세요, 공지사항입니다. 테스트입니다.</NoticeBody>
    </NoticeContentContainer>
  );
};

export default NoticeContent;
