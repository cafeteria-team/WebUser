import React, { useEffect, useState } from "react";
import { NoticeContainer, NoticeTitle } from "../../styles/styledElements";
import { NoticeList } from "../../views";
import axiosInstance from "../../utills/axios";

const NoticeListPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    axiosInstance.get("/api/notice/admin").then((res) => {
      setNotice(res.data);
    });
  }, []);

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
