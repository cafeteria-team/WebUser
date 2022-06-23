import React, { useState, useEffect } from "react";
import { CardMenu } from "../../views";
import {
  List,
  CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader,
  AutoSizer,
} from "react-virtualized";
import MapContainer from "../mapContainer/mapContainer";
import axiosInstance from "../../utills/axios";
import { v4 as uuidv4 } from "uuid";
import Virtual from "./virtual";

const MainPage = () => {
  const [stores, setStores] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loadingArray = [
    {
      name: "loading",
    },
    {
      name: "loading",
    },
    {
      name: "loading",
    },
  ];

  // CellMeasurer의 결과를 부모(여기서는 List)와 공유합니다.
  //요소의 동적인 height값을측정
  const cellMeasurerCache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100,
  });

  // get stores info
  const getUserLists = async () => {
    setIsLoading(true);
    try {
      const {
        data: { page, results },
      } = await axiosInstance.get(`/api/menu/today?page=${pageNum}&page_size=10
      `);
      setStores(...stores, results);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getUserLists();
  }, []);

  const isRowLoaded = ({ index }) => {
    return !!stores[index];
  };

  const rowRenderer = ({ key, index, parent, style }) => {
    const item = !isRowLoaded({ index }) ? (
      <div style={style}>
        <CardMenu key={uuidv4()} isLoading={isLoading} />
      </div>
    ) : (
      <div style={style} className="ss">
        <CardMenu
          menu={stores[index].menus}
          name={stores[index].store.name}
          images={stores[index].store.store_img}
          storeId={1}
          key={uuidv4()}
        />
      </div>
    );

    return (
      // 보이지 않는것을 렌더링하여, 크기를 측정
      <CellMeasurer
        key={key}
        cache={cellMeasurerCache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        {item}
      </CellMeasurer>
    );
  };

  const loadMoreRows = () => {
    if (hasNextPage) {
      getUserLists();
    } else {
      return;
    }
  };

  const itemCount = hasNextPage ? stores.length + 1 : stores.length;

  return (
    <>
      {/* {isLoading
        ? loadingArray.map((item) => (
            <CardMenu key={uuidv4()} isLoading={isLoading} />
          ))
        : stores.map((item) => {
            return (
              <CardMenu
                menu={item.menus}
                name={item.store.name}
                images={item.store.store_img}
                storeId={1}
                key={uuidv4()}
                isLoading={isLoading}
              />
            );
          })} */}
      {/* <InfiniteLoader
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
                  height={window.innerHeight}
                  //항목의 높이
                  rowHeight={cellMeasurerCache.rowHeight}
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
      </InfiniteLoader> */}
      <Virtual />
    </>
  );
};

export default MainPage;
