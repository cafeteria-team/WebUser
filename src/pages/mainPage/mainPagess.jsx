// import {
//   AutoSizer,
//   List,
//   WindowScroller,
//   InfiniteLoader,
//   CellMeasurerCache,
//   CellMeasurer,
// } from "react-virtualized";
// import React, { useState, useEffect, useMemo, useRef, memo } from "react";
// import { CardMenu } from "../../views";
// import axiosInstance from "../../utills/axios";
// import { v4 as uuidv4 } from "uuid";

// import throttle from "lodash/throttle";
// import { useCallback } from "react";

// // 아이템 로딩시
// const Loader = () => {
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

//   return loadingArray.map((item) => (
//     <CardMenu loading="true" name={item.name} key={uuidv4()} />
//   ));
// };

// function MainPage({ onScroll, minHeight = 630 }) {
//   // CellMeasure의 결과를 List와 공유
//   // 측정된 셀의 크기가 재계산되는것을 방지
//   let cache = useMemo(
//     () =>
//       new CellMeasurerCache({
//         minHeight: minHeight,
//         fixedWidth: true,
//       }),
//     [minHeight]
//   );

//   //data states
//   const [stores, setStores] = useState([]);
//   const [pageNum, setPageNum] = useState(1);
//   const [hasNextPage, setHasNextPage] = useState(false);

//   //loading states
//   const [isLoading, setIsLoading] = useState(false);

//   //menu states
//   const [selectedIndex, setSelectedIndex] = useState(null);
//   const [onMenu, setOnMenu] = useState(null);

//   //refs
//   const listRef = useRef();

//   // get stores info
//   const getUserLists = async () => {
//     console.log("first get stores data in MAINPAGE");
//     setIsLoading(true);
//     try {
//       const {
//         data: { page, results },
//       } = await axiosInstance.get(`/api/menu/today?page=${pageNum}&page_size=10
//         `);
//       setStores(results);
//       if (1 < Math.ceil(page.total_count / 10)) {
//         setHasNextPage(true);
//       }
//       setIsLoading(false);
//     } catch (err) {
//       console.log(err);
//       setIsLoading(false);
//     }
//   };

//   // add more stores data when more pages left
//   const addMoreUserLists = useCallback(
//     async (pagePros) => {
//       console.log("call more stores data in MAINPAGE");
//       console.log("현재 페이지", pagePros);
//       // setIsLoading(true);
//       try {
//         const {
//           data: { page, results },
//         } = await axiosInstance.get(`/api/menu/today?page=${pagePros}&page_size=10
//         `);
//         if (pagePros === Math.ceil(page.total_count / 10)) {
//           setHasNextPage(false);
//         }
//         setStores([...stores, ...results]);
//         setPageNum(page.current_page);
//         // setIsLoading(false);
//       } catch (err) {
//         console.log(err);
//         // setIsLoading(false);
//       }
//     },
//     [stores]
//   );

//   // call stores data when mainpage rendering
//   useEffect(() => {
//     getUserLists();
//   }, []);

//   // to catch changes from stores
//   // if more data (hasNextPage) => rocount will be more than stores.length
//   const rowCount = stores.length + (hasNextPage ? 1 : 0);

//   // Function responsible for tracking the loaded state of each row.
//   // It should implement the following signature: ({ index: number }): boolean
//   // !! makes every elements boolean
//   // (isRowLoaded)=> card menu render (else) => card loader render
//   const isRowLoaded = ({ index }) => {
//     // return !hasNextPage || index < stores.length;
//     return !!stores[index];
//   };

//   // rowRender
//   const rowRenderer = ({ parent, index, style, key }) => {
//     const Item = ({ measure }) => {
//       return isRowLoaded({ index }) ? (
//         <CardMenu
//           key={index}
//           menu={stores[index].menus}
//           name={stores[index].store.name}
//           storeId={stores[index].store.id}
//           images={stores[index].store.store_img}
//           setSelectedIndex={setSelectedIndex}
//           index={index}
//           // onMenu={onMenu}
//           onMenu={onMenu}
//           selectedIndex={selectedIndex}
//           setOnMenu={setOnMenu}
//           onLoad={measure}
//         />
//       ) : (
//         <CardMenu loading="true" key={uuidv4()} />
//       );
//     };
//     return (
//       <CellMeasurer
//         cache={cache}
//         parent={parent}
//         columnIndex={0}
//         rowIndex={index}
//         key={key}
//       >
//         {({ measure }) => (
//           <div style={style}>
//             <Item onLoad={measure} />
//           </div>
//         )}
//       </CellMeasurer>
//     );
//   };

//   //catch changed row and change the row's height
//   useEffect(() => {
//     // clear saved cache of selceted row
//     cache.clear(selectedIndex, 0);
//     if (listRef.current) {
//       listRef.current.recomputeRowHeights(selectedIndex);
//     }
//   }, [onMenu]);

//   // to check scroll is placed at the bottom
//   let triggered = useRef(false);

//   // catch scroll events
//   // const onScrollRef = useRef(onScroll);

//   // 스크롤값 이벤트감지
//   const scrollListener = (e) => {
//     // const { next, hasMore, onScroll } = props.current;
//     // if (typeof onScrollRef === "function") {
//     //   console.log("이벤트감지");
//     //   setTimeout(() => onScrollRef && onScrollRef(e), 0);
//     // }

//     const { clientHeight, scrollHeight, scrollTop } = e;

//     if (triggered.current) {
//       return;
//     }

