import React from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import AppContext from '../lib/app-context';

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/auth/log-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(result => {
        if (result.user && result.token) {
          this.props.logIn(result);
          window.location.hash = '#';
        } else {
          alert('Sorry, we cannot find an account with this login. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error', error);
      });
  }

  handleUsername(event) {
    this.setState({ username: event.target.value });
  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <>
        <div className='mb-4'>
          <h1 className="green-text mt-5 d-flex justify-content-center">Log In</h1>
          <h5 className='d-flex justify-content-center grey-text'>Log into your account!</h5>
        </div>
        <Card className='m-auto shadow-sm card-width'>
          <Card.Body>
            <Form className='p-4' onSubmit={this.handleSubmit}>
              <Form.Group className="mb-4" controlId="formUsername">
                <Form.Control
                  onChange={this.handleUsername}
                  required
                  type="text"
                  name="username"
                  value={this.state.username}
                  placeholder="Username" />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Control
                  onChange={this.handlePassword}
                  required
                  type="password"
                  name="password"
                  value={this.state.password}
                  placeholder="Password" />
              </Form.Group>
              <Button
                variant="success"
                type='submit'
                size="lg"
                className='green-bg border-0 rounded-pill d-grid ps-5 pe-5 m-auto'>
                Sign In
              </Button>
            </Form>
            <div>
              <a href='#sign-up' className='grey-text'>
                <h5 className='d-flex justify-content-center'>Need an account? Sign up here!</h5>
              </a>
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }
}

LogIn.contextType = AppContext;
