import React from "react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
// Or, if you have to support IE9
import "@egjs/react-flicking/dist/flicking-inline.css";
import Panel from "./panel";
import { Parallax, Pagination } from "@egjs/flicking-plugins";
import styled from "styled-components";
import "./slide.css";

export const CardImageWrap = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
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

export const CardSlideWrap = styled(Flicking)`
  width: 100%;
  height: 100%;
  margin: 0px auto;
  background: #fff;
  background: rgba(55, 55, 55 0.1);
  border-radius: 5px;
`;

const ImageBox = () => {
  const plugins = [new Parallax("img", 4), new Pagination({ type: "scroll" })];

  return (
    <CardSlideWrap
      gap={10}
      circular={true}
      onMoveEnd={(e) => {
        console.log(e);
      }}
      plugins={plugins}
      resizeOnContentsReady={true}
    >
      <Panel index={1} src={require("../assets/images/mock_img1.jpg")} />
      <Panel index={2} src={require("../assets/images/mock_img2.jpg")} />
      <Panel index={3} src={require("../assets/images/mock_img3.jpg")} />
      <ViewportSlot>
        <div className="flicking-pagination"></div>
      </ViewportSlot>
    </CardSlideWrap>
  );
};

export default ImageBox;
