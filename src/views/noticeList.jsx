import React from "react";
import { NoticeTitleWrap, Paragraph } from "../styles/styledElements";
import { Title } from "../components";
import { ArrowRight } from "../assets/icons";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import moment from "moment";
import withLoading from "../hoc/withSkeleton";

const NoticeListsWrap = styled(NavLink)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
  text-decoration: unset;
  padding: 20px;
  border-bottom: 1px solid #eceff1;
`;

const NoticeList = ({
  children,
  pathName,
  border,
  title,
  time,
  list,
  isListsLoading,
  ...props
}) => {
  const NoticeTitle = () => {
    return <Title margin="0 0 10px 0">{title}</Title>;
  };
  const NoticeTime = () => {
    return (
      <Paragraph fontSize="14px" color="rgba(0,0,0,0.3)">
        {moment(time).format("L")}
      </Paragraph>
    );
  };

  const WithTitleLoading = withLoading(NoticeTitle);
  const WithTimeLoading = withLoading(NoticeTime);

  return (
    <NoticeListsWrap to={`${pathName}`} state={list}>
      <NoticeTitleWrap>
        <WithTitleLoading isLoading={isListsLoading} height={25} width={300} />
        <WithTimeLoading isLoading={isListsLoading} height={17} width={200} />
      </NoticeTitleWrap>
      <ArrowRight color="#E2E6E7" />
    </NoticeListsWrap>
  );
};

export default NoticeList;
