import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes as RoutesDom} from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode; 
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <Header>
      <Navbar />
    </Header>
    <div className="main-content">
      {children}
    </div>
  </>
);

const Home = React.lazy(() => import("./pages/home"));
const Form = React.lazy(() => import("./components/Form"));

const Routes = () => {

  return (
    <Router>
      <Layout>
        <Suspense fallback={<div>Carregando...</div>}>
          <RoutesDom>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<Form churrascoId={0} onCancel={() => {}} />} />
          </RoutesDom>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default Routes;
