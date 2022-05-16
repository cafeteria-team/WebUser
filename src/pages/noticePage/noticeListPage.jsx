import React from "react";
import { NoticeContainer, NoticeTitle } from "../../styles/styledElements";
import { NoticeList } from "../../views";

const NoticeListPage = () => {
  return (
    <>
      <NoticeTitle>공지사항</NoticeTitle>
      <NoticeContainer>
        {/* notice lists */}
        <NoticeList />
      </NoticeContainer>
    </>
  );
};

export default NoticeListPage;
