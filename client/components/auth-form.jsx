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
        <div className=''>
          <h1 className="green-text mt-5 d-flex justify-content-center">Sign Up</h1>
          <h5 className='d-flex justify-content-center'>Register for an account</h5>
        </div>

        <Card className='m-4'>
          <Card.Body>
            <Form>
              <Form.Group
                  className="mb-3"
                  controlId="formUsername">
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Username" />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="formPassword">
                <Form.Control
                  type="password"
                  placeholder="Password" />
              </Form.Group>
              <Button size="lg" className='green-bg border-0 d-grid mx-auto mb-4'>Sign Up</Button>
            </Form>
            <div className=''>
              <a href='' className='text-black'>
                <h5 className='d-flex justify-content-center'>Have an account? Log in!</h5>
              </a>
              <a href='' className='text-black'>
                <h5 className='d-flex justify-content-center'>Sign in as a guest</h5>
             </a>
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }
}
