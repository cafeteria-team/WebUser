import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { CardLike, CardLoader } from "../../views";
import axiosInstance from "../../utills/axios";
import { getIndexDB } from "../../utills/indexDB";
import { CardNoneLists } from "../../styles/styledElements";
import {
  AutoSizer,
  List,
  CellMeasurer,
  CellMeasurerCache,
  WindowScroller,
  InfiniteLoader,
} from "react-virtualized";
import throttle from "lodash/throttle";

const LikePage = ({ onScroll, minHeight = 1 }) => {
  //data states
  const [storesId, setStoresId] = useState([]);
  const [stores, setStores] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [total, setTotal] = useState(null);

  //loading states
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef();

  const getLikedStore = async (storesId) => {
    setIsLoading(true);
    if (storesId.length === 0) {
      return setIsLoading(false);
    }
    try {
      const {
        data: { page, results },
      } = await axiosInstance.get(`/api/menu/today?store_id=${storesId}&page=${pageNum}&page_size=10
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

  const addMoreUserLists = useCallback(
    async (pagePros) => {
      try {
        const {
          data: { page, results },
        } = await axiosInstance.get(`/api/menu/today?page=${pagePros}&page_size=10
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

  useEffect(() => {
    getIndexDB().then((result) => {
      const decunstructureArray = async () => {
        const _result = await Promise.all(
          result.map((item) => {
            setStoresId((prev) => [...prev, item.store]);
            return item.store;
          })
        );
        getLikedStore(_result);
      };
      decunstructureArray();
    });
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
    let content;

    if (index >= stores.length && hasNextPage) {
      // render next page if there are more pages
      content = <CardLike loading="true" />;
    } else if (index >= stores.length && !hasNextPage) {
      // if no more pages no next page
      // content = "";
      return;
    } else {
      // render page

      content = (
        <CardLike
          key={index}
          name={stores[index].store.name}
          storeId={stores[index].store.id}
          images={stores[index].store.store_img}
          index={index}
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

  let _cache = useMemo(
    () =>
      new CellMeasurerCache({
        minHeight: minHeight,
        fixedWidth: true,
      }),
    [minHeight]
  );

  const _list = useRef();

  if (isLoading) return <CardLoader />;

  return (
    <div ref={containerRef}>
      {stores && stores.length === 0 ? (
        <CardNoneLists>찜한 구내식당이 없습니다.</CardNoneLists>
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
                      // rowCount={stores.length + (hasNextPage ? 1 : 0)}
                      rowCount={stores.length}
                      rowRenderer={rowRenderer}
                      deferredMeasurementCache={_cache}
                      overscanRowCount={3}
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

export default LikePage;
