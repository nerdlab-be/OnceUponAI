import { MapContainer, TileLayer } from "react-leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-gps";
import GeolocationButton from "./GeolocationButton";
import Poi from "./Poi";
import FullscreenControl from "./FullscreenControl";

const LeafletMap = ({ pois, setIsMapFullscreen }) => {
  return (
    <MapContainer
      center={[51.05314, 3.72626]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", zIndex: "0" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Poi locations={pois} />
      <FullscreenControl onFullscreen={() => setIsMapFullscreen((prev) => !prev)} />
      <GeolocationButton
        position="topright"
        title={"Get Location"}
        markerPosition={[20.27, -157]}
        description="Get your location!"
      />
    </MapContainer>
  );
};

export default LeafletMap;
