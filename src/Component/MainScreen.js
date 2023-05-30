import React from "react";
import { Container, Row } from "react-bootstrap";

const MainScreen = ({ title, children }) => {
  return (
    <div className="mainback min-h-[83vh] flex py-2.5 px-0">
      <Container>
        <Row>
          <div className="page w-full">
            {title && (
              <>
                <h1 className="heading text-[40px] font-serif py-1.5 px-2.5 max-sm:flex max-sm:justify-center max-sm:text-2xl">
                  {title}
                </h1>
                <hr />
              </>
            )}
            
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default MainScreen;
