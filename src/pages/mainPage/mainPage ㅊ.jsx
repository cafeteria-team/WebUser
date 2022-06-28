import React, { useState, useEffect, useRef } from "react";
import { CardMenu } from "../../views";
import MapContainer from "../mapContainer/mapContainer";
import axiosInstance from "../../utills/axios";
import { v4 as uuidv4 } from "uuid";
import {
  WindowScroller,
  CellMeasurer,
  CellMeasurerCache,
  AutoSizer,
  List,
  ListRowProps,
} from "react-virtualized";

// 내가 렌더할 아이템
const RenderItem = ({
  menus,
  store: { addr, facilities, name, price, store_img, zip_code, id },
}) => {
  return <CardMenu menu={menus} name={name} storeId={id} images={store_img} />;
};

// 아이템 로딩시
const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "red",
      }}
    >
      ...loading
    </div>
  );
};

const cache = new CellMeasurerCache({
  defaultWidth: 100,
  fixedWidth: true,
});

const MainPage = () => {
  const [stores, setStores] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [total, setTotal] = useState(0);
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

  const storesRef = useRef();

  // get stores info
  const getUserLists = async () => {
    setIsLoading(true);
    try {
      const {
        data: { page, results },
      } = await axiosInstance.get(`/api/menu/today?page=${pageNum}&page_size=10
      `);
      setStores(results);
      setTotal(page.total_count);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const addUserLists = async () => {
    setIsLoading(true);
    try {
      const {
        data: { page, results },
      } = await axiosInstance.get(`/api/menu/today?page=${pageNum}&page_size=10
      `);
      if (pageNum === Math.ceil(page.total_count / 10)) {
        setHasNextPage(false);
        setStores([...stores, ...results]);
        setTotal(page.total_count);
        setIsLoading(false);
      } else {
        setHasNextPage(true);
        setStores([...stores, ...results]);
        setTotal(page.total_count);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserLists();
    cache.clearAll();
  }, []);
  // stores.length
  //   현재 인덱스에따른 item 렌더러 이다.

  // const renderer = ({ index }) => <RenderItem i={index} {...stores[index]} />;

  console.log(stores);

  const rowRenderer = ({ index, key, parent, style }) => {
    return (
      <CellMeasurer
        cache={cache}
        parent={parent}
        key={key}
        columnIndex={0}
        rowIndex={index}
      >
        {({ measure }) => (
          <div style={style}>
            <CardMenu
              menu={stores[index].menus}
              name={stores[index].store.name}
              storeId={stores[index].store.id}
              images={stores[index].store.store_img}
              onLoad={measure}
            />
          </div>
        )}
      </CellMeasurer>
    );
  };

  return (
    <>
      <WindowScroller>
        {({ height, scrollTop, isScrolling, onChildScroll }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                ref={storesRef}
                autoHeight
                height={height}
                width={width}
                isScrolling={isScrolling}
                overscanRowCount={0}
                onScroll={onChildScroll}
                scrollTop={scrollTop}
                rowCount={stores.length}
                rowHeight={cache.rowHeight}
                rowRenderer={rowRenderer}
                deferredMeasurementCache={cache}
              />
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    </>
  );
};

export default MainPage;
