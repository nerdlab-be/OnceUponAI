import styled from "@emotion/styled";
import { useTranslation } from "next-i18next";
import ReactModal from "react-modal";

const customStyles = {
  content: {
    position: "relative",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    color: "black",
    maxWidth: "90%",
    maxHeight: "80vh",
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
  align-items: flex-start;
  gap: 16px;
  max-width: 35em;
  max-height: 75vh;
  overflow: auto;

  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
  &::-webkit-scrollbar {
    width: 0px; /* For Chrome, Safari, and Opera */
  }

  @media (min-width: 768px) {
    max-width: unset;
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    grid-template-areas: 'title image' 'description image' 'position image''close image';
    margin: 0 15%;
  }
`;

const Title = styled.h2``;

const Image = styled.img`
  max-height: 400px;
  grid-area: image;
  justify-self: center;
`;

const Description = styled.p`
  grid-area: description;
  `;

const CloseButtonX = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  border: none;
  color: white;
  font-size: 1.5rem;
  z-index: 10000;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 5px;
`;

const CloseButton = styled.button`
margin: 17px;
font-family: "Mazius Review Extra", sans-serif;
max-width: 150px;
position: relative;
border: 1.5px solid black;
padding: 8px 32px;
text-align: center;
-webkit-transition: all 1s ease;
-moz-transition: all 1s ease;
-o-transition: all 1s ease;
transition: all 1s ease;
cursor: pointer;
grid-area: close;
align-self: begin;
background: transparent;
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
@media (min-width: 768px) {
  align-self: end;
}
`;

const Adress = styled.p`
 grid-area: position;
`;

/**
 * artwork: {
 *   "object_id": "550016631",
 *   "title": "Titel van het object",
 *   "coordinates": [51.06783069999999, 3.7290914],
 *   "description": "Een uitleg over het object",
 *   "address": "9000 Ghent, Belgium",
 *   "image_url": null,
 *   "location_link": "ChatGPT",
 *   "collection": "stam"
 * }
 */
function ArtworkModal({ artwork, showModal, closeModal }) {
  const { t } = useTranslation();

  return (
    <ReactModal isOpen={showModal} onRequestClose={closeModal} style={customStyles}>
      <CloseButtonX onClick={closeModal}>&times;</CloseButtonX>
      <Container>
        <Title>{artwork.title}</Title>
        {artwork.image_url && <Image src={artwork.image_url} alt={artwork.title} />}
        <Description>{artwork.description}</Description>
        <Adress>{artwork.address}</Adress>
        <CloseButton onClick={closeModal}>{t("close_info")}</CloseButton>
      </Container>
    </ReactModal>
  );
}

export default ArtworkModal;
