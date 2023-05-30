import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const LandingPage = ({ history }) => {
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      history.push("/mynotes");
    }
  }, [history]);

  return (
    <div className="landing">
      <Container>
        <Row>
          <Col>
            <div className="w-full text-center mt-1">
              <div>
                <h1 className="text-8xl lg:py-0 lg:px-24 md:text-3xl sm:text-2xl max-sm:text-2xl">
                  Welcome To Note Zipper
                </h1>
                <p className="text-2xl pt-2. md:text-xl sm:text-lg max-sm:text-lg">
                  Safe Place For All Your Notes!
                </p>
              </div>

              <div className="mt-12 flex justify-evenly lg:py-0 lg:px-52 md:px-40 md:mt-8 sm:px-30 max-sm:px-30">
                <a href="/login">
                  <Button
                    size="lg"
                    className="w-48 h-14 md:w-28 md:h-12 sm:w-24 max-sm:w-24"
                  >
                    Login
                  </Button>
                </a>

                <a href="/register">
                  <Button
                    size="lg"
                    className="w-48 h-14 md:w-28 md:h-12 sm:w-24 max-sm:w-24 "
                    variant="outline-dark"
                  >
                    Signup
                  </Button>
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
