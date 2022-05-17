import React from "react";
import { NoticeContainer, NoticeTitle } from "../../styles/styledElements";
import { ServiceList } from "../../views";

const ServicePage = () => {
  return (
    <>
      <NoticeTitle>고객센터</NoticeTitle>
      <NoticeContainer>
        <ServiceList />
      </NoticeContainer>
    </>
  );
};

export default ServicePage;
