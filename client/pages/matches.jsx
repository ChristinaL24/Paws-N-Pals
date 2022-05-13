import React from 'react';
import LoadingSpinner from '../components/loading-spinner';

export default class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      photos: '',
      name: '',
      age: '',
      breed: '',
      gender: '',
      size: '',
      email: '',
      phone: '',
      address: '',
      url: '',
      transition: '',
      isLoading: true,
      userId: null
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleUnmatch = this.handleUnmatch.bind(this);
  }

  componentDidMount() {
    this.handleSearch(false);
  }

  handleSearch(transition) {
    const queryString = window.location.hash.split('?');
    const params = new URLSearchParams(queryString[1]);
    const location = params.get('location');
    const type = params.get('type');

    fetch(`/api/matches/${location}/${type}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(animal =>
        this.setState({
          id: animal.id,
          photos: animal.primary_photo_cropped.full,
          name: animal.name,
          age: animal.age,
          breed: animal.breeds.primary,
          gender: animal.gender,
          size: animal.size,
          email: animal.contact.email,
          phone: animal.contact.phone,
          address: animal.contact.address,
          url: animal.url,
          isLoading: false
        }))
      .catch(error => {
        console.error('Error', error);
      });
    if (transition) {
      setTimeout(() => this.setState({ transition: 'animate__fadeIn' }), 1500);
    }
  }

  handleUnmatch() {
    this.setState({ transition: 'animate__fadeOutLeft' });
    this.handleSearch(true);
  }

  handleSave() {
    this.setState({ transition: 'animate__fadeOutRight' });

    fetch('/api/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        petId: Number(this.state.id),
        userId: Number(this.state.userId),
        details: {
          name: this.state.name,
          photos: this.state.photos,
          age: this.state.age,
          breed: this.state.breed,
          gender: this.state.gender,
          size: this.state.size,
          email: this.state.email,
          phone: this.state.phone,
          address: this.state.address,
          url: this.state.url
        }
      })
    })
      .then(response => response.json())
      .then(() => this.handleSearch(true))
      .catch(error => {
        console.error('Error', error);
      });
  }

  render() {
    const { photos, name, address, age, breed, gender, size } = this.state;

    if (this.state.isLoading === true) {
      return <LoadingSpinner />;
    } else {
      return (
        <div className={`animate__animated ${this.state.transition} card card-margin`}>
          <div className="row g-0">
            <div className="col-md-4 tan-bg">
              <img src={photos} className="img-fluid rounded-start" alt={name}/>
            </div>
            <div className="col-md-8 tan-bg">
              <div className="card-body p-4">
                <h2 className="card-title green-text mb-4 media-font-size d-flex justify-content-center">Meet: {name}</h2>
                <p className="card-text text-secondary"><span className="fw-bolder">Location:</span> {address.city}, {address.state}</p>
                <p className="card-text text-secondary"><span className="fw-bolder">Age:</span> {age}</p>
                <p className="card-text text-secondary"><span className="fw-bolder">Breed:</span> {breed}</p>
                <p className="card-text text-secondary"><span className="fw-bolder">Size:</span> {size}</p>
                <p className="card-text text-secondary"><span className="fw-bolder">Gender:</span> {gender}</p>
              </div>
              <div className='d-flex flex-wrap justify-content-center button-gap pb-3'>
                <button className='bg-transparent' onClick={this.handleUnmatch}>
                  <i className='fa-solid fa-circle-xmark'></i>
                </button>
                <button className='bg-transparent' onClick={this.handleSave}>
                  <i className="fa-solid fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
