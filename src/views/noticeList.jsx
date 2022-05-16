import React from "react";
import { NoticeTitleWrap, Paragraph } from "../styles/styledElements";
import { Title } from "../components";
import { ArrowRight } from "../assets/icons";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NoticeListsWrap = styled(NavLink)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => `${theme.space.large} 0`};
  border-bottom: ${(props) =>
    props.border ? `unset` : `1px solid ${props.theme.colors.border}`};
  cursor: pointer;
  text-decoration: unset;
`;

const NoticeList = ({ children, pathName, border, ...props }) => {
  return (
    <NoticeListsWrap border={true} to={`${pathName}`}>
      <NoticeTitleWrap>
        <Title margin="0 0 10px 0">[공지] 공지사항입니다.</Title>
        <Paragraph fontSize="14px" color="rgba(0,0,0,0.3)">
          2022.05.10
        </Paragraph>
      </NoticeTitleWrap>
      <ArrowRight color="#E2E6E7" />
    </NoticeListsWrap>
  );
};

export default NoticeList;
