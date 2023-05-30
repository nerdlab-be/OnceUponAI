import Head from "next/head";
import WidthContainer from "@/components/WidthContainer";
import PageContainer from "@/components/PageContainer";
import { IoIosArrowBack } from "react-icons/io";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useContext, useEffect, useState } from "react";
import { RouteContext } from "@/context/RouteContext";
import { useRouter } from "next/router";

import {
  Container,
  BackButton,
  Content,
  LeftBlock,
  RightBlock,
  Title,
  Description,
  RouteContainer,
  SaveRoutebutton,
  ArtworkSidebar,
} from "@/components/styled/RouteStyles";
import Artwork from "@/components/Artwork";
import QrModal from "@/components/QrModal";
import { getRouteById, saveRoute } from "@/utils/route-api";
import { useModal } from "@/utils/route-hooks";
import styled from "@emotion/styled";

export async function getServerSideProps({ locale, query }) {
  console.log("route query:", query);

  let routeObjects = null;
  if (query.routeId) {
    console.log("found routeId:", query.routeId);
    let route = await getRouteById(query.routeId);
    routeObjects = route.routeObjects;
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      routeObjects,
    },
  };
}

const MapContainer = styled.div`
  height: 600px;
  width: 100%;
`;

const MapFullScreen = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
`;

export default function Route({ routeObjects }) {
  const { t } = useTranslation();
  const router = useRouter();

  const { routeObjects: objectsFromContext } = useContext(RouteContext);
  const [saveButtonText, setSaveButtonText] = useState(t("save-route"));
  const [isSavingRoute, setIsSavingRoute] = useState(false);
  const [savedRouteId, setSavedRouteId] = useState("");
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);

  const { showModal, openModal, closeModal } = useModal(false);

  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight / 100}px`);
    };
    setVh(); // Initial set
    window.addEventListener("resize", setVh);
    return () => {
      window.removeEventListener("resize", setVh);
    };
  }, []);

  // Objects fetched from db using a specific routeId take precedence over objects in context
  if (!routeObjects) {
    console.log("Using objects from context");
    routeObjects = objectsFromContext;
  }

  const Map = dynamic(() => import("@/components/LeafletMap"), {
    loading: () => <p>A map is loading</p>,
    ssr: false, // This line is important. It's what prevents server-side render
  });

  async function onSaveRoute(routeObjects) {
    // Only save route once
    if (routeObjects.length == 0 || savedRouteId || isSavingRoute) return;

    try {
      setIsSavingRoute(true);
      const { message, routeId } = await saveRoute(routeObjects);

      console.log(message, routeId);

      setSavedRouteId(routeId);
      setSaveButtonText(t("saved"));
      openModal();
    } finally {
      setIsSavingRoute(false);
    }
  }

  function getSavedRouteLink() {
    return `${window.location.origin}/${router.locale}${router.asPath}?routeId=${savedRouteId}`;
  }

  return (
    <div>
      <Head>
        <title>{t("route")}</title>
        <meta name="description" content="Route" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isMapFullscreen && (
        <>
          <MapFullScreen>
            <Map pois={routeObjects} setIsMapFullscreen={setIsMapFullscreen} />
          </MapFullScreen>
          <RightBlock>
            <ArtworkSidebar className="artwork-container">
              {routeObjects.map((artwork, index) => (
                <Artwork key={index} artwork={artwork} />
              ))}
            </ArtworkSidebar>
          </RightBlock>
        </>
      )}
      {!isMapFullscreen && (
        <PageContainer>
          <WidthContainer>
            <Container>
              <BackButton href="/start-your-tour">
                <IoIosArrowBack />
                {t("back_to_beginning")}
              </BackButton>
              <Content>
                <LeftBlock>
                  <Title>{t("walking_route_title")}</Title>
                  <Description>{t("walking_route_description")}</Description>
                  <RouteContainer>
                    {router.query.routeId == null && (
                      <SaveRoutebutton onClick={() => onSaveRoute(routeObjects)}>
                        {isSavingRoute ? t("saving") : saveButtonText}
                      </SaveRoutebutton>
                    )}
                    {router.query.routeId == null && savedRouteId && (
                      <QrModal link={getSavedRouteLink()} showModal={showModal} closeModal={closeModal} />
                    )}
                    <MapContainer>
                      <Map pois={routeObjects} setIsMapFullscreen={setIsMapFullscreen} />
                    </MapContainer>
                  </RouteContainer>
                </LeftBlock>
                <RightBlock>
                  <Title>{t("art_pieces")}</Title>
                  <ArtworkSidebar className="artwork-container">
                    {routeObjects.map((artwork, index) => (
                      <Artwork key={index} artwork={artwork} />
                    ))}
                  </ArtworkSidebar>
                </RightBlock>
              </Content>
            </Container>
          </WidthContainer>
        </PageContainer>
      )}
    </div>
  );
}
