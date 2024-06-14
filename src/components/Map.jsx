import React from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "../components/css/Map.css";
import MarkerPosition from "./MarkerPosition";

const Map = ({ data }) => {
  let position;
  if (data) {
    position = [data.location.latitude, data.location.longitude];
  }
  return (
    <div className="map">
      {data && (
        <MapContainer
          center={position}
          zoom={20}
          scrollWheelZoom={true}
          className="mapContainer"
          zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="topright"></ZoomControl>
          <MarkerPosition data={data}></MarkerPosition>
        </MapContainer>
      )}
    </div>
  );
};

export default Map;
