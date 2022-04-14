import React from 'react';
// import parseRoute from './lib/parse-route';

export default class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      status: '',
      name: '',
      location: '',
      age: '',
      breed: ''
    };
  }

  componentDidMount() {
  // call fetch on api/pets/location/type and set the state of the items in here
  // also ensure that the catch method gets called
  }
/*
  render() {
    // create a new variable to hold the values that we're gonna pull from the api and put them here
    return (

    );
  }
  */
}

/*

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

*/
