import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../../components/Admin/Navbar";
import Dashboard from "./Dashboard";
import Products from "./Products";
import Users from "./Users";
import Orders from "./Orders";
import { NoMatch } from "../../pages";
import PrivateRoute from "../../components/Auth/PrivateRoute";
import Settings from "./Settings";
import OrderDetails from "./OrderDetails";
import Brands from "./Brands";

function Main() {
  return (
    <div className="d-flex position-relative">
      <Router>
        <Navbar />
        <div className="overflow-scroll w-100 vh-100">
          <Switch>
            <PrivateRoute exact path="/admin" component={Dashboard} />
            <PrivateRoute exact path="/admin/products" component={Products} />
            <PrivateRoute path="/admin/users" component={Users} />
            <PrivateRoute exact path="/admin/orders" component={Orders} />
            <PrivateRoute
              exact
              path="/admin/orders/:id"
              component={OrderDetails}
            />
            <PrivateRoute path="/admin/brands" component={Brands} />
            <PrivateRoute path="/admin/settings" component={Settings} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default Main;
