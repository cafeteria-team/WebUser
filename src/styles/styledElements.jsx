import styled, { css, keyframes, createGlobalStyle } from "styled-components";
import Pretendard from "../assets/fonts/PretendardVariable.woff2";
import Changwon from "../assets/fonts/Changwon.woff2";
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
  src: url(${Changwon}) format('woff2');
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


  // carousel //
  .flicking-viewport{
    touch-action:pan-x !important;
  }
  .flicking-pagination-scroll {
    overflow: hidden;
    white-space: nowrap;
  }
  .flicking-pagination {
    width: 100%;
    margin: 16px auto 0;
    z-index: 2;
    display:flex;
    justify-content:center;
  }
  .flicking-pagination-scroll .flicking-pagination-slider {
    transition: transform 0.2s;
  }
  .flicking-pagination-scroll .flicking-pagination-bullet {
    position: relative;
    transform: scale(0);
    transition: transform 0.2s, left 0.2s;
    vertical-align: middle;
  }
  .flicking-pagination-bullet {
    border-radius: 50%;
    cursor: pointer;
    display: inline-block;
    font-size: 1rem;
    height: 8px;
    margin: 0 4px;
    width: 8px;
  }
  .flicking-pagination-scroll .flicking-pagination-bullet-next,
  .flicking-pagination-scroll .flicking-pagination-bullet-prev {
    transform: scale(0.66);
  }
  .flicking-pagination-scroll .flicking-pagination-bullet-next2,
  .flicking-pagination-scroll .flicking-pagination-bullet-prev2 {
    transform: scale(0.33);
  }
  .flicking-pagination-scroll .flicking-pagination-bullet-active {
    background-color: #ff9030;
  }
  .flicking-pagination-scroll .flicking-pagination-bullet-active {
    transform: scale(1);
  }
  
  .flicking-arrow-disabled.is-circle,
  .flicking-pagination-bullet,
  .hero.is-black .tabs.is-boxed a:hover,
  .hero.is-black .tabs.is-toggle a:hover,
  .hero.is-danger .tabs.is-boxed a:hover,
  .hero.is-danger .tabs.is-toggle a:hover,
  .hero.is-dark .tabs.is-boxed a:hover,
  .hero.is-dark .tabs.is-toggle a:hover,
  .hero.is-info .tabs.is-boxed a:hover,
  .hero.is-info .tabs.is-toggle a:hover,
  .hero.is-light .tabs.is-boxed a:hover,
  .hero.is-light .tabs.is-toggle a:hover,
  .hero.is-link .tabs.is-boxed a:hover,
  .hero.is-link .tabs.is-toggle a:hover,
  .hero.is-primary .tabs.is-boxed a:hover,
  .hero.is-primary .tabs.is-toggle a:hover,
  .hero.is-success .tabs.is-boxed a:hover,
  .hero.is-success .tabs.is-toggle a:hover,
  .hero.is-warning .tabs.is-boxed a:hover,
  .hero.is-warning .tabs.is-toggle a:hover,
  .hero.is-white .tabs.is-boxed a:hover,
  .hero.is-white .tabs.is-toggle a:hover {
    background-color: hsla(0, 0%, 4%, 0.1);
  }

  .flicking-pagination-bullet-active{
    background-color: #ff9030;
  }
  
  //modal

  .ReactModal__Content{
    outline: unset;
    box-shadow:${({ theme }) => theme.shadow.content};
  }

  .ReactModal__Modal {
    position: absolute;
    top: 50%;
    left: 50%;
    right: 50%;
    bottom: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    z-index: 999;
    width: 100%;
    max-width: 600px;
    height: 313px;
    display: flex;
    border-radius: 16px;
    border: unset;
    padding: 20px 20px 50px;
  }
  .ReactModal__Overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 999;
    opacity: 0;
    transition: all 200ms linear;
    -webkit-transition: -webkit-all 200ms linear;
    -webkit-transition: all 200ms linear;
    -moz-transition: all 200ms linear;
    -ms-transition: all 200ms linear;
    -o-transition: all 200ms linear;
  }
  .ReactModal__Overlay--after-open {
    opacity: 1;
  }
  
  .ReactModal__Overlay--before-close {
    opacity: 0;
  }
  
  @media screen and (max-width: 600px) {
    .ReactModal__Content {
      width: calc(100% - 24px) !important;
    }
  }

  // infinite scroll
  .ReactVirtualized__Grid{
    // box-shadow:0px 3px 1px -2px rgb(145 158 171 / 20%), 0px 2px 2px 0px rgb(145 158 171 / 14%), 0px 1px 5px 0px rgb(145 158 171 / 12%);
    // background:#fff;
    // border-radius:16px;
    // margin-bottom:20px;
    -ms-overflow-style: none; 
    scrollbar-width: none;
  }
  .ReactVirtualized__Grid::-webkit-scrollbar {
    display: none; 
  }
