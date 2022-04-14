import React from 'react';

export default class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      name: '',
      location: '',
      age: '',
      breed: ''
    };
    this.handleMatches = this.handleMatches.bind(this);
  }

  componentDidMount() {

  }

  handleMatches() {

  }

  render() {
    return (
      <div className="row row-cols-1 row-cols-md-3 g-4 m-5">
        <div className="col">
          <div className="card h-100">
            <img src="" className="card-img-top" alt="pet"/>
            <div className="card-body tan-bg">
              <h2 className="card-title green-text mb-3">Meet: </h2>
              <p className="card-text text-secondary"><span className="fw-bolder">Location:</span> </p>
              <p className="card-text text-secondary"><span className="fw-bolder">Age:</span> </p>
              <p className="card-text text-secondary"><span className="fw-bolder">Breed:</span> </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
