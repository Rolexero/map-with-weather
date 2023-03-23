import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Layout } from "./components/Layout";
import { Mapbox } from "./components/Mapbox";

function App() {
  return (
    <Layout>
      <Mapbox />
    </Layout>
  );
}

export default App;
