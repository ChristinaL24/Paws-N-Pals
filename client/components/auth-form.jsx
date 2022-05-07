import React from 'react';
import { Form, Card, Button } from 'react-bootstrap';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: ''
    };
  }

  componentDidMount() {

  }

  handleSubmit() {

  }

  render() {
    return (
      <>
        <div className='mb-4'>
          <h1 className="green-text mt-5 d-flex justify-content-center">Sign Up</h1>
          <h5 className='d-flex justify-content-center grey-text'>Register for an account</h5>
        </div>

        <Card className='m-auto shadow-sm card-width'>
          <Card.Body>
            <Form className='p-4'>
              <Form.Group
                  className="mb-3"
                  controlId="formUsername">
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Username" />
              </Form.Group>

              <Form.Group
                className="mb-4"
                controlId="formPassword">
                <Form.Control
                  type="password"
                  placeholder="Password" />
              </Form.Group>
              <div className="d-grid ps-5 pe-5 ">
                <Button variant="primary" size="lg" className='green-bg border-0 rounded-pill '>
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
