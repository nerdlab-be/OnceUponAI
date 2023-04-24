import Head from "next/head";
import styled from "@emotion/styled";
import WidthContainer from "../components/WidthContainer";
import PageContainer from "../components/PageContainer";

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

export default function DiscoverArtworks() {
  return (
    <div>
      <Head>
        <title>Discover Artworks</title>
        <meta name="description" content="Discover Artworks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContainer>
        <WidthContainer>
          <CenterContainer>
            <h2>Discover Artworks</h2>
          </CenterContainer>
        </WidthContainer>
      </PageContainer>
    </div>
  );
}