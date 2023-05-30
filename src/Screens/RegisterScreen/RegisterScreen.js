import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../Component/MainScreen";
import Form from "react-bootstrap/Form";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import ErrorMessage from "../../Component/ErrorMessage";
import Loading from "../../Component/Loading";
import { register } from "../../Actions/userActions";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const history = useHistory()

  useEffect(() => {
    if (userInfo) {
      history.push("/mynotes");
    }
  }, [history, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password, pic));
    }
  };

  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);

    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "teddyabebe");
      fetch("https://api.cloudinary.com/v1_1/teddyabebe/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.url);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  return (
    <MainScreen title="Register">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label className="text-cyan-500 font-semibold">
              Name
            </Form.Label>
            <Form.Control
              className="py-1 font-mono"
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label className="text-cyan-500 font-semibold">
              Email Address
            </Form.Label>
            <Form.Control
              className="py-1 font-mono"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="text-cyan-500 font-semibold">
              Password
            </Form.Label>
            <Form.Control
              className="py-1 font-mono"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label className="text-cyan-500 font-semibold">
              Confirm Password
            </Form.Label>
            <Form.Control
              className="py-1 font-mono "
              type="password"
              placeholder="Confirm password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}

          <Form.Group controlId="pic">
            <Form.Label className="text-cyan-500 font-semibold">
              Profile Picture
            </Form.Label>

            <Form.Control
              onChange={(e) => postDetails(e.target.files[0])}
              className="py-1 font-mono"
              type="file"
              id="custom-file"
              label="Upload Profile Picture"
              custom
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3 ">
            <b className="font-serif font-semibold">Register </b>
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ?
            <Link to="/login" className="font-serif mx-2 hover:text-cyan-500 ">
              Login
            </Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default RegisterScreen;
