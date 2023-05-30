import styled from "@emotion/styled";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import ArtworkModal from "./ArtworkModal";

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 200px;
  /* background-color: lightgrey; */
  background-image: ${(props) => (props.imageUrl ? `url(${props.imageUrl})` : "none")};
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
  text-align: center;
  transition: transform 2s ease;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  & > * {
    z-index: 1;
  }
`;

const ArtworkTitle = styled.h3`
  margin: auto;
  align-self: center;
`;

const MoreInfoButton = styled.button`
  align-self: center;
  font-family: "Mazius Review Extra", sans-serif;
  background-color: transparent;
  color: white;
  margin-top: 8px;
  box-sizing: border-box;
  position: relative;
  border: 1.5px solid white;
  padding: 8px 32px;
  text-align: center;
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  transition: all 1s ease;
  min-width: 170px;
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
    border: 1.5px solid white;
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
export default function Artwork({ artwork }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  //   const shortDescription = artwork.description.substring(0, 50) + "...";
  //   console.log("artwork.description", artwork.description);

  return (
    <Container imageUrl={artwork.image_url} data-id={artwork.object_id} className="artwork-element">
      <ArtworkTitle>{artwork.title}</ArtworkTitle>
      {/* {artwork.description.trim() !== "" && <p>{shortDescription}</p>} */}
      <MoreInfoButton onClick={openModal} data-button-id={artwork.object_id}>
        {t("more_info")}
      </MoreInfoButton>
      <ArtworkModal artwork={artwork} showModal={showModal} closeModal={closeModal} />
    </Container>
  );
}
