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
import axiosInstance from "../../utills/axios";

const NoticeListPage = () => {
  const [notice, setNotice] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  //cached shared between its cellMeasure and its parent Grid(List)
  // CellMeasurer의 결과를 부모(여기서는 List)와 공유합니다.
  //요소의 동적인 height값을측정
  const cellMeasurerCache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100,
  });

  const getNotice = async (page) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/notice/admin?page=${page}&page_size=10`
      );
      setNotice(notice.concat(data.results));
      if (page < Math.ceil(data.page.total_count / 10)) {
        setHasNextPage(true);
        setPage((prev) => prev + 1);
      } else if (page === Math.ceil(data.page.total_count / 10)) {
        setHasNextPage(false);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      alert("공지사항을 불러올수없습니다. 잠시후 다시 시도해주십시오.");
    }
  };

  useEffect(() => {
    getNotice(page);
  }, []);

  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  // const itemCount = hasNextPage ? notice.length + 1 : notice.length;

  // Every row is loaded except for our loading indicator row.
  // const isRowLoaded = ({ index }) => !hasNextPage || index < notice.length;

  const isRowLoaded = ({ index }) => {
    return !!notice[index];
  };

  const rowRenderer = ({ key, index, parent, style }) => {
    // console.log(index);
    return (
      // 보이지 않는것을 렌더링하여, 크기를 측정
      <CellMeasurer
        key={key}
        cache={cellMeasurerCache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        {!isRowLoaded({ index }) ? (
          <div style={style}>..로딩</div>
        ) : (
          <div style={{ ...style, padding: "20px" }}>
            {notice[index].subject}
          </div>
        )}
      </CellMeasurer>
    );
  };

  const loadMoreRows = () => {
    if (hasNextPage) {
      getNotice(page);
    } else {
      return;
    }
  };

  const itemCount = hasNextPage ? notice.length + 1 : notice.length;

  return (
    <>
      <NoticeTitle>공지사항</NoticeTitle>
      <NoticeContainer>
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={loadMoreRows}
          rowCount={itemCount}
        >
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer>
              {({ width, height }) => {
                return (
                  // 요소의 창 행목록
                  <List
                    //항목의 개수
                    rowCount={itemCount}
                    //실제 렌더링되는 높이범위
                    height={height}
                    //항목의 높이
                    rowHeight={90}
                    //항목의 넓이
                    width={width}
                    //항목렌더링 할때 쓰는 함수
                    rowRenderer={rowRenderer}
                    //다음에 로드해올 항목 미리 컨텐츠 높이
                    ref={registerChild}
                    onRowsRendered={onRowsRendered}
                  />
                );
              }}
            </AutoSizer>
          )}
        </InfiniteLoader>
      </NoticeContainer>
    </>
  );
};

export default NoticeListPage;
