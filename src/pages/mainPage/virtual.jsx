import React, { useEffect, useRef, useMemo } from "react";
import throttle from "lodash/throttle";
import List from "react-virtualized/dist/commonjs/List";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import CellMeasurer, {
  CellMeasurerCache,
} from "react-virtualized/dist/commonjs/CellMeasurer";
import usePrevious from "./usePrevious";

const InfiniteScroll = ({
  next,
  hasMore,
  onScroll,
  height,
  loader,
  dataLength,
  children,
  renderer,
  minHeight = 1,
  page,
  selectedIndex,
  menuOpen,
}) => {
  let triggered = useRef(false);

  useEffect(() => {
    triggered.current = false;
  }, [dataLength]);

  const props = useRef({
    next,
    hasMore,
    onScroll,
  });

  const scrollListener = (e) => {
    const { next, hasMore, onScroll } = props.current;
    if (typeof onScroll === "function") {
      setTimeout(() => onScroll && onScroll(e), 0);
    }

    const { clientHeight, scrollHeight, scrollTop } = e;

    if (triggered.current) {
      return;
    }

    const atBottom = scrollTop + clientHeight >= scrollHeight;

    if (atBottom && hasMore) {
      triggered.current = true;
      next && next(page + 1);
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
  const prevLength = usePrevious(children.length);
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

  useEffect(() => {
    // clear saved cache of selceted row
    _cache.clear(selectedIndex, 0);
    if (_list.current) {
      _list.current.recomputeRowHeights(selectedIndex);
    }
  }, [menuOpen]);

  return (
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
  );
};

export default InfiniteScroll;
