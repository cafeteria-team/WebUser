import React, { memo } from "react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
// Or, if you have to support IE9
import "@egjs/react-flicking/dist/flicking-inline.css";
import Panel from "./panel";
import { Parallax, Pagination } from "@egjs/flicking-plugins";
import styled from "styled-components";

export const CardSlideWrap = styled(Flicking)`
  width: 100%;
  height: 100%;
  margin: 0px auto;
  background: #fff;
  background: rgba(55, 55, 55 0.1);
  border-radius: 5px;
`;

const ImageBox = () => {
  // const plugins = [new Parallax("img", 4), new Pagination({ type: "scroll" })];

  const plugins = [new Pagination({ type: "bullet" })];

  return (
    <CardSlideWrap
      gap={10}
      circular={true}
      plugins={plugins}
      // resizeOnContentsReady={true}
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

export default memo(ImageBox);
