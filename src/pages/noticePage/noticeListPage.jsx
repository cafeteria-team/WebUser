import React, { useEffect, useState, useTransition } from "react";
import { NoticeContainer, NoticeTitle } from "../../styles/styledElements";
import { NoticeList } from "../../views";
import axiosInstance from "../../utills/axios";

const SUSPENSE_CONFIG = { timeoutMs: 2000 };

const NoticeListPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notice, setNotice] = useState("");

  const [startTransition, isPending] = useTransition(SUSPENSE_CONFIG);

  useEffect(() => {
    axiosInstance.get("/api/notice/admin").then((res) => {
      startTransition(() => {
        setNotice(res.data);
      });
    });
  }, []);

  return (
    <>
      <NoticeTitle>공지사항</NoticeTitle>
      <NoticeContainer>
        {/* notice lists */}
        {isPending ? "Loading..." : <NoticeList />}
      </NoticeContainer>
    </>
  );
};

export default NoticeListPage;
