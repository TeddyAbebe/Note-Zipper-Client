import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MainScreen from "../../Component/MainScreen";
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ErrorMessage from "../../Component/ErrorMessage";
import Loading from "../../Component/Loading";
import { updateProfile } from "../../Actions/userActions";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  const history = useHistory();

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [history, userInfo]);

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
  const submitHandler = (e) => {
    e.preventDefault();

    if (password === confirmPassword)
      dispatch(updateProfile({ name, email, password, pic }));
  };
  return (
    <MainScreen title="EDIT PROFILE">
      <div>
        <Row className="flex gap-5 flex-col md:flex-row">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

              <Form.Group controlId="name" className="my-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  className="py-1 font-mono"
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="email" className="my-2">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  className="py-1 font-mono"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="password" className="my-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="py-1 font-mono"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="confirmPassword" className="my-2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  className="py-1 font-mono"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}

              <Form.Group controlId="pic">
                <Form.Label>Change Profile Picture</Form.Label>
                <Form.Control
                  className="py-1 font-mono"
                  onChange={(e) => postDetails(e.target.files[0])}
                  id="custom-file"
                  type="file"
                  label="Upload Profile Picture"
                  custom
                />
              </Form.Group>

              <div className="flex flex-col md:flex-row items-center gap-4">
                <Button type="submit" variant="primary" className="my-2">
                  Update
                </Button>
                {success && (
                  <ErrorMessage variant="success">
                    Updated Successfully
                  </ErrorMessage>
                )}
              </div>
            </Form>
          </Col>
          <Col className="flex justify-center items-center">
            <img
              src={pic}
              alt="Profile"
              className="w-[50%] flex tems-center p-[]"
            />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;
