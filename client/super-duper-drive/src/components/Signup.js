import React, { useState, Fragment } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import Axios from 'axios';

const StyledLoginContainer = styled(Container)`
  justify-content: center;
  align-items: center;
  margin-top: 10%;
`;

const StyledHeader = styled(Container)`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 3%;
`;

const StyledHRef = styled.a`
  margin-top: 5%;
  padding-top: 5%;
`;

export default function Signup(props) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUpError, setSignUpError] = useState(false)

  const handleSignupResponse = (response) => {
    (response.status === "200") ?
      props.history.push("/") :
      setSignUpError(true);
  }

  const handleOnClick = () => {
    Axios.post("/signup", {
      firstName,
      lastName,
      username,
      password
    })
      .then(response => handleSignupResponse(response))
      .catch(() => setSignUpError(true))
  }

  return (
    <StyledLoginContainer>

      {signUpError === true && (
        <Alert variant="danger" onClose={() => setSignUpError(false)} dismissible>
          <p>
            Sorry, there was error processing the request. Please Enter details again!
          </p>
        </Alert>
      )}

      <StyledHeader>Sign Up</StyledHeader>

      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Form>
            <Fragment>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email"
                    placeholder="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>

                <Form.Group as={Col} controlId="formGridFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                  />
                </Form.Group>

              </Form.Row>
              <Button variant="primary" type="submit" onClick={handleOnClick}>
                Submit
              </Button>
            </Fragment>
          </Form>
          <StyledHRef href="/">Click here to Log In</StyledHRef>
        </Col>
      </Row>

    </StyledLoginContainer>
  );

}