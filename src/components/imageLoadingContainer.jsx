import React from "react";
import Lottie from "react-lottie";
import ImageLoading from "../assets/lotties/imageLoading.json";

const lottieOptions = {
  animationData: ImageLoading,
  loop: true,
  autoplay: true,
  rendererSettings: {
    className: "add-class", // svg에 적용
    preserveAspectRatio: "xMidYMid slice",
  },
};

const ImageLoadingContainer = () => {
  return (
    <Lottie
      options={lottieOptions}
      isClickToPauseDisabled={false}
      style={{ width: "150px", height: "150px" }} // svg의 부모 div에 적용
    />
  );
};

export default ImageLoadingContainer;
