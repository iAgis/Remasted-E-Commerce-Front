import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { Home, Checkout, NoMatch } from "./pages";
import Main from "./pages/Admin/Main";
import PrivateRoute from "./components/Auth/PrivateRoute";
import PublicRoute from "./components/Auth/PublicRoute";
import UserRoute from "./components/Auth/UserRoute";
import Success from "./components/Success/Success";
import About from "./pages/About/About";
import Brands from "./pages/Brands/Brands";
import Brand from "./components/BrandsList/Brand";
import ProductView from "./pages/ProductView/ProductView";
import User from "./pages/User/Main";
import { ToastContainer } from "react-toastify";
import Order from "./pages/Order";
import axios from "axios";
import BtnAboutUs from "./components/BtnAboutUs/BtnAboutUs";
import ScrollReset from "./components/ScrollReset/ScrollReset";

function App() {
  const [brands, setBrands] = useState(null);
  useEffect(() => {
    const getBrands = async () => {
      const response = await axios({
        method: "get",
        url: process.env.REACT_APP_DOMAIN + "/brands",
        header: { "Access-Control-Allow-Origin": "*" },
      });
      setBrands(response.data);
    };
    getBrands();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="position-relative">
      <Router>
        <Navbar>
          {brands && (
            <>
              {brands.map((brand) => (
                <Navbar.Item key={brand.id} to={`/brands/${brand.name}`}>
                  {brand.name}
                </Navbar.Item>
              ))}
            </>
          )}
        </Navbar>
        <BtnAboutUs />
        <Route path="/" component={ScrollReset} />
        <Switch>
          <PublicRoute exact path="/" component={Home} />
          <PublicRoute exact path="/checkout" component={Checkout} />
          <PublicRoute exact path="/product/:slug" component={Checkout} />
          <PublicRoute exact path="/search/:query" component={Checkout} />
          <PublicRoute exact path="/about" component={About} />
          <PublicRoute exact path="/brands" component={Brands} />
          <PublicRoute exact path="/brands/:brand">
            <Brand />
          </PublicRoute>
          <PublicRoute exact path="/brands/:brand/:slug">
            <ProductView />
          </PublicRoute>
          <PublicRoute exact path="/success" component={Success} />
          <PrivateRoute path="/admin" component={Main} />
          <UserRoute exact path="/user" component={User} />
          <UserRoute exact path="/order/user/:id" component={Order} />
          <Route component={NoMatch} />
        </Switch>
        <Footer />
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
