import React from "react";
import { NoticeContent } from "../../views";
import { useLocation } from "react-router-dom";

const NoticeDetail = (props) => {
  const location = useLocation();
  const { subject, content, updated } = location.state;

  return (
    <>
      <NoticeContent subject={subject} content={content} time={updated} />
    </>
  );
};

export default NoticeDetail;
