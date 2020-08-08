import React, { useState, Fragment } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import Axios from 'axios';
import Home from './Home';
import { } from '../actions/authedUser';

const StyledLoginContainer = styled(Container)`
  justify-content: center;
  align-items: center;
  margin-top: 10%;
`;

const StyledHeader = styled(Container)`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  padding-bottom: 3%;
`;

const StyledHRef = styled.a`
  margin-top: 5%;
`;

function Login(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') === '' ? '' : localStorage.getItem('token'));

  const handleLoginReponse = (response) => {
    if (response.status === 200 && response.data.jwt) {
      localStorage.setItem('token', response.data.jwt);
      setToken(response.data.jwt);
    } else {
      setLoginError(true);
    }
  }

  const handleClick = (e) => {
    e.preventDefault();

    Axios.post("/login", {
      username: username,
      password: password,
    })
      .then(response => handleLoginReponse(response))
      .catch(() => setLoginError(true));
  }

  const loginComponent = () => {
    return (
      <StyledLoginContainer>
        {loginError === true && (
          <Alert variant="danger" onClose={() => setLoginError(false)} dismissible>
            <p>
              Please Enter valid credentails
            </p>
          </Alert>
        )}

        <StyledHeader>Login</StyledHeader>

        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form>
              <Fragment>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleClick}>
                  Submit
              </Button>
              </Fragment>
            </Form>
            <StyledHRef href="/signup">Click here to sign up</StyledHRef>
          </Col>
        </Row>
      </StyledLoginContainer>
    );
  }

  return (
    token && token.length !== 0 && loginError === false ?
      <Home /> :
      loginComponent()
  );

}

export default Login;