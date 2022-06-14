import React from "react";
import { NoticeTitleWrap, Paragraph } from "../styles/styledElements";
import { Title } from "../components";
import { ArrowRight } from "../assets/icons";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import moment from "moment";

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
  ...props
}) => {
  console.log(list);
  return (
    <NoticeListsWrap to={`${pathName}`} state={list}>
      <NoticeTitleWrap>
        <Title margin="0 0 10px 0">{title}</Title>
        <Paragraph fontSize="14px" color="rgba(0,0,0,0.3)">
          {moment(time).format("L")}
        </Paragraph>
      </NoticeTitleWrap>
      <ArrowRight color="#E2E6E7" />
    </NoticeListsWrap>
  );
};

export default NoticeList;
