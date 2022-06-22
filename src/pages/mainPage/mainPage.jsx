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

const MainPage = () => {
  const [stores, setStores] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      // setIsLoading(false);
    } catch (err) {
      // setIsLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getUserLists();
  }, []);

  return (
    <>
      {stores.map((item) => {
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
      })}
    </>
  );
};

export default MainPage;
