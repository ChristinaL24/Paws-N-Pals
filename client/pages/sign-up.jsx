import React from 'react';
import { Form, Card, Button } from 'react-bootstrap';

export default class SignUp extends React.Component {
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
    fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(result =>
        this.setState({
          username: '',
          password: ''
        }))
      .then(() => alert('Sign up successful! Please log in with your credentials.'))
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
          <h1 className="green-text mt-5 d-flex justify-content-center">Sign Up</h1>
          <h5 className='d-flex justify-content-center grey-text'>Register for an account!</h5>
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
                Sign Up
              </Button>
            </Form>
            <div className=''>
              <a href='#log-in' className='grey-text'>
                <h5 className='d-flex justify-content-center'>Have an account? Log in!</h5>
              </a>
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }
}
