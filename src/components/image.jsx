import React, { useEffect, useRef, useState } from "react";
import "intersection-observer";
import "../polyfill/customEvent";
import { CardImage, CardImagePlacholder } from "../styles/styledElements";

let observer = null;
// 이미지를 로드할 이벤트 이름은 loadImage로 정했습니다.
const LOAD_IMG_EVENT_TYPE = "loadImage";

function onIntersection(entries, io) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      io.unobserve(entry.target);
      entry.target.dispatchEvent(new CustomEvent(LOAD_IMG_EVENT_TYPE));
    }
  });
}

// 이미지 경로와 alt를 받는다
const Image = (props) => {
  const { src, alt } = props;
  const imgRef = useRef(null);

  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    function loadImage() {
      setIsLoad(true);
    }

    const imgEl = imgRef.current;

    // 이미지 엘리먼트에 커스텀 이벤트 리스너 추가
    if (imgEl) {
      // @ts-ignore
      imgEl.addEventListener(LOAD_IMG_EVENT_TYPE, loadImage);
    }

    return () => {
      // 이미지 엘리먼트에 커스텀 이벤트 리스너 제거. clean up
      if (imgEl) {
        // @ts-ignore
        imgEl.removeEventListener(LOAD_IMG_EVENT_TYPE, loadImage);
      }
    };
  }, []);

  useEffect(() => {
    // 이미지 요소의 노출도를 측정할 옵저버를 생성해줍니다.
    if (!observer) {
      observer = new IntersectionObserver(onIntersection, {
        // threshold(0 ~ 1) 0.3 이면 30% 노출시 로드.
        threshold: 0.3,
      });
    }

    // @ts-ignore
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
  }, []);

  return isLoad ? (
    <CardImage ref={imgRef} src={src} alt={alt} />
  ) : (
    <CardImagePlacholder ref={imgRef} alt={alt} />
  );
};

// <CardImage ref={imgRef} src={isLoad ? src : ""} alt={alt} />;

Image.defaultProps = {
  alt: "",
};

export default Image;
