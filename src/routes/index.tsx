import React, {ReactNode, Suspense} from "react";
import {BrowserRouter as Router, Route, Routes as RoutesDom} from "react-router-dom";
import Navbar from "../components/navbar.tsx";
import Header from "../components/header.tsx";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({children}: LayoutProps) => (
  <>
    <Header>
      <Navbar/>
    </Header>
    <div className="main-content">
      {children}
    </div>
  </>
);

const Home = React.lazy(() => import("../pages/home"));
const Form = React.lazy(() => import("../components/form.tsx"));

const Routes = () => {

  return (
    <Router>
      <Layout>
        <Suspense fallback={<div>Carregando...</div>}>
          <RoutesDom>
            <Route path="/" element={<Home/>}/>
            <Route path="/form" element={<Form/>}/>
            <Route path="/form/:id" element={<Form/>}/>
          </RoutesDom>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default Routes;
