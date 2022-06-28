import React, { useRef, useEffect, useMemo } from "react";
import throttle from "lodash/throttle";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  Grid,
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
  // ?? 머선일이구 이 onScroll은
  // 하지만 스크롤 할때마다 이벤트가 호출된다.
  onScroll,
  // 이건또 머선일이구??
  // minHeight 기본값은 1로 설정되있다.
  minHeight = 1,
}) => {
  // trigger ??
  let triggered = useRef(false);

  // trigger 의 current값을 설정한다
  // dataLength가 바뀔때마다 리렌더
  useEffect(() => {
    triggered.current = false;
  }, [dataLength]);

  //   props값을 useRef로 설정
  const props = useRef({
    next,
    hasMore,
    onScroll,
  });

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

  useEffect(() => {
    props.current = {
      next,
      hasMore,
      onScroll,
    };
  }, [next, hasMore, onScroll]);

  const throttleScrollListener = throttle(scrollListener, 150);

  const rowRenderer = ({ parent, key, index, style }) => {
    let content;

    if (index >= children.length && hasMore) {
      content = loader;
    } else if (index >= children.length && !hasMore) {
      content = "";
    } else {
      content = renderer({
        index,
      });
    }

    return (
      <CellMeasurer
        cache={_cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
        width={_mostRecentWidth}
      >
        <div style={style}>{content}</div>
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

  const _list = useRef();
  const prevLength = UsePrevious(children.length);
  let _mostRecentWidth = 0;
  let _resizeAllFlag = useRef(false);

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
              deferredMeasurementCache={_cache}
              rowCount={children.length + 1}
              width={width}
              height={height}
              rowHeight={_cache.rowHeight}
              rowRenderer={rowRenderer}
              overscanRowCount={5}
              onScroll={throttleScrollListener}
              ref={_list}
            />
          );
        }}
      </AutoSizer>
    </>
  );
};

export default InfiniteScroll;
