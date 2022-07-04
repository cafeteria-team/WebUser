import React, { useState, memo, useEffect, useCallback } from "react";
import {
  CardContainer,
  CardImageIconWrap,
  CardImageContainer,
  CardTitleContainer,
  CardStorePriceContainer,
  CardStorePriceDes,
  CardStorePrice,
  CardMenuContainer,
  CardMenuTitleContainer,
  CardMenuTitleWrap,
  CardMenuListsWrap,
  CardMenuLists,
  Paragraph,
  CardAddressWrap,
  CardWrap,
  FacilityIconWrap,
  FaiclityWrap,
  CardLoader,
  NoticeBody,
  PriceWrap,
  PriceLists,
} from "../styles/styledElements";
import { ImageBox, Title, MoreBtn, MenuMap } from "../components";
import {
  MenuItem,
  Heart,
  Location,
  Happy,
  Coffee,
  Bread,
  WifiSquare,
  Milk,
  Notice,
  RouteSquare,
} from "../assets/icons";
import { v4 as uuidv4 } from "uuid";
import withLoading from "../hoc/withSkeleton";
import Parser from "html-react-parser";
import { addIndexDB, deleteIndexDB, getIndexDB } from "../utills/indexDB";

const ImagePart = memo(({ liked, onClickLike, images }) => {
  return (
    <CardImageContainer>
      <CardImageIconWrap>
        <Heart color={liked ? "#FF4842" : "#f2f2f2"} onClcik={onClickLike} />
      </CardImageIconWrap>
      <ImageBox images={images} />
    </CardImageContainer>
  );
});

const TitlePart = memo(({ name, price }) => {
  return (
    <CardTitleContainer>
      <Title>{name}</Title>
      <CardStorePriceContainer>
        <CardStorePriceDes>식권</CardStorePriceDes>
        <CardStorePrice>￦ {price && price[0][1]}원</CardStorePrice>
      </CardStorePriceContainer>
    </CardTitleContainer>
  );
});

const AddressPart = memo(({ mapOpen, addr }) => {
  return (
    <CardAddressWrap margin="0 0 20px 0">
      <CardAddressWrap margin="0 12px 0 0">
        <Location color="#1A90FF" />
        <Paragraph fontSize="14px" margin="0 0 0 6px">
          {addr}
        </Paragraph>
      </CardAddressWrap>
      <MoreBtn
        color="#1A90FF"
        background="unset"
        fontSize="14px"
        lineHeight="26px"
        height="24px"
        onClick={() => mapOpen(addr, window.innerHeight - 120)}
      >
        지도보기
      </MoreBtn>
    </CardAddressWrap>
  );
});

const MenuPart = ({ menu }) => {
  return (
    <CardMenuContainer height="100%">
      <CardMenuTitleContainer>
        <CardMenuTitleWrap>
          <MenuItem color="#ff9030" />
          <Paragraph margin="0 0 0 6px" fontWeight="bold" color="#ff9030">
            오늘의 메뉴
          </Paragraph>
        </CardMenuTitleWrap>
      </CardMenuTitleContainer>
      <CardMenuListsWrap maxHeight="unset" marginTop="26px">
        {menu &&
          menu.map((item, index, arr) => {
            if (index === arr.length - 1) {
              return (
                <CardMenuLists border padding="10px 0 0" key={uuidv4()}>
                  {item}
                </CardMenuLists>
              );
            } else {
              return <CardMenuLists key={uuidv4()}>{item}</CardMenuLists>;
            }
          })}
      </CardMenuListsWrap>
    </CardMenuContainer>
  );
};

const FacilityPart = ({ facility }) => {
  const SelectedIcon = ({ item }) => {
    switch (item) {
      case "빵":
        return <Bread color="#637381" />;
      case "커피":
        return <Coffee color="#637381" />;
      case "음료수":
        return <Milk color="#637381" />;
      case "와이파이":
        return <WifiSquare color="#637381" />;
      default:
        return <Happy color="#637381" />;
    }
  };

  return (
    <CardWrap
      flexDirection="column"
      margin="26px 0 0"
      border
      padding="0 0 26px 0"
    >
      <CardWrap align="center" margin="0 0 20px 0">
        <Happy color="#E2E6E7" />
        <Paragraph margin="0 0 0 6px" fontSize="14px">
          편의시설 및 서비스
        </Paragraph>
      </CardWrap>
      <FaiclityWrap>
        {facility &&
          facility.map((item) => (
            <FacilityIconWrap key={uuidv4()}>
              <SelectedIcon item={item} />
              <Paragraph margin="6px 0 0 0" color="#637381" fontSize="14px">
                {item}
              </Paragraph>
            </FacilityIconWrap>
          ))}
      </FaiclityWrap>
    </CardWrap>
  );
};

