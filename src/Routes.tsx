import {BrowserRouter as Router, Route, Routes as RoutesDom,} from "react-router-dom";
import Home from "./pages/home";

const Routes = () => (
  <Router>
    <RoutesDom>
      <Route path="/" element={<Home/>}/>
    </RoutesDom>
  </Router>
);

export default Routes;