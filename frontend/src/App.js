import React from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app-screens">
        <HomeScreen />
      </div>
      <Footer />
    </div>
  );
}

export default App;
