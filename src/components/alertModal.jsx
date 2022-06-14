import React from "react";
import Modal from "react-modal";
import { Paragraph, CardWrap } from "../styles/styledElements";
import { Title, Button } from "./index";

const ModalStyle = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "50%",
    bottom: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#fff",
    zIndex: "999",
    width: "100%",
    maxWidth: "400px",
    height: "220px",
    display: "flex",
    borderRadius: "16px",
    border: "unset",
    padding: "20px 20px",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  overlay: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: "999",
  },
};

const AlertModal = ({
  onModal,
  onClickModal,
  color,
  title,
  body,
  secondBody,
}) => {
  return (
    <Modal
      isOpen={onModal}
      contentLabel="phone check"
      onRequestClose={onClickModal}
      style={ModalStyle}
      className="Modal"
      overlayClassName="Overlay"
      ariaHideApp={false}
      closeTimeoutMS={300}
    >
      <CardWrap flexDirection="column" align="center" margin="0 0 20px 0">
        <Title margin="20px 0" color={color}>
          {title}
        </Title>
        <Paragraph margin="0 0 6px 0">{body}</Paragraph>
        <Paragraph>{secondBody}</Paragraph>
      </CardWrap>
      <Button
        background="#FF4842"
        color="#fff"
        width="100%"
        height="56px"
        onClick={onClickModal}
      >
        확인
      </Button>
    </Modal>
  );
};

export default AlertModal;