//     // 스크롤이 밑에 도달했는지 확인한다.
//     if (scrollTop !== 0) {
//       const atBottom = scrollTop + clientHeight >= scrollHeight;

//       if (atBottom && hasNextPage) {
//         triggered.current = true;
//         let newPage = pageNum + 1;
//         addMoreUserLists(newPage);
//       }
//     }
//   };

//   console.log("현재 store", stores, "store length = ", stores.length);

//   const throttleScrollListener = throttle(scrollListener, 150);

//   // useEffect(() => {
//   //   onScrollRef.current = onScroll;
//   // }, [onScroll, hasNextPage, addMoreUserLists]);

//   // trigger 의 current값을 설정한다
//   // dataLength가 바뀔때마다 리렌더
//   useEffect(() => {
//     triggered.current = false;
//   }, [stores.length]);

//   if (isLoading) return <Loader />;

//   return (
//     <WindowScroller>
//       {({ height, isScrolling, onChildScroll, scrollTop }) => (
//         <AutoSizer disableHeight onResize={(height) => height}>
//           {({ width }) => (
//             <InfiniteLoader
//               loadMoreRows={addMoreUserLists}
//               isRowLoaded={isRowLoaded}
//               rowCount={rowCount}
//             >
//               {({ onRowRendered, registerChild }) => (
//                 <List
//                   onRowRendered={onRowRendered}
//                   // ref={registerChild}
//                   ref={listRef}
//                   scrollTop={scrollTop}
//                   isScrolling={isScrolling}
//                   onScroll={throttleScrollListener}
//                   width={width}
//                   height={window.innerHeight}
//                   rowHeight={cache.rowHeight}
//                   deferredMeasurementCache={cache}
//                   rowCount={rowCount}
//                   overscanRowCount={3}
//                   rowRenderer={rowRenderer}
//                   autoHeight
//                 />
//               )}
//             </InfiniteLoader>
//           )}
//         </AutoSizer>
//       )}
//     </WindowScroller>
//   );
// }

// export default MainPage;

import React, { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "./virtual";
import { CardMenu } from "../../views";
import axiosInstance from "../../utills/axios";
import { v4 as uuidv4 } from "uuid";
import { Paragraph, CardNoneLists } from "../../styles/styledElements";

// cardmenus
const Elem = ({
  i,
  menus,
  store,
  setSelectedIndex,
  setMenuOpen,
  setToIndex,
}) => {
  return (
    <CardMenu
      key={i}
      menu={menus}
      name={store.name}
      storeId={store.id}
      images={store.store_img}
      setSelectedIndex={setSelectedIndex}
      index={i}
      setMenuOpen={setMenuOpen}
      setToIndex={setToIndex}
    />
  );
};

// loader for new items
const Loader = () => <CardMenu loading="true" />;

// 아이템 로딩시
const FirstLoader = () => {
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

  return loadingArray.map((item) => (
    <CardMenu loading="true" name={item.name} key={uuidv4()} />
  ));
};

const MainPage = () => {
  //data states
  const [stores, setStores] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  //loading states
  const [isLoading, setIsLoading] = useState(false);

  //menu states
  const [selectedIndex, setSelectedIndex] = useState(null);
  // const [onMenu, setOnMenu] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // get stores info
  const getUserLists = async () => {
    console.log("first get stores data in MAINPAGE");
    setIsLoading(true);
    try {
      const {
        data: { page, results },
      } = await axiosInstance.get(`/api/menu/today?page=${pageNum}&page_size=10
        `);
      setStores(results);
      if (1 < Math.ceil(page.total_count / 10)) {
        setHasNextPage(true);
      }
      setIsLoading(false);
    } catch (err) {
      alert("리스트를 불러올수없습니다. 잠시후 다시 시도해주십시오.");
      console.log(err);
      setIsLoading(false);
    }
  };

  // add more stores data when more pages left
  const addMoreUserLists = useCallback(
    async (pagePros) => {
      console.log("call more stores data in MAINPAGE");
      console.log("현재 페이지", pagePros);

      try {
        const {
          data: { page, results },
        } = await axiosInstance.get(`/api/menu/today?page=${pagePros}&page_size=10
        `);
        if (pagePros === Math.ceil(page.total_count / 10)) {
          setHasNextPage(false);
        }
        setStores([...stores, ...results]);
        setPageNum(page.current_page);
      } catch (err) {
        alert("리스트를 불러올수없습니다. 잠시후 다시 시도해주십시오.");
        console.log(err);
      }
    },
    [stores]
  );

  // call stores data when mainpage rendering
  useEffect(() => {
    getUserLists();
  }, []);

  const renderer = ({ index }) => (
    <Elem
      i={index}
      {...stores[index]}
      setSelectedIndex={setSelectedIndex}
      setMenuOpen={setMenuOpen}
      menuOpen={menuOpen}
    />
  );

  if (isLoading) return <FirstLoader />;
  if (stores.length === 0)
    return (
      <CardNoneLists>
        <Paragraph fontSize="14px" fontWeight="bold" color="#ff9030">
          등록된 리스트가 없습니다.
        </Paragraph>
      </CardNoneLists>
    );
  return (
    <>
      <InfiniteScroll
        dataLength={stores.length}
        hasMore={hasNextPage}
        next={addMoreUserLists}
        loader={<Loader />}
        height={window.innerHeight}
        renderer={renderer}
        children={stores}
        page={pageNum}
        selectedIndex={selectedIndex}
        menuOpen={menuOpen}
      />
    </>
  );
};

export default MainPage;
