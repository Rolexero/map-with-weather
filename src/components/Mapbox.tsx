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
import data from "../data.json";

interface MapboxProps {
  viewState: { longitude: number; latitude: number; id: number };
  weatherDetails: {
    name: string;
    sys: { country: string; sunrise: number; sunset: number };
    main: {
      temp: string;
      feels_like: string;
      temp_min: string;
      temp_max: string;
    };
    weather: { description: string }[];
  };
  setViewState: React.Dispatch<
    React.SetStateAction<{
      longitude: number;
      latitude: number;
      name: string;
      id: number;
    }>
  >;
}

export const Mapbox: React.FC<MapboxProps> = ({
  viewState,
  setViewState,
  weatherDetails,
}: MapboxProps) => {
  const [currentId, setcurrentId] = useState(null);
  const geolocateControlRef = React.useCallback((ref: any) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger();
    }
  }, []);
  // const [showPopup, setShowPopup] = useState(false);
  const Geocoder = (): any => {
    const geoMap = new MapboxGeocoder({
      accessToken: process.env.MAP_KEY ? process.env.MAP_KEY : "",
      marker: false,
      collapsed: true,
      countries: "ng",
    });
    useControl(() => geoMap);
    geoMap.on("result", (e) => {});
  };

  const handleClickHandler = (id: any) => {
    setcurrentId(id);
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
          longitude={viewState.longitude}
          anchor="bottom"
          onClick={() => handleClickHandler(viewState.id)}
        ></Marker>
        {viewState.id === currentId && (
          <Popup
            latitude={viewState.latitude}
            closeButton={true}
            closeOnClick={false}
            anchor="top"
            longitude={viewState.longitude}
          >
            <div className="card">
              <h2 className="label">
                <span>{weatherDetails.name ? weatherDetails.name : ""}</span>,{" "}
                <span id="country">
                  {weatherDetails.sys.country ? weatherDetails.sys.country : ""}
                </span>
              </h2>
              {/* <p><span id='day'>Day</span>, <span id='month'>Month</span> */}
              <h2>
                <p className="label">
                  Sunrise:{" "}
                  {new Date(
                    weatherDetails.sys.sunrise * 1000
                  ).toLocaleDateString("en")}
                </p>
                <p className="label">
                  Sunset:{" "}
                  {new Date(
                    weatherDetails.sys.sunset * 1000
                  ).toLocaleDateString("en")}
                </p>

                <p className="label">
                  {weatherDetails.main.temp ? weatherDetails.main.temp : ""}
                  <span>°C</span>
                </p>
              </h2>
              <p className="label">
                Feel like:{" "}
                <span id="feelsLike">
                  {weatherDetails.main.feels_like
                    ? weatherDetails.main.feels_like
                    : ""}
                </span>
              </p>
              <p className="label">
                Temp-max:{" "}
                <span id="tempMax">
                  {weatherDetails.main.temp_max
                    ? weatherDetails.main.temp_max
                    : ""}
                </span>
              </p>
              <p className="label">
                {" "}
                | Temp-min:{" "}
                <span id="tempMin">
                  {weatherDetails.main.temp_min
                    ? weatherDetails.main.temp_min
                    : ""}
                </span>
              </p>
              <p className="label">
                Description: <span id="description"></span>
                {weatherDetails.weather[0].description
                  ? weatherDetails.weather[0].description
                  : ""}
              </p>
            </div>
          </Popup>
        )}
        <Geocoder />
        <NavigationControl position="bottom-right" />
      </Map>
    </div>
  );
};
