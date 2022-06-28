import React, { useState, useEffect, useCallback } from "react";
import { CardMenu } from "../../views";
import MapContainer from "../mapContainer/mapContainer";
import axiosInstance from "../../utills/axios";
import { v4 as uuidv4 } from "uuid";
import Virtual from "./virtual";
import InfiniteScroll from "./infiniteScroll";

// import {
//   AutoSizer,
//   List,
//   WindowScroller,
//   InfiniteLoader,
//   CellMeasurerCache,
//   ListRowRenderer,
//   CellMeasurer,
// } from "react-virtualized";

// const cache = new CellMeasurerCache();

// const MainPage = ({ data, loadMore, hasMore }) => {
//   const rowCount = data.length + (hasMore ? 1 : 0);

//   const isRowLoaded = ({ index }) => {
//     return !hasMore || index < data.length;
//   };

//   const rowRenderer = (params) => {
//     const item = isRowLoaded(params) ? <CardMenu /> : <div>Loading...</div>;
//     return (
//       <CellMeasurer
//         cache={cache}
//         parent={params.parent}
//         columnIndex={0}
//         rowIndex={params.index}
//       >
//         <div style={params.style}>{item}</div>
//       </CellMeasurer>
//     );
//   };

//   return (
//     <WindowScroller>
//       {({ height, isScrolling, onChildScroll, scrollTop }) => (
//         <AutoSizer disableHeight>
//           {({ width }) => (
//             <InfiniteLoader
//               loadMoreRows={loadMore}
//               isRowLoaded={isRowLoaded}
//               rowCount={rowCount}
//             >
//               {({ onRowRendered, registerChild }) => (
//                 <List
//                   onRowRendered={onRowRendered}
//                   ref={registerChild}
//                   scrollTop={scrollTop}
//                   isScrolling={isScrolling}
//                   onScroll={onChildScroll}
//                   width={width}
//                   height={height}
//                   rowHeight={cache.rowHeight}
//                   deferredMeasurementCache={cache}
//                   rowCount={rowCount}
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
// };

// export default MainPage;

import EasyVirtualized from "react-easy-virtualized";

// const RenderItem = ({
//   menus,
//   store: { addr, facilities, name, price, store_img, zip_code, id },
//   measure,
// }) => {
//   return (
//     <CardMenu
//       menu={menus}
//       name={name}
//       storeId={id}
//       images={store_img}
//       onLoad={measure}
//     />
//   );
// };

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
//     <CardMenu isLoading={true} name={item.name} key={uuidv4()} />
//   ));
// };

const MainPage = ({ data, loadMore, hasMore }) => {
  const [stores, setStores] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  const addMoreUserLists = async (page) => {
    console.log("add 아이템 호출");
    setIsLoading(true);
    try {
      const {
        data: { page, results },
      } = await axiosInstance.get(`/api/menu/today?page=${page}&page_size=10
      `);
      setStores([...stores, ...results]);
      setPageNum(page);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const checkPageLeft = () => {
    if (pageNum === Math.ceil(total / 10)) {
      setHasNextPage(false);
    } else {
      setHasNextPage(true);
      addMoreUserLists(pageNum + 1);
    }
  };

  useEffect(() => {
    getUserLists();
  }, []);

  return (
    <EasyVirtualized
      onLoadMore={checkPageLeft}
      hasMore={hasNextPage}
      loader={<div>Loading...</div>}
      overscanRowCount={3}
    >
      {isLoading ? (
        <div>로딩</div>
      ) : (
        stores.map((item) => {
          console.log(item);
          return (
            <CardMenu
              key={uuidv4()}
              menu={item.menus}
              name={item.store.name}
              storeId={item.store.id}
              images={item.store.store_img}
              // onLoad={measure}
            />
          );
        })
      )}
    </EasyVirtualized>
  );
};

export default MainPage;
