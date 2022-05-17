import React from "react";
import {
  ServiceTitleWrap,
  Paragraph,
  ServiceBodyWrap,
  ServiceWrap,
} from "../styles/styledElements";

const ServiceList = () => {
  return (
    <ServiceWrap>
      <ServiceTitleWrap>
        <Paragraph fontWeight="bold">이용안내</Paragraph>
      </ServiceTitleWrap>
      <ServiceBodyWrap>
        <Paragraph margin="0 0 12px 0">전화상담</Paragraph>
        <Paragraph fontSize="14px">&#183; 010.1234.1234</Paragraph>
      </ServiceBodyWrap>
      <ServiceBodyWrap>
        <Paragraph margin="0 0 12px 0">이메일 상담</Paragraph>
        <Paragraph fontSize="14px">&#183; abc@gmail.com</Paragraph>
      </ServiceBodyWrap>
    </ServiceWrap>
  );
};

export default ServiceList;