const PricePart = ({ price }) => {
  const count = [1, 5, 10];
  return (
    <CardWrap
      flexDirection="column"
      margin="26px 0 0"
      border
      padding="0 0 26px 0"
    >
      <CardWrap align="center" margin="0 0 20px 0">
        <Notice color="#E2E6E7" />
        <Paragraph margin="0 0 0 6px" fontSize="14px">
          매장가격
        </Paragraph>
      </CardWrap>
      <CardWrap>
        <PriceWrap>
          {price &&
            price.map((item, index, arr) => (
              <PriceLists
                border={index === arr.length - 1 && true}
                key={uuidv4()}
              >
                <Paragraph fontSize="14px">{count[index]}회 식권</Paragraph>
                <Paragraph fontWeight="bold" fontSize="14px">
                  {item[count[index]]}원
                </Paragraph>
              </PriceLists>
            ))}
        </PriceWrap>
      </CardWrap>
    </CardWrap>
  );
};

const NoticePart = ({ notice }) => {
  return (
    <CardWrap
      flexDirection="column"
      margin="26px 0 0"
      border
      padding="0 0 26px 0"
    >
      <CardWrap align="center" margin="0 0 20px 0">
        <Notice color="#E2E6E7" />
        <Paragraph margin="0 0 0 6px" fontSize="14px">
          공지사항
        </Paragraph>
      </CardWrap>
      <CardWrap>
        <NoticeBody padding="0 0 0 6px" fontSize="14px">
          {Parser(`${notice}`)}
        </NoticeBody>
      </CardWrap>
    </CardWrap>
  );
};

const MapPart = ({ addr }) => {
  return (
    <CardWrap flexDirection="column" margin="26px 0 0" padding="0 0 26px 0">
      <CardWrap align="center" margin="0 0 20px 0">
        <RouteSquare color="#E2E6E7" />
        <Paragraph margin="0 0 0 6px" fontSize="14px">
          찾아오시는길
        </Paragraph>
      </CardWrap>
      <CardWrap>
        <MenuMap height={180} addr={addr} />
      </CardWrap>
    </CardWrap>
  );
};

const CardDetail = ({ mapOpen, isLoading, stores, notice, storeId }) => {
  // like state
  const [liked, setLiked] = useState(false);

  const onClickLike = useCallback(
    (e) => {
      e.preventDefault();
      setLiked((prev) => !prev);

      if (!liked) {
        addIndexDB(storeId);
      } else {
        deleteIndexDB(storeId);
      }
    },
    [storeId, liked]
  );

  const WithDetailLoading = withLoading(CardLoader);

  useEffect(() => {
    // getIndexDB().then((result) => {
    //   result.map((item) => item.store === storeId && setLiked(true));
    // });
    getIndexDB() //
      .then((result) => console.log(result)) //
      .catch((err) => console.log("err는?", err));
  }, [storeId]);

  if (isLoading)
    return (
      <CardContainer>
        <WithDetailLoading loading={isLoading} height={350} />
      </CardContainer>
    );

  return (
    <>
      {stores.length !== 0 && (
        <CardContainer>
          {/* image */}
          <ImagePart
            onClickLike={onClickLike}
            liked={liked}
            images={stores?.store.store_img}
          />
          {/* title */}
          <TitlePart name={stores?.store.name} price={stores?.store.price} />
          {/* address */}
          <AddressPart mapOpen={mapOpen} addr={stores?.store.addr} />
          {/* menu */}
          <MenuPart menu={stores?.menus} />
          {/* facility */}
          <FacilityPart facility={stores?.store.facilities} />
          {/* price */}
          <PricePart price={stores?.store.price} />
          {/* notice */}
          <NoticePart notice={notice} />
          {/* map */}
          <MapPart addr={stores?.store.addr} />
        </CardContainer>
      )}
    </>
  );
};

export default CardDetail;
