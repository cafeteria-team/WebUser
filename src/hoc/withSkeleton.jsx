import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// 함수 두개 합칠때
// export default function (msg = "로딩중...") {
//   return function withSkeleton(WrappedComponent) {
//     return function withLoading({ isLoading, ...props }) {
//       if (isLoading) {
//         return msg;
//       }
//       return <WrappedComponent {...props} />;
//     };
//   };
// }

// 기본
// export default function withLoading(WrappedComponent) {
//   return function WithLoading({ isLoading, ...props }) {
//     if (isLoading) {
//       return "...로딩중";
//     }
//     return <WrappedComponent {...props} />;
//   };
// }

export default function withLoading(WrappedComponent) {
  return function WithLoading({ loading, ...props }) {
    if (loading) {
      return <Skeleton {...props} />;
    }
    return <WrappedComponent {...props} />;
  };
}

// 호출;
// export default function withLoading(WrappedComponent, msg = "...로딩중") {
//   return function WithLoading({ isLoading, ...props }) {
//     if (isLoading) {
//       return msg;
//     }
//     return <WrappedComponent {...props} />;
//   };
// }

// msg를 함수로 받아들일때
// export default function withLoading(WrappedComponent, Msg) {
//   return function WithLoading({ isLoading, ...props }) {
//     if (isLoading) {
//       return <Msg />;
//     }
//     return <WrappedComponent {...props} />;
//   };
// }

// 응답
// const sthWithLoading = withLoading(sth)
// const sthWithLoading = withLoading(Input, 로딩상태를 출력하는값(msg):<input value="로딩"/>)
