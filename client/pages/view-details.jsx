import React from 'react';
import GoogleMaps from '../components/google-maps';
import Geocode from 'react-geocode';

const styles = {
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  }
};

export default class ViewDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animal: null,
      map: null
    };
  }

  componentDidMount() {
    this.renderDetails();
  }

  renderDetails() {
    fetch(`/api/details/${this.props.petId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(animal => {
        this.setState({ animal });
      })
      .then(() => this.getCoordinates());
  }

  getCoordinates() {
    const { details } = this.state.animal;
    Geocode.fromAddress(`${details.address.address1} ${details.address.city} ${details.address.state}
                         ${details.address.postcode}`, process.env.GOOGLEMAPS_KEY)
      .then(response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({
          map: { lat: lat, lng: lng }
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    if (!this.state.animal) return null;

    const { details } = this.state.animal;
    return (
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-12 col-sm-6 col-md-5">
              <img className='pt-5' src={details.photos} alt={details.name} style={styles.image} />
            </div>
            <div className="col-12 col-sm-6 col-md-7">
              <h2 className="green-text m-3 d-flex justify-content-center">{details.name}</h2>
              <p className="text-secondary"><span className="fw-bolder">Located In: </span>{details.address.city}, {details.address.state}</p>
              <p className="text-secondary"><span className="fw-bolder">Age: </span>{details.age}</p>
              <p className="text-secondary"><span className="fw-bolder">Breed: </span>{details.breed}</p>
              <p className="text-secondary"><span className="fw-bolder">Gender: </span>{details.gender} </p>
              <p className="text-secondary"><span className="fw-bolder">Size: </span>{details.size} </p>
              <p className="text-secondary">
                <span className="fw-bolder">URL: </span>
                <a href={details.url} className='text-secondary'>{details.url}</a>
              </p>
            </div>
            <div>
              <p className="text-secondary">
                <span className="fw-bolder">Pal&#39;s Address: </span>
              </p>
              <GoogleMaps coordinates={this.state.map} />
              <p className='text-secondary'>
                {details.address.address1} <br />
                {details.address.city}, {details.address.state}, {details.address.postcode}
              </p>
              <p className="text-secondary"><span className="fw-bolder">Email: </span>{details.email}</p>
              <p className="text-secondary"><span className="fw-bolder">Phone: </span>{details.phone}</p>
              <a href='#saved-matches'>
                <i className="fa-solid fa-circle-arrow-left green-text pb-3"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
