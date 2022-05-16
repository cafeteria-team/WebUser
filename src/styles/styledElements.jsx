import styled, { css, keyframes, createGlobalStyle } from "styled-components";
import Pretendard from "../assets/fonts/PretendardVariable.woff2";
import Changwon from "../assets/fonts/Changwon.ttf";
import { memo } from "react";

export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Pretendard';
  src: url(${Pretendard}) format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: auto;
}
@font-face {
  font-family: 'PretendardBold';
  src: url(${Pretendard}) format('woff2');
  font-weight: 600;
  font-style: bold;
  font-display: auto;
}
@font-face {
  font-family: 'Changwon';
  src: url(${Changwon}) format('truetype');
  font-weight: 600;
  font-style: bold;
  font-display: auto;
}
*{
    padding:0;
    margin:0;
    box-sizing: border-box;
}
html{
  height:100%;
}
body{
  height:100%;
    padding:0;
    margin:0;
    font-family : "Pretendard";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color:${({ theme }) => theme.colors.text};
    letter-spacing:-0.25px;
    background:${({ theme }) => theme.colors.background}
  }
  h1{
    font-size: ${({ theme }) => theme.fontSizes.title};
  }
  p{
    font-size: ${({ theme }) => theme.fontSizes.body};
  }

`;

///////////// common /////////////
export const RootStyle = styled.div`
  width: 100%;
`;

//container
export const Container = styled.main`
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
`;
export const Wrap = styled.article`
  width: 100%;
  padding: ${({ theme }) => `0 ${theme.space.large}`};
`;

//body paragraph content
export const Paragraph = styled.p`
  margin: ${(props) => props.margin || ""};
  font-weight: ${(props) => props.fontWeight || "regular"};
  color: ${(props) => props.color || props.theme.colors.title};
`;

export const ChangwonTitle = styled.h1`
  margin: ${(props) => props.margin || ""};
  font-weight: ${(props) => props.fontWeight || "regular"};
  line-height: ${(props) => props.lineHegiht || props.theme.lineHeights.title};
  color: ${(props) => props.color || props.theme.colors.title};
  font-family: Changwon;
`;

// header
export const StyledHeaderContainer = styled.article`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
`;
export const StyledHeaderWrap = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 640px;
  margin: 0 auto;
  padding: ${({ theme }) => `0 ${theme.space.large}`};
`;
// header - my location content
export const LocationContentWrap = styled.div`
  width: 100%;
  height: 120px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.4s ease-in-out;
  overflow: hidden;
  max-height: ${({ OnAddress }) => (OnAddress ? "120px" : "0")};
`;
export const LocationContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 640px;
  height: 100%;
  margin: 0 auto;
  padding: ${({ theme }) => `0 ${theme.space.large}`};
`;
export const MyLocationWrap = styled.div`
  display: flex;
  align-items: center;
`;
export const MyLocation = styled.div`
  font-weight: bold;
  margin-right: ${({ theme }) => theme.space.large};
`;

//slide menu
export const SlideMenuContainer = styled.div`
  position: fixed;
  display: flex;
  visibility: ${(props) => (props.OnMenu ? "visible" : "hidden")};
  pointer-events: ${(props) => (props.OnMenu ? "all" : "none")};
  width: 100%;
  height: 100%;
  z-index: 2;
`;
export const SlideMenuWrap = styled.div`
  width: 100%;
  max-width: 400px;
  min-width: 400px;
  height: 100%;
  padding: ${({ theme }) => `${theme.space.large}`};
  background: #fff;
  z-index: 2;

  transition: all 0.5s ease-in;
  transform: ${(props) =>
    props.OnMenu ? "translateX(0%)" : "translateX(-100%)"};

  @media screen and ${({ theme }) => theme.mobile} {
    min-width: unset;
  }
`;
export const SlideMenuBg = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);

  transition: opacity 0.5s ease-in;
  opacity: ${(props) => (props.OnMenu ? "1" : "0")};

  @media screen and ${({ theme }) => theme.mobile} {
    display: none;
  }
`;
export const SlideIconWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: ${(props) => props.margin || `${props.theme.space.large}`};
`;
export const SlideSurveyWrap = memo(styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 94px;
  background: ${({ theme }) => theme.colors.mainOpacity};
  border-radius: ${({ theme }) => theme.radii.button};
  padding: ${({ theme }) => `${theme.space.large}`};
`);

export const SlideMenuListWrap = memo(styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 6px;
`);

///////////// main page /////////////

// card components
export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
  background: #fff;
  box-shadow: ${({ theme }) => theme.shadow.content}};
  border-radius:${({ theme }) => theme.radii.rounded};
  padding:${({ theme }) => theme.space.large};
  margin-top:${({ theme }) => theme.space.large};
`;

// imgBox
export const CardImageContainer = styled.div`
  width: 100%;
`;
export const CardImageWrap = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  display: block;
  border-radius: 16px;
  background: #fff;
  text-align: center;
  width: 100%;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    // background: rgba(0, 0, 0, 0.1);
  }
`;

export const CardImage = styled.img`
  top: -100%;
  bottom: -100%;
  margin: auto;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  width: auto;
  height: 100%;
`;

// title
export const CardTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: ${({ theme }) => `${theme.space.medium} 0 ${theme.space.large}`};
`;
export const CardStorePriceContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;
export const CardStorePriceDes = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.description};
  color: ${({ theme }) => theme.colors.description};
  margin-right: 10px;
`;
export const CardStorePrice = styled.h1`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

// menu lists
export const CardMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${(props) => props.height || "64px"};
  transition: all 0.6s ease-in;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.button};
  padding: ${({ theme }) => theme.space.large};
`;
export const CardMenuTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;
export const CardMenuTitleWrap = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.subTitle};
`;
export const CardMenuListsWrap = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-height: ${(props) => props.maxHeight || "0"};
  overflow: hidden;
  transition: all 0.6s ease;
  margin-top: ${(props) => props.marginTop || "0"};
`;
export const CardMenuLists = styled.li`
  display: flex;
  align-items: center;
  border-bottom: ${(props) =>
    props.border ? "" : `1px solid ${props.theme.colors.border}`};
  padding: ${(props) => props.padding || "10px 0"};
`;
export const AddressButton = styled.button`
  padding: 16px;
  border-radius: ${({ theme }) => theme.radii.button};
  background: ${({ theme }) => theme.colors.background};
  max-width: 454px;
  width: 100%;
  height: 56px;
  margin: ${(props) => props.margin || ""};
`;

///////// notice page /////////
// export const NoticeTitle = styled.div`
//     background : ${({theme})=> }
// `;

/////// not found ///////
export const NotFoundContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%;
  transform: translateY(-50%);
`;
