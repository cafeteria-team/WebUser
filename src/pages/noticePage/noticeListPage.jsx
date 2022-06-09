import React, { useEffect, useState, useTransition, useRef } from "react";
import {
  List,
  CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader,
  AutoSizer,
} from "react-virtualized";

import { NoticeContainer, NoticeTitle } from "../../styles/styledElements";
import { NoticeList } from "../../views";
import axiosInstance from "../../utills/axios";

const SUSPENSE_CONFIG = { timeoutMs: 2000 };

const NoticeListPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notice, setNotice] = useState([]);
  const [page, setPage] = useState(1);

  //infinite loader
  const infiniteLoaderRef = useRef();
  //list
  const listRef = useRef();

  //cached shared between its cellMeasure and its parent Grid(List)
  // CellMeasurer의 결과를 부모(여기서는 List)와 공유합니다.
  const cellMeasurerCache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100,
  });

  //when row loaded
  const isRowLoaded = ({ index }) => {
    return !!notice[index];
  };

  const getNotice = async () => {
    console.log("fetching 함수호출");
    try {
      const { data } = await axiosInstance.get(
        `/api/notice/admin?page=${page}&page_size=10`
      );

      setNotice(notice.concat(data.results));
      // startTransition(() => {
      //   setNotice(notice.concat(data));
      // });
    } catch {
      console.error("fetching error");
    }
  };

  // const [startTransition, isPending] = useTransition(SUSPENSE_CONFIG);

  useEffect(() => {
    getNotice();
  }, [page]);

  const rowRenderer = ({
    key,
    index,
    parent,
    isScrolling,
    isVisible,
    style,
  }) => {
    return (
      // 보이지 않는것을 렌더링하여, 크기를 측정
      // <CellMeasurer
      //   key={key}
      //   cache={cellMeasurerCache}
      //   parent={parent}
      //   columnIndex={0}
      //   rowIndex={index}
      // >
      //   <div key={notice[index].id} style={style}>
      //     {notice[index].subject}
      //   </div>
      // </CellMeasurer>
      <div style={style} key={notice[index].id}>
        {notice[index].subject}
      </div>
    );
  };

  return (
    <>
      <NoticeTitle>공지사항</NoticeTitle>
      <NoticeContainer>
        <AutoSizer>
          {({ width }) => (
            <List
              //항목의 개수
              rowCount={notice.length}
              //실제 렌더링되는 높이범위
              height={window.innerHeight}
              //항목의 높이
              rowHeight={200}
              //항목의 넓이
              width={window.innerWidth}
              //항목렌더링 할때 쓰는 함수
              rowRenderer={rowRenderer}
              //다음에 로드해올 항목 미리 컨텐츠 높이
              overscanColumnCount={2}
            />
          )}
        </AutoSizer>
        {/* notice lists */}
        {/* {isPending ? "Loading..." : <NoticeList />} */}
        {/* 사용자가 스크롤을 내리고 올릴때, 다음데이터를 가져오고 이를 캐싱 */}
        {/* <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={getNotice}
          rowCount={10000000}
          ref={infiniteLoaderRef}
        >
          {({ onRowsRendered, registerChild }) => (
            // 단일 아이템의 크기를 자동으로조정하는 고차 컴포넌트
            <AutoSizer>
              {({ width, height }) => (
                <List
                  rowCount={notice.length}
                  width={width}
                  height={height}
                  rowHeight={cellMeasurerCache.rowHeight}
                  rowRenderer={rowRenderer}
                  deferredMeasurementCache={cellMeasurerCache}
                  overscanRowCount={2}
                  onRowsRendered={onRowsRendered}
                  ref={(el) => {
                    listRef.current?.setState(el);
                    registerChild(el);
                  }}
                />
              )}
            </AutoSizer>
          )} */}
        {/* 보이는것만 렌더링하는 리스트 컨테이너 */}
        {/* <List
            width={window.innerWidth}
            height={window.innerHeight}
            rowCount={notice.length}
            rowHeight={200}
            rowRenderer={rowRenderer}
          />
        </InfiniteLoader> */}
      </NoticeContainer>
    </>
  );
};

export default NoticeListPage;
