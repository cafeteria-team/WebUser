import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { CardMenu, CardLoader } from "../../views";
import axiosInstance from "../../utills/axios";
import { CardNoneLists } from "../../styles/styledElements";
import {
  AutoSizer,
  List,
  CellMeasurer,
  CellMeasurerCache,
  WindowScroller,
} from "react-virtualized";
import throttle from "lodash/throttle";
import { useSelector } from "react-redux";

const MainPage = ({ minHeight = 1 }) => {
  //data states
  const [stores, setStores] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [total, setTotal] = useState(null);

  const [onMenu, setOnMenu] = useState([]);

  let _list = useRef(null);

  const _location = useSelector((state) => state.setLocation);

  //loading states
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef();

  // get stores info
  const getUserLists = async () => {
    setIsLoading(true);
    try {
      const {
        data: { page, results },
      } = await axiosInstance.get(`/api/nearby/today/menus?page=${pageNum}&page_size=10&lat=${_location.lat}&lon=${_location.lon}
        `);
      setStores(results);
      if (1 < Math.ceil(page.total_count / 10)) {
        setHasNextPage(true);
      }
      setIsLoading(false);
      setTotal(Math.ceil(page.total_count / 10));
    } catch (err) {
      alert("리스트를 불러올수없습니다. 잠시후 다시 시도해주십시오.");
      console.log(err);
      setIsLoading(false);
    }
  };

  // add more stores data when more pages left
  const addMoreUserLists = useCallback(
    async (pagePros) => {
      try {
        const {
          data: { page, results },
        } = await axiosInstance.get(`/api/nearby/today/menus?page=${pagePros}&page_size=10&lat=${_location.lat}&lon=${_location.lon}
          `);

        if (pagePros === Math.ceil(page.total_count / 10)) {
          setHasNextPage(false);
        }
        setStores([...stores, ...results]);
        setPageNum(page.current_page);
      } catch (err) {
        alert("리스트를 불러올수없습니다. 잠시후 다시 시도해주십시오.");
        console.log(err);
      }
    },
    [stores]
  );

  // call stores data when mainpage rendering
  useEffect(() => {
    getUserLists();
  }, []);

  let triggered = useRef(false);

  useEffect(() => {
    triggered.current = false;
  }, [stores.length]);

  const scrollListener = (scrollTop, clientHeight) => {
    if (triggered.current) {
      return;
    }
    if (scrollTop !== 0) {
      const atBottom =
        scrollTop + clientHeight >= containerRef?.current?.clientHeight;
      if (hasNextPage && atBottom) {
        triggered.current = true;
        addMoreUserLists(pageNum + 1);
      }
    }
  };

  const throttleScrollListener = throttle(scrollListener, 150);

  //render row, call this fnc will be called by the number of lists' length
  const rowRenderer = ({ index, key, parent, style, isScrolling }) => {
    throttleScrollListener(parent.state.scrollTop, parent.props.height);

    return (
      <CellMeasurer
        cache={_cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {({ measure, registerChild }) => {
          return (
            <div style={style} ref={registerChild}>
              {(() => {
                if (index >= stores.length && hasNextPage) {
                  return <CardMenu loading="true" />;
                } else if (index >= stores.length && !hasNextPage) {
                } else {
                  return (
                    <CardMenu
                      key={index}
                      name={stores[index].store.name}
                      storeId={stores[index].store.id}
                      images={stores[index].store.store_img}
                      menu={stores[index].menus}
                      index={index}
                      cache={_cache}
                      measure={measure}
                      setOnMenu={setOnMenu}
                      onMenu={onMenu}
                    />
                  );
                }
              })()}
            </div>
          );
        }}
      </CellMeasurer>
    );
  };

  let _cache = useMemo(
    () =>
      new CellMeasurerCache({
        minHeight: minHeight,
        fixedWidth: true,
      }),
    [minHeight]
  );

  //loading...
  if (isLoading) return <CardLoader />;

  //if no data
  if (stores && stores.length === 0)
    return <CardNoneLists>등록된 리스트가 없습니다.</CardNoneLists>;

  return (
    <div ref={containerRef}>
      <WindowScroller>
        {({ height, scrollTop, isScrolling, onChildScroll }) => {
          return (
            <AutoSizer disableHeight>
              {({ width }) => {
                return (
                  <List
                    autoHeight
                    width={width}
                    height={height}
                    rowHeight={_cache.rowHeight}
                    scrollTop={scrollTop}
                    onScroll={onChildScroll}
                    isScrolling={isScrolling}
                    rowCount={stores.length}
                    rowRenderer={rowRenderer}
                    deferredMeasurementCache={_cache}
                    overscanRowCount={10}
                    ref={_list}
                  />
                );
              }}
            </AutoSizer>
          );
        }}
      </WindowScroller>
    </div>
  );
};

export default MainPage;
