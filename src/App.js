import React from "react";
import "./App.css";

import Navbar from "./components/Navbar/navbar";
import Hero from "./components/Hero/Hero";
import Products from "./components/Products/Products";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Products />
    </div>
  );
}

export default App;