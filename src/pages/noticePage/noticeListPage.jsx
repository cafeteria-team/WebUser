import React, { useEffect, useState } from "react";
import {
  List,
  CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader,
  AutoSizer,
} from "react-virtualized";

import { NoticeContainer, NoticeTitle } from "../../styles/styledElements";
import { NoticeList } from "../../views";
import { Pagenation } from "../../components";
import axiosInstance from "../../utills/axios";

const NoticeListPage = () => {
  const [notice, setNotice] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [limit, setLimit] = useState(10);

  const getNotice = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/api/notice/admin?page=${page}&page_size=10`
      );
      setNotice(notice.concat(data.results));
      setTotal(Math.ceil(data.page.total_count / 10));
    } catch (error) {
      console.log(error);
      alert("공지사항을 불러올수없습니다. 잠시후 다시 시도해주십시오.");
    }
  };

  useEffect(() => {
    getNotice();
  }, []);

  return (
    <>
      <NoticeTitle>공지사항</NoticeTitle>
      <NoticeContainer>
        <Pagenation total={total} limit={limit} page={page} setPage={setPage} />
      </NoticeContainer>
    </>
  );
};

export default NoticeListPage;
