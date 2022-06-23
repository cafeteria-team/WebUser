import React, { useState, useEffect } from "react";

import InfiniteScroll from "./infiniteScroll";

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

const Loader = () => {
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "red",
    }}
  >
    ...loading
  </div>;
};

const LENGTH_LIST = [1, 5, 9, 13, 17, 50];

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

  useEffect(() => {
    if (items.length >= 100) {
      setHasMore(false);
    }
  }, [items.length]);

  const renderer = ({ index }) => <RenderItem i={index} {...items[index]} />;

  return (
    <div>
      <InfiniteScroll
        dataLength={items.length}
        hasMore={hasMore}
        next={fetchMoreData}
        loader={<Loader />}
        height={window.visualViewport.height}
        renderer={renderer}
        children={items}
      ></InfiniteScroll>
    </div>
  );
};

export default Virtual;
