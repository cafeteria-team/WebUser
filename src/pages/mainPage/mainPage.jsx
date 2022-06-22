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
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  // get stores info
  const getUserLists = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/menu/today
      `);
      setStores(data);
    } catch (err) {
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
          />
        );
      })}
    </>
  );
};

export default MainPage;
