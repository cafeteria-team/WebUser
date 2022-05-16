import React, { useState } from "react";
import Lottie from "react-lottie";
import NotFound from "../../assets/lotties/notFound.json";
import { NotFoundContainer, ChangwonTitle } from "../../styles/styledElements";

const lottieOptions = {
  animationData: NotFound,
  loop: true,
  autoplay: true,
  rendererSettings: {
    className: "add-class", // svg에 적용
    preserveAspectRatio: "xMidYMid slice",
  },
};

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <ChangwonTitle color="#ff9030">
        요청하신 페이지를 찾을 수 없습니다.
      </ChangwonTitle>
      <Lottie
        options={lottieOptions}
        isClickToPauseDisabled={false}
        style={{ width: "80%", height: "80%" }} // svg의 부모 div에 적용
      />
    </NotFoundContainer>
  );
};

export default NotFoundPage;
