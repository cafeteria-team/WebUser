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
import { Paragraph, CardNoneLists } from "../../styles/styledElements";
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

  const scrollListener = (scrollTop) => {
    // const { addMoreUserLists, hasNextPage, onScroll } = props.current;
    // if (typeof onScroll === "function") {
    //   setTimeout(() => onScroll && onScroll(e), 0);
    // }
    // const { clientHeight, scrollHeight, scrollTop } = e;
    // if (triggered.current) {
    //   return;
    // }
    // const atBottom = scrollTop + clientHeight >= scrollHeight;
    // if (atBottom && hasNextPage) {
    //   triggered.current = true;
    //   addMoreUserLists && addMoreUserLists(pageNum + 1);
    // }
  };

  useEffect(() => {
    props.current = {
      addMoreUserLists,
      hasNextPage,
      onScroll,
    };
  }, [addMoreUserLists, hasNextPage, onScroll]);

  const throttleScrollListener = throttle(scrollListener, 150);

  const rowRenderer = ({ parent, key, index, style }) => {
    let content;

    if (index >= stores.length && hasNextPage) {
      content = <Loader />;
    } else if (index >= stores.length && !hasNextPage) {
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

  useEffect(() => {
    // clear saved cache of selceted row
    _cache.clear(selectedIndex, 0);
    if (_list.current) {
      _list.current.recomputeRowHeights(selectedIndex);
    }
  }, [menuOpen]);
  console.log(_list);

  if (isLoading) return <FirstLoader />;
  if (stores.length === 0)
    return (
      <CardNoneLists>
        <Paragraph fontSize="14px" fontWeight="bold" color="#ff9030">
          등록된 리스트가 없습니다.
        </Paragraph>
      </CardNoneLists>
    );
  return (
    <>
      <WindowScroller>
        {({ height, scrollTop, isScrolling, onChildScroll, onScroll }) => {
          // console.log(isScrolling, onScroll);
          // if (isScrolling) {
          //   throttleScrollListener(scrollTop, onChildScroll, onScroll);
          // }
          return (
            <AutoSizer disableHeight>
              {({ width }) => {
                return (
                  <List
                    autoHeight
                    deferredMeasurementCache={_cache}
                    rowCount={stores.length + 1}
                    width={width}
                    height={height}
                    rowHeight={_cache.rowHeight}
                    isScrolling={isScrolling}
                    rowRenderer={rowRenderer}
                    overscanRowCount={5}
                    // onScroll={throttleScrollListener}

                    onScroll={(e) => console.log(e)}
                    ref={_list}
                  />
                );
              }}
            </AutoSizer>
          );
        }}
      </WindowScroller>
    </>
  );
};

export default MainPage;
