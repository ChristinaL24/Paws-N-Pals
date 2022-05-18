import React from 'react';
import { Form } from 'react-bootstrap';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      type: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleType = this.handleType.bind(this);
  }

  handleLocation(event) {
    this.setState({ location: event.target.value });
  }

  handleType(event) {
    this.setState({ type: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    window.location.hash = `matches?location=${this.state.location}&type=${this.state.type}`;
  }

  render() {

    return (
      <div className="d-flex flex-column align-items-center">
        <h1 className="green-text mt-5">Find Nearby Pals!</h1>
        <Form onSubmit={this.handleSubmit} className='w-75 mt-3'>
          <Form.Group className="mb-4" id="locationSearch">
            <Form.Control
              required
              onChange={this.handleLocation}
              type="search"
              name="search"
              value={this.state.location}
              placeholder="Enter City, State, or Zip" />
          </Form.Group>
          <Form.Group id="typeSelect">
            <Form.Select
              required
              aria-label="pets"
              onChange={this.handleType}
              value={this.state.type} >
              <option>Pick the type of pal</option>
              <option value="Dog">Dogs</option>
              <option value="Cat">Cats</option>
              <option value="Rabbit">Rabbits</option>
              <option value="Small-Furry">Small & Furry</option>
              <option value="Bird">Birds</option>
              <option value="Scales-Fins-Other">Scales, Fins, and Others</option>
              <option value="Barnyard">Barnyard Animals</option>
            </Form.Select>
          </Form.Group>
          <div className="d-flex flex-wrap justify-content-right">
            <button
              className="btn btn-success green-bg border-0 rounded-pill button-width mt-4 p-2"
              type="submit">
                Next
            </button>
          </div>
        </Form>
      </div>
    );
  }
}
