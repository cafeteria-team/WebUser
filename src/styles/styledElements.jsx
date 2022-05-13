import styled, { css, keyframes, createGlobalStyle } from "styled-components";
import Pretendard from "../assets/fonts/PretendardVariable.woff2";
import Changwon from "../assets/fonts/Changwon.otf";
import theme from "./theme";

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
    src: url(${Changwon}) format('otf');
    font-weight: 600;
    font-style: bold;
    font-display: auto;
  }
*{
    padding:0;
    margin:0;
    box-sizing: border-box;
}
body{
    padding:0;
    margin:0;
    font-family : "Pretendard";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color:${({ theme }) => theme.colors.text};
    letter-spacing:-0.25px;
  }
  h1{
    font-size: ${({ theme }) => theme.fontSizes.title};
  }
  p{
    font-size: ${({ theme }) => theme.fontSizes.body};
  }

`;

// common //

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

// header
export const StyledHeaderContainer = styled.article`
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

//slide menu
export const SlideMenuContainer = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 2;
`;
export const SlideMenuWrap = styled.div`
  width: 100%;
  max-width: 400px;
  height: 100%;
  padding: ${({ theme }) => `${theme.space.large}`};
  background: #fff;
`;
export const SlideMenuBg = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`;
export const SlideIconWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: ${({ theme }) => `${theme.space.large}`};
`;
export const SlideSurveyWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 94px;
  background: ${({ theme }) => theme.colors.mainOpacity};
  border-radius: ${({ theme }) => theme.radii.button};
  padding: ${({ theme }) => `${theme.space.large}`};
`;
export const SlideMenuListWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => `${theme.space.xlargeg}`};
`;

// main page //

// card components
export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
  background: #fff;
  box-shadow: ${({ theme }) => theme.shadow.content}};
  border-radius:${({ theme }) => theme.radii.rounded};
  padding:${({ theme }) => theme.space.large}
`;

// imgBox
export const CardImageContainer = styled.div`
  width: 100%;
`;
export const CardImageWrap = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
`;
export const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 100%;
  height: auto;
`;

// title
export const CardTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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
  padding: ${({ theme }) => `0 ${theme.space.large}`};
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
export const CardMenuButton = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.detail};
`;
export const CardMenuListsWrap = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const CardMenuLists = styled.li`
  display: flex;
  align-items: center;
  border-botton: ${(props) =>
    props.border ? "" : `1px solid ${props.theme.colors.border}`};
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
