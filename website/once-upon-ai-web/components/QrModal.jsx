import styled from "@emotion/styled";
import { useTranslation } from "next-i18next";
import ReactModal from "react-modal";
import QRCode from "qrcode.react";
import Link from "next/link";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    color: "black",
    maxWidth: "90%",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 9999,
  },
};

ReactModal.setAppElement("#__next");

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 35em;
  color: black;
  text-align: center;
  max-width: 30rem;
`;

const Title = styled.h2``;

const Subtitle = styled.h3`
  max-width: 15rem;
`;

const RouteLink = styled(Link)`
  color: black;
  max-width: 90%;
  word-break: break-all;
`;

const CloseButton = styled.button`
  padding: 8px 32px;

  font-family: "Mazius Review Extra", sans-serif;

  position: relative;
  border: 1.5px solid black;
  padding: 8px 32px;
  text-align: center;
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  transition: all 1s ease;
  cursor: pointer;
  &:hover {
    opacity: 0.67;
    transform: scale(0.95);
  }
  &:before,
  &:after {
    content: "";
    aspect-ratio: 1 / 1;
    height: calc(3px + 100%);
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    border: 1.5px solid black;
    position: absolute;
    box-sizing: border-box;
  }
  &:after {
    right: 0;
    transform: translate(50%, -9.5px);
  }
  &:before {
    left: 0;
    transform: translate(-50%, -9.5px);
  }
`;

function QrModal({ link, showModal, closeModal }) {
  const { t } = useTranslation();

  return (
    <ReactModal isOpen={showModal} onRequestClose={closeModal} style={customStyles}>
      <Container>
        <Title>{t("route_saved")}</Title>
        <Subtitle>{t("route_link_explanation")}</Subtitle>
        <QRCode value={link} size={128} fgColor="#000000" bgColor="#ffffff" />
        <RouteLink href={link}>{link}</RouteLink>
        <CloseButton onClick={closeModal}>{t("close")}</CloseButton>
      </Container>
    </ReactModal>
  );
}

export default QrModal;
