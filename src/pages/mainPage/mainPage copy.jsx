import React, { useState, useEffect, useCallback } from "react";
import { CardMenu } from "../../views";
import MapContainer from "../mapContainer/mapContainer";
import axiosInstance from "../../utills/axios";
import { v4 as uuidv4 } from "uuid";
import Virtual from "./virtual";
import InfiniteScroll from "./infiniteScroll";

// 내가 렌더할 아이템
const RenderItem = ({
  menus,
  store: { addr, facilities, name, price, store_img, zip_code, id },
  measure,
}) => {
  console.log("render item 호출");
  return (
    <CardMenu
      menu={menus}
      name={name}
      storeId={id}
      images={store_img}
      onLoad={measure}
    />
  );
};

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

const MainPage = () => {
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

  const addMoreUserLists = async () => {
    console.log("add 아이템 호출");
    setIsLoading(true);
    try {
      const {
        data: { page, results },
      } = await axiosInstance.get(`/api/menu/today?page=${pageNum}&page_size=10
      `);
      if (pageNum === Math.ceil(page.total_count / 10)) {
        setHasNextPage(false);
        // setStores(stores.concat(results));
        setStores([...stores, ...results]);
        setTotal(page.total_count);
        setIsLoading(false);
      } else {
        setHasNextPage(true);
        // setStores(stores.concat(results));
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
  }, []);

  console.log(stores);
  // stores.length
  //   현재 인덱스에따른 item 렌더러 이다.
  const renderer = ({ index }, measure) => {
    console.log("mainPage 랜더러 호출");
    console.log("mainPage 인덱스 no.", index);
    return <RenderItem i={index} {...stores[index]} measure={measure} />;
  };

  return (
    <>
      {/* <Virtual /> */}
      <InfiniteScroll
        // 아이템의 길이
        dataLength={stores.length}
        // 더 렌더링할 아이템이 있는지 없는지 확인
        hasMore={hasNextPage}
        // 렌더링할 아이템이 있을시, 호출
        next={addMoreUserLists}
        // 로딩시 필요한 로더
        loader={<Loader />}
        // 높이를 설정해야한다..
        // 높이는 무조건적인가?
        // window.visualViewport.height ->? iframe에 맞춰진 height??
        // header와 아래 bottom값을 띄운 나머지로 height를 맞춘다
        height={window.innerHeight}
        // index에따른 아이템을 렌더한다
        renderer={renderer}
        // 자식 props, 실제 어떤 데이터가 렌더리할지 보낸다
        children={stores}
      ></InfiniteScroll>
    </>
  );
};

export default MainPage;
