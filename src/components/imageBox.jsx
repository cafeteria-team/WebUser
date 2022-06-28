import React, { memo } from "react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
// Or, if you have to support IE9
import "@egjs/react-flicking/dist/flicking-inline.css";
import Panel from "./panel";
import { Pagination } from "@egjs/flicking-plugins";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

export const CardSlideWrap = styled(Flicking)`
  width: 100%;
  height: 100%;
  margin: 0px auto;
  background: #fff;
  background: rgba(55, 55, 55 0.1);
  border-radius: 5px;
`;

const ImageBox = ({ images, onLoad }) => {
  const plugins = [new Pagination({ type: "bullet" })];

  return (
    <CardSlideWrap
      gap={10}
      circular={true}
      plugins={plugins}
      // resizeOnContentsReady={true}
    >
      {images && images?.length !== 0 ? (
        images.map((item, index) => (
          <Panel index={index} src={item} key={uuidv4()} onLoad={onLoad} />
        ))
      ) : (
        <Panel
          alt="default img"
          src={require("../assets/images/default_img.png")}
          onLoad={onLoad}
        />
      )}
      <ViewportSlot>
        <div className="flicking-pagination"></div>
      </ViewportSlot>
    </CardSlideWrap>
  );
};

export default memo(ImageBox);
