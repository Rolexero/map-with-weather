import React, { useState } from "react";
import mapboxgl from "mapbox-gl";
import Map, {
  Marker,
  Popup,
  GeolocateControl,
  NavigationControl,
  useControl,
} from "react-map-gl";
import MapboxGeocoder, { Result } from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

interface MapboxProps {}

export const Mapbox: React.FC<MapboxProps> = ({}) => {
  const geolocateControlRef = React.useCallback((ref: any) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger();
    }
  }, []);
  const [viewState, setViewState] = useState({
    longitude: 9.59395988695573,
    latitude: 8.10530640960786,
    zoom: 10,
  });
  // const [showPopup, setShowPopup] = useState(false);
  const Geocoder = (): any => {
    const geoMap = new MapboxGeocoder({
      accessToken: process.env.REACT_APP_MAP_KEY
        ? process.env.REACT_APP_MAP_KEY
        : "",
      marker: false,
      collapsed: true,
      countries: "ng",
      render: function () {
        return `<div>
        <p>lagos</p>
                <p>lagos</p>

        </div>`;
      },
    });
    useControl(() => geoMap);
    geoMap.on("result", (e) => {
      console.log(e);
      //    dispatch(setLocation(e.result.text))
    });
  };

  return (
    <div className="h-screen">
      <Map
        initialViewState={{
          longitude: viewState.longitude,
          latitude: viewState.latitude,
          zoom: 3.5,
        }}
        style={{ width: "50", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={process.env.REACT_APP_MAP_KEY}
      >
        <Marker
          latitude={viewState.latitude}
          longitude={viewState.latitude}
          anchor="bottom"
        ></Marker>
        <Geocoder />
        <GeolocateControl position="bottom-right" ref={geolocateControlRef} />
        <NavigationControl position="bottom-right" />
      </Map>
    </div>
  );
};