`;

///////////// common /////////////
export const RootStyle = styled.div`
  width: 100%;
  padding-bottom: ${({ theme }) => `${theme.space.xxlarge}`};
`;

//container
export const Container = styled.main`
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
`;
export const Wrap = styled.article`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => `0 ${theme.space.large}`};

  @media screen and ${({ theme }) => theme.mobile} {
    padding: ${({ theme }) => `0 ${theme.space.medium}`};
  }
`;

//pagenation
export const PagenationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
export const PageNum = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.bold};
  background: ${(props) => props.background};
  border-radius: 100%;
  width: 26.66px;
  height: 26.66px;
  margin: 0 3px;
  line-height: 28px;
  text-align: center;
  cursor: pointer;
`;

//body paragraph content
export const Paragraph = styled.p`
  margin: ${(props) => props.margin || ""};
  font-weight: ${(props) => props.fontWeight || "regular"};
  color: ${(props) => props.color || props.theme.colors.title};
  font-size: ${(props) => props.fontSize || "16px"};
`;

export const ChangwonTitle = styled.h1`
  margin: ${(props) => props.margin || ""};
  font-weight: ${(props) => props.fontWeight || "regular"};
  line-height: ${(props) => props.lineHegiht || props.theme.lineHeights.title};
  color: ${(props) => props.color || props.theme.colors.title};
  font-family: Changwon;
  letter-spacing: 0px;
`;

// header
export const StyledHeaderContainer = styled.article`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
`;
export const SpaceHeader = styled.div`
  width: 100%;
  height: 60px;
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
export const MenuWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
// header - my location content
export const LocationContentWrap = styled.div`
  width: 100%;
  height: 120px;
  background: #fff;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.4s linear;
  overflow: hidden;
  max-height: ${({ area }) => (area ? "120px" : "0")};
  position: fixed;
  top: 60px;
  left: 0;
  z-index: 99;
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
  z-index: 999;
`;
export const SlideMenuWrap = styled.div`
  width: 100%;
  max-width: 400px;
  min-width: 400px;
  height: 100%;
  padding: ${({ theme }) => `${theme.space.large}`};
  background: #fff;
  z-index: 999;
  -webkit-transition: all 0.4s linear;
  -webkit-transition: -webkit-all 0.4s linear;
  -moz-transition: all 0.4s linear;
  -ms-transition: all 0.4s linear;
  -o-transition: all 0.4s linear;
  transition: all 0.4s linear;
  -webkit-transform: ${(props) =>
    props.OnMenu ? "translateX(0%)" : "translateX(-100%)"};
  -webkit-transform: ${(props) =>
    props.OnMenu ? "-webkit-translateX(0%)" : "translateX(-100%)"};
  -moz-transform: ${(props) =>
    props.OnMenu ? "translateX(0%)" : "translateX(-100%)"};
  -ms-transform: ${(props) =>
    props.OnMenu ? "translateX(0%)" : "translateX(-100%)"};
  -o-transform: ${(props) =>
    props.OnMenu ? "translateX(0%)" : "translateX(-100%)"};
  transform: ${(props) =>
    props.OnMenu ? "translateX(0%)" : "translateX(-100%)"};

  @media screen and ${({ theme }) => theme.mobileS} {
    min-width: unset;
  }
`;
export const SlideMenuBg = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);

  -webkit-transition: opacity 0.4s linear;
  -webkit-transition: -webkit-opacity 0.4s linear;
  -moz-transition: opacity 0.4s linear;
  -ms-transition: opacity 0.4s linear;
  -o-transition: opacity 0.4s linear;
  transition: opacity 0.4s linear;
  opacity: ${(props) => (props.OnMenu ? "1" : "0")};

  @media screen and ${({ theme }) => theme.mobileS} {
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
  cursor: pointer;
`);

