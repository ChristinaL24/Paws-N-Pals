import React from 'react';
import { Form, Card, Button } from 'react-bootstrap';

export default class AuthForm extends React.Component {
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

  componentDidMount() {

  }

  handleSubmit(event) {
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
                  placeholder="Username" />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Control
                  onChange={this.handlePassword}
                  required
                  type="password"
                  name="password"
                  placeholder="Password" />
              </Form.Group>

              <div className="d-grid ps-5 pe-5 ">
                <Button
                  variant="primary"
                  type='submit'
                  size="lg"
                  className='green-bg border-0 rounded-pill'>
                  Sign Up
                </Button>
              </div>
            </Form>
            <div className=''>
              <a href='' className='grey-text'>
                <h5 className='d-flex justify-content-center'>Have an account? Log in!</h5>
              </a>
              <a href='' className='grey-text'>
                <h5 className='d-flex justify-content-center'>Sign in as a guest</h5>
             </a>
            </div>

          </Card.Body>
        </Card>
      </>
    );
  }
}
