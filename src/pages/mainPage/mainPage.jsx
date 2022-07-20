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
import { useSelector, useDispatch } from "react-redux";

const MainPage = ({ onScroll, minHeight = 1 }) => {
  //data states
  const [stores, setStores] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [total, setTotal] = useState(null);

  const _location = useSelector((state) => state.setLocation);

  //loading states
  const [isLoading, setIsLoading] = useState(false);

  //menu states
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

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

  // const props = useRef({
  //   addMoreUserLists,
  //   hasNextPage,
  //   onScroll,
  // });

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
    let content;

    if (index >= stores.length && hasNextPage) {
      // render next page if there are more pages
      content = <CardMenu loading="true" />;
    } else if (index >= stores.length && !hasNextPage) {
      // if no more pages no next page
      content = "";
    } else {
      // render page

      content = (
        <CardMenu
          key={index}
          name={stores[index].store.name}
          storeId={stores[index].store.id}
          images={stores[index].store.store_img}
          menu={stores[index].menus}
          setSelectedIndex={selectedIndex}
          index={index}
          setMenuOpen={setMenuOpen}
          list={_list}
          cache={_cache}
        />
      );
    }

    throttleScrollListener(parent.state.scrollTop, parent.props.height);

    return (
      <CellMeasurer
        cache={_cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
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

  // const _list = useRef();
  let _list;
  const setRef = (ref) => {
    _list = ref;
  };

  if (isLoading) return <CardLoader />;

  return (
    <div ref={containerRef}>
      {stores && stores.length === 0 ? (
        <CardNoneLists>등록된 리스트가 없습니다.</CardNoneLists>
      ) : (
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
                      rowCount={stores.length + 1}
                      rowRenderer={rowRenderer}
                      deferredMeasurementCache={_cache}
                      overscanRowCount={3}
                      ref={setRef}
                    />
                  );
                }}
              </AutoSizer>
            );
          }}
        </WindowScroller>
      )}
    </div>
  );
};

export default MainPage;
