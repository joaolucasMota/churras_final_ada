import {BrowserRouter as Router, Route, Routes as RoutesDom,} from "react-router-dom";
import Home from "./pages/home";
import Form from "./components/Form";

const Routes = () => (
  <Router>
    <RoutesDom>
      <Route path="/" element={<Home/>}/>
      <Route path="/form" element={<Form/>}/>
    </RoutesDom>
  </Router>
);

export default Routes;