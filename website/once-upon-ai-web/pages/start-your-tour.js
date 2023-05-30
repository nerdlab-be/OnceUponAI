import Head from "next/head";
import styled from "@emotion/styled";
import WidthContainer from "../components/WidthContainer";
import Link from "next/link";
import Image from "next/image";
import CenteredPageContainer from "@/components/CenteredPageContainer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 32px;
  max-width: 500px;
  padding: 16px;
`;

const StartChat = styled(Link)`
  position: relative;
  border: 1.5px solid white;
  padding: 8px 32px;
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  transition: all 1s ease;
  margin-left: 16px;

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
    transform: translate(50%, 0.5px);
  }
  &:before {
    left: 0;
    transform: translate(-50%, 0.5px);
  }
`;

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default function StartYourTour() {
  const { t } = useTranslation();

  return (
    <div>
      <Head>
        <title>Start Your Tour</title>
        <meta name="description" content="Start Your Tour" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CenteredPageContainer>
        <WidthContainer>
          <CenterContainer>
            <Image src="/jos.png" width={300} height={200} alt="Robot Image" />
            <ContentContainer>
              <h1>{t("chatbot_route_intro_title")}</h1>
              <p>{t("chatbot_route_intro_description")}</p>
              <StartChat href="/start-your-tour/chat">{t("chatbot_route_intro_start_button")}</StartChat>
            </ContentContainer>
          </CenterContainer>
        </WidthContainer>
      </CenteredPageContainer>
    </div>
  );
}
