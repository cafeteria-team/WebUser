import React, { memo } from "react";
import {
  CardTitleContainer,
  CardStorePriceContainer,
  CardStorePriceDes,
  CardStorePrice,
} from "../styles/styledElements";
import { Title } from "../components";
import withLoading from "../hoc/withSkeleton";

const TitlePart = memo(({ name }) => {
  console.log("2. 타이틀파트 렌더링");

  return (
    <CardTitleContainer>
      <Title>{name}</Title>
      <CardStorePriceContainer>
        <CardStorePriceDes>식권</CardStorePriceDes>
        <CardStorePrice>￦ 5,500원</CardStorePrice>
      </CardStorePriceContainer>
    </CardTitleContainer>
  );
});

const CardTitle = ({ isLoading, name }) => {
  const WithTitleLoading = withLoading(TitlePart);
  return (
    <>
      <WithTitleLoading
        isLoading={isLoading}
        name={name}
        height={25}
        width="100%"
      />
    </>
  );
};

export default memo(CardTitle);
