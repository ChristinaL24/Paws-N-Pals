import React from 'react';

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
    // Tim's example: if user clicks submit, the url should look like
    // localhost:3000/#search-results?location={put location here}&type={put type here}
    window.location.hash = `matches?location=${this.state.location}&type=${this.state.type}`;
  }

  render() {
    return (
      <div className="d-flex flex-column align-items-center">
        <h1 className="green-text mt-5">Find Nearby Pals!</h1>
        <form onSubmit={this.handleSubmit} className="w-75 mt-3">
          <label htmlFor="search">
          </label>
          <input
            required
            onChange={this.handleLocation}
            value={this.state.location}
            type="search"
            id="search"
            name="search"
            placeholder="Enter City, State, or Zip"
            className="w-100 rounded-2 outline-none search-height open-sans-text form-styles" />
          <label htmlFor="pets"></label>
          <select
            required
            onChange={this.handleType}
            value={this.state.type}
            name="pets"
            id="pets"
            className="w-100 rounded-2 outline-none search-height open-sans-text form-styles mt-4">
            <option value="pick">Pick the type of pal</option>
            <option value="Dog">Dogs</option>
            <option value="Cat">Cats</option>
            <option value="Rabbit">Rabbits</option>
            <option value="Small-Furry">Small & Furry</option>
            <option value="Barnyard">Barnyard Animals</option>
          </select>
          <div className="d-flex flex-wrap justify-content-right">
            <button
              className="btn-primary green-bg border-0 rounded-pill button-width mt-5"
              type="submit">Next</button>
          </div>
        </form>
      </div>
    );
  }
}
