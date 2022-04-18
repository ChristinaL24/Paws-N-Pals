import React from 'react';

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
      size: '',
      isLoading: true
    };
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch() {
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
          id: animal.id,
          photos: animal.primary_photo_cropped.full,
          name: animal.name,
          location: animal.contact.address.city,
          age: animal.age,
          breed: animal.breeds.primary,
          gender: animal.gender,
          size: animal.size,
          isLoading: false
        }))
      .catch(error => {
        console.error('Error', error);
      });
  }

  handleSave() {
    fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        petId: Number(this.state.id),
        userId: 1,
        details: {
          name: this.state.name,
          photos: this.state.photos,
          location: this.state.location,
          age: this.state.age,
          breed: this.state.breed
        }
      })
    })
      .then(response => response.json())
      .then(() => this.handleSearch())
      .catch(error => {
        console.error('Error', error);
      });
  }

  render() {
    const { photos, name, location, age, breed, gender, size } = this.state;

    if (this.state.isLoading) return null;

    return (
      <div className="card card-margin">
        <div className="row g-0">
          <div className="col-md-4 tan-bg">
            <img src={photos} className="img-fluid rounded-start" alt="matched pet" />
          </div>
          <div className="col-md-8 tan-bg">
            <div className="card-body p-4">
              <h2 className="card-title green-text mb-4 media-font-size">Meet: {name}</h2>
              <p className="card-text text-secondary"><span className="fw-bolder">Location:</span> {location}</p>
              <p className="card-text text-secondary"><span className="fw-bolder">Age:</span> {age}</p>
              <p className="card-text text-secondary"><span className="fw-bolder">Breed:</span> {breed}</p>
              <p className="card-text text-secondary"><span className="fw-bolder">Size:</span> {size}</p>
              <p className="card-text text-secondary"><span className="fw-bolder">Gender:</span> {gender}</p>
            </div>
            <div className='d-flex flex-wrap justify-content-center'>
              <button className='tan-bg' onClick={this.handleSave}>
                <i className="fa-solid fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