export const SlideMenuListWrap = memo(styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 6px;
`);

///////////// main page /////////////

// card components
export const CardContainer = styled.div`
  position:relative;
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

export const CardLoader = styled.div`
  width: 100%;
  hegiht: 100%;
`;

// imgBox
export const CardImageContainer = styled.div`
  width: 100%;
  position: relative;
`;
export const CardImageIconWrap = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 2;
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

export const CardImagePlacholder = styled.div`
  top: -100%;
  bottom: -100%;
  margin: auto;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  width: 100%;
  height: 100%;
  background: #fcf1e8;
`;

// title
export const CardTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: ${(props) =>
    props.margin
      ? props.margin
      : `${props.theme.space.medium} 0 ${props.theme.space.large}`};
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
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.button};
  padding: ${({ theme }) => theme.space.large};
  margin: ${(props) => props.margin || ""};
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
  transition: max-height 1.1s cubic-bezier(1, 0, 0, 1);
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
export const CardNoneLists = styled.div`
  display: flex;
  width: 100%;
  height: 120px;
  border-radius: ${({ theme }) => theme.radii.button};
  margin-top: 20px;
  background: #fff;
  box-shadow: ${({ theme }) => theme.shadow.content};
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

////detail page//////
export const CardAddressWrap = styled.div`
  display: flex;
  align-items: center;
  margin: ${(props) => props.margin || ""};
`;

export const CardWrap = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || ""};
  align-items: ${(props) => props.align || ""};
  justify-content: ${(props) => props.just || ""};
  margin: ${(props) => props.margin || ""};
  padding: ${(props) => props.padding || ""};
  background: ${(props) => props.background || ""};
  border-bottom: ${(props) =>
    props.border ? `1px solid ${props.theme.colors.border}` : `unset`};
`;
export const FaiclityWrap = styled.div`
  display: felx;
  align-items: center;
`;

export const FacilityIconWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: max-content;
  min-width: 64px;
  height: 64px;
  background: #f9fafb;
  margin-right: 12px;
  border-radius: ${({ theme }) => theme.radii.button};
`;

export const PriceWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.button};
  background: #f9fafb;
  padding: 10px 20px;
`;

export const PriceLists = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: ${({ border }) => (border ? "unset" : "1px solid #eceff1")};
  padding: ${({ padding }) => (padding ? padding : "10px 0")};
`;

/////////map page /////////
export const MapTitle = styled.div`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  z-index: 2;
  padding: 2px 20px;
  display: flex;
  align-items: center;
  width: max-content;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.rounded};
`;

///////// notice page /////////
export const NoticeTitle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 94px;
  background: ${({ theme }) => theme.colors.main};
  border-radius: ${({ theme }) => theme.radii.button};
  padding: ${({ theme }) => theme.space.large};
  margin: ${({ theme }) => `${theme.space.large} 0`};
  font-family: Changwon;
  color: #fff;
  font-size: 20px;
  letter-spacing: 0px;
`;
export const NoticeContainer = styled.div`
  display: block;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.radii.rounded};
  background: #fff;
  box-shadow: ${({ theme }) => theme.shadow.content};
  padding: ${(props) => props.padding || ""};
`;
export const NoticeTitleWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

/////// notice detail///////

export const NoticeContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.radii.rounded};
  background: #fff;
  box-shadow: ${({ theme }) => theme.shadow.content};
  padding: 0 ${({ theme }) => theme.space.large};
  margin-top: ${({ theme }) => theme.space.large};
`;

export const NoticeContentTitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.space.xxlarge} 0;
  border-bottom: ${(props) => `1px solid ${props.theme.colors.border}`};
`;

export const NoticeBody = styled.div`
  font-size: ${({ fontSize, theme }) =>
    fontSize ? fontSize : theme.fontSizes.detail};
  line-height: ${({ theme }) => theme.lineHeights.paragraph};
  padding: ${({ padding, theme }) =>
    padding ? padding : `${theme.space.large} 0 ${theme.space.xxlarge}`};

  & p {
    font-size: 14px;
  }
`;

/////// service page'////////
export const ServiceWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${({ theme }) => `${theme.space.large} 0`};
`;

export const ServiceTitleWrap = styled.div`
  padding-bottom: ${({ theme }) => `${theme.space.large}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ServiceBodyWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.space.large};
`;

/////// not found ///////
export const NotFoundContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%;
  transform: translateY(-50%);
`;

////// map container/////
export const StyledMapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const StyledMapWrap = styled.form`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
`;

export const StyledButtonMapWrap = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
`;

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
