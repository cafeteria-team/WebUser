import React from "react";
import { CardImageWrap, CardImage } from "../styles/styledElements";

export default React.forwardRef(({ index, src }, ref) => (
  <CardImageWrap ref={ref}>
    <CardImage src={src} alt="store_img" />
  </CardImageWrap>
));
