import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      type: ''
    };
  }

  render() {
    return (
      <div className="d-flex flex-column align-items-center">
        <h1 className="green-text mt-5">Find Nearby Pals!</h1>
        <form className="w-75 mt-3">
          <label htmlFor="search">
          </label>
          <input type="search"
                id="search"
                name="search"
                placeholder="Enter City, State, or Zip"
                className="w-100 rounded-2 outline-none search-height open-sans-text form-styles"/>
            <label htmlFor="pets"></label>
            <select name="pets"
                    id="pets"
                    className="w-100 rounded-2 outline-none search-height open-sans-text form-styles mt-4">
              <option value="pick">Pick the type of pal</option>
              <option value="dogs">Dogs</option>
              <option value="cats">Cats</option>
              <option value="other">Other Animals</option>
            </select>
            <div className="d-flex flex-wrap justify-content-right">
              <a className="btn btn-primary green-bg border-0 rounded-pill button-width open-sans-text mt-5"
                  href="#"
                  role="button">Next</a>
            </div>
        </form>
      </div>
    );
  }

}
