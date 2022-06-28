import React, { memo, useCallback, useState } from "react";
import {
  CardImageIconWrap,
  CardImageContainer,
} from "../styles/styledElements";
import { ImageBox } from "../components";
import { Heart } from "../assets/icons";
import withLoading from "../hoc/withSkeleton";

const ImagePart = memo(({ liked, onClickLike, images, onLoad }) => {
  console.log("1. 이미지파트 렌더링");
  return (
    <CardImageContainer>
      <CardImageIconWrap>
        <Heart
          color={liked ? "#FF4842" : "#fff"}
          onClcik={(e) => onClickLike(e)}
        />
      </CardImageIconWrap>
      <ImageBox images={images} onLoad={onLoad} />
    </CardImageContainer>
  );
});

const CardImage = ({ isLoading, images, onLoad }) => {
  // like state
  const [liked, setLiked] = useState(false);

  const onClickLike = useCallback((e) => {
    e.preventDefault();
    setLiked((prev) => !prev);
  }, []);

  const WithImageLoading = withLoading(ImagePart);
  return (
    <>
      <WithImageLoading
        isLoading={isLoading}
        onClickLike={onClickLike}
        liked={liked}
        images={images}
        height={350}
        width="100%"
        onLoad={onLoad}
      />
    </>
  );
};

export default memo(CardImage);
