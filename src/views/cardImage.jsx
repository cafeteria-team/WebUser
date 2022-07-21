import React, { memo, useCallback, useState, useEffect } from "react";
import {
  CardImageIconWrap,
  CardImageContainer,
} from "../styles/styledElements";
import { ImageBox } from "../components";
import { Heart } from "../assets/icons";
import withLoading from "../hoc/withSkeleton";
// import { useSelector, useDispatch } from "react-redux";
// import { setLikeStore } from "../_modules/like";
import { addIndexDB, deleteIndexDB, getIndexDB } from "../utills/indexDB";

const ImagePart = memo(({ liked, onClickLike, images, storeId, measure }) => {
  // console.log("1. 이미지파트 렌더링");
  return (
    <CardImageContainer>
      <CardImageIconWrap>
        <Heart
          color={liked ? "#FF4842" : "#f2f2f2"}
          onClcik={(e) => onClickLike(e)}
        />
      </CardImageIconWrap>
      <ImageBox images={images} measure={measure} />
    </CardImageContainer>
  );
});

const CardImage = ({ loading, images, storeId, measure }) => {
  // const _like = useSelector((state) => state.setLikedStore);
  // const dispatch = useDispatch();

  // like state
  const [liked, setLiked] = useState(false);

  const onClickLike = useCallback(
    (e) => {
      e.preventDefault();
      setLiked((prev) => !prev);
      // dispatch(setLikeStore(storeId));

      if (!liked) {
        addIndexDB(storeId);
      } else {
        deleteIndexDB(storeId);
      }
    },
    [storeId, liked]
  );

  useEffect(() => {
    getIndexDB().then((result) => {
      result.map((item) => item.store === storeId && setLiked(true));
    });
  }, [storeId]);

  const WithImageLoading = withLoading(ImagePart);
  return (
    <>
      <WithImageLoading
        loading={loading}
        onClickLike={onClickLike}
        liked={liked}
        images={images}
        height={350}
        width="100%"
        storeId={storeId}
        measure={measure}
      />
    </>
  );
};

export default memo(CardImage);
