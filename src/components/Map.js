import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const Map = withScriptjs(
  withGoogleMap(({ onMapClick, lat, long }) => (
    <GoogleMap
      onClick={(e) => onMapClick(e.latLng.lat(), e.latLng.lng())}
      defaultZoom={8}
      defaultCenter={{ lat: lat || 50.108, lng: 8.6817 }}
    >
      {lat && long && <Marker position={{ lat: lat, lng: long }} />}
    </GoogleMap>
  ))
);

export default Map;
