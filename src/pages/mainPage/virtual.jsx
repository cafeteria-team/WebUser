import React, { useState, useEffect } from "react";

import InfiniteScroll from "./infiniteScroll";

// 내가 렌더할 아이템
const RenderItem = ({ i, title, description }) => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        border: "1px solid black",
        width: "100%",
        margin: "8px 0",
      }}
    >
      <h2
        style={{
          margin: 0,
        }}
      >
        {title} - {i}
      </h2>
      <p>{description}</p>
    </div>
  );
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

//더미데이터에 추가할 리스트 길이
const LENGTH_LIST = [1, 5, 9, 13, 17, 50];

// 더미데이터 임의의 인덱스형성
const _getRandomLength = () => {
  const randomIndex = Math.floor(Math.random() * LENGTH_LIST.length);
  return LENGTH_LIST[randomIndex];
};

const Virtual = () => {
  // 더미데이터 만들기
  const [items, setItems] = useState(() =>
    Array.from({ length: 20 }).map(() => ({
      title: "제목제목",
      description: "내용내용".repeat(_getRandomLength()),
    }))
  );

  // 아이템 확인
  const [hasMore, setHasMore] = useState(true);

  //   아이템을 더부를때 20개씩 임의의 데이터를 불러온다
  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      const nextItems = items.concat(
        Array.from({ length: 20 }).map(() => ({
          title: "제목제목",
          description: "내용내용".repeat(_getRandomLength()),
        }))
      );
      setItems(nextItems);
    }, 500);
  };

  // item.length를 계속 주시하여,
  // item.legnth가 100개가 넘을시 hasMore를 더이상 호출하지 않는다.
  useEffect(() => {
    if (items.length >= 100) {
      setHasMore(false);
    }
  }, [items.length]);

  //   현재 인덱스에따른 item 렌더러 이다.
  const renderer = ({ index }) => <RenderItem i={index} {...items[index]} />;

  return (
    <div>
      <InfiniteScroll
        // 아이템의 길이
        dataLength={items.length}
        // 더 렌더링할 아이템이 있는지 없는지 확인
        hasMore={hasMore}
        // 렌더링할 아이템이 있을시, 호출
        next={fetchMoreData}
        // 로딩시 필요한 로더
        loader={<Loader />}
        // 높이를 설정해야한다..
        // 높이는 무조건적인가?
        // window.visualViewport.height ->? iframe에 맞춰진 height??
        // header와 아래 bottom값을 띄운 나머지로 height를 맞춘다
        height={window.innerHeight - 100}
        // index에따른 아이템을 렌더한다
        renderer={renderer}
        // 자식 props, 실제 어떤 데이터가 렌더리할지 보낸다
        children={items}
      ></InfiniteScroll>
    </div>
  );
};

export default Virtual;
