import React from 'react';
// import parseRoute from './lib/parse-route';

export default class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      photos: '',
      name: '',
      location: '',
      age: '',
      breed: '',
      gender: '',
      size: ''
    };
  }

  componentDidMount() {
  // call fetch on api/pets/location/type and set the state of the items in here
  // also ensure that the catch method gets called
    const queryString = window.location.hash.split('?');
    const params = new URLSearchParams(queryString[1]);
    const location = params.get('location');
    const type = params.get('type');

    fetch(`/api/pets/${location}/${type}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(animal =>
        this.setState({
          id: animal[0].id,
          photos: animal[0].primary_photo_cropped.full,
          name: animal[0].name,
          location: animal[0].contact.address.city,
          age: animal[0].age,
          breed: animal[0].breeds.primary,
          gender: animal[0].gender,
          size: animal[0].size
        }))
      .catch(error => {
        console.error('Error', error);
      });

  }

  render() {
    // create a new variable to hold the values that we're gonna pull from the api and put them here
    const { photos, name, location, age, breed, gender, size } = this.state;

    return (

      <div className="card m-5">
        <div className="row g-0 ">
          <div className="col-md-4 tan-bg vh-75">
            <img src={photos} className="img-fluid rounded-start" alt="matched pet"/>
          </div>
          <div className="col-md-8 tan-bg ">
            <div className="card-body p-4">
              <h2 className="card-title green-text mb-4 media-font-size">Meet: { name }</h2>
              <p className="card-text text-secondary"><span className="fw-bolder">Location:</span> {location}</p>
              <p className="card-text text-secondary"><span className="fw-bolder">Age:</span> { age }</p>
              <p className="card-text text-secondary"><span className="fw-bolder">Breed:</span> { breed }</p>
              <p className="card-text text-secondary"><span className="fw-bolder">Size:</span> { size }</p>
              <p className="card-text text-secondary"><span className="fw-bolder">Gender:</span> { gender }</p>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
