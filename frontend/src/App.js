import React from "react";
import "./App.scss";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ProductScreen from "./screens/ProductScreen/ProductScreen";

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
      <div className="app-screens">
        <Switch>
        <Route exact path="/" component={HomeScreen}/>
        <Route exact path="/product/:id" component={ProductScreen}/>
        </Switch>
      </div>
      <Footer />
      </Router>
    </div>
  );
}

export default App;
