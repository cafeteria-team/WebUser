// import React, { useState, useEffect, memo } from "react";
// import { CardMenu } from "../../views";
// import axiosInstance from "../../utills/axios";
// import { v4 as uuidv4 } from "uuid";
// import EasyVirtualized from "react-easy-virtualized";
// import { Paragraph } from "../../styles/styledElements";

// const Loader = memo(() => {
//   const loadingArray = [
//     {
//       name: "loading",
//     },
//     {
//       name: "loading",
//     },
//     {
//       name: "loading",
//     },
//   ];

//   return (
//     <>
//       {loadingArray.map((item) => (
//         <CardMenu isLoading={true} name={item.name} key={uuidv4()} />
//       ))}
//     </>
//   );
// });

// const MainPage = ({ data, loadMore, hasMore }) => {
//   const [stores, setStores] = useState([]);
//   const [pageNum, setPageNum] = useState(1);
//   const [hasNextPage, setHasNextPage] = useState(false);
//   const [total, setTotal] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);

//   // get more items
//   const MoreLoading = () => {
//     return <CardMenu isLoading={true} />;
//   };

//   // get stores info
//   const getUserLists = async () => {
//     setIsLoading(true);
//     try {
//       const {
//         data: { page, results },
//       } = await axiosInstance.get(`/api/menu/today?page=${pageNum}&page_size=10
//       `);
//       setStores(results);
//       setTotal(page.total_count);
//       if (1 < Math.ceil(page.total_count / 10)) {
//         setHasNextPage(true);
//       }
//       setIsLoading(false);
//     } catch (err) {
//       console.log(err);
//       setIsLoading(false);
//     }
//   };

//   const addMoreUserLists = async (props) => {
//     setIsLoading(true);
//     try {
//       const {
//         data: { page, results },
//       } = await axiosInstance.get(`/api/menu/today?page=${props}&page_size=10
//       `);
//       setStores([...stores, ...results]);
//       setPageNum(page.current_page);
//       setIsLoading(false);
//     } catch (err) {
//       console.log(err);
//       setIsLoading(false);
//     }
//   };

//   const checkPageLeft = () => {
//     if (pageNum === Math.ceil(total / 10)) {
//       setHasNextPage(false);
//     } else {
//       setHasNextPage(true);
//       addMoreUserLists(pageNum + 1);
//     }
//   };

//   console.log(stores);

//   useEffect(() => {
//     getUserLists();
//   }, []);

//   if (isLoading)
//     return (
//       <>
//         {/* <Loader /> */}
//         <div>로딩</div>
//       </>
//     );

//   if (!stores && stores.length === 0)
//     return <Paragraph>등록된 리스트가 존재 하지않습니다.</Paragraph>;

//   return (
//     <>
//       <EasyVirtualized
//         onLoadMore={checkPageLeft}
//         hasMore={hasNextPage}
//         loader={MoreLoading}
//         overscanRowCount={3}
//         useParentScrollElement={true}
//         threshold={10}
//       >
//         {/* {stores.map((item) => {
//           return (
//             <CardMenu
//               key={item.id}
//               menu={item.menus}
//               name={item.store.name}
//               storeId={item.store.id}
//               images={item.store.store_img}
//               // onLoad={measure}
//             />
//           );
//         })} */}
//         <div>리스트</div>
//       </EasyVirtualized>
//     </>
//   );
// };

// export default MainPage;

import {
  AutoSizer,
  List,
  WindowScroller,
  InfiniteLoader,
  CellMeasurerCache,
  ListRowRenderer,
  CellMeasurer,
} from "react-virtualized";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { CardMenu } from "../../views";
import axiosInstance from "../../utills/axios";
import { v4 as uuidv4 } from "uuid";
import { Paragraph } from "../../styles/styledElements";
import throttle from "lodash/throttle";

// const cache = new CellMeasurerCache({
//   defaultWidth: 100,
//   fixedWidth: true,
// });

