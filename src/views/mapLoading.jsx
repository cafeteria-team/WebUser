import React from "react";
import Lottie from "react-lottie";
import MapLoadingLottie from "../assets/lotties/mapLoading.json";
import { LoadingContainer } from "../styles/styledElements";

const lottieOptions = {
  animationData: MapLoadingLottie,
  loop: true,
  autoplay: true,
  rendererSettings: {
    className: "add-class", // svg에 적용
    preserveAspectRatio: "xMidYMid slice",
  },
};

const MapLoading = () => {
  return (
    <LoadingContainer>
      <Lottie
        options={lottieOptions}
        isClickToPauseDisabled={false}
        style={{ width: "60%", height: "60%" }} // svg의 부모 div에 적용
      />
    </LoadingContainer>
  );
};

export default MapLoading;
