import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

const HomeScreen = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">Time Tracking System</h1>
          <p className="text-center mb-4">
            Time tracking system is a software program that allows individuals
            and organizations to track the amount of time spent on specific
            tasks or projects. It provides valuable insights into how time is
            being utilized, helping to improve productivity, efficiency, and
            profitability.
          </p>
          <div className="d-flex">
            {!userInfo ? (
              <>
                <LinkContainer to="/login">
                  <Button variant="primary" href="/login" className="me-3">
                    Sign In
                  </Button>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Button variant="secondary" href="/register">
                    Register
                  </Button>
                </LinkContainer>
              </>
            ) : (
              <>
                <LinkContainer to="/time-entry">
                  <Button variant="primary" href="/time-entry" className="me-3">
                    Time Entry
                  </Button>
                </LinkContainer>
                <LinkContainer to="/weekly-time-view">
                  <Button variant="secondary" href="/weekly-time-view">
                    Weekly Time View
                  </Button>
                </LinkContainer>
              </>
            )}
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default HomeScreen;
