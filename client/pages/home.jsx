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
                className="w-100 rounded-2 outline-none search-height open-sans-text form-styles"/>
            <label htmlFor="pets"></label>
            <select
                    required
                    onChange={this.handleType}
                    value={this.state.type}
                    name="pets"
                    id="pets"
                    className="w-100 rounded-2 outline-none search-height open-sans-text form-styles mt-4">
              <option value="pick">Pick the type of pal</option>
              <option value="dogs">Dogs</option>
              <option value="cats">Cats</option>
            </select>
            <div className="d-flex flex-wrap justify-content-right">
              <a className="btn btn-primary green-bg border-0 rounded-pill button-width open-sans-text mt-5"
                  href={`matches?location=${this.state.location}&type=${this.state.type}`}
                  role="button">Next</a>
            </div>
        </form>
      </div>
    );
  }
}
