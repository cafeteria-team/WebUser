import React from "react";
import { NoticeContent } from "../../views";
import { useParams, useLocation } from "react-router-dom";

const NoticeDetail = (props) => {
  const params = useParams();
  const location = useLocation();

  console.log(params, props, location);

  return (
    <>
      <NoticeContent />
    </>
  );
};

export default NoticeDetail;
