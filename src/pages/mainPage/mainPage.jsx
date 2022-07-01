import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { CardMenu } from "../../views";
import axiosInstance from "../../utills/axios";
import { v4 as uuidv4 } from "uuid";
import { CardNoneLists } from "../../styles/styledElements";
import {
  AutoSizer,
  List,
  CellMeasurer,
  CellMeasurerCache,
  WindowScroller,
} from "react-virtualized";
import throttle from "lodash/throttle";
import usePrevious from "./usePrevious";

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

const MainPage = ({ onScroll, minHeight = 1 }) => {
  //data states
  const [stores, setStores] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  //loading states
  const [isLoading, setIsLoading] = useState(false);

  //menu states
  const [selectedIndex, setSelectedIndex] = useState(null);
  // const [onMenu, setOnMenu] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const containerRef = useRef();

  // get stores info
  const getUserLists = async () => {
    console.log("first get stores data in MAINPAGE");
    setIsLoading(true);
    try {
      const {
        data: { page, results },
      } = await axiosInstance.get(`/api/menu/today?page=${pageNum}&page_size=10
        `);
      setStores(results);
      if (1 < Math.ceil(page.total_count / 10)) {
        setHasNextPage(true);
      }
      setIsLoading(false);
    } catch (err) {
      alert("리스트를 불러올수없습니다. 잠시후 다시 시도해주십시오.");
      console.log(err);
      setIsLoading(false);
    }
  };

  // add more stores data when more pages left
  const addMoreUserLists = useCallback(
    async (pagePros) => {
      console.log("call more stores data in MAINPAGE");
      console.log("현재 페이지", pagePros);

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

  // call stores data when mainpage rendering
  useEffect(() => {
    getUserLists();
  }, []);

  const renderer = ({ index }) => (
    <Elem
      i={index}
      {...stores[index]}
      setSelectedIndex={setSelectedIndex}
      setMenuOpen={setMenuOpen}
      menuOpen={menuOpen}
    />
  );

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
    // containerRef.current.clientHeight
    // console.log("windowScroller는", windowR);
    // console.log("List는", _list);
    // console.log(scrollTop, clientHeight);
    // scrollTop, clientHeight
    // console.log(scrollTop);
    // const { addMoreUserLists, hasNextPage, onScroll } = props.current;
    // if (typeof onScroll === "function") {
    //   setTimeout(() => onScroll && onScroll(e), 0);
    // }
    // const { clientHeight, scrollHeight, scrollTop } = e;
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

  useEffect(() => {
    props.current = {
      addMoreUserLists,
      hasNextPage,
      onScroll,
    };
  }, [addMoreUserLists, hasNextPage, onScroll]);

  const throttleScrollListener = throttle(scrollListener, 150);

  // const rowRenderer = ({ parent, key, index, style, isScrolling }) => {
  //   let content;
  //   if (index >= stores.length && hasNextPage) {
  //     content = <Loader />;
  //   } else if (index >= stores.length && !hasNextPage) {
  //     content = "";
  //   } else {
  //     content = renderer({
  //       index,
  //     });
  //   }

  //   console.log("현재 스크롤중입니다.", isScrolling);

  //   return (
  //     <CellMeasurer
  //       cache={_cache}
  //       columnIndex={0}
  //       key={key}
  //       parent={parent}
  //       rowIndex={index}
  //     >
  //       <div style={style}>{content}</div>
  //     </CellMeasurer>
  //   );
  // };

  const rowRenderer = ({ index, key, parent, style }) => {
    let content;
    if (index >= stores.length && hasNextPage) {
      content = <Loader />;
    } else if (index >= stores.length && !hasNextPage) {
      content = "";
    } else {
      content = renderer({ index });
    }

    // console.log("현재 스크롤중입니다.", props);

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
        {/* <div style={style}>
          <div style={{ height: "700px" }}>우우우</div>
        </div> */}
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

  useEffect(() => {
    // clear saved cache of selceted row
    _cache.clear(selectedIndex, 0);
    if (_list.current) {
      _list.current.recomputeRowHeights(selectedIndex);
    }
  }, [menuOpen]);

  if (isLoading) return <FirstLoader />;
  // if (!isLoading && stores.length === 0)
  //   return <CardNoneLists>등록된 리스트가 없습니다.</CardNoneLists>;
  return (
    <div ref={containerRef}>
      {!stores && stores.length === 0 ? (
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

export default MainPage;
