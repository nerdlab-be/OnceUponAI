import { useMap } from "react-leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-gps";
import L from "leaflet";

export default function FullscreenControl({ onFullscreen }) {
  const map = useMap();

  React.useEffect(() => {
    const control = L.control({ position: "topright" });

    control.onAdd = function () {
      const button = L.DomUtil.create("button");
      button.innerText = "⛶";
      button.style = `
        font-family: "Mazius Review Extra", sans-serif;
        background-color: transparent;
        font-size: 1.5rem;
        font-weight: bold;
        color: black;
        margin-top: 8px;
        box-sizing: border-box;
        position: relative;
        border: 1.5px solid black;
        padding: 8px 18px;
        text-align: center;
        overflow: hidden;
        -webkit-transition: all 1s ease;
        -moz-transition: all 1s ease;
        -o-transition: all 1s ease;
        transition: all 1s ease;
        cursor: pointer;
        background: rgba(255, 255, 255, 0.4)  ;
        border-radius: 15px;
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
      L.DomEvent.on(button, "click", function () {
        onFullscreen();
      });
      return button;
    };

    control.addTo(map);

    return () => {
      map.removeControl(control);
    };
  }, [map, onFullscreen]);

  return null;
}
