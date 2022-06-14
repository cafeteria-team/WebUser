import React from "react";
import {
  Paragraph,
  NoticeContentContainer,
  NoticeContentTitleWrap,
  NoticeBody,
} from "../styles/styledElements";
import { Title } from "../components";
import moment from "moment";
import Parser from "html-react-parser";

const NoticeContent = ({ subject, content, time }) => {
  return (
    <NoticeContentContainer>
      <NoticeContentTitleWrap>
        <Title margin="0 0 10px 0">{subject}</Title>
        <Paragraph fontSize="14px" color="rgba(0,0,0,0.3)">
          {moment(time).format("L")}
        </Paragraph>
      </NoticeContentTitleWrap>
      <NoticeBody>{Parser(content)}</NoticeBody>
    </NoticeContentContainer>
  );
};

export default NoticeContent;
