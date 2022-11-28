import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  NoticeContainer,
  NoticeTitle,
  CardNoneLists,
} from "../../styles/styledElements";
import { NoticeList } from "../../views";
import { Pagenation } from "../../components";
import axiosInstance from "../../utills/axios";

const NoticeListPage = () => {
  const [notice, setNotice] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [isListsLoading, setIsListsLoading] = useState(false);
  const [loadingLists, setLoadingLists] = useState([
    { subject: "loading", updated: "loading", id: 1 },
    { subject: "loading", updated: "loading", id: 2 },
    { subject: "loading", updated: "loading", id: 3 },
  ]);
  const LIMIT = 10;

  const getNotice = async () => {
    setIsListsLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `/api/notice/admin?page=${page}&page_size=10`
      );
      setNotice(data.results);
      setTotal(Math.ceil(data.page.total_count / 10) * 10);
      setIsListsLoading(false);
    } catch (error) {
      setIsListsLoading(false);
      alert("공지사항을 불러올수없습니다. 잠시후 다시 시도해주십시오.");
    }
  };

  useEffect(() => {
    getNotice();
  }, [page]);

  // loading...
  if (isListsLoading)
    return loadingLists.map((lists) => {
      return (
        <NoticeList
          list={lists}
          title={lists.subject}
          time={lists.updated}
          key={uuidv4()}
          pathName={lists.id}
          isListsLoading={true}
        />
      );
    });

  //if no data
  if (notice && notice.length === 0)
    return <CardNoneLists>등록된 공지사항이 없습니다.</CardNoneLists>;

  return (
    <>
      <NoticeTitle>공지사항</NoticeTitle>
      <NoticeContainer>
        {notice.map((lists) => {
          return (
            <NoticeList
              list={lists}
              title={lists.subject}
              time={lists.updated}
              key={uuidv4()}
              pathName={lists.id}
              isListsLoading={isListsLoading}
            />
          );
        })}
      </NoticeContainer>
      <Pagenation total={total} limit={LIMIT} page={page} setPage={setPage} />
    </>
  );
};

export default NoticeListPage;
