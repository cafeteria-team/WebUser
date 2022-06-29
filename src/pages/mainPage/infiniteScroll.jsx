import React, { useRef, useEffect, useMemo } from "react";
import throttle from "lodash/throttle";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
  InfiniteLoader,
  WindowScroller,
} from "react-virtualized";
import UsePrevious from "./usePrevious";

const InfiniteScroll = ({
  dataLength,
  hasMore,
  next,
  loader,
  height,
  renderer,
  children,
  // 스크롤 할때마다 이벤트가 호출된다.
  onScroll,
  // minHeight 기본값 1로 설정.
  minHeight = 1,
}) => {
  // trigger ??
  let triggered = useRef(false);

  const _list = useRef();
  const prevLength = UsePrevious(children.length);
  let _mostRecentWidth = 0;
  let _resizeAllFlag = useRef(false);

  //   props값을 useRef로 설정
  const props = useRef({
    next,
    hasMore,
    onScroll,
  });

  console.log("인피니트 렌더링");
  console.log("데이터 랭스", dataLength);
  console.log("_list는?", _list);
  console.log("prevLength는?", prevLength);

  // trigger 의 current값을 설정한다
  // dataLength가 바뀔때마다 리렌더
  useEffect(() => {
    triggered.current = false;
  }, [dataLength]);

  useEffect(() => {
    props.current = {
      next,
      hasMore,
      onScroll,
    };
  }, [next, hasMore, onScroll]);

  // 스크롤값 이벤트감지
  const scrollListener = (e) => {
    const { next, hasMore, onScroll } = props.current;

    // 스크롤 이벤트가 함수라면 현재 이벤트값을 보낸다.
    if (typeof onScroll === "function") {
      setTimeout(() => onScroll && onScroll(e), 0);
    }

    const { clientHeight, scrollHeight, scrollTop } = e;

    if (triggered.current) {
      return;
    }

    // 스크롤이 밑에 도달했는지 확인한다.
    const atBottom = scrollTop + clientHeight >= scrollHeight;

    if (atBottom && hasMore) {
      triggered.current = true;
      next && next();
    }
  };

  const throttleScrollListener = throttle(scrollListener, 150);

  const rowRenderer = ({ parent, key, index, style }) => {
    // console.log("로우 렌더링 호출");
    // let content;
    // if (index >= children.length && hasMore) {
    //   content = loader;
    // } else if (index >= children.length && !hasMore) {
    //   content = loader;
    // } else {
    //   content = renderer({
    //     index,
    //   });
    // }
    return (
      <CellMeasurer
        cache={_cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
        width={_mostRecentWidth}
      >
        {({ measure }) => {
          let content;
          // if (index >= children.length && hasMore) {
          //   content = loader;
          // } else if (index >= children.length && !hasMore) {
          //   content = loader;
          // } else {
          //   content = renderer(
          //     {
          //       index,
          //     },
          //     measure
          //   );
          // }
          return <div style={style}>{content}</div>;
        }}
        {/* <div style={style}>{content}</div> */}
      </CellMeasurer>
    );
  };

  // next() 호출 시 스크롤이 너무 많이 넘어가는 문제: 컴포넌트가 rerender되면서 _cache또한 재정의됨
  // _cache는 minHeight이 유동적일 때에만 새로 생성해줘야 함
  let _cache = useMemo(
    () =>
      new CellMeasurerCache({
        minHeight: minHeight,
        fixedWidth: true,
      }),
    [minHeight]
  );

  useEffect(() => {
    if (_resizeAllFlag.current) {
      _resizeAllFlag.current = false;
      _cache.clearAll();
      if (_list.current) {
        _list.current.recomputeRowHeights();
      }
    } else if (prevLength && prevLength !== children.length) {
      const index = prevLength;
      _cache.clear(index, 0);
      if (_list.current) {
        _list.current.recomputeRowHeights(index);
      }
    }
  }, [children, _resizeAllFlag]);

  const _resizeAll = () => {
    _resizeAllFlag.current = false;
    _cache.clearAll();
    if (_list.current) {
      _list.current.recomputeRowHeights();
    }
  };

  /**
   * 고민 1. height는 무조건 주어져야 함 -> 어쩔 수 없음...
   * 고민 2. loader 컴포넌트를 어따가 둬야 제대로 뜨지 ㅠㅠ -> rowCount + 1해서 index가 rowCount+1과 같고 데이터를 더 불러와야 할 경우에 loader 컴포넌트로 세팅
   * 고민 3. 가변적인 height 계산은? dynamic height 게산을 위해 CellMeasurer 적용
   */
  return (
    <>
      <AutoSizer disableHeight>
        {({ width }) => {
          if (_mostRecentWidth && _mostRecentWidth !== width) {
            _resizeAllFlag.current = true;
            setTimeout(_resizeAll, 0);
          }
          return (
            <List
              // Height constraint for list (determines how many actual rows are rendered)
              height={height}
              // Callback invoked whenever the scroll offset changes within the inner scrollable region:
              // ({ clientHeight: number, scrollHeight: number, scrollTop: number }): void
              onScroll={throttleScrollListener}
              // Number of rows to render above/below the visible bounds of the list.
              // This can help reduce flickering during scrolling on certain browsers/devices.
              overscanRowCount={4}
              // Number of rows in list.
              rowCount={children.length + 1}
              // Either a fixed row height (number) or a function that returns the height of a row given its index:
              // ({ index: number }): number
              rowHeight={_cache.rowHeight}
              // Responsible for rendering a row
              rowRenderer={rowRenderer}
              // Width of the list
              width={width}
              // cellmeasure
              deferredMeasurementCache={_cache}
              ref={_list}
            />
          );
        }}
      </AutoSizer>
    </>
  );
};

export default InfiniteScroll;