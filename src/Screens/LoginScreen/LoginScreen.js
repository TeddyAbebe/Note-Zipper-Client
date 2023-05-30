import React, { useEffect } from "react";
import MainScreen from "../../Component/MainScreen";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import Loading from "../../Component/Loading";
import ErrorMessage from "../../Component/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Actions/userActions";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if(userInfo) {
      history.push("/mynotes")
    }
  }, [history, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(login(email, password))
  };

  return (
    <MainScreen title="Login">
      <div className="loginContainer">
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

          <Button
            variant="primary"
            type="submit"
            className="my-3 hover:-translate-y-1 hover:scale-100 "
          >
            <b className="font-serif ">Submit</b>
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            New Customer?
            <Link to="/register">
              <b className="font-serif mx-2 hover:text-cyan-500 ">
                Register Here.
              </b>
            </Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default LoginScreen;
