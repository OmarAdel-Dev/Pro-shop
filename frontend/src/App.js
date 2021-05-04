import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ProductScreen from "./screens/ProductScreen/ProductScreen";
import CartScreen from "./screens/CartScreen/CartScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen/PaymentScreen";
import PlaceorderScreen from "./screens/PlaceorderScreen/PlaceorderScreen";

import ProtectedRoute from "./utils/ProtectedRoute"

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="app-screens">
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <ProtectedRoute path="/profile" component={ProfileScreen} />
            <ProtectedRoute path="/shipping" component={ShippingScreen} />
            <ProtectedRoute path="/payment" component={PaymentScreen} />
            <ProtectedRoute path="/placeorder" component={PlaceorderScreen} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
