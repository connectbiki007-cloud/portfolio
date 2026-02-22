import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/Home";

const App = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default App;
