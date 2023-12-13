import Container from "react-bootstrap/Container";
import { Outlet } from "react-router-dom";
import Header from "../components/header";

const Layout = () => {
  return (
    <>
      <Header />
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