function MainPage({ onScroll, minHeight = 1 }) {
  let cache = useMemo(
    () =>
      new CellMeasurerCache({
        minHeight: minHeight,
        fixedWidth: true,
      }),
    [minHeight]
  );

  const [stores, setStores] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [onMenu, setOnMenu] = useState(false);

  const listRef = useRef();

  // get more items
  const MoreLoading = () => {
    return <CardMenu isLoading={true} />;
  };

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
      if (1 < Math.ceil(page.total_count / 10)) {
        setHasNextPage(true);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const addMoreUserLists = async (props) => {
    console.log("렌더모어");
    setIsLoading(true);
    try {
      const {
        data: { page, results },
      } = await axiosInstance.get(`/api/menu/today?page=${props}&page_size=10
        `);
      setStores([...stores, ...results]);
      setPageNum(page.current_page);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserLists();
  }, []);

  const rowCount = stores.length + (hasNextPage ? 1 : 0);

  const isRowLoaded = ({ index }) => {
    // return !hasNextPage || index < stores.length;
    return !!stores[index];
  };

  console.log(stores);
  const rowRenderer = ({ parent, index, style }) => {
    const item = isRowLoaded({ index }) ? (
      // <DataComponent data={data[params.index]} />
      <CardMenu
        key={stores[index].id}
        menu={stores[index].menus}
        name={stores[index].store.name}
        storeId={stores[index].store.id}
        images={stores[index].store.store_img}
        setSelectedIndex={setSelectedIndex}
        index={index}
        onMenu={onMenu}
        setOnMenu={setOnMenu}
        // onLoad={measure}
      />
    ) : (
      <div>Loading...</div>
    );

    return (
      <CellMeasurer
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div style={style}>{item}</div>
      </CellMeasurer>
    );
  };

  useEffect(() => {
    console.log("useEffect실행");
    cache.clear(selectedIndex, 0);
    if (listRef.current) {
      listRef.current.recomputeRowHeights(selectedIndex);
    }
  }, [onMenu]);

  // //   props값을 useRef로 설정
  // const props = useRef({
  //   next,
  //   hasMore,
  //   onScroll,
  // });

  let triggered = useRef(false);

  const onScrollRef = useRef(onScroll);

  // 스크롤값 이벤트감지
  const scrollListener = (e) => {
    // const { next, hasMore, onScroll } = props.current;

    // 스크롤 이벤트가 함수라면 현재 이벤트값을 보낸다.
    if (typeof onScrollRef === "function") {
      setTimeout(() => onScrollRef && onScrollRef(e), 0);
    }

    const { clientHeight, scrollHeight, scrollTop } = e;

    if (triggered.current) {
      return;
    }

    // 스크롤이 밑에 도달했는지 확인한다.
    const atBottom = scrollTop + clientHeight >= scrollHeight;

    console.log("스크롤이벤트");

    if (atBottom && hasNextPage) {
      console.log(hasNextPage);
      triggered.current = true;
      addMoreUserLists(pageNum);
    }
  };

  const throttleScrollListener = throttle(scrollListener, 150);

  useEffect(() => {
    onScrollRef.current = onScroll;
  }, [onScroll, hasNextPage, addMoreUserLists]);

  return (
    <WindowScroller>
      {({ height, isScrolling, onChildScroll, scrollTop }) => (
        <AutoSizer disableHeight onResize={(height) => height}>
          {({ width }) => (
            <InfiniteLoader
              loadMoreRows={addMoreUserLists}
              isRowLoaded={isRowLoaded}
              rowCount={rowCount}
            >
              {({ onRowRendered, registerChild }) => (
                <List
                  onRowRendered={onRowRendered}
                  // ref={registerChild}
                  ref={listRef}
                  scrollTop={scrollTop}
                  isScrolling={isScrolling}
                  onScroll={throttleScrollListener}
                  width={width}
                  height={window.innerHeight}
                  rowHeight={cache.rowHeight}
                  deferredMeasurementCache={cache}
                  rowCount={rowCount}
                  overscanRowCount={3}
                  rowRenderer={rowRenderer}
                  autoHeight
                />
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  );
}

export default MainPage;
