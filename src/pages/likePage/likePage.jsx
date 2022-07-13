import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { CardLike } from "../../views";
import axiosInstance from "../../utills/axios";
import { addIndexDB, deleteIndexDB, getIndexDB } from "../../utills/indexDB";
import { CardMenu } from "../../views";
import { CardNoneLists } from "../../styles/styledElements";
import {
  AutoSizer,
  List,
  CellMeasurer,
  CellMeasurerCache,
  WindowScroller,
} from "react-virtualized";
import throttle from "lodash/throttle";
import { v4 as uuidv4 } from "uuid";
// cardmenus
const Elem = ({
  i,
  menus,
  store,
  setSelectedIndex,
  setMenuOpen,
  setToIndex,
}) => {
  return (
    <CardMenu
      key={i}
      menu={menus}
      name={store.name}
      storeId={store.id}
      images={store.store_img}
      setSelectedIndex={setSelectedIndex}
      index={i}
      setMenuOpen={setMenuOpen}
      setToIndex={setToIndex}
    />
  );
};

// loader for new items
const Loader = () => <CardMenu loading="true" />;

// 아이템 로딩시
const FirstLoader = () => {
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
    <CardMenu loading="true" name={item.name} key={uuidv4()} />
  ));
};

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

  const getLikedStore = useCallback(
    async (storesId) => {
      console.log(storesId);
      setIsLoading(true);
      try {
        const {
          data: { page, results },
        } = await axiosInstance.get(`/api/menu/today?store_id=${storesId}&page=${pageNum}&page_size=10
        `);

        // results.filter((item, index) => {
        //   console.log(item);
        //   const { store } = storesId[index];

        //   if (store) {
        //     return item.store.id !== store;
        //   }
        // });

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
    },
    [storesId]
  );

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

      // result.map((item) => {
      //   console.log(item.store);
      //   return setStoresId((prev) => [...prev, item.store]);
      // });
      // console.log(storesId);
      // getLikedStore(result);
    });
  }, []);

  const renderer = ({ index }) => <Elem i={index} {...stores[index]} />;
  let triggered = useRef(false);

  useEffect(() => {
    triggered.current = false;
  }, [stores.length]);

  const props = useRef({
    addMoreUserLists,
    hasNextPage,
    onScroll,
  });

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

  const rowRenderer = ({ index, key, parent, style }) => {
    let content;
    if (index >= stores.length && hasNextPage) {
      content = <Loader />;
    } else if (index >= stores.length && !hasNextPage) {
      content = "";
    } else {
      content = renderer({ index });
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

  // useEffect(() => {
  //   // clear saved cache of selceted row
  //   _cache.clear(selectedIndex, 0);
  //   if (_list.current) {
  //     _list.current.recomputeRowHeights(selectedIndex);
  //   }
  // }, [menuOpen]);

  if (isLoading) return <FirstLoader />;

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
                      ref={_list}
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
