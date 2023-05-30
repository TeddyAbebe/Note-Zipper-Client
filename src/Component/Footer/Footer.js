import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <div>
      <footer className="w-full relative bottom-0 flex justify-center">
        <Container>
          <Row>
            <Col className="text-center py-2">Copyright &copy; Note Zipper</Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
