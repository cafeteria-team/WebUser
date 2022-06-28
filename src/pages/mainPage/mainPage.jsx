import React, { useState, useEffect, useCallback } from "react";
import { CardMenu } from "../../views";
import MapContainer from "../mapContainer/mapContainer";
import axiosInstance from "../../utills/axios";
import { v4 as uuidv4 } from "uuid";
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

const MainPage = ({ data, loadMore, hasMore }) => {
  const [stores, setStores] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const RenderItem = useCallback((stores) => {
    console.log("렌더 아이템 호출");
    return stores.map((item) => {
      return (
        <CardMenu
          key={item.id}
          menu={item.menus}
          name={item.store.name}
          storeId={item.store.id}
          images={item.store.store_img}
          // onLoad={measure}
        />
      );
    });
  }, []);

  // 아이템 로딩시
  const Loader = () => {
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
      <CardMenu isLoading={true} name={item.name} key={uuidv4()} />
    ));
  };

  // get more items
  const moreLoading = () => {
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
    <>
      <EasyVirtualized
        onLoadMore={checkPageLeft}
        hasMore={hasNextPage}
        loader={moreLoading}
        overscanRowCount={3}
        useParentScrollElement={true}
        threshold={10}
      >
        {isLoading ? Loader() : RenderItem(stores)}
      </EasyVirtualized>
    </>
  );
};

export default MainPage;
