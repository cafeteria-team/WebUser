import React from "react";
import { CardImageWrap } from "../styles/styledElements";
import Image from "./image";

export default React.forwardRef(({ index, src }, ref) => (
  <CardImageWrap ref={ref}>
    <Image src={src} alt="store_img" />
  </CardImageWrap>
));
