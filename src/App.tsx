import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Layout } from "./components/Layout";
import { Mapbox } from "./components/Mapbox";
import { StateTypes } from "./types";

function App() {
  const [viewState, setViewState] = useState({
    longitude: 9.59395988695573,
    latitude: 8.10530640960786,
    name: "Nigeria",
    id: 0,
  });

  const [weatherdetails, setWeatherDetails] = useState({
    name: "",
    sys: { country: "", sunrise: 0, sunset: 0 },
    main: {
      temp: "",
      feels_like: "",
      temp_min: "",
      temp_max: "",
    },
    weather: [{ description: "" }],
  });

  const findCity = async ({ lat, long }: any) => {
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=5b117267147ee27ab762fca637060b5f`,
      { mode: "cors" }
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherDetails(data);
        console.log(data);
      });
  };

  useEffect(() => {
    findCity({ lat: viewState.latitude, long: viewState.longitude });
  }, []);

  const clickHandler = ({ lat, long, name, id }: StateTypes) => {
    setViewState({ longitude: long, latitude: lat, name, id });
    findCity({ lat, long });
  };

  return (
    <Layout onClick={clickHandler}>
      <Mapbox
        viewState={viewState}
        setViewState={setViewState}
        weatherDetails={weatherdetails}
      />
    </Layout>
  );
}

export default App;
