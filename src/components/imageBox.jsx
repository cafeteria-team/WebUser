import React from "react";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
// Or, if you have to support IE9
import "@egjs/react-flicking/dist/flicking-inline.css";
import Panel from "./panel";
import { Parallax } from "@egjs/flicking-plugins";
import "../styles/slide.css";

// const ImageBoxStyle = {
//   position: "relative",
//   paddingTop: "75%",
//   overflow: "hidden",
// };

const ImageBox = () => {
  const plugins = [new Parallax("img", 4)];

  return (
    <Flicking
      className="flicking"
      //   align="prev"
      gap={10}
      circular={true}
      onMoveEnd={(e) => {
        console.log(e);
      }}
      //   autoResize={true}
      plugins={plugins}
      //   style={ImageBoxStyle}
    >
      {/* <Panel index={1} />
      <Panel index={2} />
      <Panel index={3} /> */}
      <div className="panel">
        <img
          src="https://naver.github.io/egjs-flicking/images/bg01.jpg"
          alt="store_img"
        />
      </div>
      <div className="panel">
        <img
          src="https://naver.github.io/egjs-flicking/images/bg02.jpg"
          alt="store_img"
        />
      </div>
      <div className="panel">
        <img
          src="https://naver.github.io/egjs-flicking/images/bg03.jpg"
          alt="store_img"
        />
      </div>
    </Flicking>
  );
};

export default ImageBox;
