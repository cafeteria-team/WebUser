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

  const LOADING = 1;
  const LOADED = 2;

  //cached shared between its cellMeasure and its parent Grid(List)
  // CellMeasurer의 결과를 부모(여기서는 List)와 공유합니다.
  //요소의 동적인 height값을측정
  const cellMeasurerCache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100,
  });

  const getNotice = async (props) => {
    try {
      const { data } = await axiosInstance.get(`/api/notice/admin`);
      setNotice(notice.concat(data));
    } catch {
      console.error("fetching error");
    }
  };

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
      <CellMeasurer
        key={key}
        cache={cellMeasurerCache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div style={{ ...style, padding: "20px" }}>{notice[index].subject}</div>
      </CellMeasurer>
    );
  };

  //when row loaded
  const isRowLoaded = ({ index }) => {
    return !!notice[index];
  };

  return (
    <>
      <NoticeTitle>공지사항</NoticeTitle>
      <NoticeContainer>
        <AutoSizer>
          {({ width, height }) => {
            return (
              // 요소의 창 행목록
              <List
                //항목의 개수
                rowCount={notice.length}
                //실제 렌더링되는 높이범위
                height={height}
                //항목의 높이
                rowHeight={90}
                //항목의 넓이
                width={width}
                //항목렌더링 할때 쓰는 함수
                rowRenderer={rowRenderer}
                //다음에 로드해올 항목 미리 컨텐츠 높이
              />
            );
          }}
        </AutoSizer>

        {/* notice lists */}
        {/* {isPending ? "Loading..." : <NoticeList />} */}
      </NoticeContainer>
    </>
  );
};

export default NoticeListPage;

// 사용자가 스크롤을 내리고 올릴때, 다음데이터를 가져오고 이를 캐싱
{
  /* <InfiniteLoader
  isRowLoaded={isRowLoaded}
  loadMoreRows={getNotice}
  rowCount={notice.length}
  ref={infiniteLoaderRef}
> */
}
// {({ onRowsRendered, registerChild }) => (
// 단일 아이템의 크기를 자동으로조정하는 고차 컴포넌트
// 부모 element의 높이와 너비를 자식 컴포넌트에 전달해주는 hoc, 부모의 넓이와 너비만큼 자식을 채운다.
//     <AutoSizer>
//       {({ width }) => {
//         return (
//           // 요소의 창 행목록
//           <List
//             //항목의 개수
//             rowCount={notice.length}
//             //실제 렌더링되는 높이범위
//             height={notice.length * 90}
//             //항목의 높이
//             rowHeight={90}
//             //항목의 넓이
//             width={width}
//             //항목렌더링 할때 쓰는 함수
//             rowRenderer={rowRenderer}
//             //다음에 로드해올 항목 미리 컨텐츠 높이
//             // overscanColumnCount={2}
//             // onRowsRendered={onRowsRendered}
//             // ref={registerChild}
//           />
//         );
//       }}
//     </AutoSizer>
//   )}
// </InfiniteLoader>;
