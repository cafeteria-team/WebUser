import React from "react";
import { CardImageWrap, CardImage } from "../styles/styledElements";
import Image from "./image";

export default React.forwardRef(({ index, src, measure }, ref) => (
  <CardImageWrap ref={ref}>
    <Image src={src} alt="store_img" onLoad={measure} />
    {/* <CardImage src={src} alt="store_img" onLoad={onLoad} /> */}
  </CardImageWrap>
));
